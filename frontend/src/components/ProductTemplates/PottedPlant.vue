<template>
    <div class="container-fluid mb-4 px-0">
        <Header :message="flag"></Header>
        <div class="row mx-0 my-3 gx-5 justify-content-between px-lg-5">
            <span class="h2">{{ product.title }}
            </span>
            <div class="col-xl-6 d-flex flex-column px-0 px-lg-5">
                <v-carousel height="400" show-arrows="hover" cycle hide-delimiter-background>
                    <v-carousel-item v-for="image in product.pics" v-if="product.pics">
                        <v-img style="height: 400px;"
                            :src="image ? `http://localhost:4000${image}` : 'http://placehold.co/100x200'"></v-img>
                        <span class="product-overlay" style="width: 100%"
                            v-if="product.isAvailable == false || product.count == 0">CHWILOWO NIEDOSTĘPNE</span>
                    </v-carousel-item>
                    <v-carousel-item v-else>
                        <v-img cover :src="'http://placehold.co/1280x960'"></v-img>
                        <span class="product-overlay" style="width: 100%"
                            v-if="product.isAvailable == false || product.count == 0">CHWILOWO NIEDOSTĘPNE</span>

                    </v-carousel-item>
                </v-carousel>
            </div>
            <div class="col-xl-6 px-0 px-lg-5">
                <div class="row my-5 my-lg-0">
                    <span v-if="product.shortDescription">{{ product.shortDescription }}
                    </span>
                    <span v-else>Krótki opis pojawi się w krótce.
                    </span>
                </div>
                <div class="row thick-border border my-3">
                    <div class="w-100 d-flex p-2 unselectable">
                        <div class="col-6 col-lg-4 d-flex align-items-center">
                            <span class="fs-6">Podlewanie</span>
                        </div>

                        <div class="col-4 d-lg-flex align-items-center d-none">
                            <img class="mx-3" src="@/assets/static/svg/droplet.svg" alt="" width="30px" height="auto"
                                :class="{ 'animate-drop': firstLoad }" @load="firstLoad = true"
                                v-for="i in product.water">
                        </div>

                        <div class="col-lg-4 col-6 d-flex align-items-center">
                            <span v-if="product.water == 1">raz na 3 miesiące</span>
                            <span v-else-if="product.water == 2">raz w miesiącu</span>
                            <span v-else-if="product.water == 3">raz na 2 tygodnie</span>
                            <span v-else-if="product.water == 4">raz w tygodniu</span>
                            <span v-else-if="product.water == 5">2 razy w tygodniu</span>
                        </div>
                    </div>

                    <div class="w-100 d-flex p-2 unselectable">
                        <div class="col-6 col-lg-4 d-flex align-items-center">
                            <span class="fs-6">Nasłonecznienie</span>
                        </div>

                        <div class="col-4 d-none d-lg-flex align-items-center">
                            <img class="mx-3" src="@/assets/static/svg/sun.svg" alt="" width="30px" height="auto"
                                :class="{ 'animate-drop': firstLoad }" @load="firstLoad = true"
                                v-for="i in product.sunlight">
                        </div>


                        <div class="col-6 col-lg-4 d-flex align-items-center">
                            <span v-if="product.sunlight == 1">od 0 do 2 godzin</span>
                            <span v-else-if="product.sunlight == 2">od 3 do 5 godzin</span>
                            <span v-else-if="product.sunlight == 3">od 6 do 8 godzin</span>
                            <span v-else-if="product.sunlight == 4">conajmniej 8 godzin</span>

                        </div>
                    </div>

                    <div class="w-100 d-flex p-2 unselectable">
                        <div class="col-6 col-lg-4 d-flex align-items-center">
                            <span class="fs-6">Gleba</span>
                        </div>

                        <div class="col-4 d-none d-lg-flex align-items-center">
                            <img class="mx-3" src="@/assets/static/svg/soil.svg" alt="" width="30px" height="auto"
                                :class="{ 'animate-drop': firstLoad }" @load="firstLoad = true"
                                v-for="i in product.ground">
                        </div>
                        <div class="col-6 col-lg-4 d-flex align-items-center">
                            <span v-if="product.ground == 1">od 5,5 do 6,0 pH</span>
                            <span v-else-if="product.ground == 2">od 6,0 do 6,5 pH</span>
                            <span v-else-if="product.ground == 3">od 7,0 do 7,5 pH</span>
                            <span v-else-if="product.ground == 4">od 7,5 do 8,0 pH</span>

                        </div>
                    </div>

                    <div class="w-100 d-flex p-2 unselectable">
                        <div class="col-6 col-lg-4 d-flex align-items-center">
                            <span class="fs-6">Nawożenie</span>
                        </div>

                        <div class="col-4 d-none d-lg-flex align-items-center">
                            <img class="mx-3" src="@/assets/static/svg/shovel.svg" alt="" width="30px" height="auto"
                                :class="{ 'animate-drop': firstLoad }" @load="firstLoad = true"
                                v-for="i in product.fertilizer">
                        </div>

                        <div class="col-6 col-lg-4 d-flex align-items-center">
                            <span v-if="product.fertilizer == 3">Raz na miesiąc (zima)/2 razy na miesiąc (lato)</span>
                            <span v-else-if="product.fertilizer == 2">Co 6 tygodni (zima)/raz na miesiąc (lato)</span>
                            <span v-else-if="product.fertilizer == 1">Raz na 3 miesiące (zima)/raz na miesiąc
                                (lato)</span>
                        </div>
                    </div>
                </div>
                <div class="cl-text-primary d-flex align-items-center">
                    <span class="material-symbols-outlined me-3" style="font-size: 2.5vw;">
                        local_shipping
                    </span>
                    <span class="fs-4 fw-bold">Czas dostawy: 2-3 dni</span>
                    <span class="material-symbols-outlined mx-3" style="font-size: 2.5vw;">
                        package_2
                    </span>
                    <span class="fs-4 fw-bold">W magazynie: {{ product.count }}</span>
                </div>
                <div class="text-danger d-flex align-items-center shake-animation" v-if="product.isToxic">
                    <span class="material-symbols-outlined fs-2 me-2">
                        crisis_alert
                    </span>
                    <span class="fs-4 fw-bold">Uwaga: Roślina jest toksyczna dla ludzi i zwierząt</span>
                </div>
            </div>
        </div>
        <div class="row mx-0 my-3 gx-5 justify-content-between px-lg-5">
            <div class="col-xl-6 d-flex align-items-center my-5 my-xl-0 p-0 p-lg-3">
                <div class="bg-white border rounded-2 w-100 h-100 d-flex align-items-center p-3"
                    v-if="product.typeId == 1">
                    <span class="material-symbols-outlined fs-1">
                        emoji_objects
                    </span>
                    <span class="fs-5 italic" v-if="product.trivia" style="font-family: 'Dancing Script', cursive;">Czy
                        wiedziałeś, że: {{ product.trivia
                        }}</span>
                    <span class="fs-5 italic" v-else style="font-family: 'Dancing Script', cursive;">Czy
                        wiedziałeś, że: do tego produktu nie dodano ciekawostki?</span>
                </div>
            </div>
            <div class="col-xl-6 d-flex align-items-center justify-content-center flex-column flex-lg-row col-12">
                <div class="col-lg-3 d-flex justify-content-start align-items-center my-3 my-lg-0">
                    <vue3starRatings v-bind="test" :rating="product.rating" :read-only="true" :increment="0.01"
                        :starSize="24" />
                    <span>({{ product.reviewsCount }})</span>
                </div>
                <div class="col-12 col-lg-4 d-flex justify-content-center my-3 my-lg-0">
                    <div class="price-label p-3 w-100" v-if="product.price">
                        <span class="price">Cena netto: {{ product.price }} zł</span>
                        <span class="discount position-absolute">{{ product.fullPrice }} zł</span>
                    </div>
                    <div class="price-label p-3 w-100" v-else>
                        <span class="price">Cena netto: {{ product.fullPrice }} zł</span>
                    </div>
                </div>
                <div class="col-lg-5 d-flex justify-content-end my-3 my-lg-0">
                    <div class="d-flex">
                        <button class="btn btn-success btn-lg d-flex align-items-center" @click="addToCart()"
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
                            <button class="btn btn-danger" style="border-radius: 0 0 10px 0;"
                                @click="handleQuantity('-')" :disabled="!canBuy">
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
                <div class="cl-b-white p-4 border rounded-2 bg-white" v-if="product.description">
                    {{ product.description }}
                </div>
                <div class="cl-b-white p-4 border rounded-2 bg-white" v-else>
                    Opis pojawi się w krótce
                </div>
            </div>
        </div>

        <div class="cl-break"></div>
        <div class="cl-break"></div>
        <hr>
        <div class="cl-break"></div>
        <div class="cl-break"></div>

        <div class="h4 w-100 text-center my-5" v-if="products && products.length">
            Polecamy również
        </div>
        <swiper :slidesPerView="slidesPerView" :centeredSlides="false" :spaceBetween="30" :navigation="true"
            class="col-11">
            <swiper-slide v-if="productsData" v-for="product in productsData" :key="refreshKey" class="cl-shadow"
                @click="goToProduct(product.snowFlake)" style="height: auto;">
                <div class="rounded unselectable product-card cursor-pointer p-0 w-100"
                    style="background-color: white;">
                    <div class="p-0 w-100">
                        <img :src="product.pic ? `http://localhost:4000${product.pic}` : 'http://placehold.co/100x200'"
                            alt="alt" class="w-100 rounded-top" style="height: 200px; width: 100%">

                        <span class="badge rounded-pill bg-primary product-label"
                            v-if="product.isAvailable && product.count > 0">{{ product.label }}</span>
                        <span class="product-overlay" style="width: 100%" v-else>CHWILOWO NIEDOSTĘPNE</span>
                    </div>
                    <div class="p-3">
                        <div class="d-flex p-0 w-100 justify-content-around mb-2" v-if="product.price !== null">
                            <span class="price">{{ product.price }} zł</span>
                            <span class="discount">{{ product.fullPrice }} zł</span>
                        </div>
                        <div class="d-flex p-0 w-100 justify-content-around mb-2" v-else>
                            <span class="price">{{ product.fullPrice }} zł</span>
                        </div>
                        <div class="text-truncate text-center my-3">
                            <span class="h5">{{ product.title }}</span>
                        </div>
                        <div class="d-flex align-items-center justify-content-around">
                            <vue3starRatings v-bind="test" :rating="product.rating" :read-only="true" :starSize="15"
                                :increment="0.01" />
                            <span>({{ product.reviewsCount }})</span>
                        </div>
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
            <button class="btn btn-secondary btn-lg mx-auto fw-bold py-3" @click="$router.push('/help')">ZAPRASZAMY DO
                KONTAKTU</button>
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
        <div class="col-12 col-lg-10 col-xl-8 mx-auto my-5 px-lg-5 px-0" v-for="i in 1">
            <div class="border border-2 p-3 bg-white position-relative rounded-2">
                <div class="d-flex gx-3 mb-2 flex-column flex-sm-row">
                    <div class="col-8 d-flex mb-5 align-items-end mb-lg-0">
                        <span> <i>Wystawiono dnia: data</i></span>
                        <vue3starRatings v-bind="stars" :rating="4" :read-only="true" :increment="0.01" class="ms-3" />
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
                                <span>JanKwiat</span>
                            </div>
                            <div class="row text-center">
                                <span style="font-size: 8pt;"><i>Członek od: 2000-01-01</i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <span>Roślinka w porządku jednak podatna bardzo na przelanie. Strasznie szybko listki żółkną, a
                            pająki lgną do niej bardzo

                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onBeforeUnmount, onMounted, provide, reactive, ref, watch, watchEffect, type Ref } from 'vue';
