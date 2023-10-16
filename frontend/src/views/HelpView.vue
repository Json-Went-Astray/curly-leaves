<template>
    <div class="container-fluid m-0 p-0 d-flex flex-column vh-100">
        <Header></Header>
        <div class="flex-grow-1 py-3">

            <div class="row w-100 h3 m-0">
                <span class="w-100 text-center">Dział pomocy - powiedz z czym masz problem!</span>
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

                <div class="p-3 border border-5 rounded col-md-6 mx-auto" style="border-width: 2px !important;">

                    <div class="w-100 mx-auto d-flex justify-conten-around">
                        <div class="col-6 justify-content-start align-items-center d-flex">
                            <button class="btn btn-lg btn-success-outline">Powrót</button>
                        </div>
                        <div class="col-6 justify-content-end align-items-center d-flex">
                            <span class="fs-4">Wypełnij formularz</span>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-md-4">
                            <label for="validationCustom01" class="div-label">First name</label>
                            <input type="text" class="form-control is-invalid" id="validationCustom01" value="Mark" required>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label for="validationCustom02" class="form-label">Last name</label>
                            <input type="text" class="form-control" id="validationCustom02" value="Otto" required>
                            <div class="valid-feedback">
                                Looks good!
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
import { type Ref, ref } from 'vue';

const step: Ref<number> = ref(1);
</script>
<style scoped></style>
