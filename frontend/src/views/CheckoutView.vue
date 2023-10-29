<template>
    <Header></Header>
    <div class="container px-md-3 py-2">

        <div
            class="d-flex my-3 mx-auto col-xl-7 col-lg-8 col-lg-9 col-12 rounded position-relative justify-content-between p-0">

            <div class="position-absolute align-items-center cl-bg-white border col-md-6 p-1 rounded top-50"
                style="width: 95%;">
            </div>

            <div class="position-absolute align-items-center cl-bg-primary border col-md-6 p-1 rounded top-50"
                style="width: 45%; left: 5%; right: auto;">
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

            <div class="rounded-circle p-4 cl-bg-white border cursor-pointer">
                <div
                    class="position-absolute h-100 cl-bg-white rounded-circle start-0 top-0 progress-ball w-100 d-flex align-items-center justify-content-center">
                    <span class="material-symbols-outlined unselectable fs-2">
                        summarize
                    </span>
                </div>
            </div>

        </div>
        <div class="row justify-content-center">
            <div class="col-lg-8 col-12">
                <div
                    class="mx-auto col-11 rounded-2 border p-md-3 p-2 px-0 my-2 cl-bg-white position-relative overflow-hidden">
                    <div class="w-100 my-1 text-center">
                        <h3 class="hr-divider" style="--w: 50vw;--c: #6d9b76;--b:4px;--g:-5px">Dane kupującego</h3>
                    </div>
                    <div class="px-2 form-z" style="z-index: 2;">
                        <div class="form-floating col-12 select">
                            <select class="form-select" aria-label="Zapisany adres">
                                <option selected>Mój adres 1</option>
                            </select>
                            <label for="floatingSelectGrid">Zapisany adres</label>
                        </div>
                        <div class="d-flex gx-3 row my-3">
                            <div class="form-floating mb-3 col-lg-6">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                                <label for="floatingInput">Imię</label>
                            </div>
                            <div class="form-floating col-lg-6">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                                <label for="floatingPassword">Nazwisko</label>
                            </div>
                        </div>
                        <div class="d-flex gx-3 row my-3">
                            <div class="form-floating col-lg-6 select">
                                <select class="form-select" aria-label="Województwo">
                                    <option selected>opolskie</option>
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
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                                <label for="floatingPassword">Ulica</label>
                            </div>
                        </div>
                        <div class="d-flex gx-3 row my-3">
                            <div class="form-floating mb-3 col-lg-6">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                                <label for="floatingInput">Nr telefonu</label>
                            </div>
                            <div class="form-floating col-lg-6">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                                <label for="floatingPassword">Adres e-mail</label>
                            </div>
                        </div>
                        <div class="d-flex gx-3 row my-3">
                            <div class="form-floating mb-3 col-md-4">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                                <label for="floatingInput">Nr domu</label>
                            </div>
                            <div class="form-floating col-md-4 mb-3 mb-md-0">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                                <label for="floatingPassword">Nr lokalu</label>
                            </div>
                            <div class="form-floating col-md-4">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                                <label for="floatingPassword">kod pocztowy</label>
                            </div>
                        </div>
                        <div class="d-flex gx-3 row my-3">
                            <div class="form-floating mb-3 col-lg-6">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                                <label for="floatingInput">Nazwa firmy</label>
                            </div>
                            <div class="form-floating mb-3 col-lg-6">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                                <label for="floatingInput">NIP</label>
                            </div>
                        </div>
                    </div>
                    <h3 class="hr-divider" style="--w: 50vw;--c: #6d9b76;--b:4px;--g:-5px">Dane odbiorcy</h3>

                    <div class="px-2 form-z" style="z-index: 2;">
                        <div class="d-flex gx-3 row my-3">
                            <div class="form-floating col-6 select">
                                <select class="form-select" aria-label="Zapisany adres">
                                    <option selected>Mój adres 1</option>
                                </select>
                                <label for="floatingSelectGrid">Zapisany adres</label>
                            </div>
                            <div class="form-floating col-6 select d-flex flex-column justify-content-center">
                                <span class="mx-auto unselectable" style="font-size: 1rem;">Te same co kupującego</span>
                                <Toggle v-model="theSameData" class="mx-auto" />
                            </div>
                        </div>
                        <div class="d-flex gx-3 row my-3">
                            <div class="form-floating mb-3 col-lg-6">
                                <input :disabled="theSameData" type="email" class="form-control" id="floatingInput"
                                    placeholder="name@example.com">
                                <label for="floatingInput">Imię</label>
                            </div>
                            <div class="form-floating col-lg-6">
                                <input :disabled="theSameData" type="password" class="form-control" id="floatingPassword"
                                    placeholder="Password">
                                <label for="floatingPassword">Nazwisko</label>
                            </div>
                        </div>
                        <div class="d-flex gx-3 row my-3">
                            <div class="form-floating col-lg-6 select">
                                <select :disabled="theSameData" class="form-select" aria-label="Województwo">
                                    <option selected>opolskie</option>
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
                                <input :disabled="theSameData" type="password" class="form-control" id="floatingPassword"
                                    placeholder="Password">
                                <label for="floatingPassword">Ulica</label>
                            </div>
                        </div>
                        <div class="d-flex gx-3 row my-3">
                            <div class="form-floating mb-3 col-lg-6">
                                <input :disabled="theSameData" type="email" class="form-control" id="floatingInput"
                                    placeholder="name@example.com">
                                <label for="floatingInput">Nr telefonu</label>
                            </div>
                            <div class="form-floating col-lg-6">
                                <input :disabled="theSameData" type="password" class="form-control" id="floatingPassword"
                                    placeholder="Password">
                                <label for="floatingPassword">Adres e-mail</label>
                            </div>
                        </div>
                        <div class="d-flex gx-3 row my-3">
                            <div class="form-floating mb-3 col-md-4">
                                <input :disabled="theSameData" type="email" class="form-control" id="floatingInput"
                                    placeholder="name@example.com">
                                <label for="floatingInput">Nr domu</label>
                            </div>
                            <div class="form-floating col-md-4 mb-3 mb-md-0">
                                <input :disabled="theSameData" type="password" class="form-control" id="floatingPassword"
                                    placeholder="Password">
                                <label for="floatingPassword">Nr lokalu</label>
                            </div>
                            <div class="form-floating col-md-4">
                                <input :disabled="theSameData" type="password" class="form-control" id="floatingPassword"
                                    placeholder="Password">
                                <label for="floatingPassword">kod pocztowy</label>
                            </div>
                        </div>
                        <div class="d-flex gx-3 row my-3">
                            <div class="form-floating mb-3 col-lg-6">
                                <input :disabled="theSameData" type="email" class="form-control" id="floatingInput"
                                    placeholder="name@example.com">
                                <label for="floatingInput">Nazwa firmy</label>
                            </div>
                            <div class="form-floating mb-3 col-lg-6">
                                <input :disabled="theSameData" type="email" class="form-control" id="floatingInput"
                                    placeholder="name@example.com">
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
                            <span class="hr-divider py-1" style="--w: 50vw;--c: #6d9b76;--b:2px;--g:-5px;">Koszty</span>
                        </div>

                        <div class="row my-1">
                            <div class="col-6">
                                <span>Cena Netto:</span>
                            </div>
                            <div class="col-6">
                                <span class="summary-numbers">0 zł</span>
                            </div>
                        </div>
                        <div class="row my-1">
                            <div class="col-6">
                                <span>Cena Brutto:</span>
                            </div>
                            <div class="col-6">
                                <span class="summary-numbers">0 zł</span>
                            </div>
                        </div>
                        <div class="row my-1">
                            <div class="col-6">
                                <span>Cena dostawy:</span>
                            </div>
                            <div class="col-6">
                                <span class="summary-numbers">0 zł</span>
                            </div>
                        </div>
                        <div class="row my-1">
                            <div class="col-6">
                                <span>Cena łączna:</span>
                            </div>
                            <div class="col-6">
                                <span class="summary-numbers">0 zł</span>
                            </div>
                        </div>
                        <div class="row my-1">
                            <div class="col-6">
                                <span>Wartość punktów:</span>
                            </div>
                            <div class="col-4">
                                <span class="summary-numbers">0</span>
                            </div>
                            <div class="col-2 d-flex align-items-center">
                                <span class="material-symbols-outlined summary-numbers" style="cursor: pointer" title="Po opłaceniu zamówienia otrzymasz tyle punktów w ramach 
    programu lojalnościowego, które możesz wymienić na różne nagrody">
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
                                <input class="form-check-input cursor-pointer" type="radio" name="deliveryMethod" checked>
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
                                <input class="form-check-input cursor-pointer" type="radio" name="deliveryMethod">
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
                                <input class="form-check-input cursor-pointer" type="radio" name="paymentMethod" checked>
                            </div>
                            <div class="col">
                                <span class="fw-bold">
                                    Przelew tradycyjny
                                </span>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-3">
                                <input class="form-check-input cursor-pointer" type="radio" name="paymentMethod">
                            </div>
                            <div class="col">
                                <span class="fw-bold">
                                    Przy odbiorze
                                </span>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-3">
                                <input class="form-check-input cursor-pointer" type="radio" name="paymentMethod">
                            </div>
                            <div class="col">
                                <span class="fw-bold">
                                    Kartą płatniczną
                                </span>
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
                        <button class="btn btn-lg btn-success w-100">
                            Przejdź do podsumowania
                        </button>
                    </div>
                </div>
            </div>
        </div>



    </div>
    <Footer></Footer>
</template>
<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Toggle from '@vueform/toggle'
import { ref } from 'vue';

const theSameData = ref(false);


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
