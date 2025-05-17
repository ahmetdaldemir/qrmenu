<template>
  <div>
    <div class="header header-icon-center" id="main-header">
      <a href="#" class="header-icon header-icon-1" @click.prevent="goBack" data-back-button>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" stroke="#e74c3c" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <a href="#" class="header-title">{{ tMenuTitle() }}</a>
    </div>

    <div class="menu" :style="{ paddingTop: menuPaddingTop }">
      <div v-if="!selectedCategory" class="categories">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="category-card"
          @click="selectCategory(category.id)"
        >
          <div class="category-content">
            <div class="category-text">
              <div class="category-title">{{ tCategory(category.id) }}</div>
              <div class="category-desc">{{ tCategoryDesc(category.id) }}</div>
            </div>
            <i :class="categoryIcons[category.id] + ' category-icon'"></i>
          </div>
        </div>
      </div>

      <div v-else>
        <button class="back-btn" @click="selectedCategory = null">← {{ selectedLang === 'tr' ? 'Kategorilere Dön' : selectedLang === 'en' ? 'Back to Categories' : selectedLang === 'ru' ? 'Назад к категориям' : 'العودة إلى الفئات' }}</button>
        <h2 class="category-title">{{ tCategory(selectedCategory) }}</h2>
        <div class="menu-items">
          <div 
            v-for="item in filteredItems" 
            :key="item.id" 
            class="menu-item"
            @click="openModal(item)"
          >
            <img :src="item.image" :alt="item.name">
            <div class="item-info">
              <h3>{{ item.name }}</h3>
              <p class="price">{{ item.price }} TL</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="selectedItem" class="modal" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="close-btn" @click="closeModal">&times;</button>
          <img :src="selectedItem.image" :alt="selectedItem.name">
          <h2>{{ selectedItem.name }}</h2>
          <p class="description">{{ selectedItem.description }}</p>
          <p class="price">{{ selectedItem.price }} TL</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import axios from 'axios'

const API_URL = 'https://agencymanager.onrender.com'

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  categoryId: number
}

interface Category {
  id: number
  name: string
}

const languages = [
  { code: 'en', label: 'EN', icon: '🇬🇧' },
  { code: 'tr', label: 'TR', icon: '🇹🇷' },
  { code: 'ru', label: 'RU', icon: '🇷🇺' },
  { code: 'ar', label: 'AR', icon: '🇸🇦' },
]
const selectedLang = ref(localStorage.getItem('lang') || 'en')

const setLang = (code: string) => {
  selectedLang.value = code
  localStorage.setItem('lang', code)
  window.location.reload()
}

const categories = ref<Category[]>([])
const menuItems = ref<MenuItem[]>([])
const selectedCategory = ref<number | null>(null)
const selectedItem = ref<MenuItem | null>(null)

// Yeni kategoriler
const dummyCategories: Category[] = [
  { id: 1, name: 'Alkollü İçecekler' },
  { id: 2, name: 'Alkolsüz İçecekler' },
  { id: 3, name: 'Ara Sıcaklar' },
  { id: 4, name: 'Ana Yemekler' }
]

