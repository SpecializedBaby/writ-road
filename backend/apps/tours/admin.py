from django.contrib import admin
from django.utils.safestring import mark_safe

from apps.tours.models.destination import Destination, Weather, Highlight
from apps.tours.models.tour import Tour, Photo
from apps.tours.models.date import Date
from apps.tours.models.country import Country


class PhotoInline(admin.TabularInline):
    model = Photo
    extra = 1
    fields = ('photo', 'type', 'caption')
    readonly_fields = ('photo_preview', )

    def photo_preview(self, obj):
        if obj.photo:
            return mark_safe(f'<img src="{obj.photo.url}" style="max-height: 100px;" />')
        return "No Photos"
    photo_preview.allow_tags = True
    photo_preview.short_description = "Preview"


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    model = Country


class CountryInLine(admin.TabularInline):
    model = Country
    extra = 1


class WeatherInLine(admin.TabularInline):
    model = Weather
    extra = 1

class HighlightInLine(admin.TabularInline):
    model = Highlight
    extra = 1


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    inlines = (HighlightInLine, WeatherInLine, )


class DateInline(admin.TabularInline):
    model = Date
    extra = 1


@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    filter_horizontal = ("destinations", )
    inlines = (PhotoInline, DateInline, )
