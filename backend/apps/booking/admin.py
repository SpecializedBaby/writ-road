from django.contrib import admin

from apps.booking.models import Payment, Booking


class PaymentInline(admin.TabularInline):
    model = Payment
    extra = 1


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    inlines = (PaymentInline, )
