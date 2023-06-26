<template>
    <div class="container h-100">
        <br>
        <div class="d-flex w-100 fs-3 align-items-center cl-text-secondary fw-bold mb-2">
            Bieżące zamówienia <span class="material-symbols-outlined ms-2 fs-1">conveyor_belt</span>
        </div>
        <div class="h-50 y-scroll cl-border rounded">
            <table class="table table-striped">
                <thead class="sticky-top">
                    <tr class="cl-bg-primary cl-white">
                        <th scope="col" class="text-center fw-bold">
                            Nr zamówienia
                        </th>
                        <th scope="col">
                            <div class="d-flex align-items-center justify-content-center fw-bold">
                                Status<span class="material-symbols-outlined cl-white cursor-pointer unselectable ms-2">
                                    sort
                                </span>
                            </div>
                        </th>
                        <th scope="col" class="text-center fw-bold">
                            Data<span class="material-symbols-outlined cl-white cursor-pointer unselectable">
                                swap_vert
                            </span>
                        </th>
                        <th scope="col" class="text-center fw-bold">
                            E-mail
                        </th>
                        <th scope="col" class="text-center fw-bold">
                            Akcje
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">54525966</th>
                        <td class="text-center"><span class="badge rounded-pill bg-danger">Zwrot od klienta</span></td>
                        <td>2023-04-05</td>
                        <td>example@em.pl</td>
                        <td>
                            <div class="d-flex justify-content-around">
                                <span class="material-symbols-outlined unselectable cl-text-primary cursor-pointer">
                                    visibility
                                </span>
                                <span class="material-symbols-outlined unselectable cl-text-primary cursor-pointer">
                                    archive
                                </span>
                                <span class="material-symbols-outlined unselectable cl-text-primary cursor-pointer">
                                    edit_note
                                </span>
                            </div>
                        </td>

                    </tr>
                    <tr>
                        <th scope="row">312222</th>
                        <td class="text-center"><span class="badge rounded-pill bg-secondary">Oczekiwanie na płatność</span>
                        </td>
                        <td>2023-04-07</td>
                        <td>exta@em.pl</td>
                        <td>
                            <div class="d-flex justify-content-around">
                                <span class="material-symbols-outlined unselectable cl-text-primary cursor-pointer">
                                    visibility
                                </span>
                                <span class="material-symbols-outlined unselectable cl-text cursor-deny">
                                    archive
                                </span>
                                <span class="material-symbols-outlined unselectable cl-text-primary cursor-pointer">
                                    edit_note
                                </span>
                            </div>
                        </td>

                    </tr>
                    <tr v-for="i in 30" :key="i">
                        <th scope="row">{{ i }}</th>
                        <td class="text-center"><span class="badge rounded-pill bg-success">Doręczono</span></td>
                        <td>2023-05-07</td>
                        <td>pola@em.pl</td>
                        <td>
                            <div class="d-flex justify-content-around">
                                <span class="material-symbols-outlined unselectable cl-text-primary cursor-pointer">
                                    visibility
                                </span>
                                <span class="material-symbols-outlined unselectable cl-text-primary cursor-pointer">
                                    archive
                                </span>
                                <span class="material-symbols-outlined unselectable cl-text-primary cursor-pointer">
                                    edit_note
                                </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex p-1 sticky-bottom cl-bg-primary cl-white cl-border rounded bottom-0">
                <div class="d-flex align-items-center">
                    <span class="material-symbols-outlined unselectable cl-white cursor-pointer">
                        arrow_left
                    </span>
                    <span class="fw-bold">5 z 6</span>
                    <span class="material-symbols-outlined unselectable cl-white cursor-pointer">
                        arrow_right
                    </span>
                    <span>
                        (50 wyników)
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
td,
th {
    text-align: center;
}
</style>
