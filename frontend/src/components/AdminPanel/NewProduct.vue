<template>
    <Transition mode="out-in">
        <div v-if="added == true"
            class="container-fluid py-2 align-items-center justify-content-center d-flex flex-column"
            style="min-height: 80vh;">

            <p class="fs-1 fw-bold cl-text-primary w-100 text-center">Produkt został pomyślnie dodany!</p>
            <button class="btn btn-lg btn-success-outline d-flex" @click="added = false">
                <span class="material-symbols-outlined fs-2 me-2">
                    frame_reload
                </span> Dodaj kolejny
            </button>

        </div>

        <div v-else-if="added == false" class="container-fluid py-2">

            <MediaLibrary v-if="mediaLibOpen" :mode="mediaMode" @closeAction="handleCloseAction"
                @getImageArrays="handleImageArrays" :title-image="titleImage" :product-images="productImages">
            </MediaLibrary>

            <br>
            <div class="d-flex w-100 fs-3 align-items-center cl-text-secondary fw-bold mb-2">
                Nowy produkt <span class="material-symbols-outlined ms-2 fs-1">library_add</span>
            </div>
            <div class="row gx-5 my-3">
                <div class="col-8">
                    <div class="cl-border rounded p-3">
                        <div class="row">
                            <div class="col-4 d-flex flex-wrap justify-content-center">
                                <h5>Obraz główny produktu</h5>
                            </div>
                            <div class="col-8">
                                <h5>Galeria produktu</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4 d-flex flex-wrap justify-content-center">
                                <div @click="mediaMode = 'singleSelect'; mediaLibOpen = true"
                                    class="cl-border rounded w-50 p-1 d-flex justify-content-center cl-border-hover cl-shadow cursor-pointer">
                                    <img v-if="titleImage != ''" :src="`http://localhost:4000` + titleImage"
                                        alt="dodaj produkt" class="unselectable w-50">
                                    <img v-else src="@/assets/static/svg/box.svg" alt="dodaj produkt"
                                        class="unselectable w-50">
                                    <span v-if="titleImage == ''"
                                        class="material-symbols-outlined position-absolute end-0 bottom-0">
                                        add_circle
                                    </span>
                                    <span v-else class="material-symbols-outlined position-absolute end-0 bottom-0">
                                        cameraswitch
                                    </span>
                                </div>
                            </div>
                            <div @click="mediaMode = 'select'; mediaLibOpen = true"
                                class="col-7 d-flex position-relative justify-content-start cl-border cl-shadow cl-border-hover rounded cursor-pointer"
                                style="overflow-x: overlay; max-width: 65%; min-width: 65%; overflow-y: hidden;">
                                <div v-if="productImages.length == 0" v-for="i in 7" class=" rounded p-1 d-inline-flex">
                                    <img src="@/assets/static/svg/box.svg" alt="dodaj produkt"
                                        class="unselectable img-sm">
                                </div>
                                <div v-else v-for="(image, index) in productImages" :key="index"
                                    class="rounded p-1 d-inline-flex m-3">
                                    <img :src="`http://localhost:4000${image}`" class="unselectable img-sm">
                                </div>
                                <span v-if="productImages.length == 0"
                                    class="material-symbols-outlined position-absolute end-0 bottom-0">
                                    add_circle
                                </span>
                                <span v-else class="material-symbols-outlined position-absolute end-0 bottom-0">
                                    cameraswitch
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="cl-border rounded p-3">
                        <div class="row flex-nowrap justify-content-around">
                            <div class="col-6 d-flex align-items-center">
                                <span class="fs-5">Rodzaj produktu</span>
                            </div>
                            <div class="col-6">
                                <div class="btn-group w-100">
                                    <button type="button"
                                        class="btn btn-success-outline dropdown-toggle d-flex align-items-center justify-content-around px-4"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <div class="col-2">
                                            <span class="material-symbols-outlined">
                                                {{ selectedDropdownProductType.icon }}
                                            </span>
                                        </div>
                                        <div class="col-10 text-center">
                                            {{ selectedDropdownProductType.text }}
                                        </div>
                                    </button>
                                    <ul class="dropdown-menu w-100">
                                        <li>
                                            <a class="dropdown-item d-flex align-items-center justify-content-around px-2"
                                                href="#"
                                                @click="selectDropdownProductType('potted_plant', 'Roślina', 1)">
                                                <div class="col-2">
                                                    <span class="material-symbols-outlined">
                                                        potted_plant
                                                    </span>
                                                </div>
                                                <div class="col-10 text-center">
                                                    Roślina
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item d-flex align-items-center justify-content-around px-2"
                                                href="#"
                                                @click="selectDropdownProductType('garden_cart', 'Art. ogrodniczy', 2)">
                                                <div class="col-2">
                                                    <span class="material-symbols-outlined">
                                                        garden_cart
                                                    </span>
                                                </div>
                                                <div class="col-10 text-center">
                                                    Art. ogrodniczy
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item d-flex align-items-center justify-content-around px-2"
                                                href="#" @click="selectDropdownProductType('pergola', 'Inny', 3)">
                                                <div class="col-2">
                                                    <span class="material-symbols-outlined">
                                                        pergola
                                                    </span>
                                                </div>
                                                <div class="col-10 text-center">
                                                    Inny
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row gx-5 my-3">
                <div class="col-8 text-center">
                    <div class="cl-border rounded p-3">
                        <div class="row">
                            <h5>Podstawowe informacje</h5>
                        </div>
                        <div class="row">
                            <div class="form-floating my-2 px-1 w-50">
                                <input type="text" class="form-control" placeholder="Nazwa" v-model="productTitle">
                                <label>Nazwa</label>
                            </div>
                            <div class="form-floating my-2 px-1 w-50">
                                <input v-model="productSnowflake" type="text" class="form-control"
                                    placeholder="Link produktu (generowany automatycznie)" disabled>
                                <label>Link produktu (generowany automatycznie)</label>
                                <span class="material-symbols-outlined position-absolute cursor-pointer"
                                    @click="copyToClipboard(productSnowflake)"
                                    style="bottom: 5px; right: 10px; background: beige;">
                                    content_copy
                                </span>
                                <transition>
                                    <div v-show="copied"
                                        class="p-2 bg-background rounded-2 position-absolute w-25 border"
                                        style="width: auto; right: 0; top: 80%; z-index: 50;">
                                        Skopiowano!
                                    </div>
                                </transition>
                            </div>

                            <div class="d-flex w-100 flex-nowrap">
                                <span v-if="productSnowflake" class="text-danger mx-2">&nbsp;</span>
                                <span v-else class="text-danger mx-2">Nazwa nie może być pusta</span>
                            </div>
                            <div class="form-floating my-2 px-1">
                                <textarea class="form-control" placeholder="Opis produktu" rows="6"
                                    v-model="productDescription" style="resize: none; height: 100%;"></textarea>
                                <label>Opis produktu</label>
                            </div>
                            <div class="d-flex w-100 flex-nowrap">
                                <span v-if="productDescription" class="text-warning mx-2">&nbsp</span>
                                <span v-else class="text-warning mx-2">Opis jest pusty</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-7 p-0">
                                <div class="form-floating my-2 px-1">
                                    <textarea v-model="productShortDescription" class="form-control"
                                        placeholder="Opis produktu" rows="6"
                                        style="resize: none; height: 100%;"></textarea>
                                    <label>Opis produktu na liście</label>
                                </div>
                                <div class="d-flex w-100 flex-nowrap">
                                    <span v-if="productShortDescription" class="text-warning mx-2">&nbsp</span>
                                    <span v-else class="text-warning mx-2">Opis jest pusty</span>
                                </div>
                            </div>
                            <div class="col-5">
                                <div class="row">
                                    <div class="form-floating my-2 px-1 w-100 ">
                                        <input type="text" class="form-control" v-model="productLabel"
                                            placeholder="Etykieta" maxlength="12">
                                        <label>Etykieta</label>
                                        <span class="position-absolute bottom-0" style="right:5%"> {{
            productLabel.length }}
                                            / 12
                                        </span>
                                    </div>
                                </div>


                                <div class="col-12 my-3">
                                    <div class="btn-group w-100">
                                        <button type="button"
                                            class="btn btn-success dropdown-toggle cl-white d-flex align-items-center justify-content-around px-4"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            <div class="col-12 text-center cl-white">
                                                {{ category }}
                                            </div>
                                        </button>
                                        <ul class="dropdown-menu w-100">

                                            <li v-if="categoryValue.length > 0" v-for="(cat, index) in categoryValue"
                                                :key="index">
                                                <a class="dropdown-item d-flex align-items-center justify-content-around px-2"
                                                    href="#" @click="
            //@ts-ignore
            selectCategory(cat.title)
            ">
                                                    <div class="col-12 text-center">
                                                        {{ //@ts-ignore
            cat.title
                                                        }}
                                                    </div>
                                                </a>
                                            </li>

                                            <li v-else>
                                                <a class="dropdown-item d-flex align-items-center justify-content-around px-2"
                                                    href="#">
                                                    <div class="col-12 text-center">
                                                        Brak kategorii, dodaj je w zakładce `Kategorie`
                                                    </div>
                                                </a>
                                            </li>


                                        </ul>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <button class="btn btn-lg col-7 p-3 btn-success my-5" @click="doCreate()">
                        Dodaj produkt
                    </button>
                </div>

                <div class="col-4">
                    <div class="cl-border rounded p-3">
                        <div class="row">
                            <h5>Ceny</h5>
                        </div>
                        <div class="form-floating my-2 px-1">
                            <input type="number" min="1" step="any" class="form-control" placeholder="Cena NETTO"
                                v-model="netPrice">
                            <label>Cena NETTO</label>
                        </div>
                        <!-- extend -->
                        <div class="d-flex w-100 flex-nowrap my-1">
                            <span class="fw-bold mx-2">Cena BRUTTO: {{ (netPrice * 1.23).toFixed(2) }} zł</span>
                            <span class="text-danger mx-2" v-if="!netPrice">Wpisz poprawną cenę</span>
                        </div>
                        <div class="d-flex w-100 flex-nowrap my-1">
                            <span class="fw-bold mx-2">Cena Dostawy: 16 zł</span>
                        </div>
                        <div class="row my-2">
                            <div class="col-6 d-flex align-items-center">
                                <span class="me-2">Produkt w promocji&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <Toggle v-model="isDiscount" />
                            </div>
                            <div class="col-6">
                                <div class="form-floating my-2 px-1">
                                    <input type="number" min="1" step="any" class="form-control"
                                        v-model="discountedPrice" placeholder="Cena promocyjna" :disabled="!isDiscount">
                                    <label>Cena promocyjna</label>
                                </div>
                            </div>

                        </div>
                        <div class="row my-2">
                            <div class="col-6 d-flex align-items-center">
                                <span>Objęty programem lojalnościowym</span>
                                <Toggle v-model="isPrize" />
                            </div>
                            <div class="col-6">
                                <div class="form-floating my-2 px-1">
                                    <input type="number" min="1" step="any" class="form-control" v-model="prizePrice"
                                        placeholder="Cena promocyjna" :disabled="!isPrize">
                                    <label>Cena punktowa</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-floating my-2 px-1">
                            <input type="number" min="1" step="any" class="form-control" v-model="valuePoints"
                                placeholder="Wartość punktowa">
                            <label>Wartość punktowa</label>
                        </div>


                    </div>

                    <Transition>
                        <div class="cl-border rounded p-3 mt-5" v-show="selectedDropdownProductType.text == 'Roślina'">
                            <div class="row">
                                <h5>Dane rośliny</h5>
                            </div>
                            <h6>Nasycenie słoneczne [godziny]</h6>
                            <v-slider step="1" show-ticks="always" tick-size="1" :max="3" :ticks="sunTicks"
                                track-color="#E1E4E9" thumb-color="#4b674f" color='#4b674f' v-model="sunTicksValue">
                            </v-slider>
                            <div class="row mt-3">
                                <h6>Częstość podlewania [dni]</h6>
                            </div>
                            <v-slider step="1" show-ticks="always" tick-size="1" :max="4" :ticks="waterTicks"
                                v-model="waterTicksValue" track-color="#E1E4E9" thumb-color="#4b674f" color='#4b674f'>
                            </v-slider>
                            <div class="row mt-3">
                                <h6>PH gleby</h6>
                            </div>
                            <v-slider step="1" show-ticks="always" tick-size="1" :max="3" :ticks="groundTicks"
                                v-model="groundTicksValue" track-color="#E1E4E9" thumb-color="#4b674f" color='#4b674f'>
                            </v-slider>
                            <div class="row mt-3">
                                <h6>Częstość nawożenia [tygodnie]</h6>
                            </div>
                            <v-slider step="1" show-ticks="always" tick-size="1" :max="2" :ticks="fertilizerTicks"
                                v-model="fertilizerTicksValue" track-color="#E1E4E9" thumb-color="#4b674f"
                                color='#4b674f'>
                            </v-slider>
                            <div class="d-flex flex-wrap">
                                <h6 class="me-5">Czy jest toksyczna?</h6>
                                <Toggle v-model="isToxic" />
                            </div>
                            <div class="form-floating my-2 px-1 w-100">
                                <input type="text" class="form-control" placeholder="Ciekawostka o roślinie"
                                    v-model="plantTrivia">
                                <label>Ciekawostka o roślinie</label>
                            </div>

                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </Transition>

