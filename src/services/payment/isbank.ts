import type { PaymentService, PaymentRequest, PaymentResponse } from './types'
import { API_URL } from '../../constants'

export class IsbankPaymentService implements PaymentService {
  private isInitialized = false

  async initialize(): Promise<void> {
    // İşbank 3D Secure SDK yükleme
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://www.isbank.com.tr/3d-secure/3d-secure.js'
      document.head.appendChild(script)
      
      await new Promise((resolve, reject) => {
        script.onload = resolve
        script.onerror = reject
        // 10 saniye timeout
        setTimeout(() => reject(new Error('İşbank SDK load timeout')), 10000)
      })
    }
    this.isInitialized = true
  }

  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    try {
      // İşbank 3D Secure başlat
      const response = await fetch(`${API_URL}/payment/isbank/3d-init`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          amount: request.amount,
          currency: request.currency,
          cardNumber: request.cardNumber.replace(/\s/g, ''),
          cardHolder: request.cardHolder,
          expiry: request.expiry,
          cvv: request.cvv,
          description: request.description,
          returnUrl: request.returnUrl || `${window.location.origin}/payment/success`,
          cancelUrl: request.cancelUrl || `${window.location.origin}/payment/cancel`
        })
      })

      const data = await response.json()
      
      if (data.success) {
        // 3D Secure HTML'i döndür
        return {
          success: true,
          html: data.html,
          transactionId: data.transactionId
        }
      } else {
        return {
          success: false,
          error: data.error || 'İşbank payment failed'
        }
      }
    } catch (error) {
      return {
        success: false,
        error: 'İşbank service error'
      }
    }
  }

  validateCard(cardNumber: string): boolean {
    const cleanNumber = cardNumber.replace(/\s/g, '')
    return cleanNumber.length === 16 // İşbank 16 haneli kartlar
  }

  getSupportedCards(): string[] {
    return ['visa', 'mastercard', 'troy']
  }
} 