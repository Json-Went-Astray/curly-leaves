<template>
    <div class="container-fluid p-0" style="height: 100vh;">
        <Header></Header>
        <div class="container-fluid mx-0 px-0 border my-5 d-flex" style="min-height: 60vh;">

            <div class="col-md-3 border">

                <div class="h4 text-center my-2">Filtry</div>

                <hr>
                <div class="h5 text-center my-2">
                    <span>Typ produktu &nbsp;
                        <Transition>
                            <span style="font-size: 12px; transform: translateY(-50%); text-decoration: underline;"
                                class="position-absolute start-100 top-50 cursor-pointer" @click="selectedType = -1"
                                v-if="selectedType != -1">(wyczyść)
                            </span>
                        </Transition>
                    </span>
                </div>

                <div class="row d-flex justify-content-around m-0 mb-5">
                    <div class="col-3 p-0 unselectable cursor-pointer cl-highlight" @click="selectedType = 0"
                        :class="{ 'cl-highlighted': selectedType == 0 }">
                        <div class="border rounded bg-white text-center py-2">
                            <span class="material-symbols-outlined fs-3 cl-text-primary">
                                potted_plant
                            </span>
                            <p class="cl-text m-0">Rośliny</p>
                        </div>
                    </div>

                    <div class="col-3 p-0 unselectable cursor-pointer cl-highlight" @click="selectedType = 1;"
                        :class="{ 'cl-highlighted': selectedType == 1 }">
                        <div class="border rounded bg-white text-center py-2">
                            <span class="material-symbols-outlined fs-3 cl-text-primary">
                                garden_cart
                            </span>
                            <p class="cl-text m-0">Artykuły</p>
                        </div>
                    </div>

                    <div class="col-3 p-0 unselectable cursor-pointer cl-highlight" @click="selectedType = 2"
                        :class="{ 'cl-highlighted': selectedType == 2 }">
                        <div class="border rounded bg-white text-center py-2">
                            <span class="material-symbols-outlined fs-3 cl-text-primary">
                                pergola
                            </span>
                            <p class="cl-text m-0">Różne</p>
                        </div>
                    </div>

                </div>


                <hr>
                <div class="h5 text-center my-2">Kategoria nadrzędna</div>
                <div class="row my-4">

                    <div class="btn-group col-8 mx-auto">
                        <button type="button"
                            class="btn btn-success-outline dropdown-toggle d-flex align-items-center justify-content-around px-4"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <div class="col-12 text-center">
                                Wszystkie
                            </div>
                        </button>
                        <ul class="dropdown-menu w-100">
                            <li>
                                <a class="dropdown-item d-flex align-items-center justify-content-around px-2" href="#">
                                    <div class="col-1">
                                        <span class="material-symbols-outlined">
                                            keyboard_double_arrow_up
                                        </span>
                                    </div>
                                    <div class="col-1">
                                        <span class="material-symbols-outlined">
                                            payments
                                        </span>
                                    </div>
                                    <div class="col-9 text-center">
                                        Cena - najwyższa
                                    </div>
                                </a>
                                <a class="dropdown-item d-flex align-items-center justify-content-around px-2" href="#">
                                    <div class="col-1">
                                        <span class="material-symbols-outlined">
                                            keyboard_double_arrow_down
                                        </span>
                                    </div>
                                    <div class="col-1">
                                        <span class="material-symbols-outlined">
                                            payments
                                        </span>
                                    </div>
                                    <div class="col-9 text-center">
                                        Cena - najniższa
                                    </div>
                                </a>
                                <a class="dropdown-item d-flex align-items-center justify-content-around px-2" href="#">
                                    <div class="col-2">
                                        <span class="material-symbols-outlined">
                                            trending_up
                                        </span>
                                    </div>
                                    <div class="col-9 text-center">
                                        Popularność
                                    </div>
                                </a>
                                <a class="dropdown-item d-flex align-items-center justify-content-around px-2" href="#">
                                    <div class="col-2">
                                        <span class="material-symbols-outlined">
                                            star_half
                                        </span>
                                    </div>
                                    <div class="col-9 text-center">
                                        Średniej ocen
                                    </div>
                                </a>
                                <a class="dropdown-item d-flex align-items-center justify-content-around px-2" href="#">
                                    <div class="col-2">
                                        <span class="material-symbols-outlined">
                                            comment
                                        </span>
                                    </div>
                                    <div class="col-9 text-center">
                                        Ilości komentarzy
                                    </div>
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>

                <div class="h6 text-center">
                    <span>Kategorie &nbsp;
                        <Transition>
                            <span style="font-size: 12px; transform: translateY(-50%); text-decoration: underline;"
                                class="position-absolute start-100 top-50 cursor-pointer" @click="clearCats"
                                v-if="hasTrueCats">(wyczyść)
                            </span>
                        </Transition>
                    </span>
                </div>

                <div class="row d-flex justify-content-between m-0 mb-5">
                    <div class="col-4 my-2" v-for="i in 10" :key="i">
                        <div class="row">
                            <span class="text-center">{{ i }}</span>
                        </div>
                        <div class="row">
                            <input type="checkbox" class="form-check-input p-2 mx-auto" v-model="checkedCats[i]">
                        </div>
                    </div>
                </div>

                <hr>

                <div class="h5 text-center my-2">
                    <span>Charakterystyka roślin &nbsp;
                        <Transition>
                            <span style="font-size: 12px; transform: translateY(-50%); text-decoration: underline;"
                                class="position-absolute start-100 top-50 cursor-pointer" @click="selectedType = -1"
                                v-if="selectedType != -1">(wyczyść)
                            </span>
                        </Transition>
                    </span>
                </div>

                <div class="row">
                    <div class="col-5 ms-2">Nasłonecznienie</div>
                    <div class="col-6 text-center">x</div>
                </div>
                <div class="row">
                    <div class="col-5 ms-2">Nawodnienie</div>
                    <div class="col-6 text-center">x</div>
                </div>
                <div class="row">
                    <div class="col-5 ms-2">Gleba</div>
                    <div class="col-6 text-center">x</div>
                </div>





            </div>

            <div class="col-md-9 border">
                <div class="col-md-10 p-2 bg-white mx-auto border border-2 rounded d-flex">
                    <div class="col-4 m-auto">
                        <div class="btn-group w-100">
                            <button type="button"
                                class="btn btn-success-outline dropdown-toggle d-flex align-items-center justify-content-around px-4"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <div class="col-12 text-center">
                                    Sortowanie domyślne
                                </div>
                            </button>
                            <ul class="dropdown-menu w-100">
                                <li>
                                    <a class="dropdown-item d-flex align-items-center justify-content-around px-2" href="#">
                                        <div class="col-1">
                                            <span class="material-symbols-outlined">
                                                keyboard_double_arrow_up
                                            </span>
                                        </div>
                                        <div class="col-1">
                                            <span class="material-symbols-outlined">
                                                payments
                                            </span>
                                        </div>
                                        <div class="col-9 text-center">
                                            Cena - najwyższa
                                        </div>
                                    </a>
                                    <a class="dropdown-item d-flex align-items-center justify-content-around px-2" href="#">
                                        <div class="col-1">
                                            <span class="material-symbols-outlined">
                                                keyboard_double_arrow_down
                                            </span>
                                        </div>
                                        <div class="col-1">
                                            <span class="material-symbols-outlined">
                                                payments
                                            </span>
                                        </div>
                                        <div class="col-9 text-center">
                                            Cena - najniższa
                                        </div>
                                    </a>
                                    <a class="dropdown-item d-flex align-items-center justify-content-around px-2" href="#">
                                        <div class="col-2">
                                            <span class="material-symbols-outlined">
                                                trending_up
                                            </span>
                                        </div>
                                        <div class="col-9 text-center">
                                            Popularność
                                        </div>
                                    </a>
                                    <a class="dropdown-item d-flex align-items-center justify-content-around px-2" href="#">
                                        <div class="col-2">
                                            <span class="material-symbols-outlined">
                                                star_half
                                            </span>
                                        </div>
                                        <div class="col-9 text-center">
                                            Średniej ocen
                                        </div>
                                    </a>
                                    <a class="dropdown-item d-flex align-items-center justify-content-around px-2" href="#">
                                        <div class="col-2">
                                            <span class="material-symbols-outlined">
                                                comment
                                            </span>
                                        </div>
                                        <div class="col-9 text-center">
                                            Ilości komentarzy
                                        </div>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div class="col-4">
                        <div class=" text-end mt-1 me-2">Zakres cen (zł)</div>
                    </div>

                    <div class="col-4">
                        <div class="row">
                            <v-range-slider :min="10" :max="500" :step="1" v-model="rangeValue" strict hide-details
                                class="slider" thumb-color="#6d9b76" track-color="#e0caaf"
                                track-fill-color="#6d9b76"></v-range-slider>
                        </div>
                        <div class="row d-flex m-0 justify-content-between">
                            <div class="col-5">
                                <input type="text" class="form-control" @change="validateRange" v-model="rangeValue[0]">
                            </div>
                            <div class="col text-center fs-5">
                                -
                            </div>
                            <div class="col-5">
                                <input type="text" class="form-control" @change="validateRange" v-model="rangeValue[1]">
                            </div>
                        </div>
                    </div>



                </div>
            </div>



        </div>
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { ref, type Ref } from 'vue';
import { watch } from 'vue';

