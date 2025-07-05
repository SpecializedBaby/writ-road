from django.db import models
from django.contrib.auth import get_user_model

from apps.tours.models.tour import Date


class Booking(models.Model):

    BOOKING_STATUS_FLOW = [
        ("pending", "Pending"),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('expired', 'Expired'),
    ]

    user = models.ForeignKey(get_user_model(), related_name="bookings", on_delete=models.CASCADE)
    date = models.ForeignKey(Date, related_name="bookings", on_delete=models.CASCADE)
    num_people = models.PositiveIntegerField()
    status = models.CharField(max_length=10, choices=BOOKING_STATUS_FLOW)  # read only
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def total_price(self):
        return self.num_people * self.date.price_adjustment

    def clean(self):
        if not (1 <= self.num_people <= self.date.available_spots):
            raise ValueError({
                "num_people": f"Number of people must be in range [1, {self.date.available_spots}], not {self.num_people}"
            })

    def save(
        self,
        *args,
        force_insert=False,
        force_update=False,
        using=None,
        update_fields=None,
    ):
        self.full_clean()
        return super(Booking, self).save(force_insert, force_update, using, update_fields)


class Payment(models.Model):

    PAYMENT_METHOD = [
        ("card", "Card"),
        ("sepa", "On IBAN"),
        ("cash", "Cash"),
        ("paypal", "Paypal"),
    ]
    STATUS_PAY = [
        ("paid", "Paid"),
        ("failed", "Fail"),
        ("refunded", "Refund"),
    ]

    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name="payment")
    payment_method = models.CharField(max_length=10, choices=PAYMENT_METHOD)
    status = models.CharField(max_length=10, choices=STATUS_PAY)
    paid_at = models.DateTimeField(auto_now_add=True)

    @property
    def amount(self):
        return self.booking.total_price
