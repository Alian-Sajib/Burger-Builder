from django.urls import path
from rest_framework import routers
from .views import UserViewsets, OrderViewsets
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.SimpleRouter()

router.register(r"users", UserViewsets)

router.register(r"orders", OrderViewsets, basename="orders")

# Include JWT authentication in the URLs for token generation and refreshing
urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
] + router.urls
