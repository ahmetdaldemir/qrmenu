<template>
  <div class="success-page">
    <div class="success-card">
      <svg class="success-icon" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#e0f7e9"/><path d="M16 24l6 6 10-10" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <h1>Ödeme Başarılı!</h1>
      <p>Ödemeniz başarıyla tamamlandı. Rezervasyonunuz alınmıştır.</p>
      <router-link to="/" class="home-btn">Anasayfaya Dön</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.success-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6fef9;
}
.success-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(34,197,94,0.08);
  padding: 2.5rem 2rem;
  text-align: center;
  max-width: 400px;
}
.success-icon {
  width: 70px;
  height: 70px;
  margin-bottom: 1.2rem;
}
h1 {
  color: #22c55e;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
p {
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}
.home-btn {
  display: inline-block;
  background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
  font-size: 1.1rem;
  transition: background 0.2s;
}
.home-btn:hover {
  background: linear-gradient(90deg, #16a34a 0%, #22c55e 100%);
}
</style> 