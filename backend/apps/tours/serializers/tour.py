from rest_framework import serializers

from apps.tours.models.tour import Tour


class TourListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    dates = serializers.SerializerMethodField()  # 21 - 31 July

    class Meta:
        model = Tour
        fields = ["id", "image", "title", "dates"]

    def get_image(self, obj) -> str | None:
        if obj.photos.filter(type="gallery"):
            return obj.photos.filter(type="gallery").first().photo.url
        elif obj.photos.filter(type="slide"):
            return obj.photos.filter(type="slide").first().photo.url
        else:
            return obj.photos.filter(type="main").first().photo.url or None
