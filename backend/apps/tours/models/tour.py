from django.db.models import Sum
from enum import Enum
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import ResizeToFill

from apps.accounts.models.author import Author


class Status(Enum):
    Available = "available"
    Limited = "limited"
    Sold_out = "sold_out"
    Cancelled = "cancelled"


class Country(models.Model):
    name = models.CharField(max_length=50, unique=True)
    iso_code = models.CharField(
        max_length=3,
        unique=True,
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
    image_hero = ProcessedImageField(
        upload_to='countries',
        processors=[ResizeToFill(1200, 500)],
        format='JPEG',
        options={'quality': 60})
    image = models.ImageField(upload_to="countries/")
    image_list = ImageSpecField(
        source="image",
        processors=[ResizeToFill(600, 400)],
        format='JPEG',
        options={'quality': 60}
    )
    image_detail = ImageSpecField(
        source="image",
        processors=[ResizeToFill(400, 300)],
        format='JPEG',
        options={'quality': 60}
    )

    class Meta:
        verbose_name_plural = "countries"

    def __str__(self):
        return f"Country: {self.name} - (id: {self.id})"


class Destination(models.Model):
    country = models.ForeignKey(Country, related_name="destinations", on_delete=models.CASCADE)
    tour = models.ForeignKey("Tour", related_name="destinations", on_delete=models.CASCADE)
    name = models.CharField(max_length=50, default=country.name)
    is_popular = models.BooleanField(default=False)

    def __str__(self):
        return f"Country: {self.name} - (id: {self.id})"


class Tour(models.Model):
    author = models.ForeignKey(Author, related_name="tours", on_delete=models.CASCADE)
    tourist = models.ManyToManyField(get_user_model(), blank=True)  # tour_set from User model
    difficulty_level = models.CharField(max_length=60)
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=60, unique=True)  # read only field
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


class Date(models.Model):
    tour = models.ForeignKey(Tour, related_name="dates", on_delete=models.CASCADE)
    start_date = models.DateField(help_text=_("A date in YYYY-MM-DD format."))
    end_date = models.DateField(help_text=_("A date in YYYY-MM-DD format."))
    price_adjustment = models.DecimalField(max_digits=6, decimal_places=2)
    status = models.CharField(
        max_length=12,
        choices=[(status.value, status.name.capitalize()) for status in Status],
        default=Status.Available.value
    )

    def __str__(self):
        return f"Tour id:{self.tour.id} from {self.start_date} to {self.end_date}"

    @property
    def participants_count(self) -> int:
        return self.bookings.filter(status="confirmed").aggregate(count=Sum("num_people"))["count"] or 0

    @property
    def list_participants(self) -> list:
        return [{booking.user: booking.num_people} for booking in self.bookings.all()]

    @property
    def available_spots(self) -> int:
        return self.tour.max_participants - self.bookings.aggregate(total=Sum("num_people"))["total"]
