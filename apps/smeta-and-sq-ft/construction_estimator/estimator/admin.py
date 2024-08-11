from django.contrib import admin
from .models import Service, Material, Estimate

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'hourly_rate')
    search_fields = ('name',)
    list_filter = ('hourly_rate',)

@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ('name', 'cost_per_square_foot')
    search_fields = ('name',)
    list_filter = ('services',)

@admin.register(Estimate)
class EstimateAdmin(admin.ModelAdmin):
    list_display = ('service', 'material', 'length', 'width', 'time_estimate', 'total_cost', 'session_key', 'saved_to_smeta')
    search_fields = ('service__name', 'material__name')
    list_filter = ('service', 'material', 'saved_to_smeta')
    readonly_fields = ('material_cost', 'labor_cost', 'total_cost')  # Поля, которые нельзя изменять вручную
