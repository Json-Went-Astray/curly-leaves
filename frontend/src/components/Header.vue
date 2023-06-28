<template>
    <div class="container-fluid row cl-bg-primary mx-0 p-0">
        <div class="col-6 d-flex align-items-center pe-0">

            <div class="cl-white d-inline-flex align-items-center h-100 unselectable cursor-pointer">
                <span class="material-symbols-outlined fw-bold fs-2">
                    nest_eco_leaf
                </span>
                <span class="fw-bold fs-2 d-none d-lg-block">Curly Leaves</span>
                <span class="fw-bold fs-2 d-lg-none">CL</span>
            </div>


            <div class="search-bar" :style="{ width: searchWidth + '%' }">
                <input type="text" class="form-control d-inline p-2 ms-4 w-100 border-rounded" placeholder="Szukaj..."
                    @focusin="focusSearch" @focusout="focusSearch">
            </div>

        </div>



        <div class="col d-flex justify-content-end p-0">

            <div class="cl-white d-inline-flex align-items-center h-100 unselectable cursor-pointer hover px-3 pe-4">
                <span class="fs-6 fw-bold">Produkty&nbsp;</span>
                <span class="material-symbols-outlined fs-4 position-relative">
                    stat_minus_2
                </span>
            </div>

            <div class="cl-white d-inline-flex align-items-center h-100 unselectable cursor-pointer hover px-3 pe-4">
                <span class="fs-6 fw-bold">Nasz Blog&nbsp;</span>
                <span class="material-symbols-outlined fs-4 position-relative">
                    feed
                </span>
            </div>

            <div class="cl-white d-inline-flex align-items-center h-100 unselectable cursor-pointer hover px-3 pe-4"
                style="border-left: solid 1px var(--color-secondary);">
                <span class="fs-6 fw-bold">Koszyk&nbsp;</span>
                <span class="material-symbols-outlined fs-4 position-relative">
                    shopping_cart
                </span>
                <span class="position-absolute translate-middle badge rounded-pill bg-danger"
                    style="top:25%; font-size: 65%; right: -10%; z-index: 2;">
                    99+
                </span>
            </div>

            <div class="cl-white d-inline-flex align-items-center h-100 unselectable cursor-pointer px-3 hover login-btn"
                :style="{ 'background-color': signinWindow ? 'var(--color-secondary)' : '' }" @click="openSigninWindow">
                <span class="fw-bold fs-6">Logowanie&nbsp;</span>
                <span class="material-symbols-outlined fs-4">
                    login
                </span>

                <!-- login modal -->
                <transition name="fade">
                    <div class="p-3 cl-bg-primary cl-white rounded position-absolute signin-window border-box cursor-default"
                        v-if="signinWindow">
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="floatingLoginInput2" placeholder="Login">
                            <label for="floatingLoginInput" class="cl-text">Login/E-mail</label>
                        </div>

                        <div class="form-floating">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Hasło">
                            <label for="floatingPassword" class="cl-text">Hasło</label>
                        </div>

                        <div class="row justify-content-around mt-2">
                            <div class="col-6 text-center my-2">
                                <button class="btn btn-outline-light w-100">Zaloguj się</button>
                            </div>
                            <div class="col-6 text-center my-2">
                                <button class="btn btn-outline-light w-100">Pomoc</button>
                            </div>
                        </div>

                        <div class="arrow-up"></div>
                    </div>
                </transition>
            </div>

            <div class="cl-white d-inline-flex align-items-center h-100 unselectable cursor-pointer px-3 hover">
                <span class="fw-bold fs-6">Rejestracja&nbsp;</span>
                <span class="material-symbols-outlined fs-4">
                    emoji_people
                </span>
            </div>
        </div>
    </div>
    <div class="container-fluid row cl-accent mx-0 p-0 justify-content-around text-center py-2">
        <div class="col" v-for="i in 6">
            <div class="d-flex justify-content-center">
                <span class="fs-6">Kategoria</span>
            </div>
            <hr>
            <div class="row p-2" v-for="i in 7">
                <span>Sukkulenty</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const searchWidth = ref(20);
const focusSearch = (() => {
    if (searchWidth.value == 20) searchWidth.value = 50;
    else searchWidth.value = 20;
});

const signinWindow = ref(false);

onMounted(() => {
    document.addEventListener('click', closeSigninWindow);
});

const openSigninWindow = (() => {
    signinWindow.value = true;
});

const closeSigninWindow = (event: MouseEvent) => {
    const signinWindowElement = document.querySelector('.signin-window');
    const loginElement = document.querySelector('.login-btn');

    if (
        (signinWindowElement?.contains(event.target as Node) ?? false) ||
        (loginElement?.contains(event.target as Node) ?? false)
    ) {
        return;
    }
    // console.log("ELo");
    signinWindow.value = false;
};

</script>

<style scoped>
.container-fluid:first-child {
    height: 8%;
}

.search-bar {
    width: 20%;
    transition: width 0.5s ease;
}

.signin-window {
    right: 50%;
    top: 120%;
    z-index: 999;
    width: 200%;
    border-top-right-radius: 0px !important;
}

.arrow-up {
    position: absolute;
    top: -5%;
    right: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid var(--color-primary);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}

hr {
    border-top: 3px solid var(--color-text);
    width: 75%;
    margin: auto;
    border-radius: 200%;
}
</style>