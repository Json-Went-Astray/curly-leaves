<template>
    <div class="container row my-md-3 mx-auto justify-content-center">
        <!-- <div class="col-2 fake-fade-right d-none d-lg-block" style="z-index: 4; height: 90vh;">

        </div> -->

        <!-- <div class="col"> -->
        <div class="d-flex flex-nowrap mt-5 align-items-center justify-content-center">
            <!-- <img src="@/assets/static/logo.png" alt="logo"> -->
            <div class="fs-1 fw-bold position-relative cl-text-primary">
                Curly Leaves
            </div>
        </div>

        <div class="d-flex my-3 mx-auto col-xl-7 col-lg-8 col-lg-9 col-12 rounded position-relative justify-content-between p-0">

            <div class="position-absolute align-items-center cl-bg-background-soft border col-md-6 p-1 rounded top-50 w-100"
                style="transform: translateY(-50%);">
            </div>

            <div class="position-absolute align-items-center cl-bg-primary col-md-6 p-1 rounded top-50 progress-bar"
                :class="point[4]" :style="{ transform: 'translateY(-50%)', width: barProgress }">
            </div>

            <div class="rounded-circle p-4 cl-bg-background-soft border cursor-pointer" @click="stepNext(1)">
                <div class="position-absolute h-100 cl-bg-primary rounded-circle start-0 top-0 progress-ball w-100 d-flex align-items-center justify-content-center"
                    :class="point[0]">
                    <span class="material-symbols-outlined unselectable fs-2">
                        password
                    </span>

                </div>
            </div>

            <div class="rounded-circle p-4 cl-bg-background-soft border cursor-pointer" @click="stepNext(2)">
                <div class="position-absolute h-100 cl-bg-primary rounded-circle start-0 top-0 progress-ball w-100 d-flex align-items-center justify-content-center"
                    :style="{ '--progress': point[1] }">
                    <span class="material-symbols-outlined unselectable fs-2">
                        person
                    </span>

                </div>
            </div>

            <div class="rounded-circle p-4 cl-bg-background-soft border cursor-pointer" @click="stepNext(3)">
                <div class="position-absolute h-100 cl-bg-primary rounded-circle start-0 top-0 progress-ball w-100 d-flex align-items-center justify-content-center"
                    :style="{ '--progress': point[2] }">
                    <span class="material-symbols-outlined unselectable fs-2">
                        account_balance_wallet
                    </span>
                </div>
            </div>

            <div class="rounded-circle p-4 cl-bg-background-soft border cursor-pointer" @click="stepNext(4)">
                <div class="position-absolute w-100 h-100 cl-bg-primary rounded-circle start-0 top-0 progress-ball d-flex align-items-center justify-content-center"
                    :style="{ '--progress': point[3] }">
                    <span class="material-symbols-outlined unselectable fs-2">
                        person_celebrate
                    </span>
                </div>
            </div>
        </div>

        <div class="d-flex">
            <transition name="slide">
                <div v-show="step == 1"
                    class="cl-bg-background-soft p-3 rounded cl-border col-xl-7 col-lg-8 col-lg-9 col-12 mx-auto mt-3 position-absolute card">
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" placeholder="Login">
                        <label for="floatingInput">Login (Wymagane)</label>
                    </div>
                    <div class="form-floating position-relative mb-3">
                        <input type="email" class="form-control" placeholder="Login">
                        <label for="floatingInput">Adres E-mail (Wymagane)</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input :type="inputType" class="form-control" placeholder="Hasło">
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
                    <div class="form-floating position-relative">
                        <input :type="inputType" class="form-control" placeholder="Hasło">
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

                    <span class="text-danger">Hasło jest niepoprawne, spróbuj ponownie lub skorzystaj z <a
                            href="#">pomocy</a></span>


                    <span class="text-danger">Hasło jest niepoprawne, spróbuj ponownie lub skorzystaj z <a
                            href="#">pomocy</a></span>

                    <div class="row my-2 px-2 justify-content-center">
                        <div class="rounded bg-background p-1 border position-relative row">
                            <div class="p-1 rounded" :style="{ width: passwordStrength.width, backgroundColor: passwordStrength.background }">

                            </div>
                        </div>
                    </div>

                    <div class="row justify-content-around mt-2">
                        <div class="col-md-6 col-12 text-center my-2">
                            <button class="btn btn-outline-success w-75">Zaloguj się</button>
                        </div>
                        <div class="col-md-6 col-12 text-center my-2">
                            <button class="btn btn-outline-success w-75">Pomoc</button>
                        </div>
                    </div>


                </div>
            </transition>

            <transition name="slide">
                <div v-show="step == 2"
                    class="cl-bg-background-soft p-3 rounded cl-border col-xl-7 col-lg-8 col-lg-9 col-12 mx-auto mt-3 position-absolute card">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" placeholder="Login">
                                <label for="floatingInput">Imię (Wymagane)</label>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-floating position-relative mb-3">
                                <input type="email" class="form-control" placeholder="Login">
                                <label for="floatingInput">Nazwisko (Wymagane)</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="form-floating position-relative mb-3">
                                <input type="email" class="form-control" placeholder="Login">
                                <label for="floatingInput">Województwo</label>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <div class="form-floating position-relative mb-3">
                                <input type="email" class="form-control" placeholder="Login">
                                <label for="floatingInput">Miasto</label>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="form-floating position-relative mb-3">
                                <input type="text" class="form-control" placeholder="Kod pocztowy" v-model="postalField" @input="handlePostal" pattern="[0-9]{2}-[0-9]{3}" >
                                <label for="floatingInput">Kod pocztowy</label>

                                <!-- <span class="position-absolute" style="top: 50%; left: 13px">
                                    _ _ - _ _ _
                                </span> -->
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-4">
                            <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">+48</span>
                            <div class="form-floating position-relative">
                                <input type="text" class="form-control" placeholder="Numer telefonu" v-model="phoneField" @input="handlePhone" aria-label="Numer telefonu" aria-describedby="basic-addon1">
                                <label for="floatingInput">Nr telefonu</label>
                            </div>
                        </div>
                        </div>
                        <div class="col-lg-5">
                            <div class="form-floating position-relative mb-3">
                                <input type="text" class="form-control" placeholder="Login">
                                <label for="floatingInput">Ulica</label>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="form-floating position-relative mb-3">
                                <input type="text" class="form-control" placeholder="Kod pocztowy" pattern="[0-9]{2}-[0-9]{3}">
                                <label for="floatingInput">Nr lokalu</label>
                            </div>
                        </div>
                    </div>

                    <div class="row justify-content-around mt-2">
                        <div class="col-lg-6 text-center my-2">
                            <button class="btn btn-outline-success w-75">Zaloguj się</button>
                        </div>
                        <div class="col-lg-6 text-center my-2">
                            <button class="btn btn-outline-success w-75">Pomoc</button>
                        </div>
                    </div>
                </div>
            </transition>

            <transition name="slide">
                <div v-show="step == 3"
                    class="cl-bg-background-soft p-3 rounded cl-border col-lg-7 col-md-8 col-12 mx-auto mt-3 position-absolute card">
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="Login">
                        <label for="floatingInput">3 (Wymagane)</label>
                    </div>
                    <div class="form-floating position-relative mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="Login">
                        <label for="floatingInput">Adres E-mail (Wymagane)</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input :type="inputType" class="form-control" id="floatingPassword" placeholder="Hasło">
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
                    <div class="form-floating position-relative">
                        <input :type="inputType" class="form-control" id="floatingPassword" placeholder="Hasło">
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

                    <span class="text-danger">Hasło jest niepoprawne, spróbuj ponownie lub skorzystaj z <a
                            href="#">pomocy</a></span>
                    <div class="row justify-content-around mt-2">
                        <div class="col-md-6 text-center my-2">
                            <button class="btn btn-outline-success w-75">Zaloguj się</button>
                        </div>
                        <div class="col-md-6 text-center my-2">
                            <button class="btn btn-outline-success w-75">Pomoc</button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>


        <!-- 
        </div>

        <div class="col-2 d-none d-lg-block" style="z-index: 4;">

        </div> -->








    </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue';

