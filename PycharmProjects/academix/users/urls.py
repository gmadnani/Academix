from django.urls import path
from . import views

app_name = 'users'
urlpatterns = [
    path('login.html', views.login_view, name='login')
]