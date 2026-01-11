

# Create your models here.
from django.db import models

class Order(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    order_item = models.CharField(max_length=200)
    extra_food = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.IntegerField()
    date_time = models.CharField(max_length=100)
    address = models.TextField()
    message = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name
