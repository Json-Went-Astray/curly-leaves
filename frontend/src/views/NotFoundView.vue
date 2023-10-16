<template>
    <div class="container-fluid p-0 flex-column d-flex" style="height: 100vh; overflow-x: hidden;">
        <Header></Header>
        <div class="d-flex flex-grow-1 flex-column my-5">
            <div class="row mt-5 h4 text-center w-100 mx-0">
                <span>Niestety nie znaleźliśmy strony, której szukasz</span>
                <span class="mt-3">Jeśli myślisz, że to błąd skontaktuj się z pomocą lub wróć na stronę główną</span>
            </div>

            <div class="row col-md-6 col-12 mt-5 mx-auto">
                <div class="col-md-6 text-center my-2">
                    <button class="col-8 p-3 btn btn-lg btn-success-outline" @click="$router.push('/')">Strona główna</button>
                </div>
                <div class="col-md-6 col-12 text-center my-2">
                    <button class="col-8 p-3 btn btn-lg btn-warning-outline" @click="$router.push('/help')">Dział pomocy</button>
                </div>
            </div>


        </div>
        <Footer></Footer>
    </div>
</template>
<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>
<style scoped></style>