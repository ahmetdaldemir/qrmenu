<template>
  <div class="category-list">
    <div v-if="loading" class="loading">
      <LoadingSpinner />
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="categories">
      <div 
        v-for="category in categories" 
        :key="category.id" 
        class="category-card"
        @click="selectCategory(category.id)"
      >
        <img :src="`${API_URL}${category.image}`" :alt="category.translations[languageId]?.name" class="category-image" />
        <div class="category-info">
          <h3>{{ category.translations[languageId]?.name }}</h3>
          <p>{{ category.translations[languageId]?.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategoryStore } from '../stores/category'
import LoadingSpinner from './LoadingSpinner.vue'
import { API_URL } from '../constants'

const props = defineProps<{
  tenantId: string
  languageId: string
}>()

const emit = defineEmits<{
  (e: 'select', categoryId: number): void
}>()

const categoryStore = useCategoryStore()
const { categories, loading, error, fetchCategories } = categoryStore

const selectCategory = (categoryId: number) => {
  emit('select', categoryId)
}

onMounted(() => {
  fetchCategories(props.tenantId)
})
</script>

<style scoped>
.category-list {
  padding: 1rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
}

.error {
  color: red;
}

.categories {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  padding: 2rem 0;
  min-height: 400px;
  transition: min-height 0.2s;
}

.category-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.2rem 1.5rem;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  margin-bottom: 1.5rem;
  width: 95vw;
  max-width: 480px;
  min-height: 120px;
}

.category-card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.13);
  transform: translateY(-2px) scale(1.03);
}

.category-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 12px;
  background: #f3f3f3;
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
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 0.3rem 0;
}

.category-info p {
  color: #888;
  font-size: 1rem;
  margin: 0;
}
</style> 