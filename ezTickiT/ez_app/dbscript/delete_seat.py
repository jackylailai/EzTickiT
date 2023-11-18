from ez_app.models import Seat 
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ezTickiT.settings")

django.setup()
items_to_delete = Seat.objects.filter(price=0)

items_to_delete.delete()
print("delete seat done")