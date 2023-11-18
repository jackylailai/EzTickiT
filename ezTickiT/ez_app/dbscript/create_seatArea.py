
from ez_app.models import SeatArea , Event
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ezTickiT.settings")

django.setup()
area_mapping = {
    "rocka": {"name": "搖滾A區", "total_count": 60},
    "rockb": {"name": "搖滾B區", "total_count": 60},
    "1fcon": {"name": "1樓衝撞區", "total_count": 100},
    "1fheart": {"name": "1樓鋼鐵之心區", "total_count": 60},
    "upa": {"name": "觀景台A", "total_count": 300},
    "upb": {"name": "觀景台B", "total_count": 500},
}

for area_key, area_data in area_mapping.items():
    try:
        seat_area = SeatArea.objects.get(name=area_data["name"])
    except SeatArea.DoesNotExist:
        seat_area = SeatArea(name=area_data["name"], short_name=area_key)

    seat_area.total_count = area_data["total_count"]
    seat_area.remaining_count = area_data["total_count"]
    event_instance = Event.objects.get(id=1)
    seat_area.event = event_instance

    seat_area.save()

print("done for seat area model data")
