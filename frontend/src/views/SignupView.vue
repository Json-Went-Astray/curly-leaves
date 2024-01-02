<template>
    <div class="d-flex flex-column vh-100">

        <Preloader v-if="loading"></Preloader>
        

        <div class="form-divider-bottom d-none d-md-block"
            style="transform: rotate(180deg); height: 170px; top: -7%; opacity: 0.8;"></div>


        <div class="my-2 my-md-0 px-2 px-md-0 flex-grow-1 d-flex flex-column">

            <div class="d-flex flex-nowrap align-items-center justify-content-center">
                <div class="fs-1 fw-bold position-relative cl-text-primary">
                    Curly Leaves
                </div>
            </div>

            <div class="d-flex d-flex my-3 mx-auto col-xl-7 col-lg-8 col-lg-9 col-12">
                <div class="col-6">
                    <button class="btn btn-success btn-lg" :disabled="loginWindow == 1"
                        @click="loginWindow = 1">Logowanie</button>
                </div>
                <div class="col-6 text-end">
                    <button class="btn btn-success btn-lg" :disabled="loginWindow == 0"
                        @click="loginWindow = 0">Rejestracja</button>
                </div>
            </div>

            <!-- signup  -->
            <transition name="fade">
                <div v-show="loginWindow == 0">

                    <div
                        class="d-flex my-3 mx-auto col-xl-7 col-lg-8 col-lg-9 col-12 rounded position-relative justify-content-between p-0">

                        <div class="position-absolute align-items-center cl-bg-white border col-md-6 p-1 rounded top-50 w-100"
                            style="transform: translateY(-50%);">
                        </div>

                        <div class="position-absolute align-items-center cl-bg-primary col-md-6 p-1 rounded top-50 progress-bar"
                            :class="point[4]" :style="{ transform: 'translateY(-50%)', width: barProgress }">
                        </div>

                        <div class="rounded-circle p-4 cl-bg-white border cursor-pointer" @click="stepNext(1)">
                            <div class="position-absolute h-100 cl-bg-primary rounded-circle start-0 top-0 progress-ball w-100 d-flex align-items-center justify-content-center"
                                :class="point[0]">
                                <span class="material-symbols-outlined unselectable fs-2">
                                    password
                                </span>

                            </div>
                        </div>

                        <div class="rounded-circle p-4 cl-bg-white border cursor-pointer" @click="stepNext(2)">
                            <div class="position-absolute h-100 cl-bg-primary rounded-circle start-0 top-0 progress-ball w-100 d-flex align-items-center justify-content-center"
                                :style="{ '--progress': point[1] }">
                                <span class="material-symbols-outlined unselectable fs-2">
                                    person
                                </span>

                            </div>
                        </div>



                        <div class="rounded-circle p-4 cl-bg-white border cursor-pointer" @click="stepNext(4)">
                            <div class="position-absolute w-100 h-100 cl-bg-primary rounded-circle start-0 top-0 progress-ball d-flex align-items-center justify-content-center"
                                :style="{ '--progress': point[2] }">
                                <span class="material-symbols-outlined unselectable fs-2">
                                    person_celebrate
                                </span>
                            </div>
                        </div>
                    </div>




                    <div>
                        <transition name="slide">
                            <div v-show="step == 1"
                                class="cl-bg-white p-3 rounded cl-border col-xl-7 col-lg-8 col-lg-9 col-12 mx-auto mt-3 position-absolute card">
                                <div class="form-floating">
                                    <input type="email" class="form-control" placeholder="Login" v-model="loginModel"
                                        :class="{ 'is-invalid': errors.username }">
                                    <label for="floatingInput">Login (Wymagane)</label>
                                </div>
                                <span class="text-danger" v-if="errors.username">Login jest zajęty lub jest za krótki</span>
                                <span class="text-danger" v-else>&nbsp;</span>

                                <div class="form-floating position-relative">
                                    <input type="email" class="form-control" placeholder="E-mail" v-model="email"
                                        :class="{ 'is-invalid': errors.email }">
                                    <label for="floatingInput">Adres E-mail (Wymagane)</label>
                                </div>
                                <span class="text-danger" v-if="errors.email">Niepoprawny lub zajęty adres</span>
                                <span class="text-danger" v-else>&nbsp;</span>

                                <div class="form-floating">
                                    <input :type="inputType" class="form-control" placeholder="Hasło"
                                        @input="validatePasswordStrength" v-model="password_1"
                                        :class="{ 'is-invalid': errors.passwordMissmatch || errors.passwordWeak }">
                                    <label for="floatingPassword">Hasło (Wymagane)</label>

                                    <span v-if="inputType == 'Password'" @click="changePasswordVisibility"
                                        class="material-symbols-outlined position-absolute eye-icon unselectable cursor-pointer">
                                        visibility
                                    </span>
                                    <span v-else @click="changePasswordVisibility"
                                        class="material-symbols-outlined position-absolute eye-icon unselectable cursor-pointer">
                                        visibility_off
                                    </span>

                                </div>
                                <span class="text-danger">&nbsp;</span>
                                <div class="form-floating position-relative">
                                    <input :type="inputType" class="form-control" placeholder="Hasło" @input="checkSamePass"
                                        v-model="password_2"
                                        :class="{ 'is-invalid': errors.passwordMissmatch || errors.passwordWeak }">
                                    <label for="floatingPassword">Powtórz hasło (Wymagane)</label>

                                    <span v-if="inputType == 'Password'" @click="changePasswordVisibility"
                                        class="material-symbols-outlined position-absolute eye-icon unselectable cursor-pointer">
                                        visibility
                                    </span>
                                    <span v-else @click="changePasswordVisibility"
                                        class="material-symbols-outlined position-absolute eye-icon unselectable cursor-pointer">
                                        visibility_off
                                    </span>

                                </div>

                                <span class="text-danger" v-if="errors.passwordMissmatch">Hasła się nie zgadzają</span>
                                <span class="text-danger" v-else>&nbsp;</span>

                                <div class="row px-2 justify-content-center">
                                    <div class="rounded bg-background p-1 border position-relative row">
                                        <div class="p-1 rounded pass-strength"
                                            :style="{ width: passwordStrength.width, backgroundColor: passwordStrength.background }">

                                        </div>
                                    </div>
                                </div>
                                <span class="text-danger" v-if="errors.passwordWeak">Hasło jest za słabe (conajmniej 8
                                    znaków w tym 1
                                    liczba i znak specjalny)</span>
                                <span class="text-danger" v-else>&nbsp;</span>

                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" v-model="tos">
                                    <label class="form-check-label" for="flexCheckDefault">
                                        TOS
                                    </label>
                                </div>
                                <span class="text-danger" v-if="errors.tosError">Należy zaakceptować zasady</span>
                                <span class="text-danger" v-else>&nbsp;</span>


                                <div class="row justify-content-around mt-2">
                                    <div class="col-lg-6 text-center my-2">
                                        <button class="btn btn-outline-success w-75">Pomoc</button>
                                    </div>
                                    <div class="col-lg-6 text-center my-2">
                                        <button class="btn btn-outline-success w-75" @click="stepNext(2)">> ></button>
                                    </div>
                                </div>


                            </div>
                        </transition>

                        <transition name="slide">
                            <div v-show="step == 2"
                                class="cl-bg-white p-3 rounded cl-border col-xl-7 col-lg-8 col-lg-9 col-12 mx-auto mt-3 position-absolute card">

                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" placeholder="Imie" v-model="name"
                                                :class="{ 'is-invalid': errors.name }">
                                            <label for="floatingInput">Imię (Wymagane)</label>
                                        </div>
                                        <span class="text-danger" v-if="errors.name">Niepoprawny format imienia</span>
                                        <span class="text-danger" v-else>&nbsp;</span>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-floating position-relative">
                                            <input type="text" class="form-control" placeholder="Nazwisko" v-model="surname"
                                                :class="{ 'is-invalid': errors.surname }">
                                            <label for="floatingInput">Nazwisko (Wymagane)</label>
                                        </div>
                                        <span class="text-danger" v-if="errors.surname">Niepoprawny format nazwiska</span>
                                        <span class="text-danger" v-else>&nbsp;</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="form-floating select">
                                            <select class="form-select" v-model="county">
                                                <option value="" selected>---</option>
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
                                    </div>
                                    <div class="col-lg-5">
                                        <div class="form-floating position-relative">
                                            <input type="text" class="form-control" placeholder="Miasto" v-model="city"
                                                :class="{ 'is-invalid': errors.city }">
                                            <label for="floatingInput">Miasto</label>
                                        </div>
                                        <span class="text-danger" v-if="errors.city">Niepoprawna nazwa miasta</span>
                                        <span class="text-danger" v-else>&nbsp;</span>
                                    </div>
                                    <div class="col-lg-3">
                                        <div class="form-floating position-relative">
                                            <input type="text" class="form-control" placeholder="Kod pocztowy"
                                                v-model="postalCode" v-maska data-maska="##-###" data-maska-eager
                                                :class="{ 'is-invalid': errors.postalCode }">
                                            <label for="floatingInput">Kod pocztowy</label>
                                        </div>
                                        <span class="text-danger" v-if="errors.postalCode">Niepoprawny kod pocztowy</span>
                                        <span class="text-danger" v-else>&nbsp;</span>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="input-group">
                                            <span class="input-group-text">+48</span>
                                            <div class="form-floating position-relative">
                                                <input type="text" class="form-control" placeholder="Numer telefonu"
                                                    v-model="phoneNumber" aria-label="Numer telefonu" v-maska
                                                    data-maska="### ### ###" data-maska-eager
                                                    :class="{ 'is-invalid': errors.phoneNumber }">
                                                <label for="floatingInput">Nr telefonu</label>
                                            </div>
                                        </div>
                                        <span class="text-danger" v-if="errors.phoneNumber">Niepoprawny numer</span>
                                        <span class="text-danger" v-else>&nbsp;</span>
                                    </div>

                                    <div class="col-lg-5">
                                        <div class="form-floating position-relative mb-3">
                                            <input type="text" class="form-control" placeholder="Ulica" v-model="street">
                                            <label for="floatingInput">Ulica</label>
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                        <div class="form-floating position-relative mb-3">
                                            <input type="number" class="form-control" placeholder="Nr lokalu"
                                                v-model="houseNumber">
                                            <label for="floatingInput">Nr lokalu</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" placeholder="Imie" v-model="nip" v-maska
                                                data-maska="###-###-##-##" data-maska-eager
                                                :class="{ 'is-invalid': errors.nip }">
                                            <label for="floatingInput">NIP</label>
                                        </div>
                                        <span class="text-danger" v-if="errors.nip">Niepoprawny format nip</span>
                                        <span class="text-danger" v-else>&nbsp;</span>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-floating position-relative mb-3">
                                            <input type="text" class="form-control" placeholder="Nazwisko"
                                                v-model="companyName">
                                            <label for="floatingInput">Nazwa firmy</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row justify-content-around mt-2">
                                    <div class="col-lg-6 text-center my-2">
                                        <button class="btn btn-outline-success w-75" @click="stepNext(1)">&lt;&lt;</button>
                                    </div>
                                    <div class="col-lg-6 text-center my-2">
                                        <button class="btn btn-outline-success w-75"
                                            @click="doSignup()">Rejestracja</button>
                                    </div>
                                </div>
                            </div>
                        </transition>

                        <transition name="slide">
                            <div v-show="step == 4"
                                class="cl-bg-white p-3 rounded cl-border col-lg-7 col-md-8 col-12 mx-auto mt-3 position-absolute card">
                                <div class="row text-center">
                                    <h3 class="fw-bold cl-text-primary">Rejestracja powiodła się</h3>
                                </div>
                                <span class="text-justify">W celu aktywowania konta przejdź na adres <b>{{ email }}</b>. A
                                    następnie oczekuj na maila z aktywacją od adresu <b>curly.leaves.mailer@gmail.com</b>.
                                    Jeśli wiadomość nie pojawi się do 5 minut sprawdź folder SPAM lub wyślij ponownie link
                                    potwierdzający rejestrację. W przypadku dalszych problemów zachęcamy do kontaktu z
                                    działem pomocy.<br></span>
                                <div class="row mt-5">
                                    <div class="col-md-6 text-center">
                                        <button class="btn btn-outline-warning btn-lg w-100"
                                            @click="$router.push('/help')">Dział pomocy</button>
                                    </div>
                                    <div class="col-md-6 text-center">
                                        <button class="btn btn-outline-success btn-lg w-100" :disabled="timer > 0">Wyślij
                                            ponownie link <span v-if="timer > 0">({{ timer }})</span></button>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </transition>

            <!-- login -->
            <transition name="fade">
                <div v-show="loginWindow == 1">

                    <div
                        class="cl-bg-white p-3 rounded cl-border col-lg-7 col-md-8 col-12 mx-auto mt-3 position-absolute card">
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" placeholder="Login" v-model="loginEmail">
                            <label for="floatingInput">E-mail</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input :type="inputType" class="form-control" placeholder="Hasło" v-model="loginPassword">
                            <label for="floatingPassword">Hasło</label>

                            <span v-if="inputType == 'Password'" @click="changePasswordVisibility"
                                class="material-symbols-outlined position-absolute eye-icon unselectable cursor-pointer">
                                visibility
                            </span>
                            <span v-else @click="changePasswordVisibility"
                                class="material-symbols-outlined position-absolute eye-icon unselectable cursor-pointer">
                                visibility_off
                            </span>
                        </div>

                        <span class="text-danger" v-if="loginErrors.email || loginErrors.password">Hasło lub e-mail, są
                            niepoprawne spróbuj ponownie lub skorzystaj z <a
                                href="http://localhost:5173/help">pomocy</a></span>
                        <span class="text-danger" v-else>&nbsp;</span>
                        <div class="row justify-content-around mt-2">
                            <div class="col-lg-6 text-center my-2">
                                <button class="btn btn-outline-success w-75" @click="loginWindow = -1">Resetowanie
                                    hasła</button>
                            </div>
                            <div class="col-lg-6 text-center my-2">
                                <button class="btn btn-outline-success w-75" @click="doLogin">Zaloguj się</button>
                            </div>
                        </div>
                    </div>
                </div>

            </transition>

            <!-- reset password -->
            <transition name="fade">
                <div v-show="loginWindow == -1">
                    <div
                        class="cl-bg-white p-3 rounded cl-border col-xl-7 col-lg-8 col-lg-9 col-12 mx-auto mt-3 position-absolute card">
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" placeholder="Login">
                            <label for="floatingInput">Email</label>
                        </div>

                        <span class="px-2 text-center my-1">Podaj adres e-mail, który podałeś/łaś podczas rejestracji, na
                            Twoje
                            konto zostanie wysłany link resetujący hasło. <br> W przypadku gdy nie pamiętasz swojego adresu
                            prosimy
                            o kontakt z działem pomocy.</span>


                        <div class="row justify-content-around mt-2">
                            <div class="col-lg-6 text-center my-2">
                                <button class="btn btn-outline-success w-75">Dział pomocy</button>
                            </div>
                            <div class="col-lg-6 text-center my-2">
                                <button class="btn btn-outline-success w-75">Zaloguj się</button>
                            </div>
                        </div>


                    </div>
                </div>
            </transition>

            <!-- USER_NOT_ACTIVE -->
            <transition name="fade">
                <div v-show="loginWindow == -2">
                    <div
                        class="cl-bg-white p-3 rounded cl-border col-xl-7 col-lg-8 col-lg-9 col-12 mx-auto mt-3 position-absolute card">

                        <span class="px-2 text-center my-1">Twoje konto nie zostało aktywowane. <br> Sprawdź swój adres E-mail.</span>


                        <div class="row justify-content-around mt-2">
                            <div class="col-lg-6 text-center my-2">
                                <button class="btn btn-outline-success w-75" @click="">Wyślij ponownie link aktywacji</button>
                            </div>
                            <div class="col-lg-6 text-center my-2">
                                <button class="btn btn-outline-success w-75" @click="$router.push('/help')">Dział pomocy</button>
                            </div>
                        </div>


                    </div>
                </div>
            </transition>

            <!--  USER_SUSPENDED -->
            <transition name="fade">
                <div v-show="loginWindow == -3">
                    <div
                        class="cl-bg-white p-3 rounded cl-border col-xl-7 col-lg-8 col-lg-9 col-12 mx-auto mt-3 position-absolute card">

                        <span class="px-2 text-center my-1">Twoje konto zostało zawieszone. <br> Prosimy o kontakt z działem pomocy.</span>


                        <div class="row justify-content-around mt-2">
                            <div class="col-lg-6 text-center my-2">
                                <button class="btn btn-outline-success w-75" @click="$router.push('/help')">Dział pomocy</button>
                            </div>
                            <div class="col-lg-6 text-center my-2">
                                <button class="btn btn-outline-success w-75" @click="$router.push('/')">Strona główna</button>
                            </div>
                        </div>


                    </div>
                </div>
            </transition>

        </div>
    </div>
    <div class="form-divider-bottom d-none d-md-block" style="height: 200px; bottom: -5%; opacity: 0.8;"></div>
