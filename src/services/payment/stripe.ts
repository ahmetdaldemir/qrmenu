import type { PaymentService, PaymentRequest, PaymentResponse } from './types'
import { API_URL } from '../../constants'

declare global {
  interface Window {
    Stripe?: any
  }
}

export class StripePaymentService implements PaymentService {
  private stripe: any = null
  private isInitialized = false

  async initialize(): Promise<void> {
    if (typeof window !== 'undefined' && !this.stripe) {
      // Stripe.js yükleme
      const script = document.createElement('script')
      script.src = 'https://js.stripe.com/v3/'
      document.head.appendChild(script)
      
      await new Promise((resolve, reject) => {
        script.onload = () => {
          this.stripe = window.Stripe('pk_test_51RmaYYKaeG3OBYbxadkNWeJtDgIFJp2sIxcEZxH7y2tZc10bqOgbIdZu62BHOKX8nSPhsYmaqc67ZvKsWeVN7ydD00XuOQjvX2')
          resolve(undefined)
        }
        script.onerror = reject
        // 10 saniye timeout
        setTimeout(() => reject(new Error('Stripe SDK load timeout')), 10000)
      })
    }
    this.isInitialized = true
  }

  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    try {
      // Önce payment intent oluştur
      const intentResponse = await fetch(`${API_URL}/payment/stripe/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          amount: Math.round(request.amount * 100), // Stripe kuruş cinsinden çalışır
          currency: request.currency,
          description: request.description
        })
      })

      const intentData = await intentResponse.json()
      
      if (!intentData.success) {
        return {
          success: false,
          error: intentData.error || 'Failed to create payment intent'
        }
      }

      // Stripe Elements ile kart bilgilerini işle
      const { error, paymentMethod } = await this.stripe.createPaymentMethod({
        type: 'card',
        card: {
          number: request.cardNumber.replace(/\s/g, ''),
          exp_month: parseInt(request.expiry.split('/')[0]),
          exp_year: parseInt('20' + request.expiry.split('/')[1]),
          cvc: request.cvv
        },
        billing_details: {
          name: request.cardHolder
        }
      })

      if (error) {
        return {
          success: false,
          error: error.message
        }
      }

      // Ödemeyi tamamla
      const confirmResponse = await fetch(`${API_URL}/payment/stripe/confirm-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          paymentIntentId: intentData.paymentIntentId,
          paymentMethodId: paymentMethod.id
        })
      })

      const confirmData = await confirmResponse.json()
      
      if (confirmData.success) {
        return {
          success: true,
          transactionId: confirmData.transactionId
        }
      } else {
        return {
          success: false,
          error: confirmData.error || 'Payment confirmation failed'
        }
      }
    } catch (error) {
      return {
        success: false,
        error: 'Stripe service error'
      }
    }
  }

  validateCard(cardNumber: string): boolean {
    const cleanNumber = cardNumber.replace(/\s/g, '')
    return cleanNumber.length >= 13 && cleanNumber.length <= 19
  }

  getSupportedCards(): string[] {
    return ['visa', 'mastercard', 'amex', 'discover', 'diners', 'jcb']
  }
} 