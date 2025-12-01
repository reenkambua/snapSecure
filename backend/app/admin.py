from django.contrib import admin
from .models import UnauthorizedAttempts,Device,Snapshot,UserProfile

admin.site.register(UserProfile)
admin.site.register(UnauthorizedAttempts)
admin.site.register(Device)
admin.site.register(Snapshot)