</template>


<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
// import { graphql } from "@/gql";
import { useLazyQuery, useQuery, useResult } from "@vue/apollo-composable";
import Preloader from '@/components/Preloader.vue';
import { computed } from "@vue/reactivity";

import validator from 'validator';
import { signup } from "@/me";
import { loginUser } from "@/me";
import { vMaska } from "maska"

const inputType = ref("Password");
const barProgress = ref("0%");
const stepOne = ref("");
const step = ref(1);
const point: string[] = ['100%', "0%", "0%", "0%"];
const loginWindow = ref(0);

// creds
const loginModel= ref("");
const email = ref("");
const password_1 = ref("");
const password_2 = ref("");
const tos = ref(false);
const name = ref("");
const surname = ref("");
const county = ref("");
const city = ref("");
const street = ref("");
const houseNumber = ref();
const phoneNumber = ref("");
const postalCode = ref("");
const nip = ref("");
const companyName = ref("");
//

const loginEmail = ref("");
const loginPassword = ref("");

const loading = ref(false);
const errors = reactive({ username: false, email: false, passwordMissmatch: false, passwordWeak: false, tosError: false, name: false, surname: false, city: false, postalCode: false, phoneNumber: false, nip: false });
const loginErrors = reactive({ email: false, password: false, notActive: false, banned: false })

