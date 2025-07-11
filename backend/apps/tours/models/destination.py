from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.tours.models.country import Country


class Destination(models.Model):
    CATEGORY_CHOICES = [
        ("historical", "Historical"),
        ("cultural", "Cultural"),
        ("adventure", "Adventure"),
        ("beach", "Beach"),
        ("urban", "Urban"),
        ("luxury", "Luxury"),
        ("custom", "Custom"),  # Used to trigger custom_category input
    ]
    country = models.ForeignKey(Country, related_name="destinations", on_delete=models.CASCADE)
    name = models.CharField(max_length=50, default=country.name)
    description = models.TextField()
    time_zone = models.CharField(max_length=10, help_text="UTC+0")
    average_temp = models.CharField(max_length=16, help_text=_("15-25°C"))
    is_popular = models.BooleanField(default=False)
    _category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    _custom_category = models.CharField(max_length=30, blank=True, null=True)

    @property
    def category(self):
        return self._category if not self._category == "custom" else self._custom_category or None

    def __str__(self):
        return f"Destination: {self.name}"


class Highlight(models.Model):
    name = models.CharField(max_length=256)
    destination = models.ForeignKey(
        Destination,
        related_name="highlights",
        on_delete=models.CASCADE,
        blank=True
    )


class Weather(models.Model):
    SEASONS = [
        ("spring", "Spring"),
        ("summer", "Summer"),
        ("autumn", "Autumn"),
        ("winter", "Winter"),
    ]
    season = models.CharField(max_length=16, choices=SEASONS)
    weather_info = models.TextField()
    destination = models.ForeignKey(
        Destination,
        related_name="weather",
        on_delete=models.CASCADE,
        blank=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["destination", "season"],
                name="unique_weather_season"
            )
        ]

    def __str__(self):
        return f"Weather in {self.destination.name}"
