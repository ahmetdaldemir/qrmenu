<template>
  <div>
    <div class="header header-fixed header-logo-center">
      <a href="/" class="header-icon header-icon-1" data-back-button>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" stroke="#e74c3c" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <a href="#" class="header-title" style="margin-left:-135px">Menü</a>
    </div>
    <div class="menu">
      <div v-if="!selectedCategory" class="categories">
        <button 
          v-for="category in categories" 
          :key="category.id"
          class="category-btn"
          @click="selectCategory(category.id)"
        >
          {{ category.name }}
        </button>
      </div>

      <div v-else>
        <button class="back-btn" @click="selectedCategory = null">← Kategorilere Dön</button>
        <h2 class="category-title">{{ selectedCategoryName }}</h2>
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
import { ref, computed } from 'vue'
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

fetchData()
</script>

<style scoped>
.menu {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  padding-top: 56px;
}

.categories {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  align-items: center;
}

.category-btn {
  padding: 1.2rem 2.5rem;
  border: none;
  background: linear-gradient(90deg, #e74c3c 60%, #f39c12 100%);
  color: #fff;
  border-radius: 30px;
  font-size: 1.3rem;
  font-weight: 600;
  box-shadow: 0 2px 12px rgba(0,0,0,0.10);
  cursor: pointer;
  transition: background 0.3s, color 0.3s, box-shadow 0.3s;
}

.category-btn:hover {
  background: linear-gradient(90deg, #c0392b 60%, #e67e22 100%);
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

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 56px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  z-index: 1100;
}
.header-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.header-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
  flex: 1;
}
</style> 