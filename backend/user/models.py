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
    tokens = models.JSONField(default=list, blank=True)

    @property
    def is_authenticated(self):
        return True

    def save(self, *args, **kwargs):
        tokens = []
        for token in self.tokens:
            try:
                identify_hasher(token)
                tokens.append(token)
            except ValueError:
                tokens.append(make_password(token))
        self.tokens = tokens

        self.display_name = (
            f"{self.user.first_name} {self.user.last_name} ({self.user.username})"
        )

        super().save(*args, **kwargs)

    class Meta:
        app_label = "user"
        ordering = ["user"]
        indexes = (GinIndex(fields=["display_name"]),)

