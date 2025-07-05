from django.db import models
from django.utils import timezone

from apps.tours.models.tour import Tour


def image_upload_path(instance, filename):
    if not isinstance(instance, Photo):
        raise ValueError("this func works only with instance TripPhoto")

    if instance.type not in dict(instance.PHOTO_TYPE_CHOICES).keys():
        raise ValueError(f"Unavailable type: {instance.type}")

    timestamp = timezone.now().strftime('%Y-%m-%d_%H-%M-%S')
    return f"tour_{instance.tour.id}/{instance.type}/{timestamp}_{filename}"


class Photo(models.Model):
    PHOTO_TYPE_CHOICES = [
        ("main", "Main Photo(1)"),
        ('gallery', 'Gallery(5)'),
        ('slide', 'Slide(n)'),
    ]

    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='photos')
    photo = models.ImageField(upload_to=image_upload_path)
    type = models.CharField(max_length=7, choices=PHOTO_TYPE_CHOICES)
    caption = models.CharField("Caption", max_length=100, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['tour', 'type'],
                condition=models.Q(type='main'),
                name='unique_main_photo'
            )
        ]

    def __str__(self):
        return f"Media for {self.tour.title}"