const passwordStrength = reactive({ width: "2%", background: "red" })

const changePasswordVisibility = (() => {
    if (inputType.value == "Password") inputType.value = "Text";
    else inputType.value = "Password";
});

onMounted(() => {
    document.documentElement.style.overflow = 'hidden';
    restartExpiryTimer();
});

const stepNext = ((toStep: number) => {
    if (step.value == 4) return;

    switch (toStep) {
        case 1:
            step.value = 1;
            barProgress.value = "0%";
            stepOne.value = "solid 2px #dc3545"
            stepOne.value = "solid 2px var(--color-primary)"
            break;

        case 2:

            if (loginModel.value.length < 3) errors.username = true;
            else errors.username = false;

            if (!validator.isEmail(email.value)) errors.email = true;
            else errors.email = false;

            checkSamePass();

            if (validatePasswordStrength()) errors.passwordWeak = true;
            else errors.passwordWeak = false;

            if (!tos.value) errors.tosError = true;
            else errors.tosError = false;

            if (Object.values(errors).includes(true)) return;

            step.value = 2;
            barProgress.value = "50%";
            break;

        case 4:
            step.value = 4;
            barProgress.value = "99%";
            break;

        default:
            break;
    }
});

const checkSamePass = () => {
    if (password_1.value != password_2.value) errors.passwordMissmatch = true;
    else errors.passwordMissmatch = false;
}

