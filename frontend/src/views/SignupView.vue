<template>
    <div class="container my-3">
        <div class="w-100 d-flex flex-nowrap mt-5 align-items-center justify-content-center">
            <!-- <img src="@/assets/static/logo.png" alt="logo"> -->
            <div class="fs-1 fw-bold position-relative cl-text-primary">
                Curly Leaves
            </div>
        </div>


        <div class="d-flex my-3 mx-auto col-md-6 rounded position-relative justify-content-between">
            <div class="w-100 position-absolute align-items-center cl-bg-primary col-md-6 p-1 rounded top-50"
                style="transform: translateY(-50%);">

            </div>

            <div class="cl-bg-primary rounded-circle p-4">

            </div>

            <div class="cl-bg-primary rounded-circle p-4">

            </div>

            <div class="cl-bg-primary rounded-circle p-4">

            </div>

            <div class="cl-bg-primary rounded-circle p-4">

            </div>
        </div>

        <div class="cl-bg-background-soft p-3 rounded cl-border col-md-6 col mx-auto mt-3">
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="Login">
                <label for="floatingInput">Login (Wymagane)</label>
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
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';

const inputType = ref("Password");
const changePasswordVisibility = (() => {
    if (inputType.value == "Password") inputType.value = "Text";
    else inputType.value = "Password";
});
</script>

<style scoped>
.eye-icon {
    top: 0;
    right: 5%;
    transform: translateY(75%);
}
</style>