<template>
  <form @submit.prevent="submit">
    <input v-model="form.cardName" placeholder="Kart Üzerindeki İsim" required />
    <input v-model="form.cardNumber" placeholder="Kart Numarası" required />
    <input v-model="form.expiry" placeholder="MM/YY" required />
    <input v-model="form.cvv" placeholder="CVV" required />
    <button type="submit">Ödeme Yap</button>
  </form>
</template>
<script setup lang="ts">
import { reactive, defineEmits } from 'vue'
const emit = defineEmits(['submit'])
const form = reactive({ cardName: '', cardNumber: '', expiry: '', cvv: '' })
function submit() { emit('submit', { ...form }) }
</script>
<style scoped>
form { display: flex; flex-direction: column; gap: 1rem; }
input, button { padding: 0.5rem; font-size: 1rem; }
button { background: #22c55e; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
button:hover { background: #16a34a; }
</style> 