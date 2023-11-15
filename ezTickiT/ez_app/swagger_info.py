from drf_yasg import openapi

swagger_info = openapi.Info(
    title="EzTickiT API",
    default_version='v1',
    description="API description",
    terms_of_service="https://www.EzTickiT.com/terms/",
    contact=openapi.Contact(email="contact@EzTickiT.com"),
    license=openapi.License(name="Your License"),
)
