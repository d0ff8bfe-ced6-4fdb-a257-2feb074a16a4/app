from flask import render_template, request
from app import db, create_app
from app.models import Material, Service

app = create_app()  # Make sure to get the app instance

@app.route('/', methods=['GET', 'POST'])
def index():
    materials = Material.query.all()
    services = Service.query.all()

    if request.method == 'POST':
        try:
            length = float(request.form['length'])
            width = float(request.form['width'])
            material_id = int(request.form['material_id'])
            service_id = int(request.form['service_id'])
            time_to_complete = float(request.form['time_to_complete'])

            # Simplified calculation logic
            square_footage = length * width
            selected_material = Material.query.get(material_id)
            selected_service = Service.query.get(service_id)

            total_material_cost = square_footage * selected_material.cost_per_sqft
            total_labor_cost = time_to_complete * selected_service.hourly_rate
            total_cost = total_material_cost + total_labor_cost

            return render_template('index.html',
                                   materials=materials, services=services,
                                   total_material_cost=total_material_cost,
                                   total_labor_cost=total_labor_cost,
                                   total_cost=total_cost)
        except ValueError:
            return render_template('index.html', materials=materials, services=services, error="Please enter valid inputs.")

    return render_template('index.html', materials=materials, services=services)