const inputType = ref("Password");
const barProgress = ref("0%");
const stepOne = ref("");
const step = ref(1);
const point: string[] = ['100%', "0%", "0%", "0%"];

const postalField = ref("");
let postalFieldInitLength = 0;

const phoneField = ref("");
let phoneFieldInitLength = 0;

const passwordStrength = reactive({width: "0%", background: "red"})

const changePasswordVisibility = (() => {
    if (inputType.value == "Password") inputType.value = "Text";
    else inputType.value = "Password";
});

const stepNext = ((toStep: number) => {
    switch (toStep) {
        case 1:
            step.value = 1;
            barProgress.value = "0%";
            stepOne.value = "solid 2px #dc3545"
            stepOne.value = "solid 2px var(--color-primary)"
            break;

        case 2:
            step.value = 2;
            barProgress.value = "34%";
            break;

        case 3:
            step.value = 3;
            barProgress.value = "67%";
            break;

        case 4:
            barProgress.value = "99%";

            break;

        default:
            break;
    }
});

const handlePostal = (() => {
    let postal: any[] = postalField.value.split('');

    postal = postal.map((char) => {
        if (/^[\d | -]$/.test(char)) return char;
        return undefined;
    }).filter((char) => char !== undefined);

    postal = postal.slice(0, 6);
    postalField.value = postal.join('');
});


const handlePhone = (() => {
    let number: any[] = phoneField.value.split('');
    number = number.map((char) => {
        if (/^\d$/.test(char)) return char;
        return undefined;
    }).filter((char) => char !== undefined);

    number = number.slice(0, 9);

    phoneFieldInitLength = number.length;
    if (phoneFieldInitLength <= number.length) {
        if (number.length == 9) {
            number.splice(3, 0, " ");
            number.splice(7, 0, " ");
        }
    }
    phoneField.value = number.join('');
});

</script>

<style scoped>
.eye-icon {
    top: 0;
    right: 5%;
    transform: translateY(75%);
}

.progress-bar {
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