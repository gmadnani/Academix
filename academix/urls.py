"""
URL configuration for academix project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from dj_rest_auth.registration.views import VerifyEmailView
from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView
from django.views.generic.base import TemplateView
from rest_framework.documentation import include_docs_urls
from . import views


docs_urls = include_docs_urls(title='API documentation',
                              description='This is the documentation for endpoints which are provided by backend')

urlpatterns = [
    # re_path(r'^password-reset/confirm/$', TemplateView.as_view(), name='password-reset-confirm'),
    # re_path(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,32})/$',
    #         TemplateView.as_view(), name='password_reset_confirm'),
    path('password-reset/', PasswordResetView.as_view()),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('admin/', admin.site.urls),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('login/', views.CustomLoginView.as_view(), name='customized login page'),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    # re_path(
    #     r"^verify-email/(?P<key>[-:\w]+)/$",
    #     VerifyEmailView.as_view(),
    #     name="account_confirm_email",
    # ),
    path('verify-email/<str:pk>', views.custom_verfiy_email, name='account_confirm_email'),
    path('dj-rest-auth/account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    path('users/', include('users.urls')),
    path('courses/', include('courses.urls')),
    path('attendance/', include('attendence.urls')),
    path('docs/', docs_urls),
    path('api/', include('api.urls')),
    
]+static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  # Configure static file url

# Configure user upload file url
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
