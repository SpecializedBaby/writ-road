from rest_framework import serializers

from apps.tours.models.country import Country


class CountryListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    destination_count = serializers.SerializerMethodField()

    class Meta:
        model = Country
        fields = ["id", "name", "image", "destination_count"]

    @staticmethod
    def get_image(obj):
        if obj.image_list:
            return obj.image_list.url
        return None

    @staticmethod
    def get_destination_count(obj):
        if obj:
            return obj.destinations.count()
        return None


class CountryDetailSerializer(CountryListSerializer):
    image_hero = serializers.SerializerMethodField()
    image_featured = serializers.SerializerMethodField()
    popular_destinations = serializers.SerializerMethodField()

    class Meta:
        model = Country
        fields = [
            "id",
            "name",
            "image_hero",
            "image_featured",
            "destination_count",
            "capital",
            "language",
            "currency",
            "best_time_to_visit",
            "popular_destinations"
        ]

    @staticmethod
    def get_popular_destinations(obj) -> list:
        if obj.destinations:
            return obj.destinations.filter(is_popular=True).values_list("name")
        return []

    @staticmethod
    def get_image_hero(obj):
        if obj.image_hero:
            return obj.image_hero.url
        return None

    @staticmethod
    def get_image_featured(obj):
        if obj.image_detail:
            return obj.image_detail.url
        return None
