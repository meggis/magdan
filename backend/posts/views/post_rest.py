import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from user.authentication import MagdanUserTokenAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from posts.serializers import AddPostSerializer
from posts.repositories import PostsRepository
from datetime import datetime

logger = logging.getLogger(__name__)

class PostRestView(APIView):
    authentication_classes = (
        MagdanUserTokenAuthentication,
        SessionAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    post_repository = PostsRepository()

    def post(self, request):
        data = request.data
        data["created_at"] = datetime.now()
        data["updated_at"] = datetime.now()

        serializer = AddPostSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(
            author = request.user
        )
        return Response({"data": serializer.data, }, status=status.HTTP_200_OK)



