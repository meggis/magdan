from django.contrib.auth.hashers import check_password
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Count

from user.models import MagdanUser
from datetime import datetime, timezone

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
