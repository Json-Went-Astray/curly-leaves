<template>
    <!-- Navbar -->
    <nav class="top-navbar navbar sticky-top cl-bg-primary cl-shadow-down">
        <!-- Container wrapper -->
        <div class="container-fluid">
            <!-- Collapsible wrapper -->
            <div class="d-flex align-items-center">
                <!-- Navbar brand -->
                <a class="navbar-brand d-flex align-items-center" href="/">
                    <img src="@/assets/static/images/logo1.png" height="36" alt="MDB Logo" loading="lazy" />
                    <div class="cl-white">CURLY LEAVES</div>
                </a>


                <!-- KOSZYK  -->

                <Slide right :burgerIcon="false" :isOpen="cartOpen" @closeMenu="cartOpen = false">
                    <div class="d-flex w-100 my-0 flex-column justify-content-center">
                        <div class="text-center">
                            <span class="material-symbols-outlined">
                                shopping_cart
                            </span>
                            <span>KOSZYK</span>
                        </div>
                        <span style="font-size: 11px; text-align: center; font-weight: 300;">Dodanie produktu do koszyka
                            nie rezerwuje go</span>
                    </div>

                    <div
                        style="max-height: 60vh; max-height: 60vh; width: 110%; flex-direction: column; overflow-y: scroll;">
                        <div class="row my-2 border border-2 bg-white rounded-2" style="width: 100%;" v-if="cartArray"
                            v-for="cartProduct in cartArray">
                            <div class="col-6 d-flex justify-content-center align-items-center ps-0 py-0">
                                <img :src="cartProduct.product.pics ? `http://localhost:4000${cartProduct.product.pics.split(';')[0]}` : 'http://placehold.co/100x200'"
                                    alt="" class="rounded-2" width="100%" style="width: auto; max-height: 100px;">
                            </div>
                            <div class="col d-flex flex-column align-items-start py-2">
                                <span class="" style="font-size: 10pt;">{{ cartProduct.product.title }}</span>
                                <span v-if="cartProduct.product.price" style="font-size: 10pt;">x{{ cartProduct.quantity
                                    }} <strong>{{ cartProduct.product.price }} zł</strong></span>
                                <span v-else style="font-size: 10pt;">x{{ cartProduct.quantity }} <strong>{{
                    cartProduct.product.fullPrice }} zł</strong></span>

                                <hr>
                                <span v-if="cartProduct.product.price" style="font-size: 10pt;"><strong>Łącznie: {{
                    cartProduct.quantity * cartProduct.product.price }} zł</strong></span>
                                <span v-else style="font-size: 10pt;"><strong>Łącznie: {{ cartProduct.quantity *
                    cartProduct.product.fullPrice }} zł</strong></span>
                                <a href="#" style="font-size: 10pt; text-decoration: underline" @click="removeProductFromCart(cartProduct.product.id)">Usuń</a>

                            </div>
                        </div>
                    </div>

                    <div class="w-100">
                        <button class="btn btn-success w-100 p-3 my-1" @click="$router.push('/pre-checkout')">Przejdź do
                            zapłaty</button>
                    </div>

                    <div class="w-100">
                        <button class="btn btn-secondary w-100 p-3" @click="removeAllProductsFromCart()">Opróżnij
                            koszyk</button>
                    </div>
                </Slide>




                <div class="control">
                    <Slide class="d-md-none d-block">
                        <a href="#">
                            <span>Produkty</span>
                        </a>
                        <a href="#">
                            <span>Promocje</span>
                        </a>
                        <a href="#">
                            <span>Blog</span>
                        </a>
                        <a href="#">
                            <span>O nas</span>
                        </a>
                        <a href="#">
                            <span>Kontakt</span>
                        </a>
                        <a href="#" @click="$router.push('/signup')">
                            <span>Login / Rejestracja</span>
                        </a>
                        <a href="#">
                            <span>Wyloguj się</span>
                        </a>
                    </Slide>
                </div>

                <!-- Left links -->
                <div class=" me-auto d-none d-md-flex">


                    <a class="nav-link dropdown-toggle d-none d-md-inline mx-3" href="#" id="navbarDarkDropdownMenuLink"
                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Produkty
                    </a>
                    <div class="dropdown-menu cl-bg-primary cl-white" aria-labelledby="navbarDarkDropdownMenuLink">
                        <li v-for="i in 10" class="cl-white"><a class="dropdown-item cl-white" href="#">kat {{ i }}</a>
                        </li>
                    </div>


                    <div class="nav-item mx-3">
                        <a class="nav-link" href="#">Promocje</a>
                    </div>
                    <div class="nav-item mx-3">
                        <a class="nav-link" href="#">Blog</a>
                    </div>
                    <div class="nav-item mx-3">
                        <a class="nav-link" href="#">O nas</a>
                    </div>
                    <div class="nav-item mx-3">
                        <a class="nav-link" href="#">Kontakt</a>
                    </div>

                </div>
                <!-- Left links -->
            </div>
            <!-- Collapsible wrapper -->

            <!-- Right elements -->
            <div class="d-flex align-items-center me-5">

                <a class="mx-5 d-none d-md-flex align-items-center unselectable cursor-pointer"
                    @click="cartOpen = true">
                    <span>Koszyk</span>
                    <span class="material-symbols-outlined">
                        shopping_cart
                    </span>
                    <div class="bg-danger rounded-circle position-absolute pill-indicator" v-if="cartCount != 0"
                        style="font-size: 8pt; top: -40%">
                        {{ cartCount }}
                    </div>
                </a>

                <a class="mx-0 mx-sm-5 d-flex align-items-center unselectable cursor-pointer" v-if="isLoggedIn">
                    <div class="p-3 rounded-circle">
                        <img @click="$router.push('/user')" :src="data && data.picId ? `http://localhost:4000/uploads/user-avatars/${data.picId}` : ''"
                            class="rounded-circle" style="width: 35px; position: absolute; top: 0; left: 0; aspect-ratio: 1 / 1; object-fit:fill;">
                    </div>
                    <!-- <div class="bg-danger rounded-circle position-absolute pill-indicator" style="font-size: 8pt;">
                    </div> -->
                    <!-- powiadomienia usera -->
                </a>


                <a class="mx-3 d-none d-sm-flex align-items-center unselectable cursor-pointer"
                    @click="$router.push('/signup')" v-if="!isLoggedIn">
                    Login / Rejestracja
                </a>

                <a class="mx-3 d-none d-sm-flex align-items-center unselectable cursor-pointer" @click="logout()"
                    v-else>
                    Wyloguj się
                </a>

            </div>
            <!-- Right elements -->
        </div>
        <!-- Container wrapper -->
    </nav>


    <nav class="fixed-bottom border border-1 bg-background d-flex d-md-none cl-shadow-up">
        <div class="col-4 cl-text-accent border-end p-2 unselectable d-flex align-items-center justify-content-center">
            <span>Kategorie</span>
            <span class="material-symbols-outlined">
                dataset
            </span>
        </div>

        <div class="col-4 cl-text-accent border-end p-2 unselectable d-flex align-items-center justify-content-center"
            @click="cartOpen = true">
            <span>Koszyk</span>
            <span class="material-symbols-outlined">
                shopping_cart
            </span>
        </div>

        <div class="col-4 cl-text-accent p-2 unselectable d-flex align-items-center justify-content-center">
            <span>Konto</span>
            <span class="material-symbols-outlined">
                emoji_people
            </span>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, watchEffect, type Ref } from 'vue';
