from rest_framework import serializers

from apps.tours.models.tour import Country


class CountrySerializer(serializers.ModelSerializer):

    class Meta:
        model = Country
        fields = "__all__"
