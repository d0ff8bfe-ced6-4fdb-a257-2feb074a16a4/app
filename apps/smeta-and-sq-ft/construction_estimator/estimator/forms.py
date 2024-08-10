from django import forms
from .models import Material, Service

class ConstructionForm(forms.Form):
    length = forms.DecimalField(
        label='Длина (в метрах)', 
        min_value=0, 
        widget=forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Введите длину'})
    )
    width = forms.DecimalField(
        label='Ширина (в метрах)', 
        min_value=0, 
        widget=forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Введите ширину'})
    )
    service = forms.ModelChoiceField(
        queryset=Service.objects.all(),
        label='Услуга',
        widget=forms.Select(attrs={'class': 'form-select', 'id': 'service-select'})
    )
    material = forms.ModelChoiceField(
        queryset=Material.objects.none(),  # Изначально пустой список
        label='Материал',
        widget=forms.Select(attrs={'class': 'form-select', 'id': 'material-select'})
    )
    time_estimate = forms.DecimalField(
        label='Предполагаемое время (в часах)', 
        min_value=0, 
        widget=forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Введите время'})
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if 'service' in self.data:
            try:
                service_id = int(self.data.get('service'))
                self.fields['material'].queryset = Material.objects.filter(services__id=service_id)
            except (ValueError, TypeError):
                self.fields['material'].queryset = Material.objects.none()
        else:
            self.fields['material'].queryset = Material.objects.none()

        # Заполняем материалы, если форма уже загружена с выбранной услугой (например, при валидации)
        if self.initial.get('service'):
            service_id = self.initial.get('service')
            self.fields['material'].queryset = Material.objects.filter(services__id=service_id)
