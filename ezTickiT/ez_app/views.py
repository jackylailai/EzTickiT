from django.shortcuts import render
from django.http import request, JsonResponse
import requests
# Create your views here.

def index(request):
    return render(request, 'index.html')

def event_page(request):
    return render(request, "eventPage.html")

def game_booking_page(request):
    # event_id = request.GET.get('event_id')
    # api_url = f"/api/seats/{event_id}/"  
    
    # try:
        # response = requests.get(api_url)
        # data = response.json()

        return render(request, "gameBookingPage.html")
    # except requests.exceptions.RequestException as e:

    #     return JsonResponse({"error": "API失敗"})

def customerInf(request,area):
    context = {'area': area}
    print(context,":context")
    return render(request, 'customerInf.html', context)

def bookingSucc(request):
    return render(request, "bookingSucc.html")

def maintainance(request):
     return render(request, "maintainance.html")