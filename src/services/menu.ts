import axiosInstance from '../utils/axios'
import { API_URL, API_ENDPOINTS } from '../constants'

export interface MenuItemTranslation {
  name: string
  description: string
}

export interface MenuItem {
  id: number
  image: string
  price: number
  categoryId: number
  isActive: boolean
  translations: {
    [key: string]: MenuItemTranslation
  }
  createdAt: string
  updatedAt: string
}



export const getMenuItems = async (categoryId: number): Promise<MenuItem[]> => {
  try {
    const response = await axiosInstance.get(`${API_URL}${API_ENDPOINTS.MENU_ITEMS}`, {
      params: {
        category_id: categoryId
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return []
  }
}

export const getMenuItemTranslation = (item: MenuItem, languageId: string): MenuItemTranslation => {
  return item.translations[languageId] || item.translations['1'] // Fallback to English
} 