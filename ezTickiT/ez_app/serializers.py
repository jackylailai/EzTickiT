from rest_framework import serializers
from .models import Event, Ticket, Seat, SeatArea, CustomUser

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'
        # fields = ['seat_number', 'area', 'is_reserved', 'location']

class SeatAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeatArea
        fields = '__all__'
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
