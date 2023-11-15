from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
STATUS_CHOICES = (
    ('pending', '待付款'),
    ('completed', '已完成'),
    ('canceled', '已取消'),
)
class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(email, username, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=30)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

    class Meta:
        app_label = 'ez_app'
        db_table = 'user'

class Event(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateTimeField()
    team_name = models.CharField(max_length=50)  
    location = models.CharField(max_length=100) 
    class Meta:
        app_label = 'ez_app' 

class SeatArea(models.Model):
    name = models.CharField(max_length=20, unique=True)
    short_name = models.CharField(max_length=20, unique=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    total_count = models.IntegerField(default=0)
    remaining_count = models.IntegerField(default=0)
    class Meta:
            app_label = 'ez_app' 

class Seat(models.Model):
    row_number = models.IntegerField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    seat_number = models.IntegerField()  
    area = models.ForeignKey(SeatArea, on_delete=models.CASCADE)  # 可以是 "A"=60, "B"=60, "Front"=100, "Side"=60, "Observation_A"=300, "Observation_B"=500
    is_reserved = models.BooleanField(default=False)
    # location = models.CharField(max_length=10)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # 購票價格
    # def save(self, *args, **kwargs):
    #     if not self.remaining_count:
    #         self.remaining_count = self.total_count
        # super(Seat, self).save(*args, **kwargs)
    class Meta:
        app_label = 'ez_app' 


class Ticket(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE,null=True, blank=True)  # 購票的用戶
    event = models.ForeignKey(Event, on_delete=models.CASCADE)  # 購票場次
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE, related_name='tickets_for_seat')  #選到的座位
    price = models.DecimalField(max_digits=10, decimal_places=2)  # 購票價格
    quantity = models.IntegerField()  # 購票數量
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)  # 成功訂票，成功付款
    purchase_date = models.DateTimeField(auto_now_add=True)
    class Meta:
        app_label = 'ez_app' 
