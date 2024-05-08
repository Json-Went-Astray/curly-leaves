<template>
    <div class="container-fluid p-0" style="height: 100vh;">
        <Header :message="flag"></Header>
        <div class="w-75 row mx-auto mt-5 justify-content-between">

            <div class="col-lg-8 p-2 cl-border rounded cl-shadown-down border-box mb-4 mb-lg-0">
                <div class="row border-box m-0 p align-items-center">
                    <!-- TO DO -->
                    <div class="col-md-7 d-flex align-items-center no-wrap unselectable">


                        <div class="position-relative" @mouseover="imgHovered = true" @mouseleave="imgHovered = false"
                            @click="showPopup">

                            <img v-if="userData"
                                :src="`http://localhost:4000/uploads/user-avatars/${userData.me.picId}`"
                                class="img-md rounded-circle"
                                style="aspect-ratio: 1 / 1; object-fit:fill;"
                                >
                            <img v-else :src="`http://placehold.co/50x50`" class="img-md rounded-circle">

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
                            <div class="popup text-center" @click.stop style="width: 30%;">
                                <div class="container-fluid">
                                    <div class="row my-3 justify-content-around">
                                        <div class="col-md-4 my-3 rounded-circle p-0">
                                            <img src="http://localhost:4000/uploads/user-avatars/profile1.png" alt=""
                                            :class="{ 'highlighted': highlighted == 'profile1.png' }"
                                            @click="highlightHandler('profile1.png')"
                                                class="cursor-pointer rounded-circle" style="max-width: 100%; height: auto; width: 75px; aspect-ratio: 1 / 1; object-fit: contain;">
                                        </div>

                                        <!-- Pętla dla pfpArray -->
                                        <div class="col-md-4 my-3 rounded-circle p-0" v-if="pfpArray" v-for="item in pfpArray.getPfps">
                                            <img :src="`http://localhost:4000${item.source}`" alt=""
                                            :class="{ 'highlighted': highlighted == item.source.split('/').pop() }"
                                            @click="highlightHandler(item.source)"
                                                class="rounded-circle cursor-pointer" style="max-width: 100%; height: auto; width: 75px; aspect-ratio: 1 / 1; object-fit:fill;">
                                        </div>
                                    </div>

                                </div>
                                <div class="btn-group" role="group"
                                    style="position: static;">
                                    <button type="button" class="btn btn-success text-white"
                                        style="position: static;" @click="setPfp(highlighted)">Wybierz</button>
                                    <button type="button" class="btn btn-danger text-white" style="position: static;"
                                        @click="closePopup">Zamknij</button>
                                </div>
                            </div>
                        </div>


                        <div class="ms-3 d-flex align-items-center">
                            <span class="h5 m-0" v-if="userData">{{ userData.me.name }} {{ userData.me.surname }}</span>
                            <span class="h5 m-0" v-else>--- ---</span>
                        </div>
                    </div>
                    <div class="col-md-5 unselectable">

                    </div>
                </div>

                <hr>
                <div class="row border-box m-0 p align-items-center mt-2 unselectable">
                    <!-- TO DO -->
                    <div class="col-lg-6" v-if="selectedSet.id != -1 && userData">
                        <p class="text-center fs-4 cl-text-primary fw-bold d-flex justify-content-center align-items-center">{{ selectedSet.text }}&nbsp;&nbsp;&nbsp;<span @click="deleteSet(selectedSet.id)" title="Usuń zestaw adresów" class="material-symbols-outlined cl-text-secondary cursor-pointer">
                        delete_forever
                        </span></p>

                        <div class="d-flex align-items-center my-3 justify-content-between justify-content-between">
                            <span class="material-symbols-outlined me-3" v-if="editStep != 3">
                                phone_in_talk
                            </span>
                            <span v-if="editStep != 3">
                            {{
                                userData && userData.me.addressesSets
                                //@ts-ignore
                                ? userData.me.addressesSets.find(set => set.id === selectedSet.id)
                                //@ts-ignore
                                    ? userData.me.addressesSets.find(set => set.id === selectedSet.id).phoneNumber || 'Nie przypisano nr telefonu'
                                    : 'Nie przypisano nr telefonu'
                                : 'Nie przypisano nr telefonu'
                            }}
                            </span>
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
                                        <input ref="editPhone" type="text" class="form-control" v-maska
                                                    data-maska="### ### ###" data-maska-eager :value="editStep == 3 ? 
                                        (userData && userData.me.addressesSets 
                                //@ts-ignore
                                                    ? userData.me.addressesSets.find(set => set.id === selectedSet.id)
                                //@ts-ignore
                                                        ? userData.me.addressesSets.find(set => set.id === selectedSet.id).phoneNumber || ''
                                                        : ''
                                                    : ''
                                                )
                                                : ''">
                                        <label for="floatingInput">NR telefonu</label>
                                    </div>
                                    <div class="d-flex justify-content-around w-100">
                                        <div class="col-lg-6 text-center">
                                            
                                            <button class="btn btn-success" @click="modifyLine('phone', $refs.editPhone.value.toString())">Zapisz</button>
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
                            <span v-if="editStep != 4">{{ userData.me.email }}</span>

                            <span class=" cursor-pointer material-symbols-outlined invisible">
                                edit
                            </span>
                        </div>
                        <hr class="my-3">
                        <Transition mode="out-in" name="fade" @after-leave="animChain[5] = true">
                            <div class="d-flex align-items-center my-3 justify-content-between"
                                v-if="editStep != 5 && !animChain[5]">
                                <span class="material-symbols-outlined me-3">
                                    contact_mail
                                </span>
                                <span>
                            {{
                                userData && userData.me.addressesSets
                                //@ts-ignore
                                ? userData.me.addressesSets.find(set => set.id === selectedSet.id)
                                //@ts-ignore
                                    ? userData.me.addressesSets.find(set => set.id === selectedSet.id).county || 'Nie przypisano województwa'
                                    : 'Nie przypisano województwa'
                                : 'Nie przypisano województwa'
                            }}</span>
                                <span class=" cursor-pointer material-symbols-outlined" title="Edytuj"
                                    @click="editStep = 5" v-if="editStep == 0">
                                    edit
                                </span>

                                <span class=" cursor-pointer material-symbols-outlined invisible" v-if="editStep != 0">
                                    edit
                                </span>
                            </div>
                        </Transition>
                        <Transition mode="out-in" name="fade" @after-leave="animChain[5] = false">
                            <div class="d-flex flex-wrap" v-if="editStep == 5 && animChain[5]">
                                <div class="form-floating select mb-2 w-100">
                                            <select class="form-select" v-model="selectedOption">
                                                <option value="opolskie">opolskie</option>
                                                <option value="dolnośląskie">dolnośląskie</option>
                                                <option value="kujawsko-pomorskie">kujawsko-pomorskie</option>
                                                <option value="lubelskie">lubelskie</option>
                                                <option value="lubuskie">lubuskie</option>
                                                <option value="łódzkie">łódzkie</option>
                                                <option value="małopolskie">małopolskie</option>
                                                <option value="mazowieckie">mazowieckie</option>
                                                <option value="podkarpackie">podkarpackie</option>
                                                <option value="podlaskie">podlaskie</option>
                                                <option value="pomorskie">pomorskie</option>
                                                <option value="śląskie">śląskie</option>
                                                <option value="świętokrzyskie">świętokrzyskie</option>
                                                <option value="warmińsko-mazurskie">warmińsko-mazurskie</option>
                                                <option value="wielkopolskie">wielkopolskie</option>
                                                <option value="zachodniopomorskie">zachodniopomorskie</option>
                                            </select>
                                            <label for="floatingSelectGrid">Województwo</label>
                                        </div>
                                <div class="d-flex justify-content-around w-100">
                                    <div class="col-lg-6 text-center">
                                        <button class="btn btn-success" @click="modifyLine('county', selectedOption)">Zapisz</button>
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
                                <span>                            {{
                                userData && userData.me.addressesSets
                                //@ts-ignore
                                ? userData.me.addressesSets.find(set => set.id === selectedSet.id)
                                //@ts-ignore
                                    ? userData.me.addressesSets.find(set => set.id === selectedSet.id).postalCode || 'Nie przypisano kodu'
                                    : 'Nie przypisano kodu'
                                : 'Nie przypisano kodu'
                            }} {{
                                userData && userData.me.addressesSets
                                //@ts-ignore
                                ? userData.me.addressesSets.find(set => set.id === selectedSet.id)
                                //@ts-ignore
                                    ? userData.me.addressesSets.find(set => set.id === selectedSet.id).city || 'Nie przypisano miasta'
                                    : 'Nie przypisano miasta'
                                : 'Nie przypisano miasta'
                            }}</span>
                                <span class=" cursor-pointer material-symbols-outlined" title="Edytuj"
                                    @click="editStep = 6" v-if="editStep == 0">
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
                                    <input ref="editPostal" v-maska data-maska="##-###" data-maska-eager type="text" class="form-control" placeholder="Kod pocztowy" :value="editStep == 6 ? 
                                    (userData && userData.me.addressesSets 
                                //@ts-ignore
                                        ? userData.me.addressesSets.find(set => set.id === selectedSet.id)
                                //@ts-ignore
                                            ? userData.me.addressesSets.find(set => set.id === selectedSet.id).postalCode || ''
                                            : ''
                                        : ''
                                    )
                                    : ''">
                                    <label for="floatingInput">Kod pocztowy</label>
                                </div>
                                <div class="form-floating mb-2 w-100">
                                    <input ref="editCity" type="text" class="form-control" placeholder="Miasto" :value="editStep == 6 ? 
                                    (userData && userData.me.addressesSets 
                                //@ts-ignore
                                        ? userData.me.addressesSets.find(set => set.id === selectedSet.id)
                                //@ts-ignore
                                            ? userData.me.addressesSets.find(set => set.id === selectedSet.id).city || ''
                                            : ''
                                        : ''
                                    )
                                    : ''">
                                    <label for="floatingInput">Miasto</label>
                                </div>
                                <div class="d-flex justify-content-around w-100">
                                    <div class="col-lg-6 text-center">
                                        <button class="btn btn-success" @click="modifyLine('postal/city', $refs.editPostal.value.toString(), $refs.editCity.value.toString())">Zapisz</button>
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
                                <span>{{
                                userData && userData.me.addressesSets
                                //@ts-ignore
                                ? userData.me.addressesSets.find(set => set.id === selectedSet.id)
                                //@ts-ignore
                                    ? userData.me.addressesSets.find(set => set.id === selectedSet.id).street || 'Nie przypisano ulicy'
                                    : 'Nie przypisano ulicy'
                                : 'Nie przypisano ulicy'
                            }} {{
                                userData && userData.me.addressesSets
                                //@ts-ignore
                                ? userData.me.addressesSets.find(set => set.id === selectedSet.id)
                                //@ts-ignore
                                    ? userData.me.addressesSets.find(set => set.id === selectedSet.id).houseNumber !== null
                                //@ts-ignore
                                        ? " m. " + userData.me.addressesSets.find(set => set.id === selectedSet.id).houseNumber
                                        : ''
                                    : ''
                                : ''
                            }}</span>
                                <span class=" cursor-pointer material-symbols-outlined" title="Edytuj"
                                    @click="editStep = 7" v-if="editStep == 0">
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
                                    <input ref="editStreet" type="text" class="form-control" placeholder="Ulica" :value="editStep == 7 ? 
                                    (userData && userData.me.addressesSets 
                                //@ts-ignore
                                        ? userData.me.addressesSets.find(set => set.id === selectedSet.id)
                                //@ts-ignore
                                            ? userData.me.addressesSets.find(set => set.id === selectedSet.id).street || ''
                                            : ''
                                        : ''
                                    )
                                    : ''">
                                    <label for="floatingInput">Ulica</label>
                                </div>
                                <div class="form-floating mb-2 w-100">
                                    <input ref="editHouse" type="email" class="form-control" placeholder="Nr domu" :value="editStep == 7 ? 
                                    (userData && userData.me.addressesSets 
                                //@ts-ignore
                                        ? userData.me.addressesSets.find(set => set.id === selectedSet.id)
                                //@ts-ignore
                                            ? userData.me.addressesSets.find(set => set.id === selectedSet.id).houseNumber || ''
                                            : ''
                                        : ''
                                    )
                                    : ''">
                                    <label for="floatingInput">Nr domu</label>
                                </div>
                                <div class="d-flex justify-content-around w-100">
                                    <div class="col-lg-6 text-center">
                                        <button class="btn btn-success" @click="modifyLine('street/house', $refs.editStreet.value.toString(), $refs.editHouse.value.toString())">Zapisz</button>
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
                                <span>{{
                                userData && userData.me.addressesSets
                                //@ts-ignore
                                ? userData.me.addressesSets.find(set => set.id === selectedSet.id)
                                //@ts-ignore
                                    ? userData.me.addressesSets.find(set => set.id === selectedSet.id).nip || 'Nie przypisano NIPu'
                                    : 'Nie przypisano NIPu'
                                : 'Nie przypisano NIPu'
                            }}</span>
                                <span class=" cursor-pointer material-symbols-outlined" title="Edytuj"
                                    @click="editStep = 8" v-if="editStep == 0">
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
                                    <input ref="editNip" type="text" class="form-control" placeholder="NIP" v-maska
                                                data-maska="###-###-##-##" data-maska-eager :value="editStep == 8 ? 
                                    (userData && userData.me.addressesSets 
                                //@ts-ignore
                                        ? userData.me.addressesSets.find(set => set.id === selectedSet.id)
                                //@ts-ignore
                                            ? userData.me.addressesSets.find(set => set.id === selectedSet.id).nip || ''
                                            : ''
                                        : ''
                                    )
                                    : ''">
                                    <label for="floatingInput">NIP</label>
                                </div>
                                <div class="d-flex justify-content-around w-100">
                                    <div class="col-lg-6 text-center">
                                        <button class="btn btn-success" @click="modifyLine('nip', $refs.editNip.value.toString())">Zapisz</button>
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
                                <span>{{
                                userData && userData.me.addressesSets
                                //@ts-ignore
                                ? userData.me.addressesSets.find(set => set.id === selectedSet.id)
                                //@ts-ignore
                                    ? userData.me.addressesSets.find(set => set.id === selectedSet.id).companyName || 'Nie przypisano nazwy firmy'
                                    : 'Nie przypisano nazwy firmy'
                                : 'Nie przypisano nazwy firmy'
                            }}</span>
                                <span class=" cursor-pointer material-symbols-outlined" v-if="editStep == 0"
                                    title="Edytuj" @click="editStep = 9">
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
                                    <input type="email" class="form-control" ref="editCompany" placeholder="Nazwa firmy" :value="editStep == 9 ? 
                                    (userData && userData.me.addressesSets 
                                //@ts-ignore
                                        ? userData.me.addressesSets.find(set => set.id === selectedSet.id)
                                //@ts-ignore
                                            ? userData.me.addressesSets.find(set => set.id === selectedSet.id).companyName || ''
                                            : ''
                                        : ''
                                    )
                                    : ''">
                                    <label for="floatingInput">Nazwa firmy</label>
                                </div>
                                <div class="d-flex justify-content-around w-100">
                                    <div class="col-lg-6 text-center">
                                        <button class="btn btn-success" @click="modifyLine('company', $refs.editCompany.value.toString())">Zapisz</button>
                                    </div>
                                    <div class="col-lg-6 text-center">
                                        <button class="btn btn-success" @click="editStep = 0">Anuluj</button>
                                    </div>
                                </div>
                            </div>
                        </Transition>


                    </div>

                    <div class="col-lg-6" v-else>
                        <p class="text-center fs-4 cl-text-primary fw-bold my-0">Nie posiadasz zapisanych adresów</p>
                        <p class="text-center fs-5 cl-text-primary fw-bold">Dodaj je za pomocą menu rozwijalnego</p>

                    </div>

                    <div class="col-lg-6 border border-1">
                        <div class="btn-group">
                            <button type="button" class="btn btn-success cl-white dropdown-toggle"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Zestawy adresów
                            </button>
                            <ul class="dropdown-menu">
                                <template v-if="userData">
                                    <li v-for="(set, index) in filteredAddressesSets">
                                        <a class="dropdown-item" href="#"
                                            @click="selectedSet.id = set.id; selectedSet.text = 'Zestaw adresów ' + (index + 1)">Zestaw
                                            adresów {{ index + 1 }}</a>
                                    </li>
                                </template>
                                <li v-if="filteredAddressesSets.length < 4">
                                    <hr class="dropdown-divider">
                                </li>
                                <li v-if="filteredAddressesSets.length < 4" @click="addAddressSet()">
                                    <a class="dropdown-item d-flex justify-content-around" href="#">Dodaj nowy<span
                                            class="material-symbols-outlined cl-text-secondary">add_circle</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>




            <div class="col-lg-3 p-2 cl-border rounded cl-shadown-down h-100">
                <div class="row my-5 w-75 mx-auto">
                    <button class="btn btn-success">Moje zamówienia</button>
                </div>
                <div class="row my-5 w-75 mx-auto">
                    <button class="btn btn-success">Moje wątki</button>
                </div>
                <div class="row my-5 w-75 mx-auto">
                    <button class="btn btn-success">Moje powiadomienia</button>
                </div>
                <div class="row my-5 w-75 mx-auto">
                    <button class="btn btn-success">Ustawienia konta</button>
                </div>
            </div>
            <!-- <div v-if="pfpArray">
                {{ pfpArray.getPfps[0].source }}
            </div> -->

        </div>

    </div>
