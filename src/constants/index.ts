// API URLs
export const API_URL = 'https://orientbosphorus.com/api/agency'

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/common/login',
  
  // Tenant
  TENANT: (id: string) => `/tenants/${id}`,
  
  // Menu
  MENU_CATEGORIES: '/menucategories',
  MENU_ITEMS: '/menus',
  
  // Languages
  LANGUAGES: '/languages',
  
  // Feedback
  FEEDBACK: '/feedbacks',
  
  // Translation
  TRANSLATE: '/common/translate'
}

// File Storage URLs
export const FILE_STORAGE_URL = 'https://orientbosphorus.com/api/agency' 