<template>
    <div class="backdrop">
        
    </div>
    <img src="../assets/static/anims/plant-preloader.gif" alt="loading">
</template>

<script setup lang="ts">

</script>

<style scoped>
    .backdrop {
        height: 100vh;
        width: 100vw;
        position: fixed;
        z-index: 999;
        background-color: gray;
        opacity: 0.3;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        z-index: 1000;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
    }

</style>