from django.contrib.auth import get_user_model
from django.test import TestCase


class UserManagersTest(TestCase):

    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(email="user@mail.com", password="qwerty")
        self.assertEqual(user.email, "user@mail.com")
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertIsNone(user.username)  # username is None for the AbstractUser
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email="")
        with self.assertRaises(ValueError):
            User.objects.create_user(email="", password="qwerty")

    def test_create_superuser(self):
        User = get_user_model()
        user = User.objects.create_superuser(email="admin@mail.com", password="qwerty")
        self.assertEqual(user.email, "admin@mail.com")
        self.assertTrue(user.is_active)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
        self.assertIsNone(user.username)  # username is None for the AbstractUser
        with self.assertRaises(ValueError):
            User.objects.create_superuser(email="admin@mail.com", password="qwerty", is_superuser=False)
