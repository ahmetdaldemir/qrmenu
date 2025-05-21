import { defineStore } from 'pinia'
import axiosInstance from '../utils/axios'

const API_URL = 'http://repo.agencymanagerpro.com'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token')
  }),

  actions: {
    async login() {
      try {
        // Otomatik login için sabit kullanıcı bilgileri
        const response = await axiosInstance.post(`${API_URL}/common/login`, {
          email: 'admin@orienthouseturkey.com',
          password: 'Default123'
        })

        const token = response.data.data.token
        const tenant_id = response.data.data.tenant_id
        this.token = token
        this.isAuthenticated = true
        localStorage.setItem('token', token)
        localStorage.setItem('tenant_id', tenant_id)
        // Axios default header'ına token'ı ekle
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`

        return true
      } catch (error) {
        console.error('Login error:', error)
        this.token = null
        this.isAuthenticated = false
        localStorage.removeItem('token')
        return false
      }
    },

    logout() {
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      delete axiosInstance.defaults.headers.common['Authorization']
    }
  }
}) 