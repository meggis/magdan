from datetime import datetime

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

from user.authentication import MagdanUserTokenAuthentication
from user.models import MagdanUser

import logging

from user.repositories import MagdanUserRepository

logger = logging.getLogger(__name__)


class DetailsView(APIView):
    authentication_classes = (
        MagdanUserTokenAuthentication,
        SessionAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    repository = MagdanUserRepository()

    def get(self, request):
        try:
            meaning_user = MagdanUser.objects.get(user=request.user)
            meaning_user.last_page_load_time = datetime.now()
            meaning_user.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        content = {
            "user": request.user.username,

        }

        return Response(content)
