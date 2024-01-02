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
                    <div class="d-flex w-100 my-3">
                        <span class="material-symbols-outlined">
                            shopping_cart
                        </span>
                        <span>KOSZYK</span>
                    </div>

                    <div class="bg-danger" style="max-height: 60vh; height: 60vh;">

                    </div>
                    <div class="w-100">
                        <button class="btn btn-success w-100 p-3 my-1">Przejdź do zapłaty</button>
                    </div>

                    <div class="w-100">
                        <button class="btn btn-secondary w-100 p-3">Opróżnij koszyk</button>
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
                        <li v-for="i in 10" class="cl-white"><a class="dropdown-item cl-white" href="#">kat {{ i }}</a></li>
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

                <a class="mx-5 d-none d-md-flex align-items-center unselectable cursor-pointer" @click="cartOpen = true">
                    <span>Koszyk</span>
                    <span class="material-symbols-outlined">
                        shopping_cart
                    </span>
                    <div class="bg-danger rounded-circle position-absolute pill-indicator"
                        style="font-size: 8pt; top: -40%">
                        99
                    </div>
                </a>

                <a class="mx-0 mx-sm-5 d-flex align-items-center unselectable cursor-pointer">
                    <div class="bg-white p-3 rounded-circle">

                    </div>
                    <div class="bg-danger rounded-circle position-absolute pill-indicator" style="font-size: 8pt;">
                        99
                    </div>
                </a>


                <a class="mx-3 d-none d-sm-flex align-items-center unselectable cursor-pointer" @click="$router.push('/signup')">
                    Login / Rejestracja
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
import { ref, type Ref } from 'vue';
// @ts-ignore
import { Slide } from 'vue3-burger-menu';

const cartOpen = ref(false);



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