<template>
  <div class="update-user-container">
    <div class="update-user-card">
      <h2>UPDATE USER</h2>

      <form @submit.prevent="handleUpdate">
        <div class="form-group">
          <label>Nama Lengkap:</label>
          <input
            type="text"
            v-model="form.nama"
            :class="{ 'error': errors.nama }"
            placeholder="Masukkan nama lengkap"
          >
          <span v-if="errors.nama" class="error-message">{{ errors.nama }}</span>
        </div>

        <div class="form-group">
          <label>Email:</label>
          <input
            type="email"
            v-model="form.email"
            :class="{ 'error': errors.email }"
            placeholder="Masukkan email"
          >
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label>Username:</label>
          <input
            type="text"
            v-model="form.username"
            :class="{ 'error': errors.username }"
            placeholder="Masukkan username"
          >
          <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
        </div>

        <div v-if="errorMessage" class="alert error">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="alert success">
          {{ successMessage }}
        </div>

        <div class="button-group">
          <button type="submit" :disabled="loading" class="btn btn-primary">
            {{ loading ? 'Loading...' : 'Update' }}
          </button>
          <button type="button" @click="goBack" class="btn btn-secondary">
            Kembali
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'

export default {
  name: 'UpdateUser',
  data () {
    return {
      form: {
        nama: '',
        email: '',
        username: ''
      },
      errors: {},
      errorMessage: '',
      successMessage: '',
      loading: false,
      userId: null
    }
  },

  async created () {
    this.userId = this.$route.params.id
    await this.loadUserData()
  },

  methods: {
    async loadUserData () {
      this.loading = true
      try {
        const response = await api.get('/users')
        // const user = response.data.find(u => u.id === this.userId)
        const user = response.data.find(u => u.id === parseInt(this.userId))

        if (user) {
          this.form = {
            nama: user.nama,
            email: user.email,
            username: user.username
          }
        } else {
          this.errorMessage = 'User tidak ditemukan'
        }
      } catch (error) {
        this.errorMessage = 'Gagal memuat data user'
      } finally {
        this.loading = false
      }
    },

    validateForm () {
      this.errors = {}

      if (!this.form.nama.trim()) {
        this.errors.nama = 'Nama lengkap wajib diisi'
      } else if (this.form.nama.length < 2) {
        this.errors.nama = 'Nama minimal 2 karakter'
      }

      if (!this.form.email.trim()) {
        this.errors.email = 'Email wajib diisi'
      } else if (!this.isValidEmail(this.form.email)) {
        this.errors.email = 'Format email tidak valid'
      }

      if (!this.form.username.trim()) {
        this.errors.username = 'Username wajib diisi'
      } else if (this.form.username.length < 3) {
        this.errors.username = 'Username minimal 3 karakter'
      } else if (!/^[a-zA-Z0-9_]+$/.test(this.form.username)) {
        this.errors.username = 'Username hanya boleh mengandung huruf, angka, dan underscore'
      }

      return Object.keys(this.errors).length === 0
    },

    isValidEmail (email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    },

    async handleUpdate () {
      if (!this.validateForm()) return

      this.loading = true
      this.errorMessage = ''
      this.successMessage = ''

      try {
        await api.put(`/users/${this.userId}`, this.form)

        this.successMessage = 'Data user berhasil diperbarui!'

        // Redirect ke dashboard setelah 2 detik
        setTimeout(() => {
          this.$router.push('/dashboard')
        }, 2000)
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          error.response.data.errors.forEach(err => {
            this.errorMessage += err + ' '
          })
        } else {
          this.errorMessage = (error.response && error.response.data && error.response.data.message) || 'Update gagal'
        }
      } finally {
        this.loading = false
      }
    },

    goBack () {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
.update-user-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 1rem;
}

.update-user-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
}

.update-user-card h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
}

.form-group input.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.alert {
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.alert.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.alert.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}
</style>
