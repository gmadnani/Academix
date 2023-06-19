from django.urls import path
from . import views

app_name = 'users'
urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register, name='register'),
    path('activate/<activate_code>', views.activate_user, name='activate'),
    path('forget_password', views.forget_password, name='forget_password'),
    path('reset_password/<activate_code>', views.reset_password, name='reset_password'),
]