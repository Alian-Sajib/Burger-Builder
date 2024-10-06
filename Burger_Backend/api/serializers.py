from rest_framework import serializers
from api.models import User, Ingredient, Order, CustomerDetail


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )

    class Meta:
        model = User
        fields = ["id", "email", "password"]

    def create(self, validated_data):
        email = validated_data["email"]
        password = validated_data["password"]
        user = User.objects.create_user(email=email, password=password)
        return user


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"


class CustomerDeatailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerDetail
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer()
    customerDetail = CustomerDeatailSerializer()

    class Meta:
        model = Order
        fields = "__all__"

    def create(self, validated_data):

        ingredients = validated_data["ingredients"]
        customerDetail = validated_data["customerDetail"]
        price = validated_data["price"]
        orderTime = validated_data["orderTime"]
        user = validated_data["user"]

        order = Order.objects.create(
            ingredients=IngredientSerializer.create(
                IngredientSerializer(), ingredients
            ),  # create the new instance of the ingredients so call the method of this serializer and inside
            # this we define the class name and data.
            customerDetail=CustomerDeatailSerializer.create(
                CustomerDeatailSerializer(), customerDetail
            ),
            price=price,
            orderTime=orderTime,
            user=user,
        )
        return order
