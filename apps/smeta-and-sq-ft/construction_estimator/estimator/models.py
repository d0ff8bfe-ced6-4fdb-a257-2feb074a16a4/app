from django.db import models

class Material(models.Model):
    name = models.CharField(max_length=100)  # Название материала
    cost_per_square_foot = models.DecimalField(max_digits=10, decimal_places=2)  # Стоимость за кв. фут

    def __str__(self):
        return self.name

class Service(models.Model):
    name = models.CharField(max_length=100)  # Название услуги
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2)  # Почасовая ставка
    materials = models.ManyToManyField(Material, related_name='services')  # Связь "многие ко многим"

    def __str__(self):
        return self.name