</template>

<script setup lang="ts">
import { reactive, ref, watch, watchEffect } from 'vue';
import Toggle from '@vueform/toggle'
import MediaLibrary from '../MediaLibrary.vue';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { onMounted } from 'vue';

const productTitle = ref("");
const productSnowflake = ref("");
const productSnowflakeValue = ref("");
const copied = ref(false);

const generateProductSnowflake = (title: string) => {
    return title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-');
}

watch(productTitle, (newValue) => {
    if (generateProductSnowflake(newValue) == "") {
        productSnowflake.value = "";
        productSnowflakeValue.value = "";
    }
    else {
        productSnowflake.value = ((`http://localhost:4000/product/`) + generateProductSnowflake(newValue));
        productSnowflakeValue.value = generateProductSnowflake(newValue);
    }
});

const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 1000);
        console.log('Tekst został skopiowany do schowka.');
    } catch (err) {
        console.error('Wystąpił błąd podczas kopiowania tekstu:', err);
    }
};

const added = ref(false);

const mediaLibOpen = ref(false);
const mediaMode = ref("");

let titleImage = ref("");
let productImages = ref<string[]>([]);
const productDescription = ref("");
const productShortDescription = ref("");
const productLabel = ref("");
const netPrice = ref();
const isPrize = ref(false);
const prizePrice = ref();
const valuePoints = ref(0);
let categoryValue = ref([])
const plantTrivia = ref("");
let productTypeId = ref(1);

