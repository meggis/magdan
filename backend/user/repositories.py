from django.contrib.auth.hashers import check_password
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Count

from user.models import MeaningUser, OneTimeToken, InternalToken, MeaningUserFeature
from s3_model_builder.repositories import S3ModelRepository
from datetime import datetime, timezone

import logging

logger = logging.getLogger(__name__)


class MagdanUserRepository:
    model_repository = S3ModelRepository()

    def get_by_token(self, token):
        credentials = token.split("@")

        if len(credentials) == 2:
            username = credentials[0]
            token = credentials[1]
            user = MeaningUser.objects.filter(user__username=username).first()

            if user:
                for encoded in user.tokens:
                    if check_password(token, encoded):
                        return user

        raise MeaningUser.DoesNotExist

    def get_by_user(self, user):
        return MeaningUser.objects.filter(user=user).first()

    def get_by_username(self, username):
        return MeaningUser.objects.filter(user__username=username).first()

    def get_by_email(self, email: str):
        return MeaningUser.objects.filter(user__email=email).first()

    def get_models_with_voices(self, user: MeaningUser):
        voices = None

        if list(user.s3_model_voices.all()):
            voices = user.s3_model_voices.select_related("model").filter(
                tenant__tenant_id=user.tenant.tenant_id
            )
        else:
            tenant = user.tenant
            voices = tenant.s3_model_voices.select_related("model")

        if not voices:
            return []

        model_agg = (
            voices.values("model__model_id")
            .filter(model__is_active=True)
            .annotate(dcount=Count("model"))
            .order_by()
            .all()
        ).all()

        models_with_voices = list(
            {
                "voices": voices.filter(
                    model__model_id=model_agg_item["model__model_id"]
                ).all(),
                "model": self.model_repository.get_by_model_id(
                    model_id=model_agg_item["model__model_id"]
                ),
            }
            for model_agg_item in model_agg
        )

        return models_with_voices



