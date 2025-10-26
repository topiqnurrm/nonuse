import re
from email_validator import validate_email, EmailNotValidError

def validate_user_data(data, is_update=False):
    """Validasi data user"""
    errors = []
    
    if not is_update:
        # Validasi untuk registrasi
        required_fields = ['username', 'password', 'email', 'nama']
        for field in required_fields:
            if not data.get(field) or not data[field].strip():
                errors.append(f'{field} wajib diisi')
    
    # Validasi username
    if data.get('username'):
        username = data['username'].strip()
        if len(username) < 3:
            errors.append('Username minimal 3 karakter')
        if len(username) > 50:
            errors.append('Username maksimal 50 karakter')
        if not re.match(r'^[a-zA-Z0-9_]+$', username):
            errors.append('Username hanya boleh mengandung huruf, angka, dan underscore')
    
    # Validasi password
    if data.get('password'):
        password = data['password']
        if len(password) < 6:
            errors.append('Password minimal 6 karakter')
    
    # Validasi email
    if data.get('email'):
        try:
            validate_email(data['email'])
        except EmailNotValidError:
            errors.append('Format email tidak valid')
    
    # Validasi nama
    if data.get('nama'):
        nama = data['nama'].strip()
        if len(nama) < 2:
            errors.append('Nama minimal 2 karakter')
        if len(nama) > 100:
            errors.append('Nama maksimal 100 karakter')
    
    return errors