let sunTicksValue = ref(0);
let waterTicksValue = ref(0);
let fertilizerTicksValue = ref(0);
let groundTicksValue = ref(0);


const isDiscount = ref(false);
const discountedPrice = ref();
const isToxic = ref(false);
const category = ref("Wybierz kategorię");
let pics = ref("");

const selectCategory = (valueS: string) => category.value = valueS;

const sunTicks = ref({
    0: '0 - 2',
    1: '3 - 5',
    2: '6 - 8',
    3: '>8'
});

const waterTicks = ref({
    0: '3',
    1: '7',
    2: '14',
    3: '28',
    4: '90~180'
});

const groundTicks = ref({
    0: '5,5 - 6,0',
    1: '6,0 - 6,5',
    2: '7,0 - 7,5',
    3: '7,5 - 8',
});

const fertilizerTicks = ref({
    0: '2 - 4',
    1: '4 - 6',
    2: '8 - 12',
});



const handleCloseAction = (flag: boolean) => {
    mediaLibOpen.value = flag;
    mediaMode.value = "";
}

const handleImageArrays = (array: [string], mode: string) => {
    if (mode == "singleSelect") {
        titleImage.value = array[0];
        console.log(titleImage.value);
    }

    if (mode == "select") {
        productImages.value = array;
        console.log(productImages.value);
    }

    handleCloseAction(false);
}


