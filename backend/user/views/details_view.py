from datetime import datetime

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication



class DetailsView(APIView):
    # authentication_classes = (
    #     MeaningUserTokenAuthentication,
    #     SessionAuthentication,
    # )
    # permission_classes = (IsAuthenticated,)
    # repository = MeaningUserRepository()

    def get(self, request):
    
        return Response("asd")
