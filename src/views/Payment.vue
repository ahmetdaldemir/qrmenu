<template>
  <div class="payment-container">
    <div class="payment-card">
      <div class="payment-header">
        <h1>Ödeme</h1>
        <p class="payment-subtitle">Lütfen ödeme bilgilerinizi giriniz.</p>
      </div>

      <!-- Payment Method and Amount Row -->
      <div class="payment-header-row">
        <!-- Payment Method Selection -->
        <div class="payment-methods">
          <h3>Method Seçiniz</h3>
          <div class="method-select-wrapper">
            <div class="custom-select" @click="toggleMethodDropdown">
              <div class="selected-method">
                <img v-if="selectedMethodConfig" :src="selectedMethodConfig.logo" :alt="selectedMethodConfig.name" class="method-logo-small" />
                <span v-if="selectedMethodConfig">{{ selectedMethodConfig.name }}</span>
                <span v-else>Method Seçiniz</span>
              </div>
              <div class="select-arrow" :class="{ 'rotated': showMethodDropdown }">
                <svg viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z" fill="#6366f1"/>
                </svg>
              </div>
            </div>
            <div v-if="showMethodDropdown" class="method-dropdown">
              <div
                v-for="method in availableMethods"
                :key="method.id"
                class="method-option"
                @click="selectMethod(method.id)"
              >
                <img :src="method.logo" :alt="method.name" class="method-logo-small" />
                <span>{{ method.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Amount Section -->
        <div class="form-section">
          <label class="form-label">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#6366f1"/>
            </svg>
            Tutar
          </label>
          <div class="amount-input-wrapper">
            <input
              v-model.number="form.amount"
              type="number"
              placeholder="Tutar"
              class="amount-input"
              min="0"
              step="0.01"
              required
            />
            <span class="currency-symbol">€</span>
          </div>
        </div>
      </div>

      <form @submit.prevent="handlePayment" class="payment-form">

        <!-- Card Number Section -->
        <div class="form-section">
          <label class="form-label">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" fill="#6366f1"/>
            </svg>
            Kart Numarası
          </label>
          <input
            v-model="form.cardNumber"
            type="text"
            placeholder="Kart Numarası"
            class="form-input"
            maxlength="19"
            @input="formatCardNumber"
            required
          />
          <div class="card-icons">
            <img src="/visa.svg" alt="Visa" class="card-icon" />
            <img src="/mastercard.svg" alt="Mastercard" class="card-icon" />
          </div>
        </div>

        <!-- Card Holder Section -->
        <div class="form-section">
          <label class="form-label">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#6366f1"/>
            </svg>
            Kart Üzerindeki İsim
          </label>
          <input
            v-model="form.cardHolder"
            type="text"
            placeholder="Kart Üzerindeki İsim"
            class="form-input"
            required
          />
        </div>

        <!-- Expiry and CVV Section -->
        <div class="form-row" style="display: flex; flex-direction: row; gap: 1rem;">
          <div class="form-section" style="width: 48%;">
            <label class="form-label">
              <svg class="icon" viewBox="0 0 24 24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="#6366f1"/>
              </svg>
              SKT
            </label>
            <input
              v-model="form.expiry"
              type="text"
              placeholder="Son Kullanma Tarihi"
              class="form-input"
              maxlength="5"
              @input="formatExpiry"
              required
            />
          </div>

          <div class="form-section" style="width: 48%;">
            <label class="form-label">
              <svg class="icon" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="#6366f1"/>
              </svg>
                CVV
            </label>
            <input
              v-model="form.cvv"
              type="text"
              placeholder="CVV"
              class="form-input"
              maxlength="4"
              @input="validateCVV"
              required
            />
          </div>
        </div>

        <!-- Security Notice -->
        <div class="security-notice">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="#10b981"/>
          </svg>
          <span>Güvenlik Notu</span>
        </div>

        <!-- Submit Button -->
        <button type="submit" :disabled="loading || !isFormValid" class="submit-button">
          <svg v-if="loading" class="loading-spinner" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#fff"/>
          </svg>
          <svg v-else class="icon" viewBox="0 0 24 24">
            <path d="M12 17a2 2 0 002-2v-2a2 2 0 10-4 0v2a2 2 0 002 2zm6-6V9a6 6 0 10-12 0v2a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2zm-8-2a4 4 0 118 0v2H8V9z" fill="#fff"/>
          </svg>
          {{ loading ? 'İşleniyor...' : 'Ödeme Yap' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { API_URL } from '../constants'
import { useTranslation } from '../composables/useTranslation'
import { getAvailablePaymentMethods } from '../services/payment/config'
import type { PaymentMethod } from '../services/payment/types'
import { PayPalPaymentService } from '../services/payment/paypal'
import { StripePaymentService } from '../services/payment/stripe'
import { FinansbankPaymentService } from '../services/payment/finansbank'
import { IsbankPaymentService } from '../services/payment/isbank'

const router = useRouter()
const { t } = useTranslation()
const loading = ref(false)
const selectedMethod = ref<PaymentMethod>('stripe')
const paymentService = ref<any>(null)
const showMethodDropdown = ref(false)

const form = reactive({
  amount: 0,
  cardNumber: '',
  cardHolder: '',
  expiry: '',
  cvv: ''
})

const availableMethods = computed(() => getAvailablePaymentMethods())
const selectedMethodConfig = computed(() => 
  availableMethods.value.find(method => method.id === selectedMethod.value)
)

function toggleMethodDropdown() {
  showMethodDropdown.value = !showMethodDropdown.value
}

function selectMethod(method: PaymentMethod) {
  selectedMethod.value = method
  showMethodDropdown.value = false
  selectPaymentMethod(method)
}

async function selectPaymentMethod(method: PaymentMethod) {
  selectedMethod.value = method
  
  // Payment service oluştur
  switch (method) {
    case 'paypal':
      paymentService.value = new PayPalPaymentService()
      break
    case 'stripe':
      paymentService.value = new StripePaymentService()
      break
    case 'finansbank':
      paymentService.value = new FinansbankPaymentService()
      break
    case 'isbank':
      paymentService.value = new IsbankPaymentService()
      break
    default:
      throw new Error(`Unsupported payment method: ${method}`)
  }
  
  // Payment service'i initialize et
  try {
    await paymentService.value.initialize()
  } catch (error) {
    console.error(`Failed to initialize ${method} payment service:`, error)
  }
}

onMounted(async () => {
  // Varsayılan ödeme yöntemini seç ve initialize et
  await selectPaymentMethod(selectedMethod.value)
})

function formatCardNumber() {
  // Remove all non-digits
  let value = form.cardNumber.replace(/\D/g, '')
  
  // Add spaces every 4 digits
  value = value.replace(/(\d{4})(?=\d)/g, '$1 ')
  
  form.cardNumber = value
}

function formatExpiry() {
  // Remove all non-digits
  let value = form.expiry.replace(/\D/g, '')
  
  // Add slash after 2 digits
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2)
  }
  
  form.expiry = value
}

function validateCVV() {
  // Remove all non-digits
  form.cvv = form.cvv.replace(/\D/g, '')
}

const isFormValid = computed(() => {
  return (
    form.amount > 0 &&
    form.cardNumber.replace(/\s/g, '').length >= 13 &&
    form.cardHolder.trim().length > 0 &&
    form.expiry.length === 5 &&
    form.cvv.length >= 3
  )
})

async function handlePayment() {
  if (!isFormValid.value) {
    Swal.fire({
      icon: 'error',
      title: t('payment.validationError'),
      text: t('payment.pleaseCheckFields'),
      confirmButtonText: 'Tamam'
    })
    return
  }

  if (!paymentService.value) {
    await selectPaymentMethod(selectedMethod.value)
  }

  try {
    loading.value = true
    
    const paymentRequest = {
      amount: form.amount,
      currency: 'EUR',
      cardNumber: form.cardNumber,
      cardHolder: form.cardHolder,
      expiry: form.expiry,
      cvv: form.cvv,
      description: `Payment for ${form.amount}€`,
      returnUrl: `${window.location.origin}/payment/success`,
      cancelUrl: `${window.location.origin}/payment/cancel`
    }

    console.log('Processing payment with:', selectedMethod.value)
    const result = await paymentService.value.processPayment(paymentRequest)
    
    if (result.success) {
      if (result.html) {
        // 3D Secure HTML'i göster
        const newWindow = window.open('', '_blank')
        if (newWindow) {
          newWindow.document.write(result.html)
          newWindow.document.close()
        } else {
          document.write(result.html)
        }
      } else if (result.redirectUrl) {
        // PayPal gibi redirect URL'leri
        window.location.href = result.redirectUrl
      } else {
        // Başarılı ödeme
        Swal.fire({
          icon: 'success',
          title: t('payment.success'),
          text: t('payment.paymentSuccess'),
          confirmButtonText: 'Tamam'
        }).then(() => {
          router.push('/success')
        })
      }
    } else {
      throw new Error(result.error || 'Payment failed')
    }
  } catch (error) {
    console.error('Payment error:', error)
    Swal.fire({
      icon: 'error',
      title: t('payment.error'),
      text: (error as Error).message || t('payment.paymentFailed'),
      confirmButtonText: 'Tamam'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.payment-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.payment-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.payment-header {
  text-align: center;
  margin-bottom: 2rem;
}

.payment-header h1 {
  color: #1f2937;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.payment-subtitle {
  color: #6b7280;
  font-size: 1rem;
}

.payment-header-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.payment-methods {
  margin-bottom: 0;
}

.payment-methods h3 {
  color: #374151;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.method-select-wrapper {
  position: relative;
  width: 100%;
}

.custom-select {
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  background: #f9fafb;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.custom-select:hover {
  border-color: #6366f1;
  background: #f0f0ff;
}

.selected-method {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.method-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  margin-top: 4px;
  box-shadow: 0 4px 12px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.method-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 600;
}

.method-option:hover {
  background-color: #f3f4f6;
}

.method-logo-small {
  width: 6rem;
  height: 1.2rem;
  object-fit: contain;
  vertical-align: middle;
}

.select-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.select-arrow.rotated {
  transform: rotate(180deg);
}

.select-arrow svg {
  width: 1.2rem;
  height: 1.2rem;
  color: #6366f1;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
}

.icon {
  width: 1.2rem;
  height: 1.2rem;
}

.form-input {
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s;
  background: #f9fafb;
}

.form-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  background: white;
}

.amount-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.amount-input {
  padding: 1rem;
  padding-right: 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.2s;
  background: #f9fafb;
  width: 100%;
}

.amount-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  background: white;
}

.currency-symbol {
  position: absolute;
  right: 1rem;
  color: #6b7280;
  font-weight: 600;
  font-size: 1.2rem;
}

.card-icons {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.card-icon {
  width: 2rem;
  height: 1.2rem;
  object-fit: contain;
}

.security-notice {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 12px;
  color: #0369a1;
  font-size: 0.9rem;
}

.submit-button {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Mobile Responsive */
@media (max-width: 640px) {
  .payment-card {
    padding: 1.5rem;
    margin: 1rem;
  }
  
  .payment-header h1 {
    font-size: 1.5rem;
  }
  
  .payment-header-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .custom-select {
    padding: 0.875rem 2.5rem 0.875rem 0.875rem;
    font-size: 0.95rem;
  }
  
  .method-logo-small {
    width: 6rem;
    height: 2rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .form-input {
    padding: 0.875rem;
    font-size: 0.95rem;
  }
  
  .amount-input {
    padding: 0.875rem;
    padding-right: 3rem;
    font-size: 1.1rem;
  }
  
  .submit-button {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .payment-container {
    padding: 0.5rem;
  }
  
  .payment-card {
    padding: 1rem;
  }
  
  .payment-form {
    gap: 1rem;
  }
}
</style> 