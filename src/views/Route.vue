<template>

  <div class="route">
    <div class="top-bar">
      <button class="back-btn" @click="goBack">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="brand">
        <img v-if="tenant?.logoUrl" :src="`https://repo.agencymanagerpro.com/${tenant.logoUrl}`" alt="Logo" class="logo" />
      </div>
    </div>

    <div class="content">
      <div class="map-container">
        <iframe
          width="100%"
          height="450"
          style="border:0"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          :src="`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.636817350508!2d28.993596!3d41.033201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab77bdf81908d%3A0x8f5f54b98efa531e!2zS2FiYXRhxZ8!5e0!3m2!1sen!2str!4v1749627351378!5m2!1sen!2str`">
        </iframe>
      </div>
      <div class="address-info">
        <h2>{{ t('address') }}</h2>
        <p>{{ restaurantAddress }}</p>
        <div class="contact-info">
          <div class="info-item">
            <i class="fas fa-phone"></i>
            <span>+905494583434</span>
          </div>
          <div class="info-item">
            <i class="fas fa-envelope"></i>
            <span>info@orienthouseistanbul.com</span>
          </div>
          <div class="info-item">
            <i class="fas fa-clock"></i>
            <span>{{ t('workingHours') }}</span>
          </div>
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

const tenant = ref<any>(null)
const tenantId = localStorage.getItem('tenantId') || '1'
const router = useRouter()

const selectedLang = ref(localStorage.getItem('lang') || 'en')

const restaurantAddress = 'Kabataş İskele, İstanbul, Türkiye'

const translations = {
  route: { en: 'Route', tr: 'Yol Tarifi', ru: 'Маршрут', ar: 'الاتجاهات' },
  address: { en: 'Our Address', tr: 'Adresimiz', ru: 'Наш адрес', ar: 'عنواننا' },
  workingHours: { en: 'Mon-Sun: 10:00 - 23:00', tr: 'Pzt-Paz: 10:00 - 23:00', ru: 'Пн-Вс: 10:00 - 23:00', ar: 'الاثنين-الأحد: 10:00 - 23:00' }
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

const t = (key: keyof typeof translations) => translations[key][selectedLang.value as keyof typeof translations.route]
onMounted(() => {
  fetchTenant()
})
</script>

<style scoped>
.route {
  min-height: 100vh;
  background: #f5f5f5;
  padding-top: 56px;
}



.map-container {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 30px;
  margin-top: 140px;
}

.address-info {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.address-info h2 {
  color: #e74c3c;
  margin-bottom: 20px;
  font-size: 24px;
}

.address-info p {
  font-size: 18px;
  color: #333;
  margin-bottom: 30px;
  line-height: 1.6;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.info-item i {
  color: #e74c3c;
  font-size: 20px;
}

.info-item span {
  font-size: 16px;
  color: #666;
}

@media (max-width: 768px) {
  .content {
    padding: 15px;
  }
  
  .address-info {
    padding: 20px;
  }
  
  .contact-info {
    grid-template-columns: 1fr;
  }
}
</style> 