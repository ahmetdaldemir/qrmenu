<template>
  <div class="home">
    <div class="language-select">
      <button v-for="lang in languages" :key="lang.id" :class="['lang-btn', { active: selectedLang === lang.code }]" @click="setLang(lang.id,lang.code)" :aria-label="lang.name">
        <span v-if="lang.flag">
          <img :src="`/flags/${lang.flag}`" :alt="lang.name" class="lang-flag" />
        </span>
        <span v-else>{{ lang.name }}</span>
      </button>
    </div>
    <div class="hero">
      <div class="overlay"></div>
      <header class="header">
        <img src="/logo.png" alt="Logo" class="logo" />
        <h1 class="restaurant-name">Boğaz Restaurant</h1>
      </header>
      <div class="content" style="top: 10px !important;">
        <div class="buttons">
          <router-link to="/menu" class="btn main">{{ t('menu') }}</router-link>
          <router-link to="/reservation" class="btn secondary">{{ t('reservation') }}</router-link>
          <router-link to="/route" class="btn main">{{ t('route') }}</router-link>
          <router-link to="/rate-us" class="btn secondary">{{ t('rateUs') }}</router-link>
          <router-link to="/souvenirs" class="btn main">{{ t('souvenirs') }}</router-link>
        </div>
      </div>
    </div>
    <footer class="social-media">
      <a href="#" class="social-icon" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
      <a href="#" class="social-icon" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
      <a href="#" class="social-icon" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { API_URL, API_ENDPOINTS } from '../constants'
import axiosInstance from '../utils/axios'

type Language = {
  id: number
  name: string
  code: string
  flag?: string
  createdAt?: string
  updatedAt?: string
}

const loading = ref(false)
const error = ref<string | null>(null)
const languages = ref<Language[]>([])

const fetchLanguages = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axiosInstance.get(`${API_URL}${API_ENDPOINTS.LANGUAGES}`)
    languages.value = response.data
  } catch (err) {
    error.value = 'Failed to fetch categories'
    console.error(err)
  } finally {
    loading.value = false
  }
}


const selectedLang = ref(localStorage.getItem('langId') || '1')
selectedLang.value = languages.value.find(lang => lang.id === parseInt(selectedLang.value))?.code || 'en'

const setLang = (id: number, code: string) => {
  selectedLang.value = code
  localStorage.setItem('langId', id.toString())
}


const translations = {
  menu: { en: 'Menu', tr: 'Menü', ru: 'Меню', ar: 'القائمة' },
  reservation: { en: 'Reservation', tr: 'Rezervasyon Yap', ru: 'Бронирование', ar: 'الحجز' },
  route: { en: 'Route', tr: 'Yol Tarifi', ru: 'Маршрут', ar: 'الاتجاهات' },
  rateUs: { en: 'Rate Us', tr: 'Bizi Değerlendir', ru: 'Оцените нас', ar: 'قيمنا' },
  souvenirs: { en: 'Souvenirs', tr: 'Sovlar', ru: 'Сувениры', ar: 'الهدايا التذكارية' }
}
const t = (key: keyof typeof translations) => translations[key][selectedLang.value as keyof typeof translations.menu]

onMounted(() => {
  fetchLanguages()
})
</script>

<style scoped>
:global(html), :global(body) {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}

.lang-flag {
  width: 24px;
  height: 24px;
  object-fit: contain;
  border-radius: 50%;
  margin-right: 4px;
  vertical-align: middle;
}

.home {
  min-height: 100vh;
  min-width: 100vw;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #000;
  margin: 0;
  padding: 0;
}

.hero {
  flex: 1;
  width: 100vw;
  height: 100vh;
  background-image: url('/restaurant-bg.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1;
}

.header {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.logo {
  width: 90px;
  height: 90px;
  object-fit: contain;
  border-radius: 50%;
  background: rgba(255,255,255,0.8);
  box-shadow: 0 2px 16px rgba(0,0,0,0.15);
  margin-bottom: 1rem;
}

.restaurant-name {
  color: #fff;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-shadow: 0 2px 12px #000;
  margin: 0;
}

.content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
}

.btn {
  padding: 1.1rem 2.5rem;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  outline: none;
  transition: background 0.3s, color 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 12px rgba(0,0,0,0.12);
  text-decoration: none;
  display: inline-block;
}

.btn.main {
  background: linear-gradient(90deg, #e74c3c 60%, #f39c12 100%);
  color: #fff;
}

.btn.main:hover {
  background: linear-gradient(90deg, #c0392b 60%, #e67e22 100%);
}

.btn.secondary {
  background: rgba(255,255,255,0.9);
  color: #e74c3c;
  border: 2px solid #e74c3c;
}

.btn.secondary:hover {
  background: #e74c3c;
  color: #fff;
}

.social-media {
  padding: 1.2rem 0 1.5rem 0;
  background: transparent;
  display: flex;
  justify-content: center;
  gap: 2rem;
  z-index: 3;
}

.social-icon {
  color: #fff;
  font-size: 2rem;
  transition: color 0.3s, transform 0.3s;
  text-shadow: 0 2px 8px #000;
}

.social-icon:hover {
  color: #e74c3c;
  transform: scale(1.15);
}

.language-select {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 10;
  display: flex;
  gap: 0.5rem;
  background: rgba(255,255,255,0.85);
  border-radius: 8px;
  padding: 0.3rem 0.7rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.lang-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s, transform 0.2s;
  padding: 0 0.2rem;
}
.lang-btn.active {
  opacity: 1;
  transform: scale(1.2);
  font-weight: bold;
}

@media (max-width: 600px) {
  .header {
    margin-bottom: 1rem;
  }
  .restaurant-name {
    font-size: 1.3rem;
  }
  .logo {
    width: 60px;
    height: 60px;
  }
  .buttons {
    flex-direction: column;
    gap: 1rem;
  }
  .btn {
    width: 90vw;
    max-width: 320px;
    font-size: 1rem;
    padding: 1rem 0;
  }
  .social-media {
    gap: 1.2rem;
    padding-bottom: 1rem;
  }
}
</style> 