const rangeValue: Ref<number[]> = ref([0, 500]);
// to-do
const minRange: Ref<number> = ref(10);
const maxRange: Ref<number> = ref(500);


const selectedType: Ref<number> = ref(-1);

const hasTrueCats: Ref<boolean> = ref(false);
const checkedCats: Ref<boolean[]> = ref([]);
watch(checkedCats.value, (newValues, oldValues) => {
    hasTrueCats.value = newValues.some(value => value === true);
}, { deep: true });

const clearCats = () => {
    checkedCats.value.forEach((item, index) => {
        checkedCats.value[index] = false;
    });
};



const validateRange = () => {
    if (rangeValue.value[0] > rangeValue.value[1]) rangeValue.value[0] = rangeValue.value[1];
    if (rangeValue.value[1] < rangeValue.value[0]) rangeValue.value[1] = rangeValue.value[0];
    if (rangeValue.value[0] < minRange.value) rangeValue.value[0] = minRange.value;
    if (rangeValue.value[1] > maxRange.value) rangeValue.value[1] = maxRange.value;
}

</script>

<style scoped>
.dropdown-item {
    margin-top: 5px;
}

.dropdown-item>.col-2>span {
    text-align: center;
    width: 100%;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.slider {
    color: var(--color-primary);
}
</style>