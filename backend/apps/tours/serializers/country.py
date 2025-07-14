from django.db.models import Count
from rest_framework import serializers

from apps.tours.models.country import Country


class CountryListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    tour_count = serializers.SerializerMethodField()

    class Meta:
        model = Country
        fields = ["id", "name", "image", "tour_count"]

    @staticmethod
    def get_image(obj):
        if obj.image_list:
            return obj.image_list.url
        return None

    @staticmethod
    def get_tour_count(obj) -> int | None:
        if obj:
            return obj.destinations.aggregate(Count("tour", distinct=True))["tour__count"]
        return None


class CountryDetailSerializer(CountryListSerializer):
    image_hero = serializers.SerializerMethodField()
    popular_destinations = serializers.SerializerMethodField()
    tours = serializers.SerializerMethodField()

    class Meta:
        model = Country
        fields = [
            "id",
            "name",
            "image_hero",
            "tour_count",
            "capital",
            "language",
            "currency",
            "popular_destinations"
        ]

    def get_tours(self, obj):

        if obj.destinations.all():
            return [destination for destination in obj.destinations.filter(is_popular=True)][:5]

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