const selectedDropdownProductType = reactive({
    icon: "potted_plant",
    text: "Roślina"
});

const selectDropdownProductType = ((icon: string, text: string, id: number) => {
    selectedDropdownProductType.icon = icon;
    selectedDropdownProductType.text = text;
    productTypeId.value = id;
    console.log(productTypeId.value)
});




const { mutate: createProduct } = useMutation(
    gql`
      mutation addProduct(
        $productData: ProductCreateInput!
        $productExtra: ProductCreateExtra!
      ) {
        addProduct(productData: $productData, productExtra: $productExtra) {
          id
        }
      } 
    `
);





const { result: doGetCategories, loading, refetch: fetchCategory } = useQuery(
    gql`
        query getCategories {
            getCategories {
                id
                title
                products {
                    id
                }
            }
        }
    `
);

watchEffect(() => {
    if (!loading.value && doGetCategories.value) {
        //@ts-ignore
        categoryValue.value = doGetCategories.value.getCategories.map(category => {
            return {
                title: category.title,
            };
        });
    }
});


const doCreate = (async () => {
    console.log(productSnowflake.value);
    if (!isToxic.value) isToxic.value = false;
    if (!isPrize.value) isPrize.value = false;
    pics.value = "";
    pics.value += titleImage.value + ";";
    pics.value += productImages.value.join(";");

    const productData = reactive({
        title: productTitle.value,
        description: productDescription.value,
        label: productLabel.value,
        fullPrice: netPrice,
        price: discountedPrice.value,
        isPrize: isPrize.value,
        isAvailable: true,
        pointsCost: prizePrice.value,
        pointsGiven: valuePoints.value,
        trivia: plantTrivia.value,
        rating: 0,
        productTypeId: productTypeId.value,
        snowflake: productSnowflakeValue.value,
        productImages: pics.value,
    });

    const productExtra = reactive({
        ground: groundTicksValue.value,
        water: waterTicksValue.value,
        fertilizer: fertilizerTicksValue.value,
        sunlight: sunTicksValue.value,
        isToxic: isToxic.value,
    });

    try {
        const res = await createProduct({
            productData,
            productExtra
        });
        console.log(res, "ok");

        mediaLibOpen.value = false;
        mediaMode.value = "";

        productTitle.value = "";
        titleImage.value = "";
        productImages.value = [];
        productDescription.value = "";
        productShortDescription.value = "";
        productLabel.value = "";
        netPrice.value = null;
        isPrize.value = false;
        prizePrice.value = null;
        valuePoints.value = 0;
        plantTrivia.value = "";
        productTypeId.value = 1;

        sunTicksValue.value = 0;
        waterTicksValue.value = 0;
        fertilizerTicksValue.value = 0;
        groundTicksValue.value = 0;


        isDiscount.value = false;
        discountedPrice.value = null;
        isToxic.value = false;
        category.value = "Wybierz kategorię";
        pics.value = "";
        added.value = true;
    } catch (exception: any) {
        exception.graphQLErrors.forEach((error: any) => {
            console.log(error)
        });
    }
});

























</script>

<style src="@vueform/toggle/themes/default.css"></style>

<style scoped>
.dropdown-menu li a:focus {
    background-color: transparent;
}

.btn-success-outline:hover,
.btn-success-outline:focus {
    background-color: transparent;
    color: var(--color-primary);

}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>