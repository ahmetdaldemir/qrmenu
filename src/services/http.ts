import axios from 'axios'
import Swal from 'sweetalert2'

// Create axios instance with base configuration
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  transformRequest: [(data, headers) => {
    if (data instanceof FormData) {
      delete headers['Content-Type']
      return data
    }
    return data
  }]
})

// Add request interceptor
axiosInstance.interceptors.request.use((config) => {
  console.log('Request interceptor called')
  const token = localStorage.getItem('token')
  
  if (token) {
    // Ensure headers object exists
    config.headers = config.headers || {}
    // Set Authorization header
    config.headers['Authorization'] = `Bearer ${token}`
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'No token found in localStorage.',
      confirmButtonText: 'Tamam'
    })
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export interface HttpOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  data?: any
  params?: any
  headers?: Record<string, string>
}

export async function httpRequest<T = any>(
  url: string,
  options: HttpOptions = {}
): Promise<T> {
  const { method = 'GET', data, params, headers = {} } = options
  try {
    const config = {
      url,
      method,
      data,
      params,
      headers: {
        ...headers
      }
    }

    // If data is FormData, remove Content-Type header to let browser set it automatically
    if (data instanceof FormData) {
      delete config.headers['Content-Type']
    }

    const response = await axiosInstance.request<T>(config)
    return response.data
  } catch (error) {
    console.error('Request failed:', error)
    throw error
  }
} 