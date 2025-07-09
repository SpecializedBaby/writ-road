from rest_framework import serializers

from apps.tours.models.tour import Tour
from apps.accounts.serializers.author import AuthorInCardTourSerializer


class TourListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    dates = serializers.SerializerMethodField()  # 21 - 31 July
    author = AuthorInCardTourSerializer  # avatar + name
    destination = serializers.SerializerMethodField()
    duration = serializers.SerializerMethodField()
    dates_count = serializers.SerializerMethodField()

    class Meta:
        model = Tour
        fields = ["id", "image", "title", "destination", "duration", "dates", "dates_count", "status", "price"]

    def get_image(self, obj) -> str | None:
        if obj.photos.filter(type="gallery"):
            return obj.photos.filter(type="gallery").first().photo.url
        elif obj.photos.filter(type="slide"):
            return obj.photos.filter(type="slide").first().photo.url
        elif obj.photos.filter(type="main"):
            return obj.photos.filter(type="main").first().photo.url
        else:
            return None

    def get_dates(self, obj) -> str:
        dates = ""
        if obj.dates.all():
            dates = (f"{obj.dates.first().start_date.day} - "
                     f"{obj.dates.first().end_date.day} "
                     f"{obj.dates.first().end_date.strftime('%b')}")
        return dates  # "21 - 31 July"

    def get_dates_count(self, obj) -> int | None:
        if obj.dates.all():
            return obj.dates.count()
        return None

    def get_duration(self, obj):
        if obj.dates.all():
            return f"{(obj.dates.first().end_date - obj.dates.first().start_date).days} days"
        return None

    def get_destination(self, obj):
        if obj.destinations.all():
            return obj.destinations.first().country.name
        return None
