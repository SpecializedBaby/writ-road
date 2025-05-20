import pytest
from django.contrib.auth import get_user_model


User = get_user_model()


@pytest.mark.django_db
def test_create_user_success():
    user = User.objects.create_user(email="user@mail.com", password="qwerty")

    assert user.email == "user@mail.com"
    assert user.is_active is True
    assert user.is_staff is False
    assert user.is_superuser is False
    assert user.username is None  # If you're using AbstractUser and removed username


@pytest.mark.django_db
def test_create_user_errors():
    with pytest.raises(TypeError):
        User.objects.create_user()

    with pytest.raises(TypeError):
        User.objects.create_user(email="")

    with pytest.raises(ValueError):
        User.objects.create_user(email="", password="qwerty")


@pytest.mark.django_db
def test_create_superuser_success():
    user = User.objects.create_superuser(email="admin@mail.com", password="qwerty")

    assert user.email == "admin@mail.com"
    assert user.is_active is True
    assert user.is_staff is True
    assert user.is_superuser is True
    assert user.username is None


@pytest.mark.django_db
def test_create_superuser_invalid():
    with pytest.raises(ValueError):
        User.objects.create_superuser(
            email="admin@mail.com", password="qwerty", is_superuser=False
        )