const dummyMenuItems: MenuItem[] = [
  // Alkollü İçecekler
  { id: 1, name: 'Kırmızı Şarap', description: 'Seçkin kırmızı şarap', price: 180, image: 'https://images.unsplash.com/photo-1514361892635-cebb9b6c7ca5?w=500', categoryId: 1 },
  { id: 2, name: 'Beyaz Şarap', description: 'Soğuk beyaz şarap', price: 170, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500', categoryId: 1 },
  { id: 3, name: 'Bira', description: 'Buz gibi bira', price: 90, image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=500', categoryId: 1 },
  // Alkolsüz İçecekler
  { id: 4, name: 'Ayran', description: 'Ev yapımı ayran', price: 30, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500', categoryId: 2 },
  { id: 5, name: 'Limonata', description: 'Taze limonata', price: 35, image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=500', categoryId: 2 },
  { id: 6, name: 'Türk Kahvesi', description: 'Geleneksel Türk kahvesi', price: 40, image: 'https://images.unsplash.com/photo-1517663154410-3d881b7e1e7d?w=500', categoryId: 2 },
  // Ara Sıcaklar
  { id: 7, name: 'Sigara Böreği', description: 'Peynirli çıtır börek', price: 55, image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=500', categoryId: 3 },
  { id: 8, name: 'Paçanga Böreği', description: 'Pastırmalı paçanga böreği', price: 65, image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=500', categoryId: 3 },
  { id: 9, name: 'Humus', description: 'Nohut püresi, zeytinyağı ile', price: 50, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500', categoryId: 3 },
  // Ana Yemekler
  { id: 10, name: 'Kebap', description: 'Izgara kebap, pilav ile', price: 160, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500', categoryId: 4 },
  { id: 11, name: 'Izgara Balık', description: 'Taze günlük balık', price: 210, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500', categoryId: 4 },
  { id: 12, name: 'Tavuk Şiş', description: 'Izgara tavuk şiş', price: 120, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500', categoryId: 4 }
]

// Çok dilli kategori başlıkları ve açıklamaları
const categoryTranslations: Record<number, { en: string, tr: string, ru: string, ar: string }> = {
  1: { en: 'Alcoholic Drinks', tr: 'Alkollü İçecekler', ru: 'Алкогольные напитки', ar: 'مشروبات كحولية' },
  2: { en: 'Non-Alcoholic Drinks', tr: 'Alkolsüz İçecekler', ru: 'Безалкогольные напитки', ar: 'مشروبات غير كحولية' },
  3: { en: 'Hot Starters', tr: 'Ara Sıcaklar', ru: 'Горячие закуски', ar: 'مقبلات ساخنة' },
  4: { en: 'Main Dishes', tr: 'Ana Yemekler', ru: 'Основные блюда', ar: 'الأطباق الرئيسية' }
}
const categoryDescTranslations: Record<number, { en: string, tr: string, ru: string, ar: string }> = {
  1: { en: 'Whiskeys, Beers, Cocktails ...', tr: 'Viskiler, Biralar, Kokteyller ...', ru: 'Виски, пиво, коктейли ...', ar: 'ويسكي، بيرة، كوكتيلات ...' },
  2: { en: 'Sodas, Juices, Cold Teas ...', tr: 'Gazlı İçecekler, Meyve Suları, Soğuk Çaylar ...', ru: 'Газированные напитки, соки, холодные чаи ...', ar: 'مشروبات غازية، عصائر، شاي بارد ...' },
  3: { en: 'Cheese rolls, Hummus, Hot starters ...', tr: 'Peynirli börekler, Humus, Ara sıcaklar ...', ru: 'Сырные рулеты, хумус, горячие закуски ...', ar: 'لفائف الجبن، حمص، مقبلات ساخنة ...' },
  4: { en: 'Main courses, Salads, Desserts ...', tr: 'Ana Yemekler, Salatalar, Tatlılar ...', ru: 'Основные блюда, салаты, десерты ...', ar: 'الأطباق الرئيسية، سلطات، حلويات ...' }
}

const tCategory = (id: number) => categoryTranslations[id]?.[selectedLang.value as 'en'|'tr'|'ru'|'ar'] || ''
const tCategoryDesc = (id: number) => categoryDescTranslations[id]?.[selectedLang.value as 'en'|'tr'|'ru'|'ar'] || ''

// Menü başlığı çevirisi
const menuTitleTranslations = { en: 'Menu', tr: 'Menü', ru: 'Меню', ar: 'القائمة' }
const tMenuTitle = () => menuTitleTranslations[selectedLang.value as 'en'|'tr'|'ru'|'ar']

// Fetch categories and menu items
const fetchData = async () => {
  try {
    const [categoriesResponse, menuResponse] = await Promise.all([
      axios.get(`${API_URL}/categories`),
      axios.get(`${API_URL}/menu-items`)
    ])
    categories.value = categoriesResponse.data
    menuItems.value = menuResponse.data
  } catch (error) {
    categories.value = dummyCategories
    menuItems.value = dummyMenuItems
  }
}

const selectCategory = (categoryId: number) => {
  selectedCategory.value = categoryId
}

const filteredItems = computed(() => {
  if (!selectedCategory.value) return []
  return menuItems.value.filter(item => item.categoryId === selectedCategory.value)
})

const selectedCategoryName = computed(() => {
  const cat = categories.value.find(c => c.id === selectedCategory.value)
  return cat ? cat.name : ''
})

const openModal = (item: MenuItem) => {
  selectedItem.value = item
}

const closeModal = () => {
  selectedItem.value = null
}

const goBack = () => {
  if (selectedCategory.value) {
    selectedCategory.value = null;
  } else {
    window.history.length > 1 ? window.history.back() : window.location.href = '/';
  }
}

const categoryIcons: Record<number, string> = {
  1: 'fa-solid fa-martini-glass',      // Alkollü İçecekler
  2: 'fa-solid fa-mug-saucer',         // Alkolsüz İçecekler
  3: 'fa-solid fa-utensils',           // Ara Sıcaklar
  4: 'fa-solid fa-drumstick-bite'      // Ana Yemekler
}

const menuPaddingTop = ref('72px')
function updateMenuPadding() {
  nextTick(() => {
    const header = document.getElementById('main-header')
    if (header) {
      menuPaddingTop.value = header.offsetHeight + 16 + 'px' // 16px ekstra boşluk
    }
  })
}
onMounted(() => {
  updateMenuPadding()
  window.addEventListener('resize', updateMenuPadding)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateMenuPadding)
})

fetchData()
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 56px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  z-index: 1100;
  border-radius: 0;
  margin: 0;
}
.header-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.header-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
.menu {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding-right: 1rem;
  padding-left: 1rem;
  padding-bottom: 2rem;
  box-sizing: border-box;
}
@media (min-width: 600px) {
  .menu {
    max-width: 500px;
    margin: 0 auto;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
.categories {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  align-items: center;
}

.category-card {
  width: 100%;
  max-width: 600px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  margin-bottom: 1.5rem;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  border: none;
}

.category-card:hover {
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.12);
  transform: translateY(-2px) scale(1.01);
}

.category-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.category-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
}

.category-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 0.5rem;
  text-align: left;
}

.category-desc {
  color: #888;
  font-size: 1rem;
  text-align: left;
}

.category-icon {
  font-size: 2.5rem;
  color: #e74c3c;
  margin-left: 1.5rem;
  display: block;
  align-self: center;
}

.back-btn {
  margin-bottom: 1.5rem;
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 600;
  text-align: left;
}

.category-title {
  margin-bottom: 2rem;
  color: #e74c3c;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
}

.menu-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.menu-item {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s;
}

.menu-item:hover {
  transform: translateY(-5px);
}

.menu-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.item-info {
  padding: 1rem;
}

.price {
  color: #e74c3c;
  font-weight: bold;
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-content img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.description {
  margin: 1rem 0;
  color: #666;
}
</style> 