<template>
    <div class="container-fluid p-2 h-100" style="max-height: 100%;">
        <br>
        <div class="d-flex w-100 fs-3 align-items-center cl-text-secondary fw-bold mb-2">
            Kategorie <span class="material-symbols-outlined ms-2 fs-1">category</span>
        </div>
        <div style="max-height: 70vh; min-height: 70vh; overflow-y: overlay;">
            <table class="table table-striped">
                <tbody>
                    <tr v-if="categories.length > 0" v-for="(cat, index) in categories" :key="index">
                        <td>
                            <span class="fw-bold">Foo - 0 produktów</span>
                        </td>
                        <td>
                            <div class="w-100 h-100 d-flex justify-content-around">
                                <button
                                    class="btn btn-secondary d-flex justify-content-center align-items-center w-25">Edytuj
                                    <span class="material-symbols-outlined ms-3" style="font-size: 1.2em;">
                                        edit
                                    </span>
                                </button>
                                <button class="btn btn-danger w-25">Usuń
                                    <span class="material-symbols-outlined ms-3" style="font-size: 1.2em;">
                                        delete
                                    </span>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <div v-else class="w-100 text-center fs-3">
                        Brak kategorii, dodaj je poniżej
                    </div>
                </tbody>
            </table>
        </div>

        <div class="row justify-content-center mt-4" style="align-items: stretch;">
            <div class="form-floating my-2 px-1 col-4">
                <input type="text" class="form-control" placeholder="Nazwa" v-model="catName">
                <label>Nazwa</label>
            </div>
            <div class="form-floating my-2 px-1 col-4 h-100">
                <button class="btn btn-success btn-lg w-100" style="height: 100%;">Dodaj kategorię</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const categories = ref([]);
const catName = ref("");

</script>

<style scoped>
td {
    vertical-align: middle;
}
</style>