<template>
  <div class="menu-items-list">
    <div v-if="loading" class="loading"><LoadingSpinner /></div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div
        v-for="item in menuItems"
        :key="item.id"
        class="menu-item-card"
      >
        <img :src="`https://repo.agencymanagerpro.com${item.image}`" :alt="item.translations[languageId]?.name" class="menu-item-image" />
        <div class="menu-item-info">
          <h3>{{ item.translations[languageId]?.name }}</h3>
          <p class="price">{{ item.price }} ₺</p>
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

const menuItems = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const fetchMenuItems = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axiosInstance.get(`${API_URL}${API_ENDPOINTS.MENU_ITEMS}`, {
      params: { category_id: props.categoryId }
    })
    menuItems.value = response.data
  } catch (err) {
    error.value = 'Failed to fetch menu items'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchMenuItems)
watch(() => props.categoryId, fetchMenuItems)
</script>

<style scoped>
.menu-items-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  padding: 2rem 0;
  min-height: 400px;
  transition: min-height 0.2s;
}
.menu-item-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem 1.2rem;
  margin-bottom: 1.2rem;
  width: 95vw;
  max-width: 420px;
  min-height: 100px;
  transition: box-shadow 0.2s, transform 0.2s;
}
.menu-item-card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.13);
  transform: translateY(-2px) scale(1.03);
}
.menu-item-image {
  width: 70px;
  height: 70px;
  object-fit: contain;
  border-radius: 10px;
  background: #f3f3f3;
  flex-shrink: 0;
}
.menu-item-info {
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.menu-item-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.2rem 0;
}
.price {
  color: #e67e22;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
}
.loading, .error {
  text-align: center;
  padding: 2rem;
}
.error {
  color: red;
}
</style> 