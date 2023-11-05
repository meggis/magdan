from django.urls import re_path, path

from posts.views.one_post import OnePostView
from posts.views.posts import AllPostsView
from posts.views.post_rest import PostRestView


urlpatterns = [
    path("", AllPostsView.as_view(), name="posts"),
    path("post/", PostRestView.as_view(), name="post_rest"),
    re_path("^post/(?P<post_id>[^/.]+)", OnePostView.as_view(), name="one_post"),
]