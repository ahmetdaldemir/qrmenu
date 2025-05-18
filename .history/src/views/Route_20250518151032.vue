<template>
  <div class="route">
    <div class="header header-icon-center">
      <a href="/" class="header-icon header-icon-1" data-back-button>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" stroke="#e74c3c" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <a href="#" class="header-title">{{ t('route') }}</a>
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
          :src="`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(restaurantAddress)}`">
        </iframe>
      </div>

      <div class="address-info">
        <h2>{{ t('address') }}</h2>
        <p>{{ restaurantAddress }}</p>
        <div class="contact-info">
          <div class="info-item">
            <i class="fas fa-phone"></i>
            <span>+90 555 123 4567</span>
          </div>
          <div class="info-item">
            <i class="fas fa-envelope"></i>
            <span>info@bogazrestaurant.com</span>
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
import { ref } from 'vue'

 
const selectedLang = ref(localStorage.getItem('lang') || 'en')

const restaurantAddress = 'Boğaz Restaurant, İstanbul, Türkiye'

const translations = {
  route: { en: 'Route', tr: 'Yol Tarifi', ru: 'Маршрут', ar: 'الاتجاهات' },
  address: { en: 'Our Address', tr: 'Adresimiz', ru: 'Наш адрес', ar: 'عنواننا' },
  workingHours: { en: 'Mon-Sun: 10:00 - 23:00', tr: 'Pzt-Paz: 10:00 - 23:00', ru: 'Пн-Вс: 10:00 - 23:00', ar: 'الاثنين-الأحد: 10:00 - 23:00' }
}

const t = (key: keyof typeof translations) => translations[key][selectedLang.value as keyof typeof translations.route]
</script>

<style scoped>
.route {
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.map-container {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 30px;
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