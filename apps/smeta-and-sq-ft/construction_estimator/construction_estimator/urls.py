from django.urls import path
from estimator.views import estimate_view, estimate_result, estimate_edit, smeta_view, export_view, get_materials, export_to_excel
from django.contrib import admin

urlpatterns = [
    path('', estimate_view, name='estimate'),  # Этот маршрут должен вести на форму создания заказа
    path('estimate/<int:estimate_id>/', estimate_result, name='estimate_result'),
    path('estimate/<int:estimate_id>/edit/', estimate_edit, name='estimate_edit'),
    path('smeta/', smeta_view, name='smeta_view'),
    path('admin/', admin.site.urls),
    path('get-materials/', get_materials, name='get_materials'),  
    path('export/', export_to_excel, name='export'),# Маршрут для получения материалов
]
