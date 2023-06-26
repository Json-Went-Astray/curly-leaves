<template>
    <div class="container-fluid h-100">
        <br>
        <div class="d-flex w-100 fs-3 align-items-center cl-text-secondary fw-bold mb-2">
            Obsługa <span class="material-symbols-outlined ms-2 fs-1">badge</span>
        </div>
        <div class="row">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">&#x1F50E;</span>
                <input type="text" class="form-control border-box" placeholder="Username" aria-label="Username"
                    aria-describedby="basic-addon1">
                    <button class="btn btn-success-outline">Szukaj</button>
            </div>
        </div>
        <div class="h-50 y-scroll cl-border rounded">
            <table class="table table-striped table-hover">
                <thead class="sticky-top">
                    <tr class="cl-bg-primary cl-white">
                        <th scope="col" class="text-center fw-bold">
                            Akcje
                        </th>
                        <th scope="col">

                        </th>
                        <th scope="col" class="text-center fw-bold">
                            Imię
                        </th>
                        <th scope="col" class="text-center fw-bold">
                            Nazwisko
                        </th>
                        <th scope="col" class="text-center fw-bold">
                            Rola
                        </th>
                        <th scope="col" class="text-center fw-bold">
                            E-mail
                        </th>
                        <th scope="col" class="text-center fw-bold">
                            Nr telefonu
                        </th>
                        <th scope="col" class="text-center fw-bold">
                            Nr rachunku
                        </th>
                    </tr>
                </thead>
                <tr v-for="i in 151">
                    <!-- extend -->
                    <td>
                        <div class="d-flex align-items-center justify-content-around">
                            <span class="material-symbols-outlined unselectable cursor-pointer">
                                lock_reset
                            </span>
                            <span class="material-symbols-outlined unselectable cursor-pointer">
                                search
                            </span>
                            <span class="material-symbols-outlined unselectable cursor-pointer text-danger">
                                person_remove
                            </span>
                        </div>
                    </td>
                    <td><img src="@/assets/static/profiles/profile1.png" alt="np-pfp"
                            class="pfp-img rounded-circle unselectable"></td>
                    <td>Kacper</td>
                    <td>Boszkiewicz</td>
                    <td>Admin</td>
                    <td>s25798@st.pwsz.nysa.pl</td>
                    <td>555-555-555</td>
                    <td>12 4444 5555 6666 7777</td>
                </tr>

            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.pfp-img {
    width: 60px;
    height: 60px;
}

td {
    vertical-align: middle;
    text-align: center;
}
</style>