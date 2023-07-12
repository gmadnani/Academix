from django.urls import path, re_path, include
from django.views.generic.base import TemplateView
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView
from dj_rest_auth.views import LoginView, LogoutView
from allauth.account.views import ConfirmEmailView
from . import views

app_name = 'users'
urlpatterns = [
    # path('login/', views.login_view, name='login'),
    # path('register/', views.register, name='register'),
    # path('activate/<activate_code>', views.activate_user, name='activate'),
    # path('forget_password', views.forget_password, name='forget_password'),
    # path('reset_password/<activate_code>', views.reset_password, name='reset_password'),
    # path('dj-rest-auth/', include('dj_rest_auth.urls')),
    # path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    # re_path(
    #     r"^verify-email/(?P<key>[-:\w]+)/$",
    #     TemplateView.as_view(),
    #     name="account_confirm_email",
    # ),
    # path('dj-rest-auth/account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    # path('', include('rest_auth.urls')),
    # path('account-confirm-email/<str:key>/', ConfirmEmailView.as_view()),
    # path('register/', RegisterView.as_view()),
    # path('login/', LoginView.as_view()),
    # path('logout/', LogoutView.as_view()),
    # path('verify-email/',
    #      VerifyEmailView.as_view(), name='rest_verify_email'),
    # path('account-confirm-email/',
    #      VerifyEmailView.as_view(), name='account_email_verification_sent'),
    # re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(), name='account_confirm_email'),
    # re_path(r'^account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    # path("auth/", include("dj_rest_auth.urls")),
    # path("auth/register/", include("dj_rest_auth.registration.urls")),
    # # path to set verify email in the frontend
    # # fronted will do POST request to server with key
    # # this is empty view, just to make reverse works
    # re_path(
    #     r"^verify-email/(?P<key>[-:\w]+)/$",
    #     TemplateView.as_view(),
    #     name="account_confirm_email",
    # ),

    path('', include('rest_auth.urls')),
    path('login/', LoginView.as_view(), name='account_login'),
    path('registration/', include('rest_auth.registration.urls')),
    path('registration/', RegisterView.as_view(), name='account_signup'),
    re_path(r'^account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(), name='account_confirm_email'),


]