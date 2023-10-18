<template>
    <div class="container-fluid m-0 p-0 d-flex flex-column vh-100">
        <Header></Header>
        <div class="flex-grow-1 py-3">

            <div class="row w-100 h3 m-0">
                <span class="w-100 text-center mb-3">Dział pomocy - powiedz z czym masz problem!</span>
            </div>



            <div class="d-flex flex-column justify-content-center" style="height: 75%;" v-if="step === 0">

                <div class="w-100 h5 m-0 text-center">
                    <span class="w-100 text-center my-1">Nasi specjaliści z pewnością pomogą! Wybierz rodzaj
                        problemu:</span>
                </div>
                <div class="col-md-6 mx-auto d-flex mt-3">
                    <div class="col-md-6 text-center">
                        <button class="col-8 p-2 btn btn-lg btn-success-outline" @click="$router.push('/')">Pomoc
                            sklepu</button>
                    </div>
                    <div class="col-md-6 text-center">
                        <button class="col-8 p-2 btn btn-lg btn-success-outline" @click="$router.push('/')">Pomoc
                            techniczna</button>

                    </div>
                </div>

                <div class="text-center w-100 fs-6 my-5">
                    <span class="w-100 text-center my-3">W przypadku niejasności prosimy kierować zapytanie do obsługi
                        technicznej</span>
                </div>
            </div>


            <div class="d-flex flex-column justify-content-center" style="min-height: 75%;" v-if="step === 1">

                <div class="p-3 border border-5 rounded col-xl-6 col-lg-8 col-md-10 col-11 mx-auto" style="border-width: 2px !important;">

                    <div class="w-100 mx-auto d-flex justify-conten-around">
                        <div class="col-6 justify-content-start align-items-center d-flex">
                            <button class="btn btn-lg btn-success-outline">Powrót</button>
                        </div>
                        <div class="col-6 justify-content-end align-items-center d-flex">
                            <span class="fs-4">Wypełnij formularz</span>
                        </div>
                    </div>

                    <div class="row justify-content-between mt-3">
                        <div class="form-floating col-md-6">
                            <input type="text" class="form-control is-invalid" placeholder="Imię">
                            <label for="floatingInput">&nbsp;Imię <span style="color: red;">*</span></label>
                            <span style="color: red;">Proszę podać swoje imię</span>
                        </div>
                        <div class="form-floating col-md-6">
                            <input type="text" class="form-control" placeholder="Nazwisko">
                            <label for="floatingInput">&nbsp;Nazwisko</label>
                            <span style="color: red;">&nbsp;</span>
                        </div>
                    </div>

                    <div class="row justify-content-between mt-2">
                        <div class="form-floating col-md-6">
                            <input type="text" class="form-control is-valid" placeholder="E-mail">
                            <label for="floatingInput">&nbsp;E-mail <span style="color: red;">*</span></label>
                            <span style="color: red;" class="position-absolute top-100">Proszę podać swój e-mail</span>
                        </div>

                        <div class="form-floating col-md-6">

                            <div class="btn-group col-12 h-100">
                                <button type="button"
                                    class="btn btn-success-outline dropdown-toggle d-flex align-items-center justify-content-around px-4"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <div class="col-12 text-center">
                                        Wybierz temat problemu
                                    </div>
                                </button>
                                <ul class="dropdown-menu w-100">
                                    <li>
                                        <a class="dropdown-item d-flex align-items-center justify-content-around px-2"
                                            href="#">
                                            <div class="col-2 d-flex">
                                                <span class="material-symbols-outlined">
                                                    disabled_visible
                                                </span>
                                            </div>
                                            <div class="col-9 text-center">
                                                Element zasłania stronę
                                            </div>
                                        </a>
                                    </li>

                                    <li>
                                        <a class="dropdown-item d-flex align-items-center justify-content-around px-2"
                                            href="#">
                                            <div class="col-2 d-flex">
                                                <span class="material-symbols-outlined">
                                                    mist
                                                </span>
                                            </div>
                                            <div class="col-9 text-center">
                                                Nie znaleziono strony
                                            </div>
                                        </a>
                                    </li>


                                    <li>
                                        <a class="dropdown-item d-flex align-items-center justify-content-around px-2"
                                            href="#">
                                            <div class="col-2 d-flex">
                                                <span class="material-symbols-outlined">
                                                    error
                                                </span>
                                            </div>
                                            <div class="col-9 text-center">
                                                Paradoksalne zachowanie strony
                                            </div>
                                        </a>
                                    </li>

                                    <li>
                                        <a class="dropdown-item d-flex align-items-center justify-content-around px-2"
                                            href="#">
                                            <div class="col-2 d-flex">
                                                <span class="material-symbols-outlined">
                                                   other_admission
                                                </span>
                                            </div>
                                            <div class="col-9 text-center">
                                                Inne
                                            </div>
                                        </a>
                                    </li>

                                </ul>
                                <span style="color: red;" class="position-absolute top-100">Proszę wybrać temat problemu</span>
                            </div>
                        </div>









                    </div>

                    <div class="row mt-5">
                        <div class="form-floating mt-2 px-1 col-12">
                            <textarea class="form-control" placeholder="Opis produktu" rows="6"
                                style="resize: none; min-height: 12em; padding-top: 5%;"></textarea>
                            <label style="width: 95%; margin-left: 5px;">Opisz problem, podaj link gdzie występuje błąd lub
                                akcję, która doprowadziła do niego <span style="color: red;">*</span></label>
                            <span style="color: red;">Pole nie może być puste</span>
                        </div>
                    </div>

                    <div class="row justify-content-center mt-3">
                        <button class="col-md-8 col-12 btn btn-lg btn-success-outline">Wyślij zapytanie</button>
                    </div>

                    <!-- <div class="row g-5">
                        <div class="col-md-6">
                            <input type="text" class="form-control is-valid">
                        </div>

                        <div class="col-md-6">
                            <input type="text" class="form-control is-valid">
                        </div>
                    </div> -->


                </div>

            </div>


        </div>
        <Footer></Footer>

    </div>
</template>
<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { type Ref, ref } from 'vue';

const step: Ref<number> = ref(1);
</script>
<style scoped></style>
