from django.contrib.auth.hashers import check_password

from user.models import MagdanUser

import logging

logger = logging.getLogger(__name__)


class MagdanUserRepository:
    def get_by_token(self, token):
        credentials = token.split("@")

        if len(credentials) == 2:
            username = credentials[0]
            token = credentials[1]
            user = MagdanUser.objects.filter(user__username=username).first()

            if user:
                for encoded in user.tokens:
                    if check_password(token, encoded):
                        return user

        raise MagdanUser.DoesNotExist

    def get_by_user(self, user):
        return MagdanUser.objects.filter(user=user).first()

    def get_by_username(self, username):
        return MagdanUser.objects.filter(user__username=username).first()


