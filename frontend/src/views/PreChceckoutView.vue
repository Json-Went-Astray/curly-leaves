<template>
    <div class="container-fluid mb-4 px-0">
        <Header class="sticky-top" :message="flag" :doNotOpen="true"></Header>
        <div class="container px-md-3 py-2 border" style="min-height: 60vh;">

            <div
                class="d-flex my-3 mx-auto col-xl-7 col-lg-8 col-lg-9 col-12 rounded position-relative justify-content-between p-0">

                <div class="position-absolute align-items-center cl-bg-white border col-md-6 p-1 rounded top-50"
                    style="width: 95%;">
                </div>

                <div class="position-absolute align-items-center cl-bg-primary border col-md-6 p-1 rounded top-50"
                    style="width: 0%; left: 5%; right: auto;">
                </div>

                <div class="rounded-circle p-4 cl-bg-white border cursor-pointer" style="border: none !important;">
                    <div class="position-absolute h-100 cl-bg-white rounded-circle start-0 top-0 progress-ball w-100 d-flex align-items-center justify-content-center border-box"
                        style="border: solid 2px #6d9b76;">
                        <span class="material-symbols-outlined unselectable fs-2">
                            shopping_cart
                        </span>
                    </div>
                </div>

                <div class="rounded-circle p-4 cl-bg-white border cursor-pointer">
                    <div class="position-absolute h-100 cl-bg-white rounded-circle start-0 top-0 progress-ball w-100 d-flex align-items-center justify-content-center"
                        style="">
                        <span class="material-symbols-outlined unselectable fs-2">
                            password
                        </span>
                    </div>
                </div>

                <div class="rounded-circle p-4 cl-bg-white border cursor-pointer">
                    <div
                        class="position-absolute h-100 cl-bg-white rounded-circle start-0 top-0 progress-ball w-100 d-flex align-items-center justify-content-center">
                        <span class="material-symbols-outlined unselectable fs-2">
                            summarize
                        </span>
                    </div>
                </div>

            </div>

            <div class="d-flex align-items-center">
                <span class="fs-3 cl-text-primary fw-bold me-2">Twój koszyk</span>
                <span class="material-symbols-outlined fs-2 cl-text-primary fw-bold me-3">
                    shopping_cart
                </span>
                <button class="btn btn-success d-inline-flex align-items-center justify-content-around"
                    v-if="loaded && data.cart && data.cart.CartItem && data.cart.CartItem.length != 0"
                    @click="$router.push('/checkout')">Przejdź dalej&nbsp;&nbsp;<span class="material-symbols-outlined">
                        keyboard_tab
                    </span></button>
            </div>
            <p v-if="(loaded && !data.cart) || (loaded && !data.cart.CartItem) || (loaded && data.cart.CartItem.length == 0)"
                class=" w-100 text-center fs-5 cl-text-primary fw-bold me-2">Brak produktów w koszyku, <a href="#"
                    @click='$router.push("/")'>wróć do strony głównej {{ loaded }}</a></p>
            <table class="table table-striped" 
                v-if="loaded && data.cart && data.cart.CartItem && data.cart.CartItem.length != 0">
                <tbody >
                    <tr v-for="cartItem in data.cart.CartItem">
                        <td style="width: 20%; vertical-align: middle"><img
                                style="width: 64px; height: 64px; border-radius: 5px;"
                                :src="cartItem.product.pics ? `http://localhost:4000${cartItem.product.pics.split(';')[0]}` : 'http://placehold.co/64x64'" />
                        </td>
                        <td style="vertical-align: middle;"><span class="cl-text-primary fw-bold fs-5">{{
            cartItem.product.title }}</span></td>


                        <td v-if="cartItem.product.price != null" style="vertical-align: middle; text-align: center; border-left: dashed 1px grey;"><span
                                class="cl-text-primary fw-bold fs-5">{{
            cartItem.product.price }} zł</span></td>

<td v-else style="vertical-align: middle; text-align: center; border-left: dashed 1px grey;"><span
                                class="cl-text-primary fw-bold fs-5">{{
            cartItem.product.fullPrice }} zł</span></td>

            

                        <td style="text-align: center; vertical-align: middle; border-left: dashed 1px grey; border-right: dashed 1px grey;"><span
                                class="cl-text-primary fw-bold fs-5">x{{
            cartItem.quantity }}</span></td>
                        <td style="width: 30%; vertical-align: middle; text-align: center;"><button
                                class="btn btn-danger me-2 d-inline-flex align-items-center justify-content-around" @click="removeProductFromCart(cartItem.product.id)">Usuń<span
                                    class="material-symbols-outlined">
                                    delete
                                </span></button><button
                                class="btn btn-success d-inline-flex align-items-center justify-content-around"
                                @click="goToProduct(cartItem.product.snowFlake)">Zobacz
                                produkt<span class="material-symbols-outlined">
                                    preview
                                </span></button></td>
                    </tr>
                </tbody>
            </table>


        </div>
        <Footer></Footer>
    </div>
</template>
<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Toggle from '@vueform/toggle'
import { onMounted, ref, watchEffect } from 'vue';
import { fetchMe, userData } from '@/me';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import router from '@/router';

onMounted(async () => {
    await fetchMe();
    processCart();
});

const loaded = ref(false);
const flag = ref(false);

const { mutate: doProcessCart } = useMutation(
    gql`
    mutation getProcessedCart {
  getProcessedCart {
    CartItem {
      isPrize,
      quantity,
      product {
        id,
        pics,
        title,
        price,
        fullPrice,
        snowFlake,
      }
    }
  }
}
    `
);
const data = ref();


const processCart = async () => {
    try {
        if (!userData.value || !userData.value.me || !userData.value.me.id) {
            console.log("nope");
            return;
        }

        const res = await doProcessCart();
        console.log('Odpowiedź z mutacji processCart:', res);
        const userDataResponse = await fetchMe();
        data.value = userDataResponse?.data.me;
        flag.value = !flag.value;


    } catch (error) {
        console.error('Błąd podczas wywoływania mutacji processCart:', error);
    }
};
watchEffect(() => {
    loaded.value = !!data.value; // Jeśli data.value istnieje, ustaw loaded na true
});

const goToProduct = ((snowflake: string) => {
    router.push({ path: `/product/${snowflake}` });
})

const { mutate: removeOne } = useMutation(
    gql`
    mutation removeProductFromCart($userId: Float!, $productId: Float!) {
        removeProductFromCart(userId: $userId, productId: $productId)
    }
    `
);

const removeProductFromCart = async (productId: any) => {
    try {
        if (!userData.value.me.id) {
            console.log("nope");
            return;
        }
        const res = await removeOne({
            userId: parseFloat(userData.value.me.id),
            productId: parseFloat(productId)
        });
        userData.value = await fetchMe();
        console.log(userData?.value.data.me.cart)
        data.value = userData!.value.data.me.cart;
        console.log("data.value", data.value)

    } catch (error) {
        console.log(error)
    }
};


</script>
<style scoped>
.select>select:focus {
    outline: none !important;
    box-shadow: none !important;
    border-color: #6d9b76;
}

.input-group {
    width: unset !important;
}

.summary-numbers {
    font-size: 16pt;
    font-weight: bold;
    cursor: default;
}
</style>

<style scoped src="@vueform/toggle/themes/default.css"></style>
