from django.db import models
from django.utils import timezone


class Food(models.Model):
    name = models.CharField(max_length=255)
    serving = models.CharField(max_length=255)
    calories = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Entry(models.Model):
    entry_time = models.DateTimeField(default=timezone.now)
    food = models.ForeignKey("Food", on_delete=models.PROTECT)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.entry_time}: {self.food.name}, {self.quantity}"