from django.urls import path
from estimator.views import estimate_view, get_materials

urlpatterns = [
    path('', estimate_view, name='estimate'),
    path('get-materials/', get_materials, name='get_materials'),
]
