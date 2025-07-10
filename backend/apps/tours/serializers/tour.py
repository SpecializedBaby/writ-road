from rest_framework import serializers

from apps.tours.models.tour import Tour
from apps.accounts.serializers.author import AuthorInCardTourSerializer, AuthorInTourDetailSerializer


class TourListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    first_date = serializers.SerializerMethodField()  # 21 - 31 July
    author = AuthorInCardTourSerializer()  # avatar + name
    country_destination = serializers.SerializerMethodField()
    duration = serializers.SerializerMethodField()
    dates_count = serializers.SerializerMethodField()

    class Meta:
        model = Tour
        fields = ["id", "image", "title", "country_destination", "duration", "first_date", "dates_count", "status", "price", "author"]

    def get_image(self, obj) -> str | None:
        if obj.photos.filter(type="gallery"):
            return obj.photos.filter(type="gallery").first().photo.url
        elif obj.photos.filter(type="slide"):
            return obj.photos.filter(type="slide").first().photo.url
        elif obj.photos.filter(type="main"):
            return obj.photos.filter(type="main").first().photo.url
        else:
            return None

    def get_first_date(self, obj) -> str:
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

    def get_country_destination(self, obj):
        if obj.destinations.all():
            return obj.destinations.first().country.name
        return None


class TourDetailSerializer(TourListSerializer):
    gallery = serializers.SerializerMethodField()
    first_destination = serializers.SerializerMethodField()
    date_list = serializers.SerializerMethodField()
    author = AuthorInTourDetailSerializer()
    destinations = serializers.SerializerMethodField()

    class Meta:
        model = Tour
        fields = ["id", "gallery", "title", "first_destination", "country_destination", ]
        fields += ["duration", "first_date", "date_list", "dates_count", "max_participants", ]
        fields += ["status", "price", "author", "difficulty_level", "description", ]
        fields += ["destinations", ]

    def get_destinations(self, obj) -> list:
        return [destination.name for destination in obj.destinations.all()]

    def get_gallery(self, obj):
        if obj.photos.filter(type="gallery"):
            return [photo.photo.url for photo in obj.photos.filter(type="gallery")]
        return None

    def get_first_destination(self, obj):
        if obj.destinations.all():
            return obj.destinations.first().name
        return None


    def get_date_list(self, obj) -> list:
        dates = []
        if obj.dates.all():
            for date in obj.dates.all():
                dates.append(f"{date.start_date.day} - "
                             f"{date.end_date.day} "
                             f"{date.end_date.strftime('%b')}, "
                             f"EUR {date.price_adjustment}")
        return dates  # ["21 - 31 July", EUR 1000]
