<template>
  <div class="rate-us">
    <div class="top-bar">
      <button class="back-btn" @click="goBack">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="brand">
        <img v-if="tenant?.logoUrl" :src="`https://repo.agencymanagerpro.com/${tenant.logoUrl}`" alt="Logo" class="logo" />
      </div>
    </div>


    <div class="content">
      <div class="feedback-form">
        <h2>{{ t('feedbackTitle') }}</h2>
        <p class="subtitle">{{ t('feedbackSubtitle') }}</p>

        <form @submit.prevent="submitFeedback">
          <div class="rating-section">
            <h3>{{ t('overallRating') }}</h3>
            <div class="stars">
              <button 
                v-for="star in 5" 
                :key="star"
                type="button"
                class="star-btn"
                :class="{ active: rating >= star }"
                @click="rating = star"
              >
                <i class="fas fa-star"></i>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="food">{{ t('foodRating') }}</label>
            <div class="stars">
              <button 
                v-for="star in 5" 
                :key="star"
                type="button"
                class="star-btn"
                :class="{ active: foodRating >= star }"
                @click="foodRating = star"
              >
                <i class="fas fa-star"></i>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="service">{{ t('serviceRating') }}</label>
            <div class="stars">
              <button 
                v-for="star in 5" 
                :key="star"
                type="button"
                class="star-btn"
                :class="{ active: serviceRating >= star }"
                @click="serviceRating = star"
              >
                <i class="fas fa-star"></i>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="ambiance">{{ t('ambianceRating') }}</label>
            <div class="stars">
              <button 
                v-for="star in 5" 
                :key="star"
                type="button"
                class="star-btn"
                :class="{ active: ambianceRating >= star }"
                @click="ambianceRating = star"
              >
                <i class="fas fa-star"></i>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="comment">{{ t('comment') }}</label>
            <textarea
              id="comment"
              v-model="comment"
              :placeholder="t('commentPlaceholder')"
              rows="4"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="name">{{ t('name') }}</label>
            <input
              type="text"
              id="name"
              v-model="name"
              :placeholder="t('namePlaceholder')"
            >
          </div>

          <div class="form-group">
            <label for="email">{{ t('email') }}</label>
            <input
              type="email"
              id="email"
              v-model="email"
              :placeholder="t('emailPlaceholder')"
            >
          </div>

          <button type="submit" class="submit-btn">{{ t('submit') }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '../utils/axios'
import { API_URL, API_ENDPOINTS } from '../constants'
import swal from 'sweetalert2'

const tenant = ref<any>(null)
const tenantId = localStorage.getItem('tenant_id') || '1'
const router = useRouter()

const selectedLang = ref(localStorage.getItem('lang') || 'en')

const rating = ref(0)
const foodRating = ref(0)
const serviceRating = ref(0)
const ambianceRating = ref(0)
const comment = ref('')
const name = ref('')
const email = ref('')

const translations = {
  rateUs: { en: 'Rate Us', tr: 'Deneyiminizi Paylaşın', ru: 'Оцените нас', ar: 'قيمنا' },
  feedbackTitle: { en: 'Share Your Experience', tr: 'Deneyiminizi Paylaşın', ru: 'Поделитесь своим опытом', ar: 'شارك تجربتك' },
  feedbackSubtitle: { en: 'Your feedback helps us improve our service', tr: 'Geri bildiriminiz hizmetimizi geliştirmemize yardımcı olur', ru: 'Ваш отзыв помогает нам улучшить наш сервис', ar: 'ملاحظاتك تساعدنا على تحسين خدمتنا' },
  overallRating: { en: 'Overall Rating', tr: 'Genel Değerlendirme', ru: 'Общая оценка', ar: 'التقييم العام' },
  foodRating: { en: 'Food Rating', tr: 'Yemek Değerlendirmesi', ru: 'Оценка еды', ar: 'تقييم الطعام' },
  serviceRating: { en: 'Service Rating', tr: 'Servis Değerlendirmesi', ru: 'Оценка обслуживания', ar: 'تقييم الخدمة' },
  ambianceRating: { en: 'Ambiance Rating', tr: 'Ortam Değerlendirmesi', ru: 'Оценка атмосферы', ar: 'تقييم الأجواء' },
  comment: { en: 'Your Comments', tr: 'Yorumlarınız', ru: 'Ваши комментарии', ar: 'تعليقاتك' },
  commentPlaceholder: { en: 'Tell us about your experience...', tr: 'Deneyiminizi anlatın...', ru: 'Расскажите о своем опыте...', ar: 'أخبرنا عن تجربتك...' },
  name: { en: 'Your Name', tr: 'Adınız', ru: 'Ваше имя', ar: 'اسمك' },
  namePlaceholder: { en: 'Enter your name', tr: 'Adınızı girin', ru: 'Введите ваше имя', ar: 'أدخل اسمك' },
  email: { en: 'Your Email', tr: 'E-posta Adresiniz', ru: 'Ваш email', ar: 'بريدك الإلكتروني' },
  emailPlaceholder: { en: 'Enter your email', tr: 'E-posta adresinizi girin', ru: 'Введите ваш email', ar: 'أدخل بريدك الإلكتروني' },
  submit: { en: 'Submit Feedback', tr: 'Geri Bildirim Gönder', ru: 'Отправить отзыв', ar: 'إرسال الملاحظات' },
  submitSuccess: { en: 'Thank you for your feedback!', tr: 'Geri bildiriminiz için teşekkürler!', ru: 'Спасибо за ваш отзыв!', ar: 'شكرا على ملاحظاتك!' },
  submitError: { en: 'Failed to submit feedback. Please try again.', tr: 'Geri bildirim gönderilemedi. Lütfen tekrar deneyin.', ru: 'Не удалось отправить отзыв. Пожалуйста, попробуйте снова.', ar: 'فشل في إرسال الملاحظات. يرجى المحاولة مرة أخرى.' }
}

const t = (key: keyof typeof translations) => translations[key][selectedLang.value as keyof typeof translations.rateUs]

const submitFeedback = async () => {
  try {
    await axiosInstance.post(`${API_URL}${API_ENDPOINTS.FEEDBACKS}`, {
      rating: rating.value,
      foodRating: foodRating.value,
      serviceRating: serviceRating.value,
      ambianceRating: ambianceRating.value,
      comment: comment.value,
      name: name.value,
      email: email.value
    })
    
    // Reset form
    rating.value = 0
    foodRating.value = 0
    serviceRating.value = 0
    ambianceRating.value = 0
    comment.value = ''
    name.value = ''
    email.value = ''
    
    swal.fire({
      title: t('submitSuccess'),
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#e74c3c'
    })
  } catch (error) {
    console.error('Error submitting feedback:', error)
    swal.fire({
      title: t('submitError'),
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#e74c3c'
    })
  }
}
const fetchTenant = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/tenants/${tenantId}`)
    tenant.value = response.data
  } catch (error) {
    console.error('Error fetching tenant:', error)
  }
}
const goBack = () => {
  router.back()
}

onMounted(() => {
  fetchTenant()

})
</script>

<style scoped>
.rate-us {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 0.5rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
}

.brand {
  display: flex;
  align-items: right;
  gap: 1rem;
}

.logo {
  max-width: 80px;
  border-radius: 8px;
  background: #fff;
  object-fit: contain;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 56px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.header-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.content {
  flex: 1;
  width: 100%;
  padding: 20px;
  padding-bottom: 32px;
  overflow-y: auto;
  margin: 0 auto;
  max-width: 800px;
}

.feedback-form {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.feedback-form h2 {
  color: #e74c3c;
  margin-bottom: 10px;
  font-size: 24px;
  text-align: center;
}

.subtitle {
  color: #666;
  text-align: center;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  color: #333;
  font-weight: 500;
}

.stars {
  display: flex;
  gap: 10px;
}

.star-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #ddd;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0;
}

.star-btn.active {
  color: #f1c40f;
}

.star-btn:hover {
  color: #f1c40f;
}

input, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #e74c3c;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(90deg, #e74c3c 60%, #f39c12 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: linear-gradient(90deg, #c0392b 60%, #e67e22 100%);
}

@media (max-width: 768px) {
  .content {
    padding: 15px;
    padding-bottom: 32px;
  }
  .feedback-form {
    padding: 16px;
    max-width: 100%;
  }
  .star-btn {
    font-size: 20px;
  }
}

/* iOS için güvenli alan desteği */
@supports (padding-top: env(safe-area-inset-top)) {
  .header {
    padding-top: env(safe-area-inset-top);
    height: calc(56px + env(safe-area-inset-top));
  }

}


.rate-us .content {
  position: relative;
}
</style>