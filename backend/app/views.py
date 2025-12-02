from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.utils import timezone
from datetime import timedelta
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Device, UnauthorizedAttempts, Snapshot


@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already taken"}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)

    return Response({"message": "User registered successfully"}, status=201)


@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if not user:
        return Response({"error": "Invalid credentials"}, status=400)

    refresh = RefreshToken.for_user(user)

    return Response({
        "message": "Login successful",
        "refresh": str(refresh),
        "access": str(refresh.access_token)
    })

def get_plan_limits(user):
    profile = user.userprofile
    plan = profile.plan_id.lower()

    if plan == "starter":
        return {"max_devices": 1, "log_days": 7, "email_alerts": False}

    if plan == "pro":
        return {"max_devices": 1, "log_days": 30, "email_alerts": True}

    if plan == "business":
        return {"max_devices": 10, "log_days": 90, "email_alerts": True}

    return {"max_devices": 1, "log_days": 7, "email_alerts": False}


def can_send_email_alerts(user):
    return get_plan_limits(user)["email_alerts"]


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    profile = request.user.userprofile
    return Response({
        "username": request.user.username,
        "plan": profile.plan_id,
        "status": profile.subscription_status
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_subscription(request):
    new_plan = request.data.get("plan")

    if new_plan not in ["starter", "pro", "business"]:
        return Response({"error": "Invalid plan selected"}, status=400)

    profile = request.user.userprofile
    profile.plan_id = new_plan
    profile.subscription_status = "active"
    profile.save()

    return Response({"message": f"Subscription updated to {new_plan}"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_devices(request):
    devices = Device.objects.filter(user=request.user)
    data = [
        {
            "id": d.id,
            "device_id": d.device_id,
            "name": d.name,
            "location": d.location,
            "last_seen": d.last_seen,
            "is_armed": d.is_armed
        }
        for d in devices
    ]
    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def register_device(request):
    user = request.user
    limits = get_plan_limits(user)

    if user.devices.count() >= limits["max_devices"]:
        return Response({"error": f"Your plan allows only {limits['max_devices']} device(s). Upgrade to add more."},
                        status=403)

    device_id = request.data.get("device_id")
    name = request.data.get("name")
    location = request.data.get("location")

    device = Device.objects.create(
        user=user,
        device_id=device_id,
        name=name,
        location=location
    )

    return Response({"message": f"Device '{device.name}' registered successfully"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_device(request, device_id):
    device = get_object_or_404(Device, device_id=device_id, user=request.user)

    return Response({
        "device_id": device.device_id,
        "name": device.name,
        "location": device.location,
        "last_seen": device.last_seen,
        "is_armed": device.is_armed
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_attempts(request):
    attempts = UnauthorizedAttempts.objects.filter(device__user=request.user).order_by('-timestamp')

    data = [
        {
            "id": a.id,
            "device": a.device.name,
            "timestamp": a.timestamp,
            "reason": a.failure_reason,
            "verified": a.is_verified,
            "snapshot": a.snapshot.image_url if hasattr(a, "snapshot") else None
        }
        for a in attempts
    ]

    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_attempt_detail(request, pk):
    attempt = get_object_or_404(UnauthorizedAttempts, id=pk, device__user=request.user)

    return Response({
        "device": attempt.device.name,
        "timestamp": attempt.timestamp,
        "reason": attempt.failure_reason,
        "verified": attempt.is_verified,
        "snapshot": attempt.snapshot.image_url if hasattr(attempt, "snapshot") else None
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def log_unauthorized_attempt(request):
    user = request.user
    device_id = request.data.get("device_id")
    reason = request.data.get("reason", "Unknown Access")

    device = get_object_or_404(Device, device_id=device_id, user=user)

    attempt = UnauthorizedAttempts.objects.create(device=device, failure_reason=reason)

    if can_send_email_alerts(user):
        pass  

    return Response({"message": "Unauthorized attempt logged successfully", "attempt_id": attempt.id})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_snapshot(request):
    user = request.user
    attempt_id = request.data.get("attempt_id")
    image_url = request.data.get("image_url")

    attempt = get_object_or_404(UnauthorizedAttempts, id=attempt_id, device__user=user)

    snapshot = Snapshot.objects.create(attempt=attempt, image_url=image_url)

    return Response({"message": f"Snapshot created for attempt {attempt.id}", "snapshot_url": snapshot.image_url})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_snapshot_for_attempt(request, attempt_id):
    attempt = get_object_or_404(UnauthorizedAttempts, id=attempt_id, device__user=request.user)

    if not hasattr(attempt, "snapshot"):
        return Response({"error": "No snapshot found"}, status=404)

    snapshot = attempt.snapshot

    return Response({
        "image_url": snapshot.image_url,
        "captured_at": snapshot.captured_at
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_logs(request):
    user = request.user
    limits = get_plan_limits(user)
    cutoff = timezone.now() - timedelta(days=limits["log_days"])

    attempts = UnauthorizedAttempts.objects.filter(
        device__user=user,
        timestamp__gte=cutoff
    ).order_by("-timestamp")

    data = [
        {
            "device": a.device.name,
            "timestamp": a.timestamp,
            "reason": a.failure_reason,
            "snapshot": a.snapshot.image_url if hasattr(a, "snapshot") else None
        }
        for a in attempts
    ]

    return Response({"attempts": data})
