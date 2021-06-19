import json

from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt

from .models import Food, Entry


@csrf_exempt
def food_api(request):
    if request.method == "GET":
        return JsonResponse(list(Food.objects.all().values()), safe=False)

    if request.method == "POST":
        fields = json.loads(request.body)
        food = Food.objects.create(**fields)
        return JsonResponse(model_to_dict(food))

@csrf_exempt
def entry_api(request):
    if request.method == "GET":
        return JsonResponse(list(Entry.objects.all().values()), safe=False)

    if request.method == "POST":
        fields = json.loads(request.body)
        fields["food"] = get_object_or_404(Food, pk=fields["food"])
        entry = Entry.objects.create(**fields)
        return JsonResponse(list(Entry.objects.filter(pk=entry.pk).values())[0], safe=False)
