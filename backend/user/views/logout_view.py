from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth import logout

import logging

logger = logging.getLogger(__name__)


class LogoutView(APIView):
    authentication_classes = (
        SessionAuthentication,
    )
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        try:
            logout(request)
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

