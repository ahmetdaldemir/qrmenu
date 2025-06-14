<template>
  <div class="menu-bg">
    <div class="top-bar">
      <button class="back-btn" @click="goBack">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="brand">
        <img v-if="tenant?.logoUrl" :src="`https://repo.agencymanagerpro.com/${tenant.logoUrl}`" alt="Logo" class="logo" />
      </div>
    </div>

    <div v-if="!selectedCategory" class="categories-section">
      <div v-if="loading" class="loading"><LoadingSpinner /></div>

      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      
      <div v-else class="categories-grid">
        <div 
          v-for="category in categories" 
          :key="category.id" 
          class="category-card"
          @click="selectCategory(category.id)"
        >
          <div class="category-card-inner">
            <img :src="`https://repo.agencymanagerpro.com${category.image}`" :alt="category.translations[selectedLanguage]?.name" class="category-image" />
            <div class="category-info">
              <h3>{{ category.translations[selectedLanguage]?.name }}</h3>
              <p>{{ category.translations[selectedLanguage]?.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="menu-items-section">
      <div class="back-button" @click="selectedCategory = null">
        <i class="fas fa-arrow-left"></i> Back to Categories
      </div>
      <MenuItems 
        :category-id="selectedCategory" 
        :language-id="selectedLanguage" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '../utils/axios'
import MenuItems from '../components/MenuItems.vue'
import type { Category } from '../services/category'
import { API_URL, API_ENDPOINTS } from '../constants'

const router = useRouter()
const tenantId = localStorage.getItem('tenantId') || 'e1f287d9-7be1-46d1-bcf5-782d93d57f33'
const selectedLanguage = localStorage.getItem('langId') || '1'
const tenant = ref<any>(null)
const selectedCategory = ref<number | null>(null)
const categories = ref<Category[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
import LoadingSpinner from '../components/LoadingSpinner.vue'

const fetchTenant = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/tenants/${tenantId}`)
    tenant.value = response.data
  } catch (error) {
    console.error('Error fetching tenant:', error)
  }
}

const fetchCategories = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axiosInstance.get(`${API_URL}${API_ENDPOINTS.MENU_CATEGORIES}`, {
      params: {
        tenant_id: tenantId
      }
    })
    categories.value = response.data
  } catch (err) {
    error.value = 'Failed to fetch categories'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const selectCategory = (categoryId: number) => {
  selectedCategory.value = categoryId
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  fetchTenant()
  fetchCategories()
})
</script>

<style scoped>
.menu-bg {
  min-height: 100vh;
  background: #f8f9fa;
}



.categories-section {
  margin-top: 1em;
}

.categories-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 0;
}

.category-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  width: 90vw;
  max-width: 480px;
  min-height: 140px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  border: none;
  padding: 0;
}

.category-card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.16);
  transform: translateY(-2px) scale(1.02);
}

.category-card-inner {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1.5rem 1.2rem;
  gap: 1.5rem;
}

.category-image {
  width: 90px;
  height: 90px;
  object-fit: contain;
  border-radius: 16px;
  background: #f3f3f3;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-info {
  flex: 1;
  text-align: left;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.category-info h3 {
  margin: 0 0 0.4rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #222;
  letter-spacing: 0.01em;
}

.category-info p {
  margin: 0;
  color: #9ca3af;
  font-size: 1.02rem;
  font-weight: 400;
  letter-spacing: 0.01em;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
}

.error {
  color: red;
}
 

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  color: #666;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #f5f5f5;
}
</style>