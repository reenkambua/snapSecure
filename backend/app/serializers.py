from rest_framework import serializers
from .models import Device,UnauthorizedAttempts,Snapshot,UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['subscription_status', 'plan_id']


class DeviceSerializer(serializers.ModelSerializer):
    user= serializers.ReadOnlyField(source='user.username')

    class Meta:
        model=Device
        fields=['user','device_id','name','location']
        Read_only_Fields=['last_seen']

class SnapshotSerializer(serializers.ModelSerializer):
    class Meta:
        model=Snapshot
        fields=['image_url','captured_at']

class UnauthorizedAttemptsSerializer(serializers.ModelSerializer):
    snapshot=SnapshotSerializer(read_only=True)
    device_name=serializers.ReadOnlyField(source='device.name')

    class Meta:
        model=UnauthorizedAttempts
        fields=['id','device_name','timestamp','failure_reason','is_verified','snapshot']
        Read_only_Fields= ['timestamp']