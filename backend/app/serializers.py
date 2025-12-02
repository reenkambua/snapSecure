from rest_framework import serializers
from .models import Device, UnauthorizedAttempts, Snapshot, UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['subscription_status', 'plan_id', 'stripe_customer_id']

class DeviceSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Device
        fields = ['user', 'device_id', 'name', 'location', 'last_seen', 'is_armed']
        read_only_fields = ['last_seen']


class SnapshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snapshot
        fields = ['attempt', 'image_url', 'captured_at']
        read_only_fields = ['captured_at']


class UnauthorizedAttemptsSerializer(serializers.ModelSerializer):
    snapshot = SnapshotSerializer(read_only=True)
    device_name = serializers.ReadOnlyField(source='device.name')

    class Meta:
        model = UnauthorizedAttempts
        fields = ['id', 'device_name', 'device', 'timestamp', 'failure_reason', 'is_verified', 'snapshot']
        read_only_fields = ['timestamp', 'device']
