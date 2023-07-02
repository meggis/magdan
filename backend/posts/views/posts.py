import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from user.authentication import MagdanUserTokenAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from posts.serializers import PostSerializer
from posts.repositories import PostsRepository

logger = logging.getLogger(__name__)

class AllPostsView(APIView):
    authentication_classes = (
        MagdanUserTokenAuthentication,
        SessionAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    post_repository = PostsRepository()

    def get(self, request):
        try:
            posts = self.post_repository.get_all_posts()
        except:
            return Response({"details": "No posts available"}, status=status.HTTP_404_NOT_FOUND)

        all_posts = PostSerializer(posts, many=True)
        return Response(all_posts.data)



