from ez_app.models import SeatArea, Seat, Event


seat_areas = SeatArea.objects.all()

seat_data = []

area_prices = {
    "搖滾A區": 3000.0,
    "搖滾B區": 2000.0,
    "1樓衝撞區": 1800.0,
    "1樓鋼鐵之心區": 1200.0,
    "觀景台A": 800.0,
    "觀景台B": 500.0,
}

print("seat_area",seat_areas)
for seat_area in seat_areas:
    total_count = seat_area.total_count
    area_name = seat_area.short_name
    name = seat_area.name
    event_instance = Event.objects.get(id=1)
    
    clean_area_name = area_name.replace(" ", "")  
    price = area_prices.get(clean_area_name, 0.0)
    print(area_prices[name])
    for i in range(total_count):
        seat_data.append(
            {
                "row_number": i // 10 + 1,  
                "seat_number": i % 10 + 1,  
                "area": seat_area,
                "is_reserved": False,
                "price": area_prices[name],  
                "event":event_instance,
            }
        )


for data in seat_data:
    seat = Seat(**data)
    seat.save()

print("seat model done")
