from . import views
from django.urls import path

app_name = 'users'
urlpatterns = [
    path('profile/', views.get_profile, name='get_profile'),
]

