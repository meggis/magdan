import uuid
from django.db import models
from django.contrib.auth.models import User

class PostModel(models.Model):
    post_id = models.UUIDField(unique=True, default=uuid.uuid4, max_length=36)
    display_name = models.CharField("Display name", max_length=64)
    author = models.ForeignKey(User, related_name="post", on_delete=models.CASCADE)
    content = models.CharField("Content", max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    header = models.CharField("Header", max_length=64)

    class Meta:
        app_label = "posts"

    def __str__(self):
        return self.display_name