//@ts-ignore
import vue3starRatings from 'vue-star-rating';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import gql from 'graphql-tag';
import { defineProps, defineEmits } from 'vue'
//@ts-ignore
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import { useRoute } from 'vue-router';
import { useMutation, useQuery } from '@vue/apollo-composable';
import router from '@/router';
import { fetchMe, userData } from '@/me';
//@ts-ignore
import { eventBus } from '@/eventBus.ts';
import Header from '@/components/Header.vue';

SwiperCore.use([Autoplay, Pagination, Navigation]);

const test = ref({
    activeColor: "#6d9b76",
    starSize: 42,
    inactiveColor: "#c5c5c5",
    rating: 4,
    showRating: false
});

const instance = getCurrentInstance();

const refreshKey = ref(0);
function remountProductList() {
    refreshKey.value++;
}


const handleQuantity = ((operation: string) => {
    switch (operation) {
        case "+":
            if (quantity.value < product.count) {
                quantity.value += 1;
                canBuy.value = true;
            }
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
    showAnimation.value = true;
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateScreenWidth);
});

const goToProduct = ((snowflake: string) => {
    router.push({ path: `/product/${snowflake}` });
})

const GET_PRODUCT = gql`
query getProductBySnowflake($aux: String!) {
  getProductBySnowflake(aux: $aux) {
    id,
    productTypeId,
    label,
    isAvailable,
    title,
    pics,
    fullPrice,
    price,
    snowFlake,
    trivia,
    description,
    pointsGiven,
    shortDescription,
    count,
    PlantInfo {
      ground,
      water,
      fertilizer,
      sunlight,
      isToxic
    }
    categoryId,
    shippingCost {
      value
    },
    reviews {
      userId,
      ratingValue,
      content,
      createdAt,
      positiveRating,
      negativeRating,
      comments {
        userId,
        content,
        createdAt,
        positiveRating,
        negativeRating
      }
    }
  }
}
`;

