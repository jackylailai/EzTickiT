from datetime import datetime
from ez_app.models import Event
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ezTickiT.settings")

django.setup()
event_data = [
    {
        "name": "桃園璞園領航猿-高雄17直播鋼鐵人",
        "date": datetime(2023, 12, 2, 17, 0),
        "team_name": "高雄17直播鋼鐵人",
        "location": "鳳山體育館",
    },
    {
        "name": "新北國王-高雄17直播鋼鐵人",
        "date": datetime(2023, 12, 3, 17, 0),
        "team_name": "高雄17直播鋼鐵人",
        "location": "鳳山體育館",
    },
    {
        "name": "臺北富邦勇士-高雄17直播鋼鐵人",
        "date": datetime(2023, 12, 9, 14, 30),
        "team_name": "高雄17直播鋼鐵人",
        "location": "鳳山體育館",
    },
    {
        "name": "福爾摩沙夢想家-高雄17直播鋼鐵人",
        "date": datetime(2023, 12, 10, 14, 30),
        "team_name": "高雄17直播鋼鐵人",
        "location": "鳳山體育館",
    },
    {
        "name": "桃園璞園領航猿-高雄17直播鋼鐵人",
        "date": datetime(2023, 12, 30, 14, 30),
        "team_name": "高雄17直播鋼鐵人",
        "location": "鳳山體育館",
    },
    {
        "name": "福爾摩沙夢想家-高雄17直播鋼鐵人",
        "date": datetime(2023, 12, 31, 14, 30),
        "team_name": "高雄17直播鋼鐵人",
        "location": "鳳山體育館",
    },
    {
        "name": "新竹攻城獅-高雄17直播鋼鐵人",
        "date": datetime(2024, 1, 27, 14, 30),
        "team_name": "高雄17直播鋼鐵人",
        "location": "鳳山體育館",
    },
    {
        "name": "新北國王-高雄17直播鋼鐵人",
        "date": datetime(2024, 1, 28, 14, 30),
        "team_name": "高雄17直播鋼鐵人",
        "location": "鳳山體育館",
    },
    {
        "name": "臺北富邦勇士-高雄17直播鋼鐵人",
        "date": datetime(2024, 2, 27, 19, 0),
        "team_name": "高雄17直播鋼鐵人",
        "location": "鳳山體育館",
    },
]
print(event_data)
for data in event_data:
    event = Event(**data)
    event.save()

print("event done")
