<template>
  <div class="souvenirs">
    <div class="top-bar">
      <button class="back-btn" @click="goBack">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="brand">
        <img v-if="tenant?.logoUrl" :src="`https://repo.agencymanagerpro.com/${tenant.logoUrl}`" alt="Logo" class="logo" />
      </div>
    </div>

    <div class="content">
      <h1>{{ t('title') }}</h1>
      <div class="souvenirs-grid">
        <div v-for="item in souvenirs" :key="item.id" class="souvenir-card">
          <img :src="item.image" alt="orientHouse" class="souvenir-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '../utils/axios'
import { API_URL } from '../constants'

const router = useRouter()
const tenant = ref<any>(null)
const tenantId = localStorage.getItem('tenantId') || '1'
const selectedLang = ref(localStorage.getItem('lang') || 'en')

const translations = {
  title: { en: 'Souvenirs', tr: 'Sovlar', ru: 'Сувениры', ar: 'الهدايا التذكارية' }
}

const t = (key: keyof typeof translations) => translations[key][selectedLang.value as keyof typeof translations.title]

const souvenirs = [
  {
    id: 1,
    image: '/souvenirs/coffee-set.jpg'
  },
  {
    id: 2,
    image: '/souvenirs/ceramic-plate.jpg'
  },
  {
    id: 3,
    image: '/souvenirs/evil-eye.jpg'
  },
  {
    id: 4,
    image: '/souvenirs/evil-eye.jpg'
  },
  {
    id: 5,
    image: '/souvenirs/evil-eye.jpg'
  }
]

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
.souvenirs {
  min-height: 100vh;
  background: #f5f5f5;
  padding-top: 56px;
}
 
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #e74c3c;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.souvenirs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.souvenir-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.souvenir-card:hover {
  transform: translateY(-5px);
}

.souvenir-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.souvenir-info {
  padding: 1.5rem;
}

.souvenir-info h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.price {
  color: #e74c3c;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .content {
    padding: 15px;
  }
  
  .souvenirs-grid {
    grid-template-columns: 1fr;
  }
}
</style> 