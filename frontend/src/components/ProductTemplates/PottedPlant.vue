<template>
    <div class="container-fluid my-4 px-0">
        <div class="row mx-0 my-3 gx-5 justify-content-between px-lg-5">
            <span class="h2">Nazwa Produktu</span>
            <div class="col-xl-6 d-flex flex-column px-0 px-lg-5">
                <v-carousel height="'auto'" show-arrows="hover" class="rounded-2">
                    <v-carousel-item v-for="i in 10" :key="i">
                        <v-img cover :src="'https://picsum.photos/id/' + i + '/1280/720'"></v-img>
                    </v-carousel-item>
                </v-carousel>
            </div>
            <div class="col-xl-6 px-0 px-lg-5">
                <div class="row my-5 my-lg-0">
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas suscipit pretium mauris, vel
                        sollicitudin sapien consectetur quis. Etiam eget eleifend enim. Nam lacinia euismod felis
                        consectetur egestas. Praesent in leo ac erat accumsan bibendum quis eu eros. Donec iaculis, lectus
                        varius porttitor convallis, mi eros blandit enim, at posuere turpis nibh ornare lorem. Phasellus ac
                        ultricies ligula. Donec commodo elit a eleifend blandit. Praesent non molestie lorem. Duis ac
                        laoreet est. Vestibulum tempus vulputate urna, eu blandit nunc tempor eu. Maecenas neque ligula,
                        accumsan gravida velit nec, ultrices sagittis quam. Phasellus quis risus augue. Fusce ultricies nisi
                        quis porta malesuada. Integer vitae finibus diam.</span>
                </div>
                <div class="row thick-border border my-3">
                    <div class="w-100 d-flex p-2 unselectable">
                        <div class="col-6 col-lg-4 d-flex align-items-center">
                            <span class="fs-6">Podlewanie</span>
                        </div>

                        <div class="col-4 d-lg-flex align-items-center d-none">
                            <img src="@/assets/static/svg/droplet.svg" alt="" width="30px" height="auto">
                        </div>

                        <div class="col-lg-4 col-6 d-flex align-items-center">
                            <span>Raz w tygodniu</span>
                        </div>
                    </div>

                    <div class="w-100 d-flex p-2 unselectable">
                        <div class="col-6 col-lg-4 d-flex align-items-center">
                            <span class="fs-6">Nasłonecznienie</span>
                        </div>

                        <div class="col-4 d-none d-lg-flex align-items-center">
                            <img src="@/assets/static/svg/droplet.svg" alt="" width="30px" height="auto">
                        </div>


                        <div class="col-6 col-lg-4 d-flex align-items-center">
                            <span>Raz w tygodniu</span>
                        </div>
                    </div>

                    <div class="w-100 d-flex p-2 unselectable">
                        <div class="col-6 col-lg-4 d-flex align-items-center">
                            <span class="fs-6">Gleba</span>
                        </div>

                        <div class="col-4 d-none d-lg-flex align-items-center">
                            <img src="@/assets/static/svg/droplet.svg" alt="" width="30px" height="auto">

                        </div>
                        <div class="col-6 col-lg-4 d-flex align-items-center">
                            <span>Raz w tygodniu</span>
                        </div>
                    </div>

                    <div class="w-100 d-flex p-2 unselectable">
                        <div class="col-6 col-lg-4 d-flex align-items-center">
                            <span class="fs-6">Nawożenie</span>
                        </div>

                        <div class="col-4 d-none d-lg-flex align-items-center">
                            <img src="@/assets/static/svg/droplet.svg" alt="" width="30px" height="auto">
                        </div>

                        <div class="col-6 col-lg-4 d-flex align-items-center">
                            <span>Raz w tygodniu</span>
                        </div>
                    </div>
                </div>
                <div class="cl-text-primary d-flex align-items-center">
                    <span class="material-symbols-outlined me-3" style="font-size: 2.5vw;">
                        local_shipping
                    </span>
                    <span class="fs-4 fw-bold">Czas dostawy: 2-3 dni</span>
                </div>
            </div>
        </div>
        <div class="row mx-0 my-3 gx-5 justify-content-between px-lg-5">
            <div class="col-xl-6 d-flex align-items-center my-5 my-xl-0 p-0 p-lg-3">
                <div class="bg-white border rounded-2 w-100 h-100 d-flex align-items-center p-3">
                    <span class="material-symbols-outlined fs-1">
                        emoji_objects
                    </span>
                    <span class="fs-5 italic" style="font-family: 'Dancing Script', cursive;">Ciekawa ciekawostka o tym
                        produkcie</span>
                </div>
            </div>
            <div class="col-xl-6 d-flex align-items-center justify-content-center flex-column flex-lg-row col-12">
                <div class="col-lg-3 d-flex justify-content-start my-3 my-lg-0">
                    <vue3starRatings v-bind="test" :rating="3.8" :read-only="true" :increment="0.01" />
                </div>
                <div class="col-12 col-lg-4 d-flex justify-content-center my-3 my-lg-0">
                    <div class="price-label p-3 w-100">
                        <span class="price">Cena netto: 55,99 zł</span>
                        <span class="discount position-absolute">89,99 zł</span>
                    </div>
                </div>
                <div class="col-lg-5 d-flex justify-content-end my-3 my-lg-0">
                    <div class="d-flex">
                        <button class="btn btn-success btn-lg d-flex align-items-center"
                            style="border-radius: 10px 0 0 10px;" :disabled="!canBuy"><span
                                class="fs-2 material-symbols-outlined">
                                add_shopping_cart
                            </span>&nbsp;Do koszyka</button>
                        <div class="cl-bg-white fw-bold px-5 border align-self-stretch d-flex align-items-center fs-5 text-center justify-content-center"
                            style="min-width: 70px; max-width: 70px;">{{
                                quantity }}</div>
                        <div class="d-flex flex-column">
                            <button class="btn btn-success px-3" style="border-radius: 0 10px 0 0;"
                                @click="handleQuantity('+')">
                                +
                            </button>
                            <button class="btn btn-danger" style="border-radius: 0 0 10px 0;" @click="handleQuantity('-')"
                                :disabled="!canBuy">
                                -
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row m-0 my-3 gx-5 px-lg-5">
            <div class="p-0 px-lg-5">
                <p class="h4 fw-bold">Opis</p>
                <div class="cl-b-white p-4 border rounded-2 bg-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas suscipit pretium mauris, vel
                    sollicitudin
                    sapien consectetur quis. Etiam eget eleifend enim. Nam lacinia euismod felis consectetur egestas.
                    Praesent
                    in leo ac erat accumsan bibendum quis eu eros. Donec iaculis, lectus varius porttitor convallis, mi eros
                    blandit enim, at posuere turpis nibh ornare lorem. Phasellus ac ultricies ligula. Donec commodo elit a
                    eleifend blandit. Praesent non molestie lorem. Duis ac laoreet est. Vestibulum tempus vulputate urna, eu
                    blandit nunc tempor eu. Maecenas neque ligula, accumsan gravida velit nec, ultrices sagittis quam.
                    Phasellus
                    quis risus augue. Fusce ultricies nisi quis porta malesuada. Integer vitae finibus diam.
                </div>
            </div>
        </div>

        <div class="cl-break"></div>
        <div class="cl-break"></div>
        <hr>
        <div class="cl-break"></div>
        <div class="cl-break"></div>

        <div class="h4 w-100 text-center my-5">
            Polecamy również
        </div>
        <swiper :slidesPerView="slidesPerView" :centeredSlides="false" :spaceBetween="30" :navigation="true" class="col-11">
            <swiper-slide v-for="i in 10" :key="i">
                <div class="rounded unselectable product-card cursor-pointer cl-shadow" style="background-color: white;">
                    <div>
                        <img src='@/assets/static/Products/rose-test.jpg' alt="alt" class="w-100 rounded-top">
                        <span class="badge rounded-pill bg-primary product-label">label test</span>
                    </div>
                    <div class="p-3">
                        <div class="d-flex p-0 w-100 justify-content-around mb-2">
                            <span class="price">1999 zł</span>
                            <span class="discount">2999 zł</span>
                        </div>
                        <div class="text-truncate text-center my-3">
                            <span class="h5">Róża Ziemowitka</span>
                        </div>
                        <div class="d-flex align-items-center justify-content-around">
                            <vue3starRatings v-bind="crossSell" :rating="3.8" :read-only="true" :increment="0.01" />
                            <span>(100)</span>
                        </div>
                        <star-rating :rating="3.8" :read-only="true" :increment="0.01"></star-rating>
                    </div>
                </div>
            </swiper-slide>

        </swiper>
        <div class="cl-break"></div>
        <div class="cl-break"></div>
        <hr>
        <div class="cl-break"></div>
        <div class="cl-break"></div>
        <div class="divider-top" style="height: 150px;"></div>
        <div class="text-center cl-bg-primary py-5 cl-white" style="overflow-x:visible;">
            <p class="text-center col-12 h2 mb-4">Masz pytania?</p>
            <button class="btn btn-secondary btn-lg mx-auto fw-bold py-3" @click="$router.push('/help')">ZAPRASZAMY DO KONTAKTU</button>
        </div>
        <div class="divider-bottom" style="height: 150px;"></div>
        <div class="cl-break"></div>
        <div class="cl-break"></div>










        <div class="h4 w-100 text-center mb-5">
            Zobacz opinie o produkcie
        </div>
        <div class="col-12 col-lg-10 col-xl-8 mx-auto px-5 d-flex justify-content-between cl-text-primary">
            <div class="cursor-pointer unselectable">
                <span class="fw-bold">Popularność</span>
                <span class="material-symbols-outlined">
                    swap_vert
                </span>
                <span style="font-size: 8pt; color: grey;">(najwyższa)</span>
            </div>
            <div class="cursor-pointer unselectable">
                <span class="fw-bold">Data wystawienia</span>
                <span class="material-symbols-outlined">
                    swap_vert
                </span>
                <span style="font-size: 8pt; color: grey;">(najnowsza)</span>

            </div>
            <div class="cursor-pointer unselectable">
                <span class="fw-bold">Ocena</span>
                <span class="material-symbols-outlined">
                    swap_vert
                </span>
                <span style="font-size: 8pt; color: grey;">(najwyższa)</span>

            </div>
        </div>
        <div class="col-12 col-lg-10 col-xl-8 mx-auto my-5 px-lg-5 px-0" v-for="i in 5">
            <div class="border border-2 p-3 bg-white position-relative rounded-2">
                <div class="d-flex gx-3 mb-2 flex-column flex-sm-row">
                    <div class="col-8 d-flex mb-5 align-items-end mb-lg-0">
                        <span> <i>Wystawiono dnia: data</i></span>
                        <vue3starRatings v-bind="stars" :rating="3.8" :read-only="true" :increment="0.01" class="ms-3" />
                    </div>

                    <div class="d-none d-sm-block col">

                    </div>

                    <div class="d-inline-flex me-3 my-lg-0 my-5">
                        <div class="col-4 d-flex align-items-center unselectable">
                            <span class="material-symbols-outlined foo cursor-pointer" style="color: green;">
                                thumb_up
                            </span>
                            <span style="color: green;">&nbsp;1</span>
                        </div>
                        <div class="col-4 d-flex align-items-center mx-1 unselectable">
                            <span class="material-symbols-outlined cursor-pointer" style="color: red;">
                                thumb_down
                            </span>
                            <span style="color: red;">&nbsp;0</span>

                        </div>
                        <div class="col-4 d-flex align-items-center unselectable">

                            <span class="material-symbols-outlined cursor-pointer" style="color: red;">
                                flag
                            </span>
                            <span style="color: red;">zgłoś</span>

                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-3 col-md-2">
                        <div class="d-flex flex-column">
                            <div class="d-flex justify-content-center">
                                <img src="@/assets/static/profiles/profile1.png" alt="user profile picture"
                                    class="border rounded-2 img-md">
                            </div>
                            <div class="row text-center">
                                <span>Nick</span>
                            </div>
                            <div class="row text-center">
                                <span style="font-size: 8pt;"><i>Członek od: 2000-01-01</i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas suscipit pretium mauris, vel
                            sollicitudin sapien consectetur quis. Etiam eget eleifend enim. Nam lacinia euismod felis
                            consectetur egestas. Praesent in leo ac erat accumsan bibendum quis eu eros. Donec iaculis,
                            lectus varius porttitor convallis, mi eros blandit enim, at posuere turpis nibh ornare lorem.
                            Phasellus ac ultricies ligula. Donec commodo elit a eleifend blandit. Praesent non molestie
                            lorem. Duis ac laoreet est. Vestibulum tempus vulputate urna, eu blandit nunc tempor eu.
                            Maecenas neque ligula, accumsan gravida velit nec, ultrices sagittis quam. Phasellus quis risus
                            augue. Fusce ultricies nisi quis porta malesuada. Integer vitae finibus diam.</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue';