const validatePasswordStrength = () => {
    checkSamePass();
    let flag = true;
    if (validator.isStrongPassword(password_1.value, { minLength: 8, minNumbers: 1, minSymbols: 1, minLowercase: 0, minUppercase: 0 })) {
        passwordStrength.width = "50%";
        passwordStrength.background = "orange";
        errors.passwordWeak = false;
        flag = false;
    }

    if (validator.isStrongPassword(password_1.value, { minLength: 12, minNumbers: 2, minSymbols: 2, minUppercase: 1, minLowercase: 0 })) {
        passwordStrength.width = "100%";
        passwordStrength.background = "green";
        errors.passwordWeak = false;
        flag = false;
    }

    if (flag) {
        passwordStrength.width = "2%";
        passwordStrength.background = "red";
        errors.passwordWeak = true;
        return true;
    }
    return false;
}

const validateExtra = () => {
    console.log(county.value);
    if (name.value.length >= 3 && /^[A-Z][a-z]*$/.test(name.value)) {
        errors.name = false;
    } else {
        errors.name = true;
    }

    if (surname.value.length >= 3 && /^[A-Z][a-z]*$/.test(surname.value)) {
        errors.surname = false;
    } else {
        errors.surname = true;
    }

    if (city.value.length > 0) {
        if (city.value.length >= 3 && /^[A-Z][a-z]*$/.test(city.value)) {
            errors.city = false;
        } else {
            errors.city = true;
        }
    } else {
        errors.city = false;
    }

    if (postalCode.value.length > 0) {
        if (postalCode.value.length == 6) {
            errors.postalCode = false;
        } else {
            errors.postalCode = true;
        }
    } else {
        errors.postalCode = false;
    }

    if (phoneNumber.value.length > 0) {
        if (phoneNumber.value.length == 11) {
            errors.phoneNumber = false;
        } else {
            errors.phoneNumber = true;
        }
    } else {
        errors.phoneNumber = false;
    }

    if (nip.value.length > 0) {
        if (nip.value.length == 13) {
            errors.nip = false;
        } else {
            errors.nip = true;
        }
    } else {
        errors.nip = false;
    }

}

