import axios from 'axios'
import { API_URL } from '../constants'

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token geçersiz veya süresi dolmuş
      localStorage.removeItem('token')
      window.location.reload() // Sayfayı yenile ve otomatik login'i tetikle
    }
    return Promise.reject(error)
  }
)

export default axiosInstance 