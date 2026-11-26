export type PaymentMethod = 'paypal' | 'stripe' | 'finansbank' | 'isbank'

export interface PaymentRequest {
  amount: number
  currency: string
  cardNumber: string
  cardHolder: string
  expiry: string
  cvv: string
  description?: string
  returnUrl?: string
  cancelUrl?: string
}

export interface PaymentResponse {
  success: boolean
  transactionId?: string
  redirectUrl?: string
  html?: string
  error?: string
  message?: string
}

export interface PaymentService {
  initialize(): Promise<void>
  processPayment(request: PaymentRequest): Promise<PaymentResponse>
  validateCard(cardNumber: string): boolean
  getSupportedCards(): string[]
}

export interface PaymentMethodConfig {
  id: PaymentMethod
  name: string
  logo: string
  description: string
  supportedCards: string[]
  processingFee?: number
  processingTime?: string
  isAvailable: boolean
} 