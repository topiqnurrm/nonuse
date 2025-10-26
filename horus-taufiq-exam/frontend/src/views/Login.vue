<template>
  <div class="login-container">
    <div class="login-card">
      <h2>LOGIN</h2>

      <form @submit.prevent="handleLogin">
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

        <div class="form-group">
          <label>Password:</label>
          <input
            type="password"
            v-model="form.password"
            :class="{ 'error': errors.password }"
            placeholder="Masukkan password"
          >
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <div v-if="errorMessage" class="alert error">
          {{ errorMessage }}
        </div>

        <div class="button-group">
          <button type="submit" :disabled="loading" class="btn btn-primary">
            {{ loading ? 'Loading...' : 'Login' }}
          </button>
          <button type="button" @click="$router.push('/register')" class="btn btn-secondary">
            Registrasi
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      errors: {},
      errorMessage: '',
      loading: false
    }
  },

  methods: {
    ...mapActions(['login']),

    validateForm () {
      this.errors = {}

      if (!this.form.username.trim()) {
        this.errors.username = 'Username wajib diisi'
      }

      if (!this.form.password) {
        this.errors.password = 'Password wajib diisi'
      }

      return Object.keys(this.errors).length === 0
    },

    async handleLogin () {
      if (!this.validateForm()) return

      this.loading = true
      this.errorMessage = ''

      try {
        const result = await this.login(this.form)

        if (result.success) {
          // simpan token dan user ke localStorage
          // localStorage.setItem('token', result.token)
          // localStorage.setItem('user', JSON.stringify(result.user))

          // pindah ke dashboard
          this.$router.push('/dashboard')
        } else {
          this.errorMessage = result.message
        }
      } catch (error) {
        this.errorMessage = 'Terjadi kesalahan sistem'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-card h2 {
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
