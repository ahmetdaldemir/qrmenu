import axiosInstance from '../utils/axios'
import { API_URL, API_ENDPOINTS } from '../constants'

export interface CategoryTranslation {
  name: string
  description?: string
}

export interface Category {
  id: number
  name: string
  description?: string
  image?: string
  translations: {
    [key: string]: {
      name: string
      description?: string
    }
  }
}

export const getCategories = async (tenantId: string): Promise<Category[]> => {
  try {
    console.log('Fetching categories with tenant_id:', tenantId)
    const response = await axiosInstance.get(`${API_URL}${API_ENDPOINTS.MENU_CATEGORIES}`, {
      params: {
        tenant_id: tenantId
      }
    })
    console.log('API Response:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export const getCategoryTranslation = (category: Category, languageId: string): CategoryTranslation => {
  return category.translations[languageId] || category.translations['1'] // Fallback to English (1)
} 