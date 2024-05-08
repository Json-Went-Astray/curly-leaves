<template>
  <RouterView :key="routeKey" />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { ref } from 'vue';
import router from './router';
const routeKey = ref(router.currentRoute.value.fullPath);
import '@mdi/font/css/materialdesignicons.css'

// Reaguj na zmiany trasy i zmieniaj klucz
router.afterEach((to) => {
  setTimeout(() => {
    routeKey.value = to.fullPath;
  }, 0);
});
</script>
