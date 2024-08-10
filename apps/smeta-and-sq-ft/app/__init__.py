from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    with app.app_context():
        # Import routes and models inside the app context to avoid circular imports
        from app import routes, models
        db.create_all()
       if not models.Material.query.first():
            mock_materials = [
                models.Material(name="Бетон", cost_per_sqft=10.0),
                models.Material(name="Дерево", cost_per_sqft=5.0),
                models.Material(name="Кирпич", cost_per_sqft=15.0),
                models.Material(name="Сталь", cost_per_sqft=20.0),
                models.Material(name="Песок", cost_per_sqft=3.0),
            ]
            mock_services = [
                models.Service(name="Кровельные работы", hourly_rate=25.0),
                models.Service(name="Столярные работы", hourly_rate=30.0),
                models.Service(name="Малярные работы", hourly_rate=20.0),
                models.Service(name="Сантехнические работы", hourly_rate=35.0),
                models.Service(name="Электромонтажные работы", hourly_rate=40.0),
            ]

            db.session.bulk_save_objects(mock_materials)
            db.session.bulk_save_objects(mock_services)
            db.session.commit()
    return app
