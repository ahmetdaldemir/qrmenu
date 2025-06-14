import { defineStore } from 'pinia'
import axiosInstance from '../utils/axios'
import { API_URL } from '../constants'

export const useReservationStore = defineStore('reservation', {
  state: () => ({
    loading: false,
    error: null as string | null,
    reservation: null as any,
  }),

  actions: {
    async makeReservation(formData: any) {
      this.loading = true
      this.error = null
      try {
        const response = await axiosInstance.post(`${API_URL}/reservations`, formData)
        this.reservation = response.data
        return response.data
      } catch (error: any) {
        this.error = error.message || 'Failed to make reservation'
        throw error
      } finally {
        this.loading = false
      }
    },

    async processPayment(paymentData: any) {
      this.loading = true
      this.error = null
      try {
        const response = await axiosInstance.post(`${API_URL}/payments`, {
          ...paymentData,
          reservationId: this.reservation?.id
        })
        return response.data
      } catch (error: any) {
        this.error = error.message || 'Payment failed'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
}) 