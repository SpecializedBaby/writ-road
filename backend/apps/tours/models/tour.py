from enum import Enum
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

from apps.accounts.models.author import Author
from apps.tours.models.country import Country


class Status(Enum):
    Available = "available"
    Limited = "limited"
    Sold_out = "sold_out"
    Cancelled = "cancelled"


class Tour(models.Model):
    author = models.ForeignKey(Author, related_name="tours", on_delete=models.CASCADE)
    tourist = models.ManyToManyField(get_user_model(), blank=True)  # tour_set from User model
    difficulty_level = models.CharField(max_length=60)
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=60, unique=True, blank=True)  # read only field
    description = models.TextField()
    max_participants = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
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

    def __str__(self):
        return f"Country: {self.title} - (id: {self.id})"


class Destination(models.Model):
    country = models.ForeignKey(Country, related_name="destinations", on_delete=models.CASCADE)
    tour = models.ForeignKey(Tour, related_name="destinations", on_delete=models.CASCADE)
    name = models.CharField(max_length=50, default=country.name)
    is_popular = models.BooleanField(default=False)

    def __str__(self):
        return f"Destination: {self.name} - (Tour: {self.tour.title})"
