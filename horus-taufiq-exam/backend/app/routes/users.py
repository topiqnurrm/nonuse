from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.services.user_service import UserService

users_bp = Blueprint('users', __name__)

@users_bp.route('/register', methods=['POST'])
def register():
    """Endpoint registrasi user"""
    data = request.get_json()
    
    if not data:
        return jsonify({'message': 'Data tidak boleh kosong'}), 400
    
    result, status_code = UserService.create_user(data)
    return jsonify(result), status_code

@users_bp.route('/login', methods=['POST'])
def login():
    """Endpoint login user"""
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Username dan password wajib diisi'}), 400
    
    result, status_code = UserService.authenticate_user(data['username'], data['password'])
    
    if result['success']:
        access_token = create_access_token(identity=str(result['user'].id))
        return jsonify({
            'message': 'Login berhasil',
            'token': access_token,
            'user': result['user'].to_dict()
        }), 200
    
    # if result['success']:
    #     # Buat JWT token
    #     # access_token = create_access_token(identity=result['user'].id)
    #     access_token = create_access_token(identity=str(user.id))
    #     return jsonify({
    #         'message': 'Login berhasil',
    #         'token': access_token,
    #         'user': result['user'].to_dict()
    #     }), 200
    
    return jsonify(result), status_code

@users_bp.route('', methods=['GET'])
@jwt_required()
def get_users():
    """Endpoint mendapatkan semua user"""
    users = UserService.get_all_users()
    return jsonify(users), 200

@users_bp.route('/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    """Endpoint update user"""
    data = request.get_json()
    
    if not data:
        return jsonify({'message': 'Data tidak boleh kosong'}), 400
    
    result, status_code = UserService.update_user(user_id, data)
    return jsonify(result), status_code

@users_bp.route('/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    """Endpoint hapus user"""
    result, status_code = UserService.delete_user(user_id)
    return jsonify(result), status_code