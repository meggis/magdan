import uuid
from django.contrib.auth.hashers import make_password, identify_hasher
from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django import forms
from datetime import datetime, timedelta, timezone
from django.contrib.postgres.indexes import GinIndex

class MagdanUser(models.Model):
    magdan_user_id = models.UUIDField(unique=True, default=uuid.uuid4, max_length=36)
    display_name = models.CharField(max_length=1024)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    @property
    def is_authenticated(self):
        return True

    class Meta:
        app_label = "user"
        ordering = ["user"]
        indexes = (GinIndex(fields=["display_name"]),)

