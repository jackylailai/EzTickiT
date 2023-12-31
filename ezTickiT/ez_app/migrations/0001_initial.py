# Generated by Django 4.1.7 on 2023-11-10 11:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="CustomUser",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("password", models.CharField(max_length=128, verbose_name="password")),
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("username", models.CharField(max_length=30, unique=True)),
                ("date_joined", models.DateTimeField(auto_now_add=True)),
                ("is_active", models.BooleanField(default=True)),
                ("is_staff", models.BooleanField(default=False)),
            ],
            options={"db_table": "user",},
        ),
        migrations.CreateModel(
            name="Event",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("date", models.DateTimeField()),
                ("team_name", models.CharField(max_length=50)),
                ("location", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Seat",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("row_number", models.IntegerField()),
                ("seat_number", models.IntegerField()),
                ("area", models.CharField(max_length=20)),
                ("is_reserved", models.BooleanField(default=False)),
                ("location", models.CharField(max_length=10)),
                ("total_count", models.IntegerField(default=0)),
                ("remaining_count", models.IntegerField(default=0)),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name="Ticket",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("quantity", models.IntegerField()),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("pending", "待付款"),
                            ("completed", "已完成"),
                            ("canceled", "已取消"),
                        ],
                        max_length=20,
                    ),
                ),
                ("purchase_date", models.DateTimeField(auto_now_add=True)),
                (
                    "event",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="ez_app.event"
                    ),
                ),
                (
                    "price",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="tickets_for_price",
                        to="ez_app.seat",
                    ),
                ),
                (
                    "seat",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="tickets_for_seat",
                        to="ez_app.seat",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="ez_app.customuser",
                    ),
                ),
            ],
        ),
    ]
