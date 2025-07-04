# Generated by Django 5.2.1 on 2025-07-02 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tours', '0003_alter_country_iso_code'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='country',
            options={'verbose_name_plural': 'countries'},
        ),
        migrations.AddField(
            model_name='date',
            name='tour',
            field=models.ManyToManyField(related_name='tours', to='tours.tour'),
        ),
    ]
