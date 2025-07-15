<script setup lang="ts">
</script>

<template>
  <router-view></router-view>
</template>

<style>
@import '@fortawesome/fontawesome-free/css/all.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', 'Roboto', Arial, sans-serif;
  background: #f8f9fa;
  color: #222;
  line-height: 1.6;
}

h1, h2, h3 {
  margin-bottom: 1rem;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