</template>
<script setup lang="ts">
import Header from '@/components/Header.vue';
import { isLoggedIn, userData, fetchMe } from '@/me';
import gql from 'graphql-tag';
import router from '@/router';
import { reactive, watch, watchEffect } from 'vue';
import { computed, ref } from 'vue';
import { vMaska } from "maska"
import { useMutation, useQuery } from '@vue/apollo-composable';
import { onMounted } from 'vue';

if (!isLoggedIn.value) {
    router.push("/");
}

const flag = ref(false);

onMounted(async () => {
    await doGetPfps();

})

const selectedSet = reactive({
    id: -1,
    text: ""
})

watch(userData, (newValue, oldValue) => {
    if (newValue && newValue.me.addressesSets) {
        //@ts-ignore
        const nonTemporarySet = newValue.me.addressesSets.find(set => !set.isTemporary);
        if (nonTemporarySet) {
            selectedSet.id = nonTemporarySet.id;
            selectedSet.text = "Zestaw adresów 1";
        }
    }
});

const { mutate: doAddAddressSet } = useMutation(
    gql`
    mutation createAddressSet {
        createAddressSet
    }
    `
);

const { mutate: doModifyLine } = useMutation(
    gql`
    mutation modifyAddressLine($setId: Float!, $whichLine: String!, $line1: String!, $line2: String) {
  modifyAddressLine(setId: $setId, whichLine: $whichLine, line1: $line1, line2: $line2)
}
`);

