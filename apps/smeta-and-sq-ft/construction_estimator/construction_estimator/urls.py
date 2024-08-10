from django.urls import path
from estimator.views import estimate_view, estimate_result, estimate_edit, smeta_view

urlpatterns = [
    path('', estimate_view, name='estimate'),
    path('estimate/<int:estimate_id>/', estimate_result, name='estimate_result'),
    path('estimate/<int:estimate_id>/edit/', estimate_edit, name='estimate_edit'),
    path('smeta/', smeta_view, name='smeta_view'),
]
