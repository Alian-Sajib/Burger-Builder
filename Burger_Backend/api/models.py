from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)

# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, email, password):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email)
        )  # normilize means adjust the lowercase Uppercase letters
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    objects = UserManager()
    USERNAME_FIELD = "email"

    def __str__(self):
        return self.email


class Ingredient(models.Model):
    salad = models.IntegerField(default=0)
    cheese = models.IntegerField(default=0)
    meat = models.IntegerField(default=0)

    def __str__(self):
        return f"Salad: {self.salad}, Cheese: {self.cheese}, Meat: {self.meat}"


class CustomerDetail(models.Model):
    deliveryAddress = models.TextField(blank=True)
    phone = models.CharField(max_length=20)
    paymentType = models.CharField(max_length=40)

    def __self__(self):
        return f"Phone : {self.phone}, Address : {self.deliveryAddress}, Payment Type : {self.paymentType}"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ingredients = models.OneToOneField(Ingredient, on_delete=models.CASCADE)
    customerDetail = models.OneToOneField(CustomerDetail, on_delete=models.CASCADE)
    price = models.CharField(max_length=10, default=0)
    orderTime = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f"{self.user.email}"
