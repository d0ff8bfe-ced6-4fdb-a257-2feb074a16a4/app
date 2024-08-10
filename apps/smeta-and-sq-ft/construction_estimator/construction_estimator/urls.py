from django.urls import path
from estimator.views import estimate_view

urlpatterns = [
    path('', estimate_view, name='estimate'),
]
