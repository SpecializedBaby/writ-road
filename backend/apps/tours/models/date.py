from django.db import models
from django.db.models import Sum
from django.utils.translation import gettext_lazy as _

from apps.tours.models.tour import Tour, Status


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
