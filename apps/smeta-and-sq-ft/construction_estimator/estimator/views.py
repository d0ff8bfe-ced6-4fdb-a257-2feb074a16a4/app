from django.shortcuts import render
from .forms import ConstructionForm
from django.http import JsonResponse
from .models import Material

def get_materials(request):
    service_id = request.GET.get('service_id')
    materials = Material.objects.filter(services__id=service_id).values('id', 'name')
    return JsonResponse({'materials': list(materials)})


def estimate_view(request):
    if request.method == 'POST':
        form = ConstructionForm(request.POST)
        if form.is_valid():
            length = form.cleaned_data['length']
            width = form.cleaned_data['width']
            material = form.cleaned_data['material']
            service = form.cleaned_data['service']
            time_estimate = form.cleaned_data['time_estimate']
            
            # Calculations
            square_footage = length * width
            material_cost = square_footage * material.cost_per_square_foot
            labor_cost = time_estimate * service.hourly_rate
            total_cost = material_cost + labor_cost
            
            return render(request, 'estimate_result.html', {
                'form': form,
                'square_footage': square_footage,
                'material_cost': material_cost,
                'labor_cost': labor_cost,
                'total_cost': total_cost
            })
    else:
        form = ConstructionForm()

    return render(request, 'estimate_form.html', {'form': form})
