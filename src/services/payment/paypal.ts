import type { PaymentService, PaymentRequest, PaymentResponse } from './types'
import { API_URL } from '../../constants'

declare global {
  interface Window {
    paypal?: any
  }
}

export class PayPalPaymentService implements PaymentService {
  private isInitialized = false

  async initialize(): Promise<void> {
    // PayPal SDK yükleme
    if (typeof window !== 'undefined' && !window.paypal) {
      const script = document.createElement('script')
      script.src = 'https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=EUR'
      document.head.appendChild(script)
      
      await new Promise((resolve, reject) => {
        script.onload = resolve
        script.onerror = reject
        // 10 saniye timeout
        setTimeout(() => reject(new Error('PayPal SDK load timeout')), 10000)
      })
    }
    this.isInitialized = true
  }

  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    try {
      const response = await fetch(`${API_URL}/payment/paypal/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          amount: request.amount,
          currency: request.currency,
          description: request.description,
          returnUrl: request.returnUrl,
          cancelUrl: request.cancelUrl
        })
      })

      const data = await response.json()
      
      if (data.success) {
        return {
          success: true,
          redirectUrl: data.redirectUrl,
          transactionId: data.transactionId
        }
      } else {
        return {
          success: false,
          error: data.error || 'PayPal payment failed'
        }
      }
    } catch (error) {
      return {
        success: false,
        error: 'PayPal service error'
      }
    }
  }

  validateCard(cardNumber: string): boolean {
    // PayPal kart validasyonu
    const cleanNumber = cardNumber.replace(/\s/g, '')
    return cleanNumber.length >= 13 && cleanNumber.length <= 19
  }

  getSupportedCards(): string[] {
    return ['visa', 'mastercard', 'amex', 'discover']
  }
} 