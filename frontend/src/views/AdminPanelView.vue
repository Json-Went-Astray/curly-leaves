<template>
    <div class="containter-fluid row mx-0" style="height: 100vh;">
        <div class="d-none d-md-flex col-md-2 p-0 cl-bg-background-soft text-center flex-column h-100">
            <div class="mx-0 w-100 d-flex p-3 m-0 w-100 cl-bg-primary align-items-center justify-content-around">
                <span class="material-symbols-outlined cl-white cursor-pointer unselectable" title="Wyloguj się"
                    @click="$router.push('/admin')">
                    logout
                </span>
                <!-- change me -->
                <div class="cl-white fw-bold d-inline fs-5">Admin</div>
                <img src="@/assets/static/nopfp-1.png" alt="np-pfp" class="pfp-img rounded-circle unselectable">
            </div>

            <div class="y-scroll flex-grow-1">

                <div class="mx-0 row p-3 m-0 cl-border cl-border-hover w-100 cursor-pointer">
                    <div class="d-flex justify-content-between align-items-center p-0 mb-2">
                        <span class="text-start fs-5 p-0 cl-text-secondary">Zamówienia</span>
                        <span class="material-symbols-outlined">conveyor_belt</span>
                    </div>
                    <div class="cl-accent my-2">
                        Bieżące zamówienia
                    </div>
                    <div class="cl-accent my-2">
                        Archiwum zamówień
                    </div>
                    <div class="cl-accent my-2">
                        Asortyment
                    </div>
                </div>

                <div class="mx-0 row p-3 m-0 cl-border cl-border-hover w-100 cursor-pointer">
                    <div class="d-flex justify-content-between align-items-center p-0 mb-2">
                        <span class="text-start fs-5 p-0 cl-text-secondary">Użytkownicy</span>
                        <span class="material-symbols-outlined">groups</span>
                    </div>
                    <div class="cl-accent w-100 my-2">
                        Obłsuga
                    </div>
                    <div class="cl-accent my-2">
                        Klienci
                    </div>
                    <div class="cl-accent my-2">
                        Moje konto
                    </div>
                </div>

                <div class="mx-0 row p-3 m-0 cl-border cl-border-hover w-100 cursor-pointer">
                    <div class="d-flex justify-content-between align-items-center p-0 mb-2">
                        <span class="text-start fs-5 p-0 cl-text-secondary">Produkty</span>
                        <span class="material-symbols-outlined">qr_code</span>
                    </div>
                    <div class="cl-accent w-100 my-2">
                        Nowy produkt
                    </div>
                    <div class="cl-accent my-2">
                        Wszystkie produkty
                    </div>
                    <div class="cl-accent my-2">
                        Kategorie
                    </div>
                    <div class="cl-accent my-2">
                        Newsletter
                    </div>
                    <div class="cl-accent my-2">
                        Kupony / Nagrody
                    </div>
                    <div class="cl-accent my-2">
                        Zapytania
                    </div>
                </div>

                <div class="mx-0 row p-3 m-0 cl-border cl-border-hover w-100 cursor-pointer">
                    <div class="d-flex justify-content-between align-items-center p-0 mb-2">
                        <span class="text-start fs-5 p-0 cl-text-secondary">Wygląd</span>
                        <span class="material-symbols-outlined">imagesearch_roller</span>
                    </div>
                    <div class="cl-accent w-100 my-2">
                        Karuzela
                    </div>
                    <div class="cl-accent my-2">
                        Aktualności
                    </div>
                    <div class="cl-accent my-2">

                    </div>
                </div>

                <!-- <div class="mx-0 row p-3 m-0 cl-border cl-border-hover w-100 cursor-pointer" v-for="i in 10" :key="i">
                    panel {{ i }}
                    <div class="cl-accent ">
                        sx
                    </div>
                    <div class="cl-accent my-1">
                        sx
                    </div>
                </div> -->
            </div>


        </div>
        <div class="col h-100">
            <Orders></Orders>
        </div>
    </div>
</template>

<script setup lang="ts">
import Orders from '@/components/AdminPanel/Orders.vue';
import router from '@/router';

</script>

<style scoped>
.pfp-img {
    width: 50px;
    height: 50px;
}
</style>

