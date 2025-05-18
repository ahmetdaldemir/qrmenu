<template>
  <div class="rate-us">
    <div class="header header-icon-center">
      <a href="/" class="header-icon header-icon-1" data-back-button>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" stroke="#e74c3c" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <a href="#" class="header-title">{{ t('rateUs') }}</a>
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
import { ref } from 'vue'
import axios from 'axios'

const API_URL = 'https://agencymanager.onrender.com'

const languages = [
  { code: 'en', label: 'EN', icon: '🇬🇧' },
  { code: 'tr', label: 'TR', icon: '🇹🇷' },
  { code: 'ru', label: 'RU', icon: '🇷🇺' },
  { code: 'ar', label: 'AR', icon: '🇸🇦' },
]
const selectedLang = ref(localStorage.getItem('lang') || 'en')

const rating = ref(0)
const foodRating = ref(0)
const serviceRating = ref(0)
const ambianceRating = ref(0)
const comment = ref('')
const name = ref('')
const email = ref('')

const translations = {
  rateUs: { en: 'Rate Us', tr: 'Bizi Değerlendir', ru: 'Оцените нас', ar: 'قيمنا' },
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
    await axios.post(`${API_URL}/feedback`, {
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
    
    alert(t('submitSuccess'))
  } catch (error) {
    console.error('Error submitting feedback:', error)
    alert(t('submitError'))
  }
}
</script>

<style scoped>
.rate-us {
  min-height: 100vh;
  background: #f5f5f5;
  padding-top: 56px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 56px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  z-index: 1100;
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 72px;
}

.feedback-form {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
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
    padding-top: 72px;
  }
  
  .feedback-form {
    padding: 16px;
  }
  
  .star-btn {
    font-size: 20px;
  }
}

@supports (padding-top: env(safe-area-inset-top)) {
  .content {
    padding-top: calc(72px + env(safe-area-inset-top));
  }
}
</style> 