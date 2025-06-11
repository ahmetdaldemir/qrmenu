<template>
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 180px;
  width: 100%;
}
.spinner {
  width: 48px;
  height: 48px;
  border: 5px solid #eee;
  border-top: 5px solid #e67e22;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style> 