from rest_framework import serializers

from apps.tours.models.destination import Destination, Weather


class DestinationListSerializer(serializers.ModelSerializer):
    country = serializers.CharField(source="country.name")
    continent = serializers.CharField(source="country.continent")
    image = serializers.SerializerMethodField()
    tour_count = serializers.SerializerMethodField()

    class Meta:
        model = Destination
        fields = ["id", "name", "country", "continent", "image", "tour_count", "category"]
        fields += ["description", "best_time_to_visit", "average_temp", "is_popular"]

    def get_image(self, obj):
        if obj.image_list:
            return obj.image_list.url
        return None

    def get_tour_count(self, obj) -> int | None:
        if obj.tours.all():
            return obj.tours.all().count()
        return None


class DestinationDetailSerializer(DestinationListSerializer):
    image = serializers.CharField(source="image_hero.url")
    language = serializers.CharField(source="country.language")
    currency = serializers.CharField(source="country.currency")
    highlights = serializers.SlugRelatedField(many=True, slug_field="name", read_only="True")
    weather = serializers.SerializerMethodField()

    class Meta:
        model = Destination
        fields = ["id", "name", "country", "continent", "image", "category"]
        fields += ["description", "best_time_to_visit", "average_temp", "time_zone"]
        fields += ["language", "currency", "highlights", "weather"]

    def get_weather(self, obj):
        if obj.weather.all():
            return {w.season: w.weather_info for w in obj.weather.all()}
