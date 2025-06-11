// API URLs
export const API_URL = 'https://agencymanager.onrender.com'
// export const API_URL = 'http://localhost:3100' // Uncomment for local development

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
export const FILE_STORAGE_URL = 'https://repo.agencymanagerpro.com' 