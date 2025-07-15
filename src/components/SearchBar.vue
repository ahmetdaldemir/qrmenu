<template>
  <div class="search-bar">
    <input
      v-model="search"
      type="text"
      class="search-input"
      placeholder="Ürün ara..."
      @input="$emit('search', search)"
    />
    <button class="filter-btn" @click="$emit('filter')">
      <i class="fas fa-filter"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const search = ref('')
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fff;
  padding: 0.7rem 1rem;
  border-bottom: 1px solid #f3f3f3;
  position: sticky;
  top: 56px;
  z-index: 9;
}
.search-input {
  flex: 1;
  border: none;
  background: #f3f3f3;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  font-size: 1rem;
  outline: none;
}
.filter-btn {
  background: #e67e22;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.filter-btn:hover {
  background: #f39c12;
}
</style> 