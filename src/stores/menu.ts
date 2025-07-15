import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MenuItem } from '../services/menu'
import { getMenuItems } from '../services/menu'

export const useMenuStore = defineStore('menu', () => {
  const items = ref<MenuItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchMenuItems = async (categoryId: number) => {
    loading.value = true
    error.value = null
    try {
      items.value = await getMenuItems(categoryId)
    } catch (err) {
      error.value = 'Failed to fetch menu items'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    loading,
    error,
    fetchMenuItems
  }
}) 