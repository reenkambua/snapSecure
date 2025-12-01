from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    stripe_customer_id=models.CharField(max_length=100,blank=True,null=True)
    subscription_status=models.CharField(max_length=50,default='none')
    plan_id=models.CharField(max_length=50,default='starter')

    def __str__(self):
        return f"Profile for {self.user.username} (status:{self.subscription_status})"

class Device(models.Model):
    User=models.ForeignKey(User, on_delete=models.CASCADE,related_name="Devices")
    device_id=models.CharField(max_length=200, unique=True)
    name=models.CharField(max_length=200)
    location=models.CharField(max_length=255)
    last_seen=models.DateTimeField(auto_now_add=True)
    is_armed=models.BooleanField(default=False)

    def __str__(self):
        return self.name

class UnauthorizedAttempts(models.Model):
    device=models.ForeignKey(Device,on_delete=models.CASCADE,related_name="attempts")
    timestamp=models.DateTimeField(auto_now_add=True)
    failure_reason=models.CharField(max_length=255,default="Unknown Acess")
    is_verified=models.BooleanField(default=False)

    def __str__(self):
        return f"Unauthorized Attempt on {self.device.name} at {self.timestamp.strftime('%Y-%m-%d %H:%M')}"
    
    class Meta:
        ordering= ['-timestamp']

class Snapshot(models.Model):
    attempt=models.OneToOneField(UnauthorizedAttempts,on_delete=models.CASCADE,related_name="snapshot")
    image_url=models.URLField(max_length=500)
    captured_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Snapshot for Attempt id {self.attempt.id}"


from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    instance.userprofile.save()