const { mutate: doDeleteSet } = useMutation(
    gql`
    mutation deleteAddressSet($setId: Float!) {
        deleteAddressSet(setId: $setId)
    }`
);

const { mutate: doSetPfp } = useMutation(
    gql`
    mutation setPfp($picId: String!) {
        setPfp(picId: $picId)
    }`
);

const { result: pfpsData, refetch: doGetPfps } = useQuery(
    gql`
    query getPfps {
  getPfps {
    source
  }
}`
);

const deleteSet = async (setId: any) => {
    try {
        const res = await doDeleteSet({
            setId: parseFloat(setId)
        });
        await fetchMe();
        highlighted.value = userData.value.me.picId;

        if (filteredAddressesSets.value.length == 0) {
            selectedSet.id = -1
        }
    } catch (error) {
        console.log(error)
    }
};

const setPfp = async (picId: string) => {
    try {
        const res = await doSetPfp({
            picId: picId
        });
        await fetchMe();
        highlighted.value = userData.value.me.picId;
    } catch (error) {
        console.log(error)
    }
    flag.value = !flag.value
};

const addAddressSet = async () => {
    try {
        const res = await doAddAddressSet();
        await fetchMe();
        selectedSet.id = res?.data || -1;
        selectedSet.text = "Utworzony zestaw adresów";
        highlighted.value = userData.value.me.picId;


    } catch (error) {
        console.log(error)
    }
};