let expiryInterval: any = null;
const timer = ref(30);

const restartExpiryTimer = () => {
    if (step.value == 4) {
        if (localStorage.getItem("expireRequest") !== null) {
            timer.value = Number(localStorage.getItem("expireRequest"));
        } else {
            timer.value = 30;
        }
    }

    if (expiryInterval) {
        clearInterval(expiryInterval);
    }

    expiryInterval = setInterval(() => {

        if (timer.value > 0) {
            timer.value--;
            localStorage.setItem("expireRequest", String(timer.value));
        } else {
            localStorage.removeItem("expireRequest");
            clearInterval(expiryInterval);
        }
    }, 1000);
};

const doSignup = async () => {
    validateExtra();
    if (Object.values(errors).includes(true)) {
        if (errors.username || errors.email || errors.passwordMissmatch || errors.passwordWeak || errors.tosError) {
            stepNext(1);
        }
        return;
    }

    try {
        loading.value = true;
        const success = await signup(
            loginModel.value,
            email.value,
            password_1.value,
            password_2.value,
            name.value,
            surname.value,
            tos.value,
            city.value,
            postalCode.value,
            phoneNumber.value,
            street.value,
            houseNumber.value,
            nip.value,
            companyName.value,
            county.value
        );
        loading.value = false;

        stepNext(4);
        restartExpiryTimer();

    } catch (exception: any) {
        loading.value = false;

        exception.graphQLErrors.forEach((error: any) => {
            console.log(error)

            if (error.extensions.errors.some((e: any) => e.code == "USER_EXISTS_LOGIN_OR_INCORRECT")) {
                errors.username = true;
            }

            if (error.extensions.errors.some((e: any) => e.code == "USER_EXISTS_EMAIL_OR_INCORRECT")) {
                errors.email = true;
            }

            if (error.extensions.errors.some((e: any) => e.code == "PASSWORD_MISSMATCH")) {
                errors.passwordMissmatch = true;
            }

            if (error.extensions.errors.some((e: any) => e.code == "PASSWORD_INSECURE")) {
                errors.passwordWeak = true;
            }

            if (error.extensions.errors.some((e: any) => e.code == "NAME_INCORRECT")) {
                errors.name = true;
            }

            if (error.extensions.errors.some((e: any) => e.code == "SURNAME_INCORRECT")) {
                errors.surname = true;
            }

            if (errors.username || errors.email || errors.passwordMissmatch || errors.passwordWeak || errors.tosError) {
                stepNext(1);
            }
        });

    }
};

