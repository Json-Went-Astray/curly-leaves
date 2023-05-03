<template>
    <div class="container my-3">
        <div class="w-100 d-flex flex-nowrap mt-5 align-items-center justify-content-center">
            <!-- <img src="@/assets/static/logo.png" alt="logo"> -->
            <div class="fs-1 fw-bold position-relative cl-text-primary">
                CurlyLeaves
            </div>
        </div>

        <div class="cl-bg-background-soft p-3 rounded cl-border col-md-6 col mx-auto mt-3">
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="Login">
                <label for="floatingInput">Login</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Hasło">
                <label for="floatingPassword">Hasło</label>
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

<script setup lang="ts"></script>
<style scoped>
img {
    width: 100px;
    height: auto;
}
</style>