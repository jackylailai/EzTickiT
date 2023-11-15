from rest_framework import viewsets , status
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework import generics
from django.contrib.auth import authenticate, login
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import AccessToken
from jwt import decode
from ezTickiT.settings import SECRET_KEY
import jwt




class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def list(self, request):
        event_id = request.GET.get('event_id')

        if not event_id:
            events = Event.objects.all()
            serializer = EventSerializer(events, many=True)
            return Response(serializer.data)

        event = get_object_or_404(Event, id=event_id)
        serializer = EventSerializer(event)
        return Response(serializer.data)
        

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class SeatAreaViewSet(viewsets.ModelViewSet):
    queryset = SeatArea.objects.all()
    serializer_class = SeatAreaSerializer

class SeatViewSet(viewsets.ModelViewSet):
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer
    def list(self, request):

        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
        
    def get_queryset(self):
        area = self.request.query_params.get('area')
        queryset = Seat.objects.filter(is_reserved=False)
        if area:
            queryset = queryset.filter(area=area)
        return queryset

# @authentication_classes([JWTAuthentication]) 
# @permission_classes([IsAuthenticated])
class CreateUserView(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    #套件用來處理認證
    # authentication_classes = [SessionAuthentication, BasicAuthentication]  
    # permission_classes = [IsAuthenticated] 

    @action(detail=False, methods=['POST'])
    def register_user(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'])
    def login_user(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        # user = authenticate(request, username=email, password=password)
        # print("user:::",user)
        #使用authenticate會報錯（預設會是加密）的密碼
        try:
            user = CustomUser.objects.filter(email=email, password=password).first()
            print(user)

            if user:
                token = generate_token(user)
                print(token,":::token")
            # if user is not None:
                
            #     refresh = RefreshToken.for_user(user)
            #     access_token = str(refresh.access_token)
            #     print(access_token)
                return Response({"access_token": token})
            else:
                return Response({"message": "Password does not match"}, status=status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist:

            return Response({"message": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        # if user:
        #     login(request, user)
        #     refresh = RefreshToken.for_user(user)
        #     access_token = str(refresh.access_token)

        #     return Response({"access_token": access_token})
        # else:
        #     return Response({"message": "Login failed"}, status=status.HTTP_400_BAD_REQUEST)

class AuthUserAPIView(APIView):
    def get(self, request):
        print("go")
        try:
            token = request.headers.get('Authorization')
            print("token",token)
            if not token:
                return Response({"message": "No JWT token provided"}, status=status.HTTP_401_UNAUTHORIZED)

            # access_token = AccessToken(token)
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms='HS256')
            print("Decoded Token:", decoded_token)
            # user = access_token.user
            # print("user",user)
            user = CustomUser.objects.filter(id=decoded_token["user_id"]).first()
            user_data = {
                "user_id": decoded_token["user_id"],
                "username": user.username,
                "email": user.email,
            }
            print(user_data)
            # return jsonify({"data": user_data}), 200
            return Response({"data": user_data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_401_UNAUTHORIZED)




def generate_token(user):
    payload = {
        'user_id': user.id,
        'username': user.username,
        'email': user.email
    }
    token = jwt.encode(payload,SECRET_KEY, algorithm='HS256')
    print("token",token)
    token_bytes = token.encode('utf-8')
    print("token_byte",token_bytes)
    return token_bytes.decode('utf-8')


