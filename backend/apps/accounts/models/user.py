from enum import Enum

from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import UniqueConstraint
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)


class UserRole(Enum):
    ADMIN = "admin"
    CUSTOMER = "customer"
    AUTHOR = "author"


class User(AbstractUser):
    profile_image = models.ImageField(
        upload_to="avatars/",
        null=True,
        blank=True,
        help_text=_("User profile picture.")
    )
    role = models.CharField(
        max_length=12,
        choices=[(role.value, role.name.capitalize()) for role in UserRole],
        default=UserRole.CUSTOMER.value
    )
    is_verified = models.BooleanField(
        default=False,
        help_text=_("Designates whether the user has verified their email address.")
    )

    username = None
    email = models.EmailField(_("email address"), unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        indexes = [
            models.Index(fields=["email"]),
            models.Index(fields=["role"]),
        ]
        constraints = [
            UniqueConstraint(fields=["email"], name="unique_user_email"),
        ]

    def __str__(self):
        return self.email

    @property
    def is_author(self) -> bool:
        return self.role == UserRole.AUTHOR.value
