# Generated by Django 4.1.7 on 2023-11-11 09:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("ez_app", "0004_remove_seat_location_remove_seat_remaining_count_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="seat",
            name="event",
            field=models.ForeignKey(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                to="ez_app.event",
            ),
        ),
        migrations.AddField(
            model_name="seatarea",
            name="event",
            field=models.ForeignKey(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                to="ez_app.event",
            ),
        ),
        migrations.AlterField(
            model_name="ticket",
            name="user",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="ez_app.customuser",
            ),
        ),
    ]
