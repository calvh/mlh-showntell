from django.urls import path

from . import views

urlpatterns = [
    path("foods/", views.food_api),
    path("entries/", views.entry_api),
]
