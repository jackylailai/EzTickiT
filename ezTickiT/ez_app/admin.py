from django.contrib import admin

# Register your models here.
from .models import Event, Seat, Ticket, CustomUserManager, CustomUser

admin.site.register(Event)
admin.site.register(Seat)
admin.site.register(Ticket)
admin.site.register(CustomUser)

# @admin.register(Event)
# class EventAdmin(admin.ModelAdmin):
#     list_display = ('name', 'date', 'team_name', 'location')