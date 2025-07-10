from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import gettext as _

from .models import User, Author


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    """Define admin model for custom User model with no email field."""

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                    "profile_image",
                )
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )
    list_display = ("email", "first_name", "last_name", "is_staff")
    search_fields = ("email", "first_name", "last_name")
    ordering = ("email",)


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = (
        "user_email",
        "is_verified",
        "profession",
        "experience_years",
        "rating",
        "review_count",
        "created_at",
    )
    list_filter = ("is_verified", "experience_years", "rating", "created_at")
    search_fields = (
        "user__email",
        "profession",
        "bio",
        "languages",
        "speciality",
    )
    autocomplete_fields = ("user",)
    readonly_fields = ("created_at", "updated_at")

    fieldsets = (
        (None, {
            "fields": ("user", "is_verified", "profession", "bio")
        }),
        (_("Experience & Ratings"), {
            "fields": ("experience_years", "rating", "review_count")
        }),
        (_("Meta Info"), {
            "fields": ("languages", "speciality", "social_media")
        }),
        (_("Timestamps"), {
            "fields": ("created_at", "updated_at")
        }),
    )

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = "User Email"
