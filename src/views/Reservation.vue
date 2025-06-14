<template>
  <div class="reservation-page">
    <div class="top-bar">
      <button class="back-btn" @click="goBack">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <h1>{{ t('title') }}</h1>
    </div>

    <div class="container">
      <div class="card">
        <div class="form-container">
          <ReservationForm @submit="onSubmit" />
          <div v-if="showPayment" class="payment-section">
            <div class="divider">
              <span>{{ t('paymentSection') }}</span>
            </div>
            <PaymentForm @submit="onPay" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useReservationStore } from '../stores/reservation'
import ReservationForm from '../components/ReservationForm.vue'
import PaymentForm from '../components/PaymentForm.vue'

const router = useRouter()
const reservationStore = useReservationStore()
const showPayment = ref(false)
const selectedLang = ref(localStorage.getItem('lang') || 'en')

const translations = {
  title: { 
    en: 'Reservation', 
    tr: 'Rezervasyon', 
    ru: 'Бронирование', 
    ar: 'الحجز' 
  },
  paymentSection: { 
    en: 'Payment Details', 
    tr: 'Ödeme Detayları', 
    ru: 'Детали оплаты', 
    ar: 'تفاصيل الدفع' 
  }
}

const t = (key: keyof typeof translations) => translations[key][selectedLang.value as keyof typeof translations.title]

function onSubmit(form: any) {
  reservationStore.makeReservation(form)
  showPayment.value = true
}

function onPay(payment: any) {
  reservationStore.processPayment(payment)
}

function goBack() {
  router.back()
}
</script>

<style scoped>
.reservation-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 2rem;
}

.top-bar {
  background: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #666;
  border-radius: 8px;
  transition: all 0.2s;
}

.back-btn:hover {
  background: #f0f0f0;
  color: #333;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  overflow: hidden;
}


.card {
  padding: unset !important;
}
.payment-section {
  margin-top: 2rem;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 2rem 0;
  color: #666;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #eee;
}

.divider span {
  padding: 0 1rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .container {
    padding: 0.5rem;
  }
  
  .form-container {
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.2rem;
  }
}
</style> 