from rest_framework import serializers
from posts.models import PostModel

class PostSerializer(serializers.Serializer):
    post_id = serializers.UUIDField(required=False)
    display_name = serializers.CharField(required=False, allow_blank=True)
    content = serializers.CharField(required=False, allow_blank=True)
    author = serializers.CharField(required=False, allow_blank=True)
    header = serializers.CharField(required=False, allow_blank=True)
    created_at = serializers.DateTimeField(required=False)
    updated_at = serializers.DateTimeField(required=False)
    def update(self, instance, validated_data):
        instance.display_name = validated_data.get("display_name", instance.display_name)
        instance.content = validated_data.get("content", instance.content)
        instance.header = validated_data.get("header", instance.header)
        instance.save()
        return instance
class AddPostSerializer(serializers.Serializer):
    post_id = serializers.UUIDField(required=False)
    display_name = serializers.CharField(required=True, allow_blank=True)
    content = serializers.CharField(required=True, allow_blank=True)
    header = serializers.CharField(required=True, allow_blank=True)
    author = serializers.CharField(required=False, allow_blank=True)

    def create(self, validated_data):
        post = PostModel(**validated_data)
        post.save()
        return post