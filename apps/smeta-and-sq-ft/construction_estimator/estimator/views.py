from django.shortcuts import render, redirect
from django.http import JsonResponse
from .forms import ConstructionForm
from .models import Material, Estimate
from decimal import Decimal

def get_materials(request):
    service_id = request.GET.get('service_id')
    materials = Material.objects.filter(services__id=service_id).values('id', 'name')
    return JsonResponse({'materials': list(materials)})

def estimate_view(request):
    session_key = request.session.session_key
    if not session_key:
        request.session.save()
        session_key = request.session.session_key

    if request.method == 'POST':
        form = ConstructionForm(request.POST)
        if form.is_valid():
            length = form.cleaned_data['length']
            width = form.cleaned_data['width']
            material = form.cleaned_data['material']
            service = form.cleaned_data['service']
            time_estimate = form.cleaned_data['time_estimate']
            comment = form.cleaned_data['comment']

            square_meters = length * width
            square_footage = square_meters  # Преобразование в Decimal

            material_cost = square_footage * material.cost_per_square_foot
            labor_cost = time_estimate * service.hourly_rate
            total_cost = material_cost + labor_cost

            # Сохранение расчета в базу данных
            estimate = Estimate.objects.create(
                service=service,
                material=material,
                length=length,
                width=width,
                time_estimate=time_estimate,
                material_cost=material_cost,
                labor_cost=labor_cost,
                total_cost=total_cost,
                comment=comment,
                session_key=session_key
            )

            return redirect('estimate_result', estimate_id=estimate.id)
    else:
        form = ConstructionForm()

    # Получение всех расчетов для текущей сессии
    estimates = Estimate.objects.filter(session_key=session_key)

    return render(request, 'estimate_form.html', {
        'form': form,
        'estimates': estimates
    })

def estimate_result(request, estimate_id):
    try:
        estimate = Estimate.objects.get(id=estimate_id, session_key=request.session.session_key)
    except Estimate.DoesNotExist:
        return redirect('estimate')

    if request.method == 'POST':
        if 'add_to_smeta' in request.POST:
            # Обработка добавления в смету
            estimate.saved_to_smeta = True  # Устанавливаем флаг
            estimate.save()  # Сохраняем изменения
            return redirect('smeta_view')
        elif 'edit_estimate' in request.POST:
            # Обработка редактирования
            return redirect('estimate_edit', estimate_id=estimate.id)
        elif 'open_smeta' in request.POST:
            # Открытие текущей сметы
            return redirect('smeta_view')

    return render(request, 'estimate_result.html', {'estimate': estimate})

def estimate_edit(request, estimate_id):
    try:
        estimate = Estimate.objects.get(id=estimate_id, session_key=request.session.session_key)
    except Estimate.DoesNotExist:
        return redirect('estimate')

    if request.method == 'POST':
        form = ConstructionForm(request.POST, instance=estimate)
        if form.is_valid():
            estimate = form.save(commit=False)

            square_meters = estimate.length * estimate.width
            square_footage = square_meters * Decimal('10.7639')

            estimate.material_cost = square_footage * estimate.material.cost_per_square_foot
            estimate.labor_cost = estimate.time_estimate * estimate.service.hourly_rate
            estimate.total_cost = estimate.material_cost + estimate.labor_cost
            estimate.save()

            return redirect('estimate_result', estimate_id=estimate.id)
    else:
        form = ConstructionForm(instance=estimate)

    return render(request, 'estimate_edit.html', {'form': form, 'estimate': estimate})


def smeta_view(request):
    estimates = Estimate.objects.filter(session_key=request.session.session_key, saved_to_smeta=True)
    return render(request, 'smeta_view.html', {'estimates': estimates})

def export_view(request):
    # Здесь будет логика экспорта
    return render(request, 'export.html')
