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
    avatar = serializers.SerializerMethodField()
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")

    class Meta:
        model = Author
        fields = ["id", "avatar", "first_name", "last_name", ]

    def get_avatar(self, obj):
        user = getattr(obj, "user", None)
        if user and getattr(user, "profile_image", None):
            request = self.context.get('request')
            return request.build_absolute_uri(user.profile_image.url) if request else user.profile_image.url
        return None


class AuthorInTourDetailSerializer(AuthorInCardTourSerializer):
    languages = serializers.SerializerMethodField()

    class Meta:
        model = Author
        fields = ["id", "avatar", "first_name", "last_name", "direct_contact", ]
        fields += ["phone_number", "is_verified", "languages", "bio", ]

    def get_languages(self, obj):
        return obj.languages["language"]
