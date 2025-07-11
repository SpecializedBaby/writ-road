from django.contrib import admin
from django.utils.safestring import mark_safe

from apps.tours.models.tour import Tour, Photo
from apps.tours.models.date import Date
from apps.tours.models.country import Country
from apps.tours.models.destination import Destination


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


class DateInline(admin.TabularInline):
    model = Date
    extra = 1


@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    filter_horizontal = ("destinations", )
    inlines = (PhotoInline, DateInline, )
