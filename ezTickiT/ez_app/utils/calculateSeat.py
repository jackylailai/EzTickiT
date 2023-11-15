from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from random import shuffle
from ez_app.models import SeatArea, Seat, Ticket
from ez_app.serializers import TicketSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi



class AllocateSeatAPIView(APIView):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'event': openapi.Schema(type=openapi.TYPE_INTEGER),
                'seat': openapi.Schema(type=openapi.TYPE_STRING),
                'price': openapi.Schema(type=openapi.TYPE_NUMBER),
            },
            required=['event', 'seat', 'price'],
        ),
        responses={200: 'Success', 400: 'Bad Request'},
    )
    def post(self, request):
        event_id = self.request.data.get('event')
        selected_area = self.request.data.get('seat')
        price = request.data.get('price')
        user_id = request.data.get('user_id')
        print("有收到解析")
        quantity = request.data.get('quantity')  # 可以接收但不使用
        status = request.data.get('status')
        #創 seat_area instance
        seat_area = SeatArea.objects.get(short_name=selected_area)
        #創 seat instance 確認哪些座位還可以使用
        unallocated_seats = Seat.objects.filter(area=seat_area, is_reserved=False)

        if unallocated_seats.exists():
            shuffled_seats = list(unallocated_seats)
            shuffle(shuffled_seats)

            selected_seat = shuffled_seats[0]
            selected_seat.is_reserved = True
            selected_seat.save()
            #被訂走扣一
            seat_area.remaining_count -= 1
            seat_area.save()

            ticket_data = {
                'user':user_id,
                'event': event_id,
                'seat': selected_seat.id,
                # 資料庫沒寫道price
                'price': price,
                'quantity': 1,
                'status': 'completed',
            }
            ticket_serializer = TicketSerializer(data=ticket_data)
            print("ticket_serializer:::",ticket_serializer)
            if ticket_serializer.is_valid():
                ticket_serializer.save()
                response_data = {
                    'ticket': ticket_serializer.data,
                    'row_number': selected_seat.row_number,
                    'seat_number': selected_seat.seat_number,
                    'total_count': seat_area.total_count,
                    'remaining_count': seat_area.remaining_count,
                }
                print(f"分配座位 {response_data['row_number']} {response_data['seat_number']}")
                return Response(response_data, status=201)
            else:
                #沒有成功
                selected_seat.is_reserved = False  
                selected_seat.save()
                return Response(ticket_serializer.errors, status=400)
        else:
            # 没有可用座位
            return Response({'error': 'No available seats in the selected area.'}, status=400)
