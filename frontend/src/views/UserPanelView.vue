<template>
    <div class="container-fluid p-0" style="height: 100vh;">
        <Header></Header>
        <div class="w-75 row mx-auto mt-5 justify-content-between">

            <div class="col-lg-8 p-2 cl-border rounded cl-shadow-static border-box mb-4 mb-lg-0">
                <div class="border row border-box m-0 p align-items-center">
                    <!-- TO DO -->
                    <div class="col-md-7 d-flex align-items-center no-wrap unselectable">


                        <div class="position-relative" @mouseover="imgHovered = true" @mouseleave="imgHovered = false"
                            @click="showPopup">

                            <img src="@/assets/static/profiles/profile1.png" alt="{profile_ID}"
                                class="img-md rounded-circle">


                            <div v-if="imgHovered && editStep == 0"
                                class="img-md rounded-circle d-flex justify-content-center align-items-center start-0 top-50 cursor-pointer position-absolute h-100"
                                style="z-index: 2; transform: translateY(-50%); background-color: grey; opacity: 0.3;">
                            </div>

                            <span v-if="imgHovered && editStep == 0"
                                class="material-symbols-outlined fs-2 cl-text img-md d-flex justify-content-center align-items-center start-0 top-50 cursor-pointer position-absolute"
                                style="z-index: 3; transform: translateY(-50%);">
                                edit
                            </span>
                        </div>
                        <div v-if="popupVisible" class="popup-overlay" @click="closePopup">
                            <div class="popup" @click.stop>
                                <div class="container-fluid">
                                    <div class="row my-3" v-for="i in 3">
                                        <div class="col-md-3 rounded-circle">
                                            <img src="@/assets/static/profiles/profile1.png" alt=""
                                                class="img-sm rounded-circle">
                                        </div>
                                        <div class="col-md-3 x">
                                            <img src="@/assets/static/profiles/profile1.png" alt=""
                                                class="img-sm rounded-circle">
                                        </div>
                                        <div class="col-md-3 x">
                                            <img src="@/assets/static/profiles/profile1.png" alt=""
                                                class="img-sm rounded-circle">
                                        </div>
                                        <div class="col-md-3 x">
                                            <img src="@/assets/static/profiles/profile1.png" alt=""
                                                class="img-sm rounded-circle">
                                        </div>
                                    </div>

                                </div>
                                <div class="btn-group" role="group" aria-label="popup nawigacja" style="position: static;">
                                    <button type="button" class="btn btn-success" style="position: static;">Wybierz</button>
                                    <button type="button" class="btn btn-danger" style="position: static;" @click="closePopup">Zamknij</button>
                                </div>
                            </div>
                        </div>


                        <div class="ms-3 d-flex align-items-center">
                            <span class="h5 m-0">Grzegorz Brzęczyszczykiewicz</span>
                            <span class="ms-2 cursor-pointer material-symbols-outlined" title="Edytuj" @click="editStep = 2"
                                v-if="editStep == 0">
                                edit
                            </span>
                        </div>
                    </div>
                    <div class="col-md-5 unselectable">
                        <div class="row text-end"><span>Warmińsko-Mazurskie</span></div>
                        <div class="row text-end"><span>999 555 555</span></div>
                        <div class="row text-end"><span>48-300 Nysa</span></div>
                        <div class="row text-end"><span>Memcinka 7 m. 1</span></div>
                    </div>
                </div>


                <div class="border row border-box m-0 p align-items-center mt-2 unselectable">
                    <!-- TO DO -->
                    <div class="col-lg-6">

                        <div class="d-flex align-items-center my-3 justify-content-between justify-content-between">
                            <span class="material-symbols-outlined me-3" v-if="editStep != 3">
                                phone_in_talk
                            </span>
                            <span v-if="editStep != 3">999 555 555</span>
                            <span class=" cursor-pointer material-symbols-outlined" title="Edytuj" @click="editStep = 3"
                                v-if="editStep == 0">
                                edit
                            </span>

                            <span class=" cursor-pointer material-symbols-outlined invisible" v-if="editStep != 0">
                                edit
                            </span>
                            <Transition mode="out-in">
                                <div class="d-flex flex-wrap" v-if="editStep == 3">
                                    <div class="form-floating mb-2 w-100">
                                        <input type="email" class="form-control" placeholder="NR telefonu">
                                        <label for="floatingInput">NR telefonu</label>
                                    </div>
                                    <div class="d-flex justify-content-around w-100">
                                        <div class="col-lg-6 text-center">
                                            <button class="btn btn-success">Zapisz</button>
                                        </div>
                                        <div class="col-lg-6 text-center">
                                            <button class="btn btn-success" @click="editStep = 0">Anuluj</button>
                                        </div>
                                    </div>
                                </div>
                            </Transition>

                        </div>
                        <div class="d-flex align-items-center my-3 justify-content-between">
                            <span class="material-symbols-outlined me-3" v-if="editStep != 4">
                                alternate_email
                            </span>
                            <span v-if="editStep != 4">example@email.com</span>
                            <span class=" cursor-pointer material-symbols-outlined" title="Edytuj" @click="editStep = 4"
                                v-if="editStep == 0">
                                edit
                            </span>

                            <span class=" cursor-pointer material-symbols-outlined invisible" v-if="editStep != 0">
                                edit
                            </span>
                            <Transition mode="out-in">
                                <div class="d-flex flex-wrap" v-if="editStep == 4">
                                    <div class="form-floating mb-2 w-100">
                                        <input type="email" class="form-control" placeholder="E-mail">
                                        <label for="floatingInput">E-mail</label>
                                    </div>
                                    <div class="d-flex justify-content-around w-100">
                                        <div class="col-lg-6 text-center">
                                            <button class="btn btn-success">Zapisz</button>
                                        </div>
                                        <div class="col-lg-6 text-center">
                                            <button class="btn btn-success" @click="editStep = 0">Anuluj</button>
                                        </div>
                                    </div>
                                </div>
                            </Transition>

                        </div>

                        <hr class="my-3">


                        <Transition mode="out-in" name="fade" @after-leave="animChain[5] = true">
                            <div class="d-flex align-items-center my-3 justify-content-between"
                                v-if="editStep != 5 && !animChain[5]">
                                <span class="material-symbols-outlined me-3">
                                    contact_mail
                                </span>
                                <span>opolskie</span>
                                <span class=" cursor-pointer material-symbols-outlined" title="Edytuj" @click="editStep = 5"
                                    v-if="editStep == 0">
                                    edit
                                </span>

                                <span class=" cursor-pointer material-symbols-outlined invisible" v-if="editStep != 0">
                                    edit
                                </span>
                            </div>
                        </Transition>
                        <Transition mode="out-in" name="fade" @after-leave="animChain[5] = false">
                            <div class="d-flex flex-wrap" v-if="editStep == 5 && animChain[5]">
                                <div class="form-floating mb-2 w-100">
                                    <input type="email" class="form-control" placeholder="Woj">
                                    <label for="floatingInput">Woj</label>
                                </div>
                                <div class="d-flex justify-content-around w-100">
                                    <div class="col-lg-6 text-center">
                                        <button class="btn btn-success">Zapisz</button>
                                    </div>
                                    <div class="col-lg-6 text-center">
                                        <button class="btn btn-success" @click="editStep = 0">Anuluj</button>
                                    </div>
                                </div>
                            </div>
                        </Transition>



                        <Transition mode="out-in" name="fade" @after-leave="animChain[6] = true">

                            <div class="d-flex align-items-center my-3 justify-content-between"
                                v-if="editStep != 6 && !animChain[6]">
                                <span class="material-symbols-outlined me-3 invisible">
                                    contact_mail
                                </span>
                                <span>48-300 Nysa</span>
                                <span class=" cursor-pointer material-symbols-outlined" title="Edytuj" @click="editStep = 6"
                                    v-if="editStep == 0">
                                    edit
                                </span>

                                <span class=" cursor-pointer material-symbols-outlined invisible" v-if="editStep != 0">
                                    edit
                                </span>
                            </div>
                        </Transition>

                        <Transition mode="out-in" name="fade" @after-leave="animChain[6] = false">
                            <div class="d-flex flex-wrap" v-if="editStep == 6 && animChain[6]">
                                <div class="form-floating mb-2 w-100">
                                    <input type="email" class="form-control" placeholder="Kod pocztowy">
                                    <label for="floatingInput">Kod pocztowy</label>
                                </div>
                                <div class="form-floating mb-2 w-100">
                                    <input type="email" class="form-control" placeholder="Miasto">
                                    <label for="floatingInput">Miasto</label>
                                </div>
                                <div class="d-flex justify-content-around w-100">
                                    <div class="col-lg-6 text-center">
                                        <button class="btn btn-success">Zapisz</button>
                                    </div>
                                    <div class="col-lg-6 text-center">
                                        <button class="btn btn-success" @click="editStep = 0">Anuluj</button>
                                    </div>
                                </div>
                            </div>
                        </Transition>




                        <!-- ULICA NR DOMU -->
                        <Transition mode="out-in" name="fade" @after-leave="animChain[7] = true">
                            <div class="d-flex align-items-center my-3 justify-content-between"
                                v-if="editStep != 7 && !animChain[7]">
                                <span class="material-symbols-outlined me-3 invisible">
                                    contact_mail
                                </span>
                                <span>Memcinka 7 m. 22</span>
                                <span class=" cursor-pointer material-symbols-outlined" title="Edytuj" @click="editStep = 7"
                                    v-if="editStep == 0">
                                    edit
                                </span>

                                <span class=" cursor-pointer material-symbols-outlined invisible" v-if="editStep != 0">
                                    edit
                                </span>
                            </div>
                        </Transition>

                        <Transition mode="out-in" name="fade" @after-leave="animChain[7] = false">
                            <div class="d-flex flex-wrap my-3" v-if="editStep == 7 && animChain[7]">
                                <div class="form-floating mb-2 w-100">
                                    <input type="email" class="form-control" placeholder="Ulica">
                                    <label for="floatingInput">Ulica</label>
                                </div>
                                <div class="form-floating mb-2 w-100">
                                    <input type="email" class="form-control" placeholder="Nr domu">
                                    <label for="floatingInput">Nr domu</label>
                                </div>
                                <div class="d-flex justify-content-around w-100">
                                    <div class="col-lg-6 text-center">
                                        <button class="btn btn-success">Zapisz</button>
                                    </div>
                                    <div class="col-lg-6 text-center">
                                        <button class="btn btn-success" @click="editStep = 0">Anuluj</button>
                                    </div>
                                </div>
                            </div>
                        </Transition>



                        <hr class="my-3">

                        <!-- NIP  -->
                        <Transition mode="out-in" name="fade" @after-leave="animChain[8] = true">
                            <div class="d-flex align-items-center justify-content-between w-100"
                                v-if="editStep != 8 && !animChain[8]">
                                <span class="material-symbols-outlined me-3">
                                    apartment
                                </span>
                                <span>1234 598 555</span>
                                <span class=" cursor-pointer material-symbols-outlined" title="Edytuj" @click="editStep = 8"
                                    v-if="editStep == 0">
                                    edit
                                </span>
                                <span class=" cursor-pointer material-symbols-outlined invisible" v-if="editStep != 0">
                                    edit
                                </span>
                            </div>
                        </Transition>

                        <Transition mode="out-in" name="fade" @after-leave="animChain[8] = false">
                            <div class="d-flex flex-wrap" v-if="editStep == 8 && animChain[8]">
                                <div class="form-floating mb-2 w-100">
                                    <input type="email" class="form-control" placeholder="NIP">
                                    <label for="floatingInput">NIP</label>
                                </div>
                                <div class="d-flex justify-content-around w-100">
                                    <div class="col-lg-6 text-center">
                                        <button class="btn btn-success">Zapisz</button>
                                    </div>
                                    <div class="col-lg-6 text-center">
                                        <button class="btn btn-success" @click="editStep = 0">Anuluj</button>
                                    </div>
                                </div>
                            </div>
                        </Transition>





                        <!-- NAZWA FIRMY  -->
                        <Transition mode="out-in" name="fade" @after-leave="animChain[9] = true">
                            <div class="d-flex align-items-center justify-content-between w-100 my-3"
                                v-if="editStep != 9 && !animChain[9]">
                                <span class="material-symbols-outlined me-3 invisible">
                                    apartment
                                </span>
                                <span>Kwiatki S.A.</span>
                                <span class=" cursor-pointer material-symbols-outlined" v-if="editStep == 0" title="Edytuj"
                                    @click="editStep = 9">
                                    edit
                                </span>
                                <span class=" cursor-pointer material-symbols-outlined invisible" v-if="editStep != 0">
                                    edit
                                </span>
                            </div>
                        </Transition>

                        <Transition mode="out-in" name="fade" @after-leave="animChain[9] = false">
                            <div class="d-flex flex-wrap my-3" v-if="editStep == 9 && animChain[9]">
                                <div class="form-floating mb-2 w-100">
                                    <input type="email" class="form-control" placeholder="Nazwa firmy">
                                    <label for="floatingInput">Nazwa firmy</label>
                                </div>
                                <div class="d-flex justify-content-around w-100">
                                    <div class="col-lg-6 text-center">
                                        <button class="btn btn-success">Zapisz</button>
                                    </div>
                                    <div class="col-lg-6 text-center">
                                        <button class="btn btn-success" @click="editStep = 0">Anuluj</button>
                                    </div>
                                </div>
                            </div>
                        </Transition>


                    </div>

                </div>
            </div>




            <div class="col-lg-3 p-2 cl-border rounded cl-shadow-static h-100">
                <div class="row my-2 w-75 mx-auto">
                    <button class="btn btn-success">Moje zamówienia</button>
                </div>
                <div class="row my-2 w-75 mx-auto">
                    <button class="btn btn-success">Moje wątki</button>
                </div>
                <div class="row my-2 w-75 mx-auto">
                    <button class="btn btn-success">Moje powiadomienia</button>
                </div>
                <div class="row my-2 w-75 mx-auto">
                    <button class="btn btn-success">Ustawienia konta</button>
                </div>
            </div>

        </div>

    </div>
</template>
<script setup lang="ts">
import Header from '@/components/Header.vue';
import { ref } from 'vue';


let imgHovered = ref(false);
const editStep = ref(0);
let animChain = ref([false, false, false, false, false, false, false, false, false, false]);


const popupVisible = ref(false);
const showPopup = () => {
    if (editStep.value != 0) return;
    popupVisible.value = true;
    editStep.value = 1;
}

const closePopup = () => {
    popupVisible.value = false;
    editStep.value = 0;
    imgHovered.value = false;

};


</script>
<style scoped>
.img-md {
    min-width: 75px !important;
    min-height: auto !important;
}

span {
    color: var(--color-text);
}

/* Klasy animacji */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to

/* .fade-leave-active w Vue.js 2.1.8+ */
    {
    opacity: 0;
}

.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.popup {
    background: var(--color-background-mute);
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    position: relative;
}

.popup button {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>