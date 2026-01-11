from django.urls import path
from . import views

urlpatterns = [
    path("", views.order_page, name="order_page"),
    path("submit-order/", views.submit_order, name="submit_order"),
]
