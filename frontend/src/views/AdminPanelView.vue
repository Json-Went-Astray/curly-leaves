<template>
    <div class="containter-fluid row mx-0" style="height: 100vh;">
        <div class="d-none d-md-flex col-md-2 p-0 cl-bg-white text-center flex-column h-100">
            <div class="mx-0 w-100 d-flex p-3 m-0 w-100 cl-bg-primary align-items-center justify-content-around">
                <span class="material-symbols-outlined cl-white  unselectable" title="Wyloguj się"
                    @click="$router.push('/admin')">
                    logout
                </span>
                <!-- change me -->
                <div class="cl-white fw-bold d-inline fs-5">Admin</div>
                <img src="@/assets/static/profiles/profile1.png" alt="np-pfp" class="pfp-img rounded-circle unselectable">
            </div>

            <!-- left panel -->
            <div class="y-scroll flex-grow-1">

                <div class="mx-0 row p-3 m-0 cl-border cl-border-hover w-100 ">
                    <div class="d-flex justify-content-between align-items-center p-0 mb-2">
                        <span class="text-start fs-5 p-0 cl-text-secondary">Zamówienia</span>
                        <span class="material-symbols-outlined">conveyor_belt</span>
                    </div>
                    <div class="my-2 cursor-pointer" :class="menuItem === 'orders' ? 'cl-bg-primary cl-white' : 'cl-accent'" @click="menuItem = 'orders'">
                        Bieżące zamówienia
                    </div>
                    <div class="my-2 cursor-pointer" :class="menuItem === 'archive' ? 'cl-bg-primary cl-white' : 'cl-accent'" @click="menuItem = 'archive'">
                        Archiwum zamówień
                    </div>
                    <div class="my-2 cursor-pointer" :class="menuItem === 'productQuantity' ? 'cl-bg-primary cl-white' : 'cl-accent'" @click="menuItem = 'productQuantity'">
                        Asortyment
                    </div>
                </div>

                <div class="mx-0 row p-3 m-0 cl-border cl-border-hover w-100 ">
                    <div class="d-flex justify-content-between align-items-center p-0 mb-2">
                        <span class="text-start fs-5 p-0 cl-text-secondary">Użytkownicy</span>
                        <span class="material-symbols-outlined">groups</span>
                    </div>
                    <div class="w-100 my-2 cursor-pointer" :class="menuItem === 'staff' ? 'cl-bg-primary cl-white' : 'cl-accent'" @click="menuItem = 'staff'">
                        Obłsuga
                    </div>
                    <div class="my-2 cursor-pointer" :class="menuItem === 'customers' ? 'cl-bg-primary cl-white' : 'cl-accent'" @click="menuItem = 'customers'">
                        Klienci
                    </div>
                    <div class="my-2 cursor-pointer" :class="menuItem === 'myAccount' ? 'cl-bg-primary cl-white' : 'cl-accent'" @click="menuItem = 'myAccount'">
                        Moje konto
                    </div>
                </div>

                <div class="mx-0 row p-3 m-0 cl-border cl-border-hover w-100 ">
                    <div class="d-flex justify-content-between align-items-center p-0 mb-2">
                        <span class="text-start fs-5 p-0 cl-text-secondary">Produkty</span>
                        <span class="material-symbols-outlined">qr_code</span>
                    </div>
                    <div class="w-100 my-2 cursor-pointer" :class="menuItem === 'newProduct' ? 'cl-bg-primary cl-white' : 'cl-accent'" @click="menuItem = 'newProduct'">
                        Nowy produkt
                    </div>
                    <div class="my-2 cursor-pointer" :class="menuItem === 'allProducts' ? 'cl-bg-primary cl-white' : 'cl-accent'" @click="menuItem = 'allProducts'">
                        Wszystkie produkty
                    </div>
                    <div class="my-2 cursor-pointer" :class="menuItem === 'categories' ? 'cl-bg-primary cl-white' : 'cl-accent'" @click="menuItem = 'categories'">
                        Kategorie
                    </div>
                    <div class="my-2 cursor-pointer" :class="menuItem === 'newsletter' ? 'cl-bg-primary cl-white' : 'cl-accent'" @click="menuItem = 'newsletter'">
                        Newsletter
                    </div>
                    <div class="my-2 cursor-pointer" :class="menuItem === 'prizes' ? 'cl-bg-primary cl-white' : 'cl-accent'" @click="menuItem = 'prizes'">
                        Kupony / Nagrody
                    </div>
                    <div class="my-2 cursor-pointer" :class="menuItem === 'help' ? 'cl-bg-primary cl-white' : 'cl-accent'" @click="menuItem = 'help'">
                        Zapytania
                    </div>
                </div>

                <div class="mx-0 row p-3 m-0 cl-border cl-border-hover w-100 ">
                    <div class="d-flex justify-content-between align-items-center p-0 mb-2">
                        <span class="text-start fs-5 p-0 cl-text-secondary">Wygląd</span>
                        <span class="material-symbols-outlined">imagesearch_roller</span>
                    </div>
                    <div class="w-100 my-2 cursor-pointer" :class="menuItem === 'carousel' ? 'cl-bg-primary cl-white' : 'cl-accent'" @click="menuItem = 'carousel'">
                        Karuzela
                    </div>
                    <div class="my-2 cursor-pointer" :class="menuItem === 'blog' ? 'cl-bg-primary cl-white' : 'cl-accent'" @click="menuItem = 'blog'">
                        Aktualności
                    </div> 
                    <div class="my-2 cursor-pointer">

                    </div>
                </div>

                <!-- <div class="mx-0 row p-3 m-0 cl-border cl-border-hover w-100 " v-for="i in 10" :key="i">
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
        <div class="col h-100" style="max-height: 100vh; overflow-y: overlay; overflow-x: hidden;">
            <!-- <Orders></Orders> -->
            <Transition>
                <NewProduct v-show="menuItem == 'newProduct'" :showed></NewProduct>
            </Transition>
            <!-- <CompanyUsers></CompanyUsers>   -->
            <Transition>
                <Categories v-show="menuItem == 'categories'" :showed></Categories>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import Orders from '@/components/AdminPanel/Orders.vue';
import NewProduct from '@/components/AdminPanel/NewProduct.vue';
import CompanyUsers from '@/components/AdminPanel/CompanyUsers.vue';
import router from '@/router';
import { ref } from 'vue';
import Categories from '@/components/AdminPanel/Categories.vue';

const menuItem = ref("");
const showed = ref(menuItem);

</script>

<style scoped>
.pfp-img {
    width: 50px;
    height: 50px;
}
</style>

