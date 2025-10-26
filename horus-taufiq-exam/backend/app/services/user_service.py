from app.models.user import User
from app.extensions import db
from app.utils.validators import validate_user_data
from sqlalchemy.exc import IntegrityError

class UserService:
    @staticmethod
    def create_user(data):
        """Membuat user baru"""
        try:
            # Validasi data
            errors = validate_user_data(data)
            if errors:
                return {'success': False, 'errors': errors}, 400
            
            # Cek apakah username atau email sudah ada
            existing_user = User.query.filter(
                (User.username == data['username']) | (User.email == data['email'])
            ).first()
            
            if existing_user:
                if existing_user.username == data['username']:
                    return {'success': False, 'message': 'Username sudah digunakan'}, 400
                else:
                    return {'success': False, 'message': 'Email sudah digunakan'}, 400
            
            # Buat user baru
            user = User(
                username=data['username'],
                email=data['email'],
                nama=data['nama']
            )
            user.set_password(data['password'])
            
            db.session.add(user)
            db.session.commit()
            
            return {'success': True, 'message': 'Registrasi berhasil'}, 201
            
        except Exception as e:
            db.session.rollback()
            return {'success': False, 'message': 'Terjadi kesalahan sistem'}, 500
    
    @staticmethod
    def authenticate_user(username, password):
        """Autentikasi user"""
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            return {'success': True, 'user': user}, 200
        return {'success': False, 'message': 'Username atau password salah'}, 401
    
    @staticmethod
    def get_all_users():
        """Mendapatkan semua user"""
        users = User.query.all()
        return [user.to_dict() for user in users]
    
    @staticmethod
    def get_user_by_id(user_id):
        """Mendapatkan user berdasarkan ID"""
        user = User.query.get(user_id)
        if user:
            return user
        return None
    
    @staticmethod
    def update_user(user_id, data):
        """Update user"""
        try:
            user = User.query.get(user_id)
            if not user:
                return {'success': False, 'message': 'User tidak ditemukan'}, 404
            
            # Validasi data
            errors = validate_user_data(data, is_update=True)
            if errors:
                return {'success': False, 'errors': errors}, 400
            
            # Update data
            if data.get('username'):
                # Cek apakah username sudah digunakan user lain
                existing = User.query.filter(
                    User.username == data['username'], 
                    User.id != user_id
                ).first()
                if existing:
                    return {'success': False, 'message': 'Username sudah digunakan'}, 400
                user.username = data['username']
            
            if data.get('email'):
                # Cek apakah email sudah digunakan user lain
                existing = User.query.filter(
                    User.email == data['email'], 
                    User.id != user_id
                ).first()
                if existing:
                    return {'success': False, 'message': 'Email sudah digunakan'}, 400
                user.email = data['email']
            
            if data.get('nama'):
                user.nama = data['nama']
            
            db.session.commit()
            return {'success': True, 'message': 'Data user berhasil diperbarui'}, 200
            
        except Exception as e:
            db.session.rollback()
            return {'success': False, 'message': 'Terjadi kesalahan sistem'}, 500
    
    @staticmethod
    def delete_user(user_id):
        """Hapus user"""
        try:
            user = User.query.get(user_id)
            if not user:
                return {'success': False, 'message': 'User tidak ditemukan'}, 404
            
            db.session.delete(user)
            db.session.commit()
            return {'success': True, 'message': 'User berhasil dihapus'}, 200
            
        except Exception as e:
            db.session.rollback()
            return {'success': False, 'message': 'Terjadi kesalahan sistem'}, 500