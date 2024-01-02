<template>
    <div class="d-flex flex-column vh-100">
        <div class="form-divider-bottom d-none d-md-block"
            style="transform: rotate(180deg); height: 170px; top: -7%; opacity: 0.8;"></div>

        <Preloader v-if="loading" />
        <div v-if="!loading" class="cl-bg-white p-3 rounded cl-border col-xl-7 col-lg-8 col-lg-9 col-12 mx-auto mt-3 text-center rounded-2">
            <span class="px-2 text-center my-1 h4">Twoje konto zostało aktywowane</span>


            <div class="row justify-content-around mt-2">
                <div class="col-10 text-center my-2">
                    <button class="btn btn-outline-success w-75" @click="$router.push('/signup')">Zaloguj się</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { activateUser } from '@/me';
import router from '@/router/index';
import Preloader from '@/components/Preloader.vue';

const activationKey = ref('');
const loading = ref(true);

const doActivate = async () => {
    try {
        const result = await activateUser(activationKey.value);
    } catch (error: any) {
        router.push("/");
    } finally {
        loading.value = false;
    }
    
}

onMounted(() => {
    activationKey.value = useRoute().params.activationKey as string;
    doActivate();
});

</script>
<style scoped></style>