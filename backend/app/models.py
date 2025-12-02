from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
from django.core.exceptions import ValidationError

class UserProfile(models.Model):
    PLAN_CHOICES = [
        ("starter", "Starter"),
        ("pro", "Pro"),
        ("business", "Business"),
    ]

    STATUS_CHOICES = [
        ("none", "None"),
        ("active", "Active"),
        ("expired", "Expired"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    stripe_customer_id = models.CharField(max_length=100, blank=True, null=True)
    subscription_status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='none')
    plan_id = models.CharField(max_length=50, choices=PLAN_CHOICES, default='starter')

    def __str__(self):
        return f"Profile for {self.user.username} (status:{self.subscription_status}, plan:{self.plan_id})"


class Device(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="devices")
    device_id = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=255)
    last_seen = models.DateTimeField(auto_now_add=True)
    is_armed = models.BooleanField(default=False)

    def clean(self):
       
        profile = self.user.userprofile
        max_devices = 1  
        if profile.plan_id.lower() in ["starter", "pro"] and self.user.devices.count() >= max_devices:
            raise ValidationError(f"{profile.plan_id.title()} plan allows only {max_devices} device(s)")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class UnauthorizedAttempts(models.Model):
    device = models.ForeignKey(Device, on_delete=models.CASCADE, related_name="attempts")
    timestamp = models.DateTimeField(auto_now_add=True)
    failure_reason = models.CharField(max_length=255, default="Unknown Access")
    is_verified = models.BooleanField(default=False)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"Unauthorized Attempt on {self.device.name} at {self.timestamp.strftime('%Y-%m-%d %H:%M')}"

    @staticmethod
    def filter_by_plan(user):
        profile = user.userprofile
        now = timezone.now()
        if profile.plan_id.lower() == "starter":
            cutoff = now - timedelta(days=7)
        elif profile.plan_id.lower() == "pro":
            cutoff = now - timedelta(days=30)
        else: 
            cutoff = now - timedelta(days=90)
        return UnauthorizedAttempts.objects.filter(device__user=user, timestamp__gte=cutoff)

class Snapshot(models.Model):
    attempt = models.OneToOneField(UnauthorizedAttempts, on_delete=models.CASCADE, related_name="snapshot")
    image_url = models.URLField(max_length=500)
    captured_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Snapshot for Attempt id {self.attempt.id}"


from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    instance.userprofile.save()