const GET_CROSS = gql`query getCross($cat: Float!) {
  getProductsCross(cat: $cat) {
    pics,
    title,
    fullPrice,
    price,
    snowFlake,
    isAvailable,
    count,
    reviews {
      id
    },
    label
  }
}`;

const route = useRoute();
const { result: doGetProduct, loading: loadingProduct } = useQuery(GET_PRODUCT,
    () => ({
        aux: route.params.productSnowflake as string
    })
);

const product = reactive<any>({});
let flagQuery = ref(false);

watchEffect(() => {
    if (!loadingProduct.value && doGetProduct.value && doGetProduct.value.getProductBySnowflake) {
        const productData = doGetProduct.value.getProductBySnowflake;
        if (productData.productTypeId == 1) {
            // product.water = productData.
        }

        const reviewsCount = productData.reviews ? productData.reviews.length : 0;
        const picsCSV = productData.pics && productData.pics.length > 1 ? productData.pics.split(';') : '';

        product.id = productData.id;
        product.label = productData.label;
        product.isAvailable = productData.isAvailable;
        product.title = productData.title;
        product.pics = picsCSV;
        product.fullPrice = productData.fullPrice;
        product.price = productData.price;
        product.trivia = productData.trivia;
        product.description = productData.description;
        product.pointsGiven = productData.pointsGiven;
        product.shortDescription = productData.shortDescription;
        product.count = productData.count;
        product.rating = productData.rating;
        product.reviewsCount = reviewsCount;
        product.typeId = productData.productTypeId;
        product.catId = productData.categoryId;
        flagQuery.value = true;

        product.water = productData.PlantInfo.water + 1;
        product.ground = productData.PlantInfo.ground + 1;
        product.sunlight = productData.PlantInfo.sunlight + 1;
        product.fertilizer = productData.PlantInfo.fertilizer + 1;
        product.isToxic = productData.PlantInfo.isToxic;

    }
});

