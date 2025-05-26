from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "email", "password", "first_name", "last_name", "profile_image", "is_staff", "date_joined", )
        read_only_fields = ("is_staff", "date_joined", )
        extra_kwargs = {"password": {"write_only": True, "min_length": 5}}

    def create(self, validate_data):
        return get_user_model().objects.create_user(**validate_data)

    def update(self, instance, validate_data):
        password = validate_data.pop("password", None)
        user = super().update(instance, validate_data)
        if password:
            user.set_password(password)
            user.save()

        return user
