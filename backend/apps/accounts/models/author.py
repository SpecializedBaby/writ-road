from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

from apps.accounts.models.user import UserRole


class Author(models.Model):
    user = models.OneToOneField(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="author",
        help_text=_("The user associated with this author profile.")
    )
    profession = models.CharField(
        max_length=100,
        blank=True,
        help_text=_("The author's profession or primary occupation.")
    )
    bio = models.TextField(
        blank=True,
        help_text=_("A short biography of the author.")
    )
    experience_years = models.PositiveIntegerField(
        default=0,
        help_text=_("Number of years of writing/travel experience.")
    )
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0.00,
        help_text=_("Average rating of the author (e.g., from reviews).")
    )
    review_count = models.PositiveIntegerField(
        default=0,
        help_text=_("Total number of reviews received by the author.")
    )
    languages = models.JSONField(
        default=list,
        blank=True,
        help_text=_("List of languages the author is proficient in (e.g., ['English', 'Spanish']).")
    )
    specialties = models.JSONField(
        default=list,
        blank=True,
        help_text=_("List of writing/travel specialties (e.g., ['Adventure Travel', 'Historical Fiction']).")
    )
    social_media = models.JSONField(
        default=list,
        blank=True,
        help_text=_("Dictionary of social media links (e.g., {'instagram': 'link', 'twitter': 'link'}).")
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Author")
        verbose_name_plural = _("Authors")

    def __str__(self):
        return f"Author Profile for {self.user.email}"

    def save(self, *args, **kwargs):
        if self.user.role != UserRole.AUTHOR.value:
            self.user.role = UserRole.AUTHOR.value
        super().save(*args, **kwargs)

