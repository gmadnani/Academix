from dj_rest_auth.views import LoginView
from dj_rest_auth.app_settings import api_settings
from dj_rest_auth.models import get_token_model
from allauth.account.models import EmailConfirmationHMAC
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token

from django.http import HttpResponse
from django.utils import timezone
from django.conf import settings

from datetime import timedelta



@api_view(['GET'])
@permission_classes((AllowAny,))
def custom_verfiy_email(request, pk):
    emailconfirmation = EmailConfirmationHMAC.from_key(pk)
    if emailconfirmation:
        emailconfirmation.confirm(request)
        return HttpResponse('Your account has successfully activated, go to login page to login')
    return HttpResponse('Your account is already activated, do not click this link twice')


def expires_in(token):
    time_elapsed = timezone.now() - token.created
    # the token will be expired in 3 hours
    left_time = timedelta(seconds=3600) - time_elapsed
    return left_time


def is_token_expired(token):
    return expires_in(token) < timedelta(seconds=0)


def token_expire_handler(token):
    is_expired = is_token_expired(token)
    if is_expired:
        token.delete()
        token = Token.objects.create(user=token.user)
    return is_expired, token

class CustomLoginView(LoginView):
    def login(self):
        self.user = self.serializer.validated_data['user']
        token_model = get_token_model()

        if api_settings.USE_JWT:
            self.access_token, self.refresh_token = jwt_encode(self.user)
        elif token_model:
            # self.token = api_settings.TOKEN_CREATOR(token_model, self.user, self.serializer)
            token, _ = token_model.objects.get_or_create(user=self.user)
            is_expired, token = token_expire_handler(token)
            self.token = token

        if api_settings.SESSION_LOGIN:
            self.process_login()
