from flask import Flask
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

jwt = JWTManager()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    app.config["JWT_SECRET_KEY"] = "super-secret-key"  
    jwt.init_app(app)
    bcrypt.init_app(app)
    return app