<template>
  <div class="menu-accordion">
    <div v-if="loading" class="loading"><LoadingSpinner /></div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div
        v-for="(cat, idx) in categories"
        :key="cat.category.id"
        class="accordion-category"
      >
        <div
          class="accordion-header"
          @click="toggle(idx)"
          :class="{ open: openIndex === idx }"
        >
          {{ cat.category.name }}
        </div>
        <div v-if="openIndex === idx" class="accordion-body">
          <div
            v-for="item in cat.menus"
            :key="item.id"
            class="menu-item"
          >
            <img
              :src="`https://repo.agencymanagerpro.com${item.image}`"
              :alt="item.translations[languageId]?.name"
              class="menu-item-image"
            />
            <div class="menu-item-info">
              <h3>{{ item.translations[languageId]?.name }}</h3>
              <p class="price">{{ item.price }} €</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axiosInstance from '../utils/axios'
import { API_URL, API_ENDPOINTS } from '../constants'
import LoadingSpinner from './LoadingSpinner.vue'

const props = defineProps<{
  categoryId: number
  languageId: string
}>()

const categories = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const openIndex = ref<number | null>(null)

const fetchMenuItems = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axiosInstance.get(`${API_URL}${API_ENDPOINTS.MENU_ITEMS}`, {
      params: { 
        category_id: props.categoryId,
        language_id: props.languageId
      }
    })
    categories.value = response.data
  } catch (err) {
    error.value = 'Failed to fetch menu items'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const toggle = (idx: number) => {
  openIndex.value = openIndex.value === idx ? null : idx
}

onMounted(fetchMenuItems)
watch(() => props.categoryId, fetchMenuItems)
</script>

<style scoped>
.menu-accordion {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.accordion-category {
  margin-bottom: 1rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.accordion-category:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.accordion-header {
  cursor: pointer;
  padding: 1.2rem 1.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  background: #ffffff;
  border: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.accordion-header::after {
  content: '+';
  font-size: 1.5rem;
  color: #666;
  transition: transform 0.3s ease;
}

.accordion-header.open::after {
  transform: rotate(45deg);
}

.accordion-header.open {
  background: #f8f9fa;
  border-bottom: none;
}

.accordion-body {
  background: #ffffff;
  border: 1px solid #eee;
  border-top: none;
  border-radius: 0 0 12px 12px;
  padding: 1.5rem;
  animation: slideDown 0.3s ease-out;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background: #f8f9fa;
  transition: all 0.2s ease;
}

.menu-item:last-child {
  margin-bottom: 0;
}

.menu-item:hover {
  background: #f0f2f5;
  transform: translateX(5px);
}

.menu-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.menu-item-info {
  flex: 1;
}

.menu-item-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.price {
  color: #e67e22;
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.error {
  color: #e74c3c;
  font-weight: 500;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive tasarım için */
@media (max-width: 768px) {
  .menu-accordion {
    padding: 0.5rem;
  }
  
  .menu-item {
    padding: 0.8rem;
  }
  
  .menu-item-image {
    width: 60px;
    height: 60px;
  }
  
  .menu-item-info h3 {
    font-size: 1rem;
  }
  
  .price {
    font-size: 1.1rem;
  }
}
</style> 