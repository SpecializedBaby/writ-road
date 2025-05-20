from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
import pytest

User = get_user_model()

CREATE_USER_URL = reverse('apps.accounts:create_user')
TOKEN_URL = reverse('apps.accounts:token_obtain_pair')
ME_URL = reverse('apps.accounts:get_user')


@pytest.mark.django_db
def test_create_user_success():
    payload = {
        "email": "test@example.com",
        "password": "testpass123",
    }
    res = APIClient().post(CREATE_USER_URL, payload)
    assert res.status_code == status.HTTP_201_CREATED
    assert "password" not in res.data
    assert User.objects.filter(email=payload["email"]).exists()


@pytest.mark.django_db
def test_token_created_for_user():
    user = User.objects.create_user(email="test@example.com", password="testpass123")
    res = APIClient().post(TOKEN_URL, {"email": "test@example.com", "password": "testpass123"})
    assert "access" in res.data
    assert res.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_retrieve_user_unauthorized():
    res = APIClient().get(ME_URL)
    assert res.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_retrieve_profile_success():
    user = User.objects.create_user(email="test@example.com", password="testpass123")
    client = APIClient()
    res = client.post(TOKEN_URL, {"email": "test@example.com", "password": "testpass123"})
    token = res.data["access"]
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

    res = client.get(ME_URL)
    assert res.status_code == status.HTTP_200_OK
    assert res.data["email"] == user.email


@pytest.mark.django_db
def test_update_user_profile():
    user = User.objects.create_user(email="test@example.com", password="testpass123")
    client = APIClient()
    token_res = client.post(TOKEN_URL, {"email": "test@example.com", "password": "testpass123"})
    token = token_res.data["access"]
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

    update_payload = {"password": "newstrongpass123"}
    res = client.patch(ME_URL, update_payload)
    assert res.status_code == status.HTTP_200_OK
    user.refresh_from_db()
    assert user.check_password(update_payload["password"])