const doLogin = async () => {
    loading.value = true;
    Object.assign(loginErrors, ...Object.keys(loginErrors).map((key) => ({ [key]: false })));

    if (!validator.isEmail(loginEmail.value)) {
        loginErrors.email = true;
    }

    if (Object.values(loginErrors).includes(true)) {
        loading.value = false;
        return;
    }

    try {
        const success = await loginUser(
            loginEmail.value,
            loginPassword.value,
        );
    } catch (error: any) {
        console.log(error.message);
        if (error.message == "user does not exist") {
            loginErrors.email = true;
            loginErrors.password = true;
        }

        if (error.message == "user is suspended") {
            loginErrors.banned = true;
            step.value = -3;
        }

        if (error.message == "user is not active") {
            loginErrors.notActive = true;
            step.value = -2;
        }

    } finally {
        loading.value = false;
    }


}



</script>

<style scoped>
.eye-icon {
    top: 0;
    right: 5%;
    transform: translateY(75%);
}

.progress-bar,
.pass-strength {
    transition: width 1s;
}

.progress-ball {
    background: linear-gradient(to right, #00ff00 0%, #00ff00);
    transition: background-size 0.33s;
    background-size: 0% 100%;
}

.card {
    left: 50%;
    transform: translate(-50%, 0);
}

.slide-enter-active,
.slide-leave-active {
    transition: opacity 1s ease, transform 1s;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fake-fade-right {
    background-color: var(--color-background);
    box-shadow: var(--color-background) 130px 0px 100px;
}

.slide-leave-from,
.slide-enter-to {
    opacity: 1;
    /* transform: translate(50%, 0); */
}
</style>