from django.contrib import admin

from apps.tours.models import Country, Destination, Tour, Date


class DestinationInline(admin.TabularInline):
    model = Destination
    extra = 1


class DateInline(admin.TabularInline):
    model = Date
    extra = 1


@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    inlines = (DateInline, DestinationInline, )