//@ts-ignore
import vue3starRatings from 'vue-star-rating';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
//@ts-ignore
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
SwiperCore.use([Autoplay, Pagination, Navigation]);

const test = ref({
    activeColor: "#6d9b76",
    starSize: 42,
    inactiveColor: "#c5c5c5",
    rating: 4,
    showRating: false
});

const handleQuantity = ((operation: string) => {
    switch (operation) {
        case "+":
            // TO DO maks stock
            quantity.value += 1;
            canBuy.value = true;
            break;
        case "-":
            if (quantity.value == 0) {
                canBuy.value = false;
                break;
            }
            quantity.value -= 1;
            break;

        default:
            break;
    }
});

const canBuy: Ref<boolean> = ref(false);
const quantity: Ref<number> = ref(0);
const stars = ref({
    activeColor: "#6d9b76",
    starSize: 22,
    inactiveColor: "#c5c5c5",
    rating: 4,
    showRating: true
});

const crossSell = ref({
    activeColor: "#6d9b76",
    starSize: 22,
    inactiveColor: "#c5c5c5",
    rating: 4,
    showRating: false
});

const slidesPerView = ref(7);


const screenWidth = ref(window.innerWidth);
const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth;
    if (screenWidth.value >= 1650) slidesPerView.value = 7;
    else if (screenWidth.value >= 1220) slidesPerView.value = 5;
    else if (screenWidth.value >= 975) slidesPerView.value = 4;
    else if (screenWidth.value >= 755) slidesPerView.value = 3;
    else if (screenWidth.value >= 515) slidesPerView.value = 2;
    else slidesPerView.value = 1;
};

onMounted(() => {
    window.addEventListener('resize', updateScreenWidth);
    updateScreenWidth();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateScreenWidth);
});


</script>

<style scoped>
.thick-border {
    border-radius: 20px !important;
    border-width: 2px !important;
}

.thick-border>div:nth-child(2n) {
    background-color: white;
}

.thick-border>div:last-child {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}

.price-label {
    border: dashed 2px #ddad72;
    background-color: white;
    padding: 10px;
    position: relative;
}


.foo {
    font-variation-settings:
        'FILL' 1
}
</style>