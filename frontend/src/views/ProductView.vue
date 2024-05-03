<template>
    <div class="container-fluid d-flex p-0 m-0 flex-column">
        <Header></Header>
        <div class="flex-grow-1 px-0">
            <PottedPlant></PottedPlant>
        </div>
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import PottedPlant from '@/components/ProductTemplates/PottedPlant.vue';
</script>

<style scoped>
</style>