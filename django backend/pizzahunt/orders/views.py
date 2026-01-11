

# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse
from .models import Order

def order_page(request):
    return render(request, "orders/order.html")

def submit_order(request):
    if request.method == "POST":
        Order.objects.create(
            name=request.POST.get("name"),
            phone=request.POST.get("phone"),
            order_item=request.POST.get("order_item"),
            extra_food=request.POST.get("extra_food"),
            quantity=request.POST.get("quantity"),
            date_time=request.POST.get("date_time"),
            address=request.POST.get("address"),
            message=request.POST.get("message"),
        )
        return HttpResponse("Order Saved Successfully!")
    return HttpResponse("Invalid Request")
