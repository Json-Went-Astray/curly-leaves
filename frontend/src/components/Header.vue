<template>
    <div class="container-fluid row cl-bg-primary mx-0 p-0" style="z-index: 6;">
        <div class="col-md col-12 d-flex align-items-center pe-0">

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


        <Transition name="searchAnim" @after-leave="searchWidth = 50" @after-appear="searchWidth = 20">
            <div class="col-6 d-flex justify-content-end p-0" v-if="!searchMode">
                <div class="cl-white d-inline-flex align-items-center h-100 unselectable cursor-pointer hover px-3 pe-4"
                    @click="catsBar = !catsBar">
                    <span class="fs-6 fw-bold">Produkty&nbsp;</span>
                    <span class="material-symbols-outlined fs-4 position-relative">
                        stat_minus_2
                    </span>
                </div>

                <div class="cl-white d-inline-flex align-items-center h-100 unselectable cursor-pointer hover px-3 pe-4">
                    <span class="fs-6 fw-bold">Blog&nbsp;</span>
                    <span class="material-symbols-outlined fs-4 position-relative">
                        feed
                    </span>
                </div>

                <div class="cl-white d-inline-flex align-items-center h-100 unselectable cursor-pointer hover px-3 pe-4">
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
                    :style="{ 'background-color': signinWindow ? 'var(--color-secondary)' : '' }"
                    @click="signinWindow = true">
                    <span class="fw-bold fs-6">Logowanie&nbsp;</span>
                    <span class="material-symbols-outlined fs-4">
                        login
                    </span>

                    <!-- login modal -->
                    <Transition mode="out-in">
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
                    </Transition>
                </div>

                <div class="cl-white d-inline-flex align-items-center h-100 unselectable cursor-pointer px-3 hover">
                    <span class="fw-bold fs-6">Rejestracja&nbsp;</span>
                    <span class="material-symbols-outlined fs-4">
                        emoji_people
                    </span>
                </div>
            </div>
        </Transition>



    </div>

    <Transition name="catsBar">
        <div class="container-fluid row cl-accent mx-0 p-0 justify-content-around text-center py-2 cats" v-if="catsBar">
            <div class="col" v-for="i in 6">
                <div class="d-flex justify-content-center">
                    <span class="fs-6">Kategoria</span>
                </div>
                <hr>
                <div class="row p-2" v-for="i in 10">
                    <span>Sukkulenty</span>
                </div>
            </div>
        </div>
    </Transition>


    <!-- burger -->
    <!-- <Slide style="height: 100px; width: 100px;">
        <a id="home" href="#">
            <span>Home</span>
        </a>
    </Slide> -->
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
//@ts-ignore
import { Slide } from 'vue3-burger-menu';

const searchWidth = ref(20);
const searchMode = ref(false);
const catsBar = ref(false);

if (window.innerWidth < 768) {
    searchWidth.value = 100;
}
const focusSearch = (() => {
    if (window.innerWidth < 768) return;



    if (searchWidth.value == 20) {
        searchMode.value = true;
    }

    else {
        searchWidth.value = 20;
        searchMode.value = false;
        console.log(searchWidth.value);
    }
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
    signinWindow.value = false;
};

</script>

<style scoped>
.container-fluid:first-child {
    height: 8%;
}

.search-bar {
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


.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.searchAnim-enter-active {
    transition: opacity 0.4s ease;

}

.searchAnim-leave-active {
    transition: opacity 0.1s ease;
}

.searchAnim-enter-from,
.searchAnim-leave-to {
    opacity: 0;
}


.catsBar-enter-active,
.catsBar-leave-active {
    transition: transform 1s ease;
    z-index: 2;

}

.catsBar-enter-from,
.catsBar-leave-to {
    transform: translateY(-200%);
    z-index: 2;

}


.cats {
    position: absolute;
    top: 8%;
    z-index: 5;
}


hr {
    border-top: 3px solid var(--color-text);
    width: 75%;
    margin: auto;
    border-radius: 200%;
}
</style>