const modifyLine = async (whichLine: string, line1: string, line2?: string | null) => {
    try {
        const aux = selectedSet.text;
        const aux2 = selectedSet.id;

        const res = await doModifyLine({
            //@ts-ignore
            setId: parseFloat(selectedSet.id),
            whichLine: whichLine,
            line1: line1,
            line2: line2
        });
        await fetchMe();
        selectedSet.id = aux2;
        selectedSet.text = aux;
        highlighted.value = userData.value.me.picId;
    } catch (error) {
        console.log(error)
    } finally {
        editStep.value = 0;
    }
};

const highlighted = ref("profile1.png");

const highlightHandler = (path: string | null) => {
        //@ts-ignore
        const pathParts = path.split('/');
        const lastPart = pathParts.pop();
        //@ts-ignore
        highlighted.value = lastPart;
}



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

const filteredAddressesSets = computed(() => {
    //@ts-ignore
    return userData?.value?.me?.addressesSets?.filter(set => !set.isTemporary) || [];
});

const pfpArray = ref([]);

watchEffect(() => {
    pfpArray.value = pfpsData.value || [];
    console.log(pfpArray.value);
});

const selectedOption = ref("opolskie")

</script>
<style scoped>
.img-md {
    min-width: 75px !important;
    min-height: 75px !important;
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

.highlighted {
    border: 3px solid var(--color-primary);
    box-sizing: border-box;
}
</style>