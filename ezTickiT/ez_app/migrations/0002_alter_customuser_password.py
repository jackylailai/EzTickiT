# Generated by Django 4.1.7 on 2023-11-10 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("ez_app", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customuser",
            name="password",
            field=models.CharField(max_length=30),
        ),
    ]