const products = reactive<any>({});


const { result: doGetCross, loading: loadingCross, refetch: refetchGetCross } = useQuery(GET_CROSS,
    () => ({
        aux: 1
    })
);
let done = ref(false);
const productsData = ref();
watchEffect(() => {
    if (!loadingCross.value && doGetCross.value) {
        //@ts-ignore
        productsData.value = doGetCross.value.getProductsCross.map(product => {
            const reviewsCount = product.reviews ? product.reviews.length : 0;
            const picsCSV = product.pics && product.pics.length > 0 ? `${product.pics.split(';')[0]}` : '';
            return {
                label: product.label,
                isAvailable: product.isAvailable,
                title: product.title,
                rating: product.rating,
                fullPrice: product.fullPrice,
                price: product.price,
                snowFlake: product.snowFlake,
                pic: picsCSV,
                reviewsCount: reviewsCount
            };
        });
        done.value = true;
    }
});

watch(() => product.catId, (newCatId, oldCatId) => {
    if (newCatId && !oldCatId) {
        //@ts-ignore
        refetchGetCross({ cat: parseFloat(newCatId) as number });
        remountProductList();
    }
});

const { mutate: doAddToCart } = useMutation(
    gql`
        mutation addToCart($userId: Float!, $productId: Float!, $quantity: Float!, $isPrize: Boolean!) {
            addProductToCart(isPrize: $isPrize, userId: $userId, productId: $productId, quantity: $quantity)
        }
    `
);
const data = ref();
const flag = ref(false);


const addToCart = async () => {
    try {
        if (!userData.value.me.id) {
            console.log("nope");
            return;
        }
        const res = await doAddToCart({
            userId: parseFloat(userData.value.me.id),
            productId: parseFloat(product.id),
            quantity: quantity.value,
            isPrize: false
        });
        console.log('Odpowiedź z mutacji addToCart:', res);
        const userDataResponse = await fetchMe();
        data.value = userDataResponse?.data.me;
        flag.value = !flag.value;


    } catch (error) {
        console.error('Błąd podczas wywoływania mutacji addToCart:', error);
    }
};


const showAnimation = ref(false); // Flaga kontrolująca wyświetlanie animacji
const firstLoad = ref(false); // Flaga kontrolująca pierwsze wczytanie grafiki




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

.product-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    color: white;
    font-weight: 700;
    height: 100%;
    width: 100%;
    font-size: 0.8vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4b674fb9;
}

.v-responsive {
    overflow: unset !important;
}

.v-carousel__controls {
    width: 99% !important;
}

@keyframes shake {
    0% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-1px);
    }

    50% {
        transform: translateX(1px);
    }

    75% {
        transform: translateX(-1px);
    }

    100% {
        transform: translateX(0);
    }
}

.shake-animation {
    animation: shake 1s ease infinite;
}

@keyframes drop {
    0% {
        transform: translateY(-50%) scale(0.3);
        opacity: 0;
    }

    50% {
        transform: translateY(0) scale(1.1);
        opacity: 1;
    }

    100% {
        transform: translateY(0) scale(1);
    }
}

.animate-drop {
    animation: drop 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.product-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    color: white;
    font-weight: 700;
    height: 100%;
    width: 100%;
    font-size: 0.8vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4b674fb9;
}
</style>