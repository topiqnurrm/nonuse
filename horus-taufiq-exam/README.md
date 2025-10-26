Horus Fullstack Programmer Internship Exam

Nama Panggilan: Taufiq
Database: horus_taufiq_db
Tech Stack: Python Flask + Vue.js + MySQL

📋 Deskripsi Proyek
Aplikasi manajemen pengguna (User Management System) yang terdiri dari:

Backend: REST API menggunakan Flask dengan autentikasi JWT
Frontend: Single Page Application menggunakan Vue.js
Database: MySQL dengan tabel users

🚀 Fitur Utama
Backend API

✅ POST /users/register - Registrasi pengguna baru
✅ POST /users/login - Login dengan JWT token
✅ GET /users - Mendapatkan semua pengguna (protected)
✅ PUT /users/{id} - Update data pengguna (protected)
✅ DELETE /users/{id} - Hapus pengguna (protected)

Frontend Interface

✅ Halaman Login - Autentikasi pengguna
✅ Halaman Registrasi - Daftar akun baru
✅ Dashboard - Tabel pengguna dengan search & CRUD
✅ Update User - Form edit data pengguna

🛠️ Teknologi yang Digunakan
Backend
Python 3.9+
Flask – Web framework
Flask-SQLAlchemy – ORM
Flask-JWT-Extended – JWT authentication
Flask-CORS – Cross-Origin Resource Sharing
Flask-Migrate – Database migrations
BCrypt – Password hashing
PyMySQL – MySQL connector

Frontend
Vue.js 2.7.16 – JavaScript framework
Vue Router – Client-side routing
Vuex 3.6.2 – State management
Axios – HTTP client

Database
MySQL 8.0+ - Relational database

📁 Struktur Proyek

horus-taufiq-exam/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── extensions.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── user.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── users.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── user_service.py
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── validators.py
│   ├── migrations/
│   ├── .env.example
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── UserTable.vue
│   │   │   └── SearchBar.vue
│   │   ├── views/
│   │   │   ├── Login.vue
│   │   │   ├── Register.vue
│   │   │   ├── Dashboard.vue
│   │   │   └── UpdateUser.vue
│   │   ├── router/
│   │   │   └── index.js
│   │   ├── store/
│   │   │   └── auth.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.vue
│   │   └── main.js
│   ├── public/
│   │   └── index.html
│   ├── .env.example
│   └── package.json
└── README.md


🗄️ Database Schema
Tabel: users
| Kolom      | Tipe Data     | Keterangan                                |
|------------|---------------|-------------------------------------------|
| id         | BIGINT        | Primary Key, Auto Increment               |
| username   | VARCHAR(50)   | Wajib diisi, Unik                         |
| password   | VARCHAR(255)  | Wajib diisi (hash)                        |
| email      | VARCHAR(100)  | Wajib diisi, Unik                         |
| nama       | VARCHAR(100)  | Wajib diisi                               |
| created_at | TIMESTAMP     | Default: CURRENT_TIMESTAMP                |


🚦 Cara Menjalankan Aplikasi
Prerequisites

Python 3.9+
Node.js 16+
MySQL 8.0+
Git

1. Clone Repository
git clone https://github.com/topiqnurrm/horus-taufiq-exam.git
cd horus-taufiq-exam

2. Setup Database
Database dulu
sqlmysql -u root -p
CREATE DATABASE horus_tafiq_db;
Backend setup
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux  
source venv/bin/activate

pip install -r requirements.txt

# Copy .env file dan sesuaikan config database
cp .env.example .env

# Setup database
flask db init
flask db migrate -m "Initial setup"
flask db upgrade

python run.py
Backend jalan di http://localhost:5001

Frontend setup
cd frontend
npm install
cp .env.example .env.local
npm run dev 
Frontend jalan di http://localhost:8080

Environment Config
.env (backend):
envFLASK_ENV=development
SECRET_KEY=ganti-ini-dengan-key-rahasia
JWT_SECRET_KEY=jwt-key-rahasia
DATABASE_URL=mysql+pymysql://root:password@localhost/horus_taufiq_db

.env.local (frontend):
envVUE_APP_API_BASE_URL=http://localhost:5000

Testing API
Register:
curl -X POST http://localhost:5000/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"123456","email":"test@gmail.com","nama":"Test User"}'
Login:
curl -X POST http://localhost:5000/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"123456"}'
Get users (perlu token):
curl -X GET http://localhost:5000/users \
  -H "Authorization: Bearer your_jwt_token"
Cara Pake

Register: 
Buka http://localhost:8080, 
klik register, 
isi form Login: Masuk dengan username/password yang sudah dibuat
Dashboard: Lihat semua users, bisa search, edit, delete
Edit user: Klik tombol U di tabel, edit data, save

Security
Password di-hash dengan BCrypt
Authentication dengan JWT token
Input validation di frontend & backend
SQLAlchemy ORM buat prevent SQL injection
Route protection - tidak bisa akses dashboard tanpa login

Validation Rules
Register/Update:
Username: 3-50 karakter, hanya boleh huruf, angka, underscore
Password: minimal 6 karakter
Email: harus format email yang benar
Nama: 2-100 karakter

Login:
Username & password wajib diisi

Error Handling
Kalau ada error, backend return format :
json{
  "success": false,
  "message": "Error message",
  "errors": ["Detail error 1", "Detail error 2"]
}

Responsive
Aplikasi udah responsive, jadi bisa di:
Desktop
Tablet
Mobile