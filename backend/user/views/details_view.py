from datetime import datetime

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

from user.repositories import MeaningUserRepository
from user.authentication import MeaningUserTokenAuthentication
from user.models import MeaningUser

import logging

logger = logging.getLogger(__name__)


class DetailsView(APIView):
    authentication_classes = (
        MeaningUserTokenAuthentication,
        SessionAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    repository = MeaningUserRepository()

    def get(self, request):
        try:
            meaning_user = MeaningUser.objects.get(user=request.user)
            meaning_user.last_page_load_time = datetime.now()
            meaning_user.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        is_saml_auth = request.session.get("samlNameId")

        content = {
            "user": request.user.username,
            "tenant_id": (meaning_user.tenant.tenant_id),
            "first_name": request.user.first_name,
            "last_name": request.user.last_name,
            "email": request.user.email,
            "isSSOAuthenticated": is_saml_auth != None,
            "features": meaning_user.features,
            "data_center": (meaning_user.tenant.data_center),
            "s3_models": [
                {
                    "model_id": model_group["model"].model_id,
                    "input_sample_rate": model_group["model"].input_sample_rate,
                    "output_sample_rate": model_group["model"].output_sample_rate,
                    "display_name": model_group["model"].display_name,
                    "desired_audio_size": model_group["model"].desired_audio_size,
                    "metadata": model_group["model"].metadata,
                    "voices": list(
                        {
                            "avatar_identifier": voice.avatar_identifier,
                            "voice_id": voice.voice_id,
                            "key": voice.key,
                            "display_name": voice.display_name,
                            "description": voice.description,
                            "is_default": voice.is_default,
                            "is_experimental": voice.is_experimental,
                        }
                        for voice in model_group["voices"]
                    ),
                    "description": model_group["model"].description,
                }
                for model_group in self.repository.get_models_with_voices(meaning_user)
            ],
        }

        return Response(content)
