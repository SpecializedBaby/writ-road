from rest_framework import serializers
from apps.accounts.models.author import Author


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = (
            'id', 'user', 'profession', 'bio', 'experience_years',
            'rating', 'review_count', 'languages', 'specialties',
            'social_media', 'created_at', 'updated_at'
        )
        read_only_fields = ('user', 'rating', 'review_count', 'created_at', 'updated_at', )


class AuthorInCardTourSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(source="user.profile_image")

    class Meta:
        model = Author
        field = ["id", "name", "avatar"]
