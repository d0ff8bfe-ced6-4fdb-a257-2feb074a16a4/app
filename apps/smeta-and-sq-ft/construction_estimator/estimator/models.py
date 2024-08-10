from django.db import models

class Material(models.Model):
    name = models.CharField(max_length=100)
    cost_per_square_foot = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Service(models.Model):
    name = models.CharField(max_length=100)
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2)
    materials = models.ManyToManyField(Material, related_name='services')

    def __str__(self):
        return self.name

class Estimate(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    length = models.DecimalField(max_digits=10, decimal_places=2)
    width = models.DecimalField(max_digits=10, decimal_places=2)
    time_estimate = models.DecimalField(max_digits=10, decimal_places=2)
    material_cost = models.DecimalField(max_digits=10, decimal_places=2)
    labor_cost = models.DecimalField(max_digits=10, decimal_places=2)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    comment = models.TextField(blank=True, null=True, default="")  # Поле для комментария, опционально
    session_key = models.CharField(max_length=40, default="")  # Поле для хранения сессии пользователя

    def __str__(self):
        return f"Estimate for {self.service.name} with {self.material.name}"