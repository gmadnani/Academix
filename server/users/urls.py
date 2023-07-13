from django.urls import path, re_path, include
# from django.conf.urls import url
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

    #
    # re_path(
    #     r"^verify-email/(?P<key>[-:\w]+)/$",
    #     TemplateView.as_view(),
    #     name="account_confirm_email",
    # ),
    # path('auth/account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    # path('auth/', include('dj_rest_auth.urls')),
    # path('auth/registration/', include('dj_rest_auth.registration.urls')),
    # re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(), name='account_confirm_email'),
    # re_path(r'^$', TemplateView.as_view(template_name="home.html"), name='home'),
    # re_path(r'^signup/$', TemplateView.as_view(), name='signup'),
    # re_path(r'^email-verification/$', TemplateView.as_view(), name='email-verification'),
    # re_path(r'^login/$', TemplateView.as_view(), name='login'),
    # re_path(r'^logout/$', TemplateView.as_view(), name='logout'),
    # re_path(r'^password-reset/$', TemplateView.as_view(), name='password-reset'),
    # re_path(r'^password-reset/confirm/$', TemplateView.as_view(), name='password-reset-confirm'),
    #
    # re_path(r'^user-details/$', TemplateView.as_view(), name='user-details'),
    # re_path(r'^password-change/$', TemplateView.as_view(), name='password-change'),
    # re_path(r'^resend-email-verification/$', TemplateView.as_view(), name='resend-email-verification'),
    #
    # # this url is used to generate email content
    # re_path(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,32})/$',
    #         TemplateView.as_view(), name='password_reset_confirm'),
    # re_path(r'^account_confirm_email/$', ConfirmEmailView.as_view(), name='account_confirm_email'),
    # url(r'^account-confirm-email/(?P<key>[-:\w]+)/$', ConfirmEmailView.as_view(), name='account_confirm_email'),
    # url(r'^dj-rest-auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$', ConfirmEmailView.as_view(),
    #     name='account_confirm_email'),
    # url(r'^registration/account-confirm-email/(?P<key>[-:\w]+)/$', ConfirmEmailView.as_view(),
    #     name='account_confirm_email'),
    #
    # re_path(r'^dj-rest-auth/', include('dj_rest_auth.urls')),
    # re_path(r'^dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    # re_path(r'^account/', include('allauth.urls')),
]

