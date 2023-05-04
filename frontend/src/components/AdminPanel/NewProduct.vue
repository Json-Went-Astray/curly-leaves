<template>
    <div class="container-fluid">
        <br>
        <div class="d-flex w-100 fs-3 align-items-center cl-text-secondary fw-bold mb-2">
            Nowy produkt <span class="material-symbols-outlined ms-2 fs-1">library_add</span>
        </div>
        <div class="row gx-5 my-3">
            <div class="col-8">
                <div class="cl-border rounded p-3">
                    <div class="row">
                        <div class="col-4 d-flex flex-wrap justify-content-center">
                            <h5>Obraz główny produktu</h5>
                        </div>
                        <div class="col-8">
                            <h5>Galeria produktu</h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4 d-flex flex-wrap justify-content-center">
                            <div
                                class="cl-border rounded w-50 p-1 d-flex justify-content-center cl-border-hover cl-shadow cursor-pointer">
                                <img src="@/assets/static/svg/box.svg" alt="dodaj produkt" class="unselectable w-50">
                                <span class="material-symbols-outlined position-absolute end-0 bottom-0">
                                    add_circle
                                </span>
                            </div>
                        </div>
                        <div class="col-7 d-flex justify-content-around cl-border cl-shadow cl-border-hover rounded">
                            <div v-for="i in 7" class=" rounded p-1 d-inline-flex">
                                <img src="@/assets/static/svg/box.svg" alt="dodaj produkt" class="unselectable img-sm">
                            </div>
                            <span class="material-symbols-outlined position-absolute end-0 bottom-0">
                                add_circle
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="cl-border rounded p-3">
                    <div class="row flex-nowrap justify-content-around">
                        <div class="col-6 d-flex align-items-center">
                            <span class="fs-5">Rodzaj produktu</span>
                        </div>
                        <div class="col-6">
                            <div class="btn-group w-100">
                                <button type="button"
                                    class="btn btn-success-outline dropdown-toggle d-flex align-items-center justify-content-around px-4"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <div class="col-2">
                                        <span class="material-symbols-outlined">
                                            {{ selectedDropdown.icon }}
                                        </span>
                                    </div>
                                    <div class="col-10 text-center">
                                        {{ selectedDropdown.text }}
                                    </div>
                                </button>
                                <ul class="dropdown-menu w-100">
                                    <li>
                                        <a class="dropdown-item d-flex align-items-center justify-content-around px-2"
                                            href="#" @click="selectDropdown('potted_plant', 'Roślina')">
                                            <div class="col-2">
                                                <span class="material-symbols-outlined">
                                                    potted_plant
                                                </span>
                                            </div>
                                            <div class="col-10 text-center">
                                                Roślina
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item d-flex align-items-center justify-content-around px-2"
                                            href="#" @click="selectDropdown('garden_cart', 'Art. ogrodniczy')">
                                            <div class="col-2">
                                                <span class="material-symbols-outlined">
                                                    garden_cart
                                                </span>
                                            </div>
                                            <div class="col-10 text-center">
                                                Art. ogrodniczy
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item d-flex align-items-center justify-content-around px-2"
                                            href="#" @click="selectDropdown('pergola', 'Inny')">
                                            <div class="col-2">
                                                <span class="material-symbols-outlined">
                                                    pergola
                                                </span>
                                            </div>
                                            <div class="col-10 text-center">
                                                Inny
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row gx-5 my-3">
            <div class="col-8">
                <div class="cl-border rounded p-3">
                    <div class="row">
                        <h5>Podstawowe informacje</h5>
                    </div>
                    <div class="row">
                        <div class="form-floating my-2 px-1">
                            <input type="text" class="form-control" placeholder="Nazwa">
                            <label>Nazwa</label>
                        </div>
                        <div class="d-flex w-100 flex-nowrap">
                            <span class="text-danger mx-2">Niepoprawna nazwa</span>
                            <span class="text-danger mx-2">Nazwa nie może być pusta</span>
                        </div>
                        <div class="form-floating my-2 px-1">
                            <textarea class="form-control" placeholder="Opis produktu" rows="6"
                                style="resize: none; height: 100%;"></textarea>
                            <label>Opis produktu</label>
                        </div>
                        <div class="d-flex w-100 flex-nowrap">
                            <span class="text-warning mx-2">Opis jest pusty</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="cl-border rounded p-3">
                    <div class="row">
                        <h5>Ceny</h5>
                    </div>
                    <div class="form-floating my-2 px-1">
                        <input type="text" class="form-control" placeholder="Cena NETTO">
                        <label>Cena NETTO</label>
                    </div>
                    <div class="d-flex w-100 flex-nowrap">
                        <span class="fw-bold mx-2">Cena BRUTTO: Nan zł</span>
                        <span class="text-danger mx-2">Wpisz poprawną cenę</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const selectedDropdown = reactive({
    icon: "potted_plant",
    text: "Roślina"
});

const selectDropdown = ((icon: string, text: string) => {
    selectedDropdown.icon = icon;
    selectedDropdown.text = text;
});

</script>

<style scoped>
.dropdown-menu li a:focus {
    background-color: transparent;
}

.btn-success-outline:hover,
.btn-success-outline:focus {
    background-color: transparent;
    color: var(--color-primary);

}
</style>