from django import forms
from .models import Estimate, Material, Service


class ConstructionForm(forms.ModelForm):
    class Meta:
        model = Estimate
        fields = ['length', 'width', 'service', 'material', 'time_estimate', 'comment']
        widgets = {
            'length': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Введите длину'}),
            'width': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Введите ширину'}),
            'service': forms.Select(attrs={'class': 'form-select', 'id': 'service-select'}),
            'material': forms.Select(attrs={'class': 'form-select', 'id': 'material-select'}),
            'time_estimate': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Введите время'}),
            'comment': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Введите комментарий'}),
        }

    def __init__(self, *args, **kwargs):
        super(ConstructionForm, self).__init__(*args, **kwargs)
        self.fields['service'].queryset = Service.objects.all()
        self.fields['material'].queryset = Material.objects.none()

        if 'service' in self.data:
            try:
                service_id = int(self.data.get('service'))
                self.fields['material'].queryset = Material.objects.filter(services__id=service_id)
            except (ValueError, TypeError):
                self.fields['material'].queryset = Material.objects.none()
        elif self.instance.pk:
            self.fields['material'].queryset = self.instance.service.materials.all()

        # Пример фиктивных данных (замените на реальные, если они будут в БД)
        for service in self.fields['service'].queryset:
            service.hourly_rate = 50.0  # например, 50 рублей в час

        for material in self.fields['material'].queryset:
            material.cost_per_square_foot = 1.2  # например, коэффициент 1.2
