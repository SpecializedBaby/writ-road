from rest_framework import serializers

from apps.tours.models import Country


class CountrySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50)
    iso_code = serializers.CharField(max_length=3)
    continent = serializers.CharField(required=False, allow_blank=True)
    capital = serializers.CharField(required=False, allow_blank=True)
    currency = serializers.CharField(required=False, allow_blank=True)
    language = serializers.CharField(required=False, allow_blank=True)
    best_time_to_visit = serializers.CharField(
        required=False,
        max_length=10,
        allow_blank=True
    )

    def create(self, validated_data):
        return Country.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.iso_code = validated_data.get("iso_code", instance.iso_code)
        instance.continent = validated_data.get("continent", instance.continent)
        instance.capital = validated_data.get("capital", instance.capital)
        instance.currency = validated_data.get("currency", instance.currency)
        instance.language = validated_data.get("language", instance.language)
        instance.best_time_to_visit = validated_data.get("best_time_to_visit", instance.best_time_to_visit)
        instance.save()
        return instance
