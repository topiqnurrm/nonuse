// src/services/api.js
import axios from 'axios'

// Backend Flask berjalan di port 5001
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:5001'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000
})

// Interceptor untuk menambahkan token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    console.log('API Request:', {
      method: config.method.toUpperCase(),
      url: `${config.baseURL}${config.url}`,
      hasToken: !!token,
      headers: config.headers
    })

    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Interceptor untuk handle response error
api.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', {
      status: response.status,
      url: response.config.url,
      dataType: Array.isArray(response.data) ? 'array' : typeof response.data
    })
    return response
  },
  (error) => {
    const status = error.response ? error.response.status : undefined
    const message = error.response && error.response.data
      ? (error.response.data.message || error.response.data.error)
      : error.message
    const url = error.config ? error.config.url : undefined
    const method = error.config && error.config.method ? error.config.method.toUpperCase() : undefined

    console.error('API Response Error:', {
      status,
      message,
      url,
      method,
      responseData: error.response ? error.response.data : undefined,
      requestData: error.config ? error.config.data : undefined
    })

    if (status === 401) {
      console.warn('Unauthorized - token invalid or expired')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } else if (status === 422) {
      console.error('Unprocessable Entity - Validation Error:', error.response.data)
    } else if (status === 400) {
      console.error('Bad Request:', error.response.data)
    } else if (status === 404) {
      console.error('Not Found - Check endpoint URL')
    } else if (error.code === 'ECONNREFUSED' || (error.message && error.message.includes('Network Error'))) {
      console.error('Backend server not running or CORS issue')
    }

    return Promise.reject(error)
  }
)

export default api
