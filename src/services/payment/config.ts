import type { PaymentMethodConfig } from './types'

export const PAYMENT_METHODS: PaymentMethodConfig[] = [
  {
    id: 'paypal',
    name: 'PayPal',
    logo: '/payment-logos/paypal.svg',
    description: 'Güvenli ve hızlı ödeme',
    supportedCards: ['visa', 'mastercard', 'amex', 'discover'],
    processingFee: 0,
    processingTime: 'Anında',
    isAvailable: true
  },
  {
    id: 'stripe',
    name: 'Stripe',
    logo: '/payment-logos/stripe.svg',
    description: 'Modern ödeme altyapısı',
    supportedCards: ['visa', 'mastercard', 'amex', 'discover', 'diners', 'jcb'],
    processingFee: 0.029,
    processingTime: '2-3 gün',
    isAvailable: true
  },
  {
    id: 'finansbank',
    name: 'Finansbank',
    logo: '/payment-logos/finansbank.png',
    description: 'Türkiye\'nin güvenilir bankası',
    supportedCards: ['visa', 'mastercard'],
    processingFee: 0.025,
    processingTime: '1-2 gün',
    isAvailable: true
  },
  {
    id: 'isbank',
    name: 'İşbank',
    logo: '/payment-logos/isbank.png',
    description: 'Türkiye\'nin en büyük özel bankası',
    supportedCards: ['visa', 'mastercard', 'troy'],
    processingFee: 0.025,
    processingTime: '1-2 gün',
    isAvailable: true
  }
]

export const getPaymentMethodConfig = (method: string): PaymentMethodConfig | undefined => {
  return PAYMENT_METHODS.find(pm => pm.id === method)
}

export const getAvailablePaymentMethods = (): PaymentMethodConfig[] => {
  return PAYMENT_METHODS.filter(pm => pm.isAvailable)
} 