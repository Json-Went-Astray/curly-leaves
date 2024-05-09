<template>
    <div class="container-fluid mb-4 px-0">
        <Header class="sticky-top" :message="flag" :doNotOpen="true"></Header>
        <Preloader v-if="loading"></Preloader>
        <div class="container-fluid px-md-3 py-2" style="min-height: 70vh">

            <div
                class="d-flex my-3 mx-auto col-xl-7 col-lg-8 col-lg-9 col-12 rounded position-relative justify-content-between p-0">

                <div class="position-absolute align-items-center cl-bg-white border col-md-6 p-1 rounded top-50"
                    style="width: 95%;">
                </div>

                <div v-if="summary != 2"
                    class="position-absolute align-items-center cl-bg-primary border col-md-6 p-1 rounded top-50"
                    style="width: 45%; left: 0%; right: auto;">
                </div>

                <div v-else
                    class="position-absolute align-items-center cl-bg-primary border col-md-6 p-1 rounded top-50"
                    style="width: 99%; left: 0%; right: auto;">
                </div>

                <div class="rounded-circle p-4 cl-bg-white border cursor-pointer" style="border: none !important;">
                    <div class="position-absolute h-100 cl-bg-white rounded-circle start-0 top-0 progress-ball w-100 d-flex align-items-center justify-content-center border-box"
                        style="border: solid 2px #6d9b76;">
                        <span class="material-symbols-outlined unselectable fs-2">
                            shopping_cart
                        </span>
                    </div>
                </div>

                <div class="rounded-circle p-4 cl-bg-white border cursor-pointer" style="border: none !important;">
                    <div class="position-absolute h-100 cl-bg-white rounded-circle start-0 top-0 progress-ball w-100 d-flex align-items-center justify-content-center"
                        style="border: solid 2px #6d9b76;">
                        <span class="material-symbols-outlined unselectable fs-2">
                            password
                        </span>
                    </div>
                </div>

                <div class="rounded-circle p-4 cl-bg-white border cursor-pointer" v-if="summary != 2"
                    style="border: none !important;">
                    <div style="border: solid 2px #6d9b76;"
                        class="position-absolute h-100 cl-bg-white rounded-circle start-0 top-0 progress-ball w-100 d-flex align-items-center justify-content-center">
                        <span class="material-symbols-outlined unselectable fs-2">
                            summarize
                        </span>
                    </div>
                </div>

                <div class="rounded-circle p-4 cl-bg-white border cursor-pointer" v-else>
                    <div
                        class="position-absolute h-100 cl-bg-white rounded-circle start-0 top-0 progress-ball w-100 d-flex align-items-center justify-content-center">
                        <span class="material-symbols-outlined unselectable fs-2">
                            summarize
                        </span>
                    </div>
                </div>

            </div>

            <div v-show="summary === 0" class="row justify-content-center">
                <div class="col-lg-8 col-12">
                    <div
                        class="mx-auto col-11 rounded-2 border p-md-3 p-2 px-0 my-2 cl-bg-white position-relative overflow-hidden">
                        <div class="w-100 my-1 text-center">
                            <h3 class="hr-divider" style="--w: 50vw;--c: #6d9b76;--b:4px;--g:-5px">Dane kupującego</h3>
                        </div>
                        <div class="px-2 form-z" style="z-index: 2;">
                            <div class="form-floating col-12 select">
                                <select class="form-select" aria-label="Zapisany adres"
                                    @change="handleSetChange(1, $event.target.value)">
                                    <option value="0">Wprowadź własne dane</option>
                                    <option :value="set.id"
                                        v-if="filteredAddressesSets && filteredAddressesSets.length != 0"
                                        v-for="(set, index) in filteredAddressesSets">Zestaw {{ index + 1 }}</option>
                                </select>
                                <label for="floatingSelectGrid">Zapisany adres</label>
                            </div>
                            <div class="d-flex gx-3 row my-3">
                                <div class="form-floating mb-3 col-lg-6">
                                    <input type="text" class="form-control" v-if="selectedSets.set1.custom == true"
                                        v-model="customs.set1.name">
                                    <input v-else type="text" class="form-control"
                                        :disabled="selectedSets.set1.custom == false" placeholder="name@example.com"
                                        :value="userData?.me?.name || ''">
                                    <label for="floatingInput">Imię</label>
                                </div>
                                <div class="form-floating mb-3 col-lg-6">
                                    <input type="text" class="form-control" v-if="selectedSets.set1.custom == true"
                                        v-model="customs.set1.surname">
                                    <input v-else type="text" class="form-control" :disabled="!selectedSets.set1.custom"
                                        placeholder="name@example.com" :value="userData?.me?.surname || ''">
                                    <label for="floatingInput">Nazwisko</label>
                                </div>
                            </div>
                            <div class="d-flex gx-3 row my-3">
                                <div class="form-floating col-lg-6 select">
                                    <select class="form-select" aria-label="Województwo"
                                        :disabled="!selectedSets.set1.custom"
                                        :value="!selectedSets.set1.custom ? (filteredAddressesSets.find(item => item.id === selectedSets.set1.setid)?.county || '') : 'łódzkie'">
                                        <option>opolskie</option>
                                        <option>dolnośląskie</option>
                                        <option>kujawsko-pomorskie</option>
                                        <option>lubelskie</option>
                                        <option>lubuskie</option>
                                        <option>łódzkie</option>
                                        <option>małopolskie</option>
                                        <option>mazowieckie</option>
                                        <option>podkarpackie</option>
                                        <option>podlaskie</option>
                                        <option>pomorskie</option>
                                        <option>śląskie</option>
                                        <option>świętokrzyskie</option>
                                        <option>warmińsko-mazurskie</option>
                                        <option>wielkopolskie</option>
                                        <option>zachodniopomorskie</option>
                                    </select>
                                    <label for="floatingSelectGrid">Województwo</label>
                                </div>
                                <div class="form-floating col-lg-6 mt-3 mt-lg-0">
                                    <input type="text" class="form-control" v-if="selectedSets.set1.custom == true"
                                        v-model="customs.set1.city">
                                    <input v-else type="test" class="form-control"
                                        :value="!selectedSets.set1.custom ? filteredAddressesSets.find(item => item.id === selectedSets.set1.setid)?.city || '' : ''"
                                        :disabled="!selectedSets.set1.custom">
                                    <label for="floatingtest">Miasto</label>
                                </div>
                            </div>
                            <div class="d-flex gx-3 row my-3">
                                <div class="form-floating mb-3 col-lg-6">
                                    <input type="text" class="form-control" v-if="selectedSets.set1.custom == true"
                                        v-model="customs.set1.phoneNumber">
                                    <input v-else type="text" class="form-control" :disabled="!selectedSets.set1.custom"
                                        :value="!selectedSets.set1.custom ? filteredAddressesSets.find(item => item.id === selectedSets.set1.setid)?.phoneNumber || '' : ''">
                                    <label for="floatingInput">Nr telefonu</label>
                                </div>
                                <div class="form-floating col-lg-6">
                                    <input type="text" class="form-control" v-if="selectedSets.set1.custom == true"
                                        v-model="customs.set1.email">
                                    <input v-else type="test" class="form-control" :disabled="!selectedSets.set1.custom"
                                        :value="userData?.me?.email || ''">
                                    <label for="floatingtest">Adres e-mail</label>
                                </div>
                            </div>
                            <div class="d-flex gx-3 row my-3">
                                <div class="form-floating mb-3 col-md-4">
                                    <input type="text" class="form-control" v-if="selectedSets.set1.custom == true"
                                        v-model="customs.set1.street">
                                    <input v-else type="text" class="form-control" :disabled="!selectedSets.set1.custom"
                                        :value="!selectedSets.set1.custom ? filteredAddressesSets.find(item => item.id === selectedSets.set1.setid)?.street || '' : ''">
                                    <label for="floatingInput">Ulica</label>
                                </div>
                                <div class="form-floating col-md-4 mb-3 mb-md-0">
                                    <input type="text" class="form-control" v-if="selectedSets.set1.custom == true"
                                        v-model="customs.set1.houseNumber">
                                    <input v-else type="test" class="form-control" :disabled="!selectedSets.set1.custom"
                                        :value="!selectedSets.set1.custom ? filteredAddressesSets.find(item => item.id === selectedSets.set1.setid)?.houseNumber || '' : ''">
                                    <label for="floatingtest">Nr lokalu</label>
                                </div>
                                <div class="form-floating col-md-4">
                                    <input type="text" class="form-control" v-if="selectedSets.set1.custom == true"
                                        v-model="customs.set1.postalCode">
                                    <input v-else type="test" class="form-control" :disabled="!selectedSets.set1.custom"
                                        :value="!selectedSets.set1.custom ? filteredAddressesSets.find(item => item.id === selectedSets.set1.setid)?.postalCode || '' : ''">
                                    <label for="floatingtest">kod pocztowy</label>
                                </div>
                            </div>
                            <div class="d-flex gx-3 row my-3">
                                <div class="form-floating mb-3 col-lg-6">
                                    <input type="text" class="form-control" v-if="selectedSets.set1.custom == true"
                                        v-model="customs.set1.companyName">
                                    <input v-else type="text" class="form-control" :disabled="!selectedSets.set1.custom"
                                        :value="!selectedSets.set1.custom ? filteredAddressesSets.find(item => item.id === selectedSets.set1.setid)?.companyName || '' : ''">
                                    <label for="floatingInput">Nazwa firmy</label>
                                </div>
                                <div class="form-floating mb-3 col-lg-6">
                                    <input type="text" class="form-control" v-if="selectedSets.set1.custom == true"
                                        v-model="customs.set1.nip">
                                    <input v-else type="text" class="form-control" :disabled="!selectedSets.set1.custom"
                                        :value="!selectedSets.set1.custom ? filteredAddressesSets.find(item => item.id === selectedSets.set1.setid)?.nip || '' : ''">
                                    <label for="floatingInput">NIP</label>
                                </div>
                            </div>
                        </div>


                        <div class="cl-break"></div>
                        <div class="form-divider-bottom position-absolute rounded-2"
                            style="height: 100%; width: 100%; z-index: 0; opacity: 0.5; bottom: -5%; overflow-y: hidden;">

                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-12">
                    <div class="col-12 col-md-11 rounded-2 border border-2 py-md-3 py-2 my-2 mx-auto overflow-hidden">
                        <div style="z-index: 2;" class="px-2 px-md-3">

                            <div class="row mt-1 mb-3 text-center">
                                <span class="hr-divider py-1"
                                    style="--w: 50vw;--c: #6d9b76;--b:2px;--g:-5px;">Koszty</span>
                            </div>

                            <div class="row my-1">
                                <div class="col-6">
                                    <span>Cena Netto:</span>
                                </div>
                                <div class="col-6">
                                    <span class="summary-numbers">{{ Math.ceil(productMetrics.netSum * 100) / 100 }}
                                        zł</span>
                                </div>
                            </div>
                            <div class="row my-1">
                                <div class="col-6">
                                    <span>Cena Brutto:</span>
                                </div>
                                <div class="col-6">
                                    <span class="summary-numbers">{{ Math.ceil(productMetrics.netSum * 1.23 * 100) / 100
                                        }} zł</span>
                                </div>
                            </div>
                            <div class="row my-1">
                                <div class="col-6">
                                    <span>Cena dostawy:</span>
                                </div>
                                <div class="col-6">
                                    <span class="summary-numbers"
                                        v-if='productMetrics.selectedDeliveryMethod == "other"'>12 zł</span>
                                    <span class="summary-numbers" v-else>0 zł</span>

                                </div>
                            </div>
                            <div class="row my-1">
                                <div class="col-6">
                                    <span>Cena łączna:</span>
                                </div>
                                <div class="col-6">
                                    <span class="summary-numbers">{{ grossSum }} zł</span>
                                </div>
                            </div>
                            <div class="row my-1">
                                <div class="col-6">
                                    <span>Wartość punktów:</span>
                                </div>
                                <div class="col-4">
                                    <span class="summary-numbers">{{ productMetrics.givenPoints }}</span>
                                </div>
                                <div class="col-2 d-flex align-items-center">
                                    <span class="material-symbols-outlined summary-numbers" style="cursor: pointer"
                                        title="Po opłaceniu zamówienia otrzymasz tyle punktów w ramach programu lojalnościowego, które możesz wymienić na różne nagrody">
                                        help
                                    </span>
                                </div>
                            </div>
                            <div class="row my-3 text-center">
                                <span class="hr-divider py-1" style="--w: 50vw;--c: #6d9b76;--b:2px;--g:-5px;">Sposób
                                    dostawy</span>
                            </div>
                            <div class="row">
                                <div class="col-3">
                                    <input class="form-check-input cursor-pointer" type="radio" name="deliveryMethod"
                                        v-model="productMetrics.selectedDeliveryMethod" value="personalPickup">
                                </div>
                                <div class="col-6">
                                    <span class="fw-bold">
                                        Odbiór osobisty
                                    </span>
                                </div>
                                <div class="col-3">
                                    <span>(0,00 zł)</span>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-3">
                                    <input class="form-check-input cursor-pointer" type="radio" name="deliveryMethod"
                                        v-model="productMetrics.selectedDeliveryMethod" value="other">
                                </div>
                                <div class="col-6">
                                    <span class="fw-bold">
                                        Kurier XYZ
                                    </span>
                                </div>
                                <div class="col-3">
                                    <span>(12,00 zł)</span>
                                </div>
                            </div>
                            <div class="row my-3 text-center">
                                <span class="hr-divider py-1" style="--w: 50vw;--c: #6d9b76;--b:2px;--g:-5px;">Sposób
                                    płatności</span>
                            </div>
                            <div class="row mt-3">
                                <div class="col-3">
                                    <input class="form-check-input cursor-pointer" type="radio" name="paymentMethod"
                                        value="prePaid" v-model="productMetrics.paymentMethod" checked>
                                </div>
                                <div class="col">
                                    <span class="fw-bold">
                                        Przelew tradycyjny
                                    </span>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-3">
                                    <input class="form-check-input cursor-pointer" type="radio" name="paymentMethod"
                                        value="cod" v-model="productMetrics.paymentMethod">
                                </div>
                                <div class="col">
                                    <span class="fw-bold">
                                        Przy odbiorze
                                    </span>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-3">
                                    <input class="form-check-input cursor-pointer" type="radio" disabled>
                                </div>
                                <div class="col" style='color: grey;'>
                                    <span class="fw-bold">
                                        Kartą płatniczną
                                    </span>
                                    <span style="font-size: 0.7em"> - chwilowo niedostępne</span>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-6 text-center">
                                    <img src="@/assets/static/images/mastercard.png" alt="masterCard"
                                        class="w-50 rounded border">
                                </div>
                                <div class="col-6 text-center">
                                    <span class="fw-bold">
                                        <img src="@/assets/static/svg/Blik_logo.svg" alt="masterCard" class="w-50">
                                    </span>
                                </div>
                            </div>
                        </div>


                        <div class="cl-break"></div>


                        <div class="form-divider-bottom position-absolute rounded-2"
                            style="height: 100%; width: 100%; z-index: 1; opacity: 0.5; bottom: -10%; overflow-y: hidden;">
                        </div>
                    </div>
                    <div class="row my-5">
                        <div class="col-11 mx-auto">
                            <button class="btn btn-lg btn-success w-100" @click="summary = 1">
                                Przejdź do podsumowania
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-show="summary == 1" :class="{ 'd-none': summary !== 1, 'd-flex': summary === 1 }"
                class="w-100 justify-content-around px-md-3">
                <div class="d-flex col-12 col-md-6 flex-column mb-5">

                    <div class="d-flex flex-column">
                        <div class="row">
                            <span class="fs-4 fw-bold">Dane kupującego:</span>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <span class="fs-5">Imię i nazwisko:</span>
                            </div>
                            <div class="col-6">
                                <span v-if="selectedSets.set1.custom == false" class="fs-5">{{ userData?.me.name || ''
                                    }} {{ userData?.me.surname || '' }}</span>
                                <span v-else class="fs-5">{{ customs.set1.name }} {{ customs.set1.surname }}</span>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <span class="fs-5">E-mail:</span>
                            </div>
                            <div class="col-6">
                                <span class="fs-5" v-if="selectedSets.set1.custom == false">{{ userData?.me.email || ''
                                    }}</span>
                                <span class="fs-5" v-else>{{ customs.set1.email }}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <span class="fs-5">Nr telefonu:</span>
                            </div>
                            <div class="col-6">
                                <span v-if="!selectedSets.set1.custom" class="fs-5">{{ filteredAddressesSets.find(item=> item.id === selectedSets.set1.setid)?.phoneNumber || '' }}</span>
                                <span v-else class="fs-5">{{ customs.set1.phoneNumber }}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <span class="fs-5">Adres:</span>
                            </div>
                            <div class="col-6 d-flex flex-column" v-if="selectedSets.set1.custom == false">
                                <span class="fs-5">{{ filteredAddressesSets.find(item => item.id ===
            selectedSets.set1.setid)?.postalCode || '' }} {{ filteredAddressesSets.find(item =>
            item.id === selectedSets.set1.setid)?.city || '' }}</span>
                                <span class="fs-5">{{ filteredAddressesSets.find(item => item.id ===
            selectedSets.set1.setid)?.street || '' }} {{ filteredAddressesSets.find(item =>
            item.id === selectedSets.set1.setid)?.houseNumber || '' }}</span>
                                <span class="fs-5">{{ filteredAddressesSets.find(item => item.id ===
            selectedSets.set1.setid)?.county || '' }}</span>
                            </div>
                            <div class="col-6 d-flex flex-column" v-else>
                                <span class="fs-5">{{ customs.set1.postalCode }} {{ customs.set1.city }}</span>
                                <span class="fs-5">{{ customs.set1.street }} {{ customs.set1.houseNumber }}</span>
                                <span class="fs-5">{{ customs.set1.county }}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <span class="fs-5">Dane firmy:</span>
                            </div>
                            <div class="col-6 d-flex flex-column" v-if="selectedSets.set1.custom == false">
                                <span class="fs-5">{{ filteredAddressesSets.find(item => item.id ===
            selectedSets.set1.setid)?.companyName || '' }}</span>
                                <span class="fs-5">{{ filteredAddressesSets.find(item => item.id ===
            selectedSets.set1.setid)?.nip || '' }}</span>
                            </div>
                            <div class="col-6 d-flex flex-column" v-else>
                                <span class="fs-5">{{ customs.set1.companyName}}</span>
                                <span class="fs-5">{{ customs.set1.nip}}</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="d-flex col-12 col-md-3 flex-column mb-5">
                    <div class="row">
                        <span class="fs-4 fw-bold">Płatność i dostawa:</span>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <span class="fs-5">Sposób płatności:</span>
                        </div>
                        <div class="col-6">
                            <span class="fs-5">{{ productMetrics.paymentMethod == 'prePaid' ? 'Przelew tradycyjny' :
                                'Płatność przy odbiorze' }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <span class="fs-5">Sposób dostawy:</span>
                        </div>
                        <div class="col-6">
                            <span class="fs-5">{{ productMetrics.selectedDeliveryMethod == 'other' ? 'Kurier XYZ' :
                                'Odbiór osobisty' }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <span class="fs-5">Do zapłaty:</span>
                        </div>
                        <div class="col-6">
                            <span class="fs-5">{{ grossSum }} zł</span>
                        </div>
                    </div>
                    <div class="row justify-content-center my-4">
                        <div class="col-6">
                            <button class="btn btn-lg btn-success" @click="placeOrder()">Złóż zamówienia</button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-show="summary == 2" :class="{'d-none': summary !== 2, 'd-flex': summary === 2}" class="w-100 justify-content-center align-items-center flex-column px-md-3">
                <span class="material-symbols-outlined cl-text-primary" style="font-size: 10vw;">
                    redeem
                </span>
                <br>
                <span v-if="productMetrics.paymentMethod=='cod'" class="fs-4 cl-text-primary text-center">Dziękujemy za złożenie zamówienia.</span>
                <span v-else class="fs-4 cl-text-primary text-center">Dziękujemy za złożenie zamówienia.<br>By sfinalizować płatność dokonaj przelewu na nasz adres z tytułem: {{ res?.data?.placeOrder }}</span>
            </div>



        </div>
        <Footer></Footer>
    </div>
</template>
<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Toggle from '@vueform/toggle'
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import { fetchMe, userData } from '@/me';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import router from '@/router';
import { reactive } from 'vue';
import Preloader from '@/components/Preloader.vue';


const theSameData = ref(false);
const summary = ref(0);
const ending = ref(false);
const loading = ref(false);

onMounted(async () => {
    await fetchMe();
    await processCart();

    if (data.value && data.value.cart && data.value.cart.CartItem) {
        productMetrics.netSum = 0;
        //@ts-ignore
        data.value.cart.CartItem.forEach(item => {
            let price = 0;
            if (item.product.price) {
                price = item.product.price;
            }
            else {
                price = item.product.fullPrice;
            }
            const quantity = item.quantity;
            productMetrics.netSum += price * quantity;
            productMetrics.givenPoints += item.product.pointsGiven * quantity;
        });
        if (productMetrics.selectedDeliveryMethod != 'other') {
            grossSum.value = (Math.ceil(productMetrics.netSum * 1.23 * 100) / 100);
        } else {
            grossSum.value = (Math.ceil(productMetrics.netSum * 1.23 * 100) / 100) + 12;
        }

    }
});

const loaded = ref(false);
const flag = ref(false);
const data = ref();
let grossSum = ref(0);

const productMetrics = reactive({
    netSum: 0,
    selectedDeliveryMethod: 'other',
    paymentMethod: 'prePaid',
    givenPoints: 0
});

watch(() => productMetrics.selectedDeliveryMethod, (newValue, oldValue) => {
    grossSum.value = 0;
    if (newValue !== 'other') {
        grossSum.value = Math.ceil(productMetrics.netSum * 1.23 * 100) / 100;
    } else {
        grossSum.value = Math.ceil(productMetrics.netSum * 1.23 * 100) / 100 + 12;
    }
});

const { mutate: doProcessCart } = useMutation(
    gql`
    mutation getProcessedCart {
  getProcessedCart {
    CartItem {
      isPrize,
      quantity,
      product {
        id,
        pics,
        title,
        price,
        fullPrice,
        snowFlake,
      }
    }
  }
}
    `
);

const { mutate: doPlaceOrder } = useMutation(
    gql`
    mutation placeOrder($deliveryMethod: String!, $isSet1: Boolean!, $netValue: Float!, $paymentMethod: String!, $set1Id: String) {
  placeOrder(
    deliveryMethod: $deliveryMethod
    isSet1: $isSet1
    netValue: $netValue
    paymentMethod: $paymentMethod
    set1Id: $set1Id
  )
}
    `
);



const processCart = async () => {
    try {
        if (!userData.value || !userData.value.me || !userData.value.me.id) {
            console.log("nope");
            return;
        }

        const res = await doProcessCart();
        console.log('Odpowiedź z mutacji processCart:', res);
        const userDataResponse = await fetchMe();
        data.value = userDataResponse?.data.me;
        flag.value = !flag.value;
        if (!data.value.cart || !data.value.cart.CartItem || data.value.cart.CartItem.length == 0) {
            router.push('/pre-checkout')
        }



    } catch (error) {
        console.error('Błąd podczas wywoływania mutacji processCart:', error);
    }
};

const res = ref();
const placeOrder = async () => {

    try {
        loading.value = true;
        if (!userData.value || !userData.value.me || !userData.value.me.id) {
            console.log("nope");
            return;
        }

        res.value = await doPlaceOrder({
            deliveryMethod: productMetrics.selectedDeliveryMethod,
            isSet1: !selectedSets.set1.custom,
            //@ts-ignore
            netValue: parseFloat(grossSum.value),
            paymentMethod: productMetrics.paymentMethod,
            set1Id: selectedSets.set1.setid
        });
        console.log('Odpowiedź z mutacji placeOrder:', res);
        const userDataResponse = await fetchMe();
        data.value = userDataResponse?.data.me;
        flag.value = !flag.value;
        summary.value = 2;


    } catch (error) {
        summary.value = 1;
        console.error('Błąd podczas wywoływania mutacji processCart:', error);
    } finally {
        loading.value = false;
    }
};

watchEffect(() => {
    loaded.value = !!data.value;
});

const filteredAddressesSets = computed(() => {
    //@ts-ignore
    return userData?.value?.me?.addressesSets?.filter(set => !set.isTemporary) || [];
});

const selectedSets = reactive({
    set1: {
        custom: true,
        setid: "",
    },
    set2: {
        custom: true,
        setid: "",
    },
})

const customs = reactive({
    set1: {
        name: "",
        surname: "",
        county: "",
        city: "",
        phoneNumber: "",
        email: "",
        street: "",
        houseNumber: "",
        postalCode: "",
        companyName: "",
        nip: "",
    },
    set2: {
        name: "",
        surname: "",
        county: "",
        city: "",
        phoneNumber: "",
        email: "",
        street: "",
        houseNumber: "",
        postalCode: "",
        companyName: "",
        nip: "",
    },
})

const handleSetChange = (setNum: number, id: string) => {
    if (id == '0') {
        if (setNum == 1) {
            selectedSets.set1.custom = true;
            selectedSets.set1.setid = id;
        }

        else {
            selectedSets.set2.custom = true;
            selectedSets.set1.setid = id;
        }
    }
    else if (id != '0') {
        if (setNum == 1) {
            selectedSets.set1.custom = false;
            selectedSets.set1.setid = id;
        }
        else {
            selectedSets.set2.custom = false;
            selectedSets.set2.setid = id;
        }
    }
}

</script>
<style scoped>
.select>select:focus {
    outline: none !important;
    box-shadow: none !important;
    border-color: #6d9b76;
}

.input-group {
    width: unset !important;
}

.summary-numbers {
    font-size: 16pt;
    font-weight: bold;
    cursor: default;
}
</style>

<style scoped src="@vueform/toggle/themes/default.css"></style>
