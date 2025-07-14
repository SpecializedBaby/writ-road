from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import ResizeToFill


def image_upload_path(instance, filename) -> str:
    if not isinstance(instance, Country):
        raise ValueError("this func works only with instance Country")

    timestamp = timezone.now().strftime('%Y-%m-%d')
    return f"countries/{instance.name}/{timestamp}_{filename}"


class Country(models.Model):
    CONTINENTS = [
        ("europe", "Europe"),
        ("asia", "Asia"),
        ("north_america", "North America"),
        ("south_america", "South America"),
        ("africa", "Africa"),
        ("oceania", "Oceania"),
    ]

    name = models.CharField(max_length=50, unique=True)
    iso_code = models.CharField(
        max_length=3,
        unique=True,
        help_text=_("ISO 3166-1 A2 CODE of country")
    )
    continent = models.CharField(max_length=20, choices=CONTINENTS)
    capital = models.CharField(max_length=50, blank=True)
    currency = models.CharField(max_length=3, blank=True)
    language = models.CharField(max_length=15, blank=True)
    image_hero = ProcessedImageField(
        upload_to=image_upload_path,
        processors=[ResizeToFill(1200, 500)],
        format='JPEG',
        options={'quality': 80},
        help_text=_("Add large image for hero section on detail page (1200x500)")
    )
    image_list = ProcessedImageField(
        upload_to=image_upload_path,
        processors=[ResizeToFill(600, 400)],
        format='JPEG',
        options={'quality': 60},
        help_text=_("Add image for list view (600x400)")
    )

    class Meta:
        verbose_name_plural = "countries"

    def __str__(self):
        return f"Country: {self.name} - (id: {self.id})"
