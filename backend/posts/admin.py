from django.contrib import admin

from .models import PostModel


@admin.register(PostModel)
class PostAdmin(admin.ModelAdmin):
    model = PostModel

