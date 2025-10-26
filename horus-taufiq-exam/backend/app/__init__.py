from flask import Flask
from app.extensions import db, migrate, jwt, cors
from app.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    # cors.init_app(app)
    
    # Configure CORS untuk development
    cors.init_app(app, origins=["http://localhost:8080"], 
                  allow_headers=["Content-Type", "Authorization"],
                  methods=["GET", "POST", "PUT", "DELETE"])
    
    # Register blueprints
    from app.routes.users import users_bp
    app.register_blueprint(users_bp, url_prefix='/users')
    # app.register_blueprint(users_bp)
    
    return app
