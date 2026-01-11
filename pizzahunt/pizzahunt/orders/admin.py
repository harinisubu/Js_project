

# Register your models here.
from django.contrib import admin
from .models import Order

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'phone', 'order_item', 'quantity', 'date_time')
    search_fields = ('name', 'phone', 'order_item')
    list_filter = ('date_time',)
    ordering = ('-id',)

admin.site.register(Order, OrderAdmin)
