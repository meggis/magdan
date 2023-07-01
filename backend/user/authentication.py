from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import authenticate, login

from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

from user.models import MagdanUser
from user.repositories import MagdanUserRepository
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import BasePermission


class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return


class MagdanUserTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        self.request = request

        return super().authenticate(request)

    def authenticate_credentials(self, token):
        user = authenticate(self.request, token=token)
        self.request.user = user
        login(
            self.request,
            user,
            backend="user.authentication.MagdanUserBackend",
        )

        if not user:
            raise AuthenticationFailed("Unauthorized")

        return (user, token)


class MagdanUserBackend(ModelBackend):
    def authenticate(self, request, token: str, **kwargs):
        try:
            megdan_user = MagdanUserRepository().get_by_token(token=token)
            if megdan_user:
                return megdan_user.user
        except MagdanUser.DoesNotExist:
            raise AuthenticationFailed("Unauthorized")