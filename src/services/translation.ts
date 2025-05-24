import axiosInstance from '../utils/axios'

const API_URL = 'https://repo.agencymanagerpro.com'

// Tek bir metni çevir
export const translateText = async (text: string, targetLang: string): Promise<string> => {
  if (!text || targetLang === 'tr') return text

  try {
    const response = await axiosInstance.post(`${API_URL}/common/translate`, {
      text,
      targetLang
    })

    return response.data.translatedText || text
  } catch (error) {
    console.error('Translation error:', error)
    return text
  }
}

// Bir objeyi çevir
export const translateObject = async <T extends { name: string; description?: string }>(
  item: T,
  targetLang: string
): Promise<T> => {
  if (targetLang === 'tr') return item

  const [translatedName, translatedDescription] = await Promise.all([
    translateText(item.name, targetLang),
    item.description ? translateText(item.description, targetLang) : Promise.resolve(item.description)
  ])

  return {
    ...item,
    name: translatedName,
    description: translatedDescription
  }
}

// Bir diziyi çevir
export const translateArray = async <T extends { name: string; description?: string }>(
  items: T[],
  targetLang: string
): Promise<T[]> => {
  if (targetLang === 'tr') return items
  return Promise.all(items.map(item => translateObject(item, targetLang)))
} 