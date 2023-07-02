from django.urls import re_path, path

from posts.views.one_post import OnePostView
from posts.views.posts import AllPostsView


urlpatterns = [
    path("", AllPostsView.as_view(), name="posts"),
    re_path("^post/(?P<post_id>[^/.]+)", OnePostView.as_view(), name="one_post"),
]