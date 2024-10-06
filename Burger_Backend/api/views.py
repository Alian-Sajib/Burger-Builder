from django.shortcuts import render
from rest_framework import viewsets
from .models import User, Order
from .serializers import UserSerializer, OrderSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class UserViewsets(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class OrderViewsets(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # queryset = Order.objects.all()
        # # user  = self.request.user
        # id = self.request.query_params.get("id", None)
        # if id is not None:
        #     queryset = queryset.filter(user_id=id)
        # return queryset
        user = self.request.user
        queryset = Order.objects.filter(user_id=user.id)
        return queryset
