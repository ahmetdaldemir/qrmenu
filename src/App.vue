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
  font-family: Arial, sans-serif;
  line-height: 1.6;
  background-color: #f5f5f5;
}

h1, h2, h3 {
  margin-bottom: 1rem;
}

button {
  cursor: pointer;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
