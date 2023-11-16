"""ezTickiT URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from ez_app import views
from rest_framework.routers import DefaultRouter
from ez_app.api import *
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from ez_app.utils.calculateSeat import AllocateSeatAPIView
from django.http import HttpResponse



schema_view = get_schema_view(
   openapi.Info(
      title="EzTickiT API",
      default_version='v1',
      description="Your API description",
      terms_of_service="https://www.EzTickiT.com/terms/",
      contact=openapi.Contact(email="contact@EzTickiT.com"),
      license=openapi.License(name="Your License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'tickets', TicketViewSet)
router.register(r'seats', SeatViewSet)
router.register(r'seatAreas', SeatAreaViewSet)
router.register(r'Customer', CreateUserView)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.index, name='index'),
    path("event",views.event_page, name="event_page"),
    path("gameBookingPage",views.game_booking_page, name="game_booking_page"),
    path('customerInf/<str:area>', views.customerInf, name='customer_inf'),
    path("bookingSucc/", views.bookingSucc, name='booking_succ'),
    path("maintainance", views.maintainance, name="maintainance"),

    path("api/" ,include(router.urls)),

    path('api/events/<int:event_id>/',EventViewSet.as_view({"get":"list"}), name='event-detail'),
    # 座位演算法
    path('api/allocate-seat/', AllocateSeatAPIView.as_view(), name='allocate-seat'),
    #   會員功能
    path('api/users/register_user/', CreateUserView.as_view({'post': 'register_user'}), name='register-user'),
    path('api/users/login_user/', CreateUserView.as_view({'post': 'login_user'}), name='login-user'),
    path('api/users/auth_user/', AuthUserAPIView.as_view(), name='auth-user'),


    path('loaderio-f0a3d30574651a577c2a7b74b3cbd301/', lambda request: HttpResponse("loaderio-f0a3d30574651a577c2a7b74b3cbd301")),

    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
]


