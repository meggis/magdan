from datetime import datetime

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from user.authentication import MagdanUserTokenAuthentication
from user.models import MagdanUser
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

def get_content(data):
    content = {
        "user": data.username,
        "first_name": data.first_name,
        "last_name": data.last_name,
        "email": data.email
    }
    return content

class DetailsView(APIView):
    authentication_classes = (
        MagdanUserTokenAuthentication,
        SessionAuthentication,
    )
    permission_classes = (IsAuthenticated,)



    def get(self, request):
        try:
            magdan_user = MagdanUser.objects.get(user=request.user)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        user = get_content(request.user)
        return Response(user)

    def post(self, request):
        user = request.user
        if request.data:
            if "first_name" in request.data:
               user.first_name = request.data["first_name"]
            if "last_name" in request.data:
               user.last_name = request.data["last_name"]
            if "email" in request.data:
                try:
                    validate_email(request.data["email"])
                except ValidationError:
                    return Response({"details": "Wrong email format"}, status=status.HTTP_400_BAD_REQUEST)
                user.email = request.data["email"]
            user.save()
            new_user = get_content(user)
            return Response(new_user)
        else: 
            return Response({"details": "Missing arguments"}, status=status.HTTP_400_BAD_REQUEST)