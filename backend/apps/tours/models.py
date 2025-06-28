from enum import Enum
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

from apps.accounts.models.author import Author


class Status(Enum):
    Available = "available"
    Limited = "limited"
    Sold_out = "sold_out"
    Cancelled = "cancelled"


class Country(models.Model):
    name = models.CharField(max_length=50)
    iso_code = models.CharField(
        max_length=2,
        help_text=_("ISO 3166-1 A2 CODE of country")
    )
    continent = models.CharField(max_length=50, blank=True)
    capital = models.CharField(max_length=50, blank=True)
    currency = models.CharField(max_length=3, blank=True)
    language = models.CharField(max_length=15, blank=True)
    best_time_to_visit = models.CharField(
        max_length=10,
        blank=True,
        help_text=_("Best month to visit this country.")
    )


class Destination(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, default=country.name)
    is_popular = models.BooleanField(default=False)


class Tour(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    tourist = models.ManyToManyField(get_user_model())
    destination = models.ManyToManyField(Destination)
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=60, unique=True, blank=True)
    description = models.TextField()
    max_participants = models.PositiveIntegerField()
    difficulty_level = models.CharField(max_length=30, blank=True)
    price = models.DecimalField(max_digits=3, decimal_places=2)
    status = models.CharField(
        max_length=12,
        choices=[(status.value, status.name.capitalize()) for status in Status],
        default=Status.Available.value
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while Tour.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


class Date(models.Model):
    start_date = models.DateField(help_text=_("A date in YYYY-MM-DD format."))
    end_date = models.DateField(help_text=_("A date in YYYY-MM-DD format."))
    available_spots = models.PositiveIntegerField()
    price_adjustment = models.DecimalField(max_digits=3, decimal_places=2)
    status = models.CharField(
        max_length=12,
        choices=[(status.value, status.name.capitalize()) for status in Status],
        default=Status.Available.value
    )
