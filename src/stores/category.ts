import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Category } from '../services/category'
import { getCategories } from '../services/category'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCategories = async (tenantId: string) => {
    loading.value = true
    error.value = null
    try {
      categories.value = await getCategories(tenantId)
    } catch (err) {
      error.value = 'Failed to fetch categories'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories
  }
}) 