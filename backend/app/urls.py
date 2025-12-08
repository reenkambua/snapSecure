from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),

    path('profile/', views.get_profile, name='get_profile'),
    path('profile/update-plan/', views.update_subscription, name='update_subscription'),

    path('devices/', views.list_devices, name='list_devices'),
    path('devices/add/', views.register_device, name='add_device'),
    path('devices/<str:device_id>/', views.get_device, name='get_device'),

    path('attempts/', views.list_attempts, name='list_attempts'),
    path('attempts/<int:pk>/', views.get_attempt_detail, name='get_attempt_detail'),
    path('attempts/add/',views.log_unauthorized_attempt, name='log_authorized_attempt'),

    path('snapshots/<int:attempt_id>/', views.get_snapshot_for_attempt, name='get_snapshot'),
    path('snapshots/create/', views.create_snapshot, name='create_snapshot'),


    path('dashboard/logs/', views.dashboard_logs, name='dashboard_logs'),

]
