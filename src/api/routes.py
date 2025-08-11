from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
CORS(api)

# --- Rutas de Autenticación ---

@api.route('/signup', methods=['POST'])
def handle_signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"msg": "Correo y contraseña son requeridos"}), 400
    
    # Verificar si el usuario ya existe
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "El correo ya está registrado"}), 409

    # Crear nuevo usuario con contraseña
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado exitosamente"}), 201

@api.route('/token', methods=['POST'])
def handle_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"msg": "Se requiere correo y contraseña"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"msg": "Correo o contraseña incorrectos"}), 401

    # Crear un token de acceso para el usuario
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user": user.serialize()}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({"user_info": user.serialize(), "msg": "Acceso concedido a contenido privado"}), 200