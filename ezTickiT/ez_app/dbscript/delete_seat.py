from ez_app.models import Seat 

items_to_delete = Seat.objects.filter(price=0)

items_to_delete.delete()
print("delete seat done")