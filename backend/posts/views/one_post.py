from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from user.authentication import MagdanUserTokenAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from posts.serializers import PostSerializer
from posts.repositories import PostsRepository

class OnePostView(APIView):
    authentication_classes = (
        MagdanUserTokenAuthentication,
        SessionAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    post_repository = PostsRepository()

    def get(self, request, post_id):
        if not post_id:
            return Response({"detail": "Not found."}, status=404)
        try:
            post = self.post_repository.get_post_by_id(post_id=post_id)
        except:
            return Response({"details": "Post with this ID does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = PostSerializer(post)
        return Response({"data": serializer.data})



