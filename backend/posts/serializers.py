from rest_framework import serializers

class PostSerializer(serializers.Serializer):
    post_id = serializers.UUIDField(required=True)
    display_name = serializers.CharField(required=False, allow_blank=True)
    content = serializers.CharField(required=False, allow_blank=True)
    author = serializers.CharField(required=False, allow_blank=True)
    header = serializers.CharField(required=False, allow_blank=True)
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()