// @ts-ignore
import { Slide } from 'vue3-burger-menu';
import { isLoggedIn, fetchMe, userData, logout } from '@/me';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
//@ts-ignore
import ProductPage from './ProductTemplates/PottedPlant.vue';
import { inject } from 'vue';
const props = defineProps(['message', 'doNotOpen']);
const cartOpen = ref(false);
const data = ref();
let hasFetched = false;
const cartCount = ref(0);
const cartArray = ref();

watchEffect(() => {
    (async () => {
        if (isLoggedIn.value && !hasFetched) {

            const userDataResponse = await fetchMe();
            data.value = userDataResponse?.data.me;
            hasFetched = true;
            cartCount.value = 0;
            if (data.value.cart?.CartItem && data.value.cart.CartItem.length > 0) {
                for (let i = 0; i < data.value.cart.CartItem.length; i++) {
                    cartCount.value += data.value.cart.CartItem[i].quantity;
                }
                cartArray.value = data.value.cart.CartItem;
            }

        }
    })();
});

const { mutate: removeAll } = useMutation(
    gql`
    mutation removeAllProductsFromCart($userId: Float!){
        removeAllProductsFromCart(userId: $userId)
    }
    `
);

const { mutate: removeOne } = useMutation(
    gql`
    mutation removeProductFromCart($userId: Float!, $productId: Float!) {
        removeProductFromCart(userId: $userId, productId: $productId)
    }
    `
);

const removeAllProductsFromCart = async () => {
    try {
        if (!userData.value.me.id) {
            console.log("nope");
            return;
        }
        const res = await removeAll({
            userId: parseFloat(userData.value.me.id),
        });
        const userDataResponse = await fetchMe();
        data.value = userDataResponse?.data.me;
        cartArray.value = data.value.cart.CartItem;
        cartCount.value = 0;

    } catch (error) {
    }
};

const removeProductFromCart = async (productId: any) => {
    try {
        if (!userData.value.me.id) {
            console.log("nope");
            return;
        }
        const res = await removeOne({
            userId: parseFloat(userData.value.me.id),
            productId: parseFloat(productId)
        });
        const userDataResponse = await fetchMe();
        data.value = userDataResponse?.data.me;
        cartArray.value = data?.value?.cart?.CartItem || [];
        cartCount.value = 0;
        console.log(res)

    } catch (error) {
        console.log(error)
    }
};

const message = ref(props.message);
const doNotOpen = ref(props.doNotOpen !== undefined ? props.doNotOpen : false);

const fetchData = async () => {
    const userDataResponse = await fetchMe();
    data.value = userDataResponse?.data.me;
    cartArray.value = data?.value?.cart?.CartItem || [];
    cartCount.value = 0;
    if (data?.value?.cart?.CartItem) {
        for (let i = 0; i < data.value.cart.CartItem.length; i++) {
            cartCount.value += data.value.cart.CartItem[i].quantity;
        }
    }
    if (doNotOpen.value == false) {
        cartOpen.value = true;
    }
};

watch(() => props.message, (newValue, oldValue) => {
    // Reakcja na zmianę wartości propsa
    fetchData()
    message.value = newValue; // Aktualizacja lokalnej kopii propsa
});
</script>



<style scoped>
.top-navbar span:not(.bm-item-list span),
.top-navbar a:not(.bm-item-list a),
.top-navbar *:not(.bm-item-list *) {
    color: white !important;
}

a:hover {
    color: var(--color-accent) !important;
}

a {
    text-decoration: none;
}

.pill-indicator {
    right: -20%;
    top: -20%;
    padding: 5px;
}
</style>