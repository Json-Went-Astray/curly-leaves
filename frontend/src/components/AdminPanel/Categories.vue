<template>
    <div class="container-fluid p-2 h-100" style="max-height: 100%;">
        <Preloader v-if="loading"></Preloader>
        <br>
        <div class="d-flex w-100 fs-3 align-items-center cl-text-secondary fw-bold mb-2">
            Kategorie <span class="material-symbols-outlined ms-2 fs-1">category</span>
        </div>
        <div style="max-height: 70vh; min-height: 70vh; overflow-y: overlay;">
            <table class="table table-striped">
                <tbody>
                    <tr v-if="categories.length > 0" v-for="(cat, index) in categories" :key="index">
                        <td>
                            <span class="fw-bold">{{ cat['title'] }}</span><span>&nbsp;- {{ cat['productCount'] }} produktów</span>
                        </td>
                        <td>
                            <div class="w-100 h-100 d-flex justify-content-around">
                                <button
                                    class="btn btn-secondary d-flex justify-content-center align-items-center w-25">Edytuj
                                    <span class="material-symbols-outlined ms-3" style="font-size: 1.2em;">
                                        edit
                                    </span>
                                </button>
                                <button @click="doDeleteCategory(cat['title'])" class="btn btn-danger w-25">Usuń
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

        <div class="row justify-content-center mt-4 align-items-center">
            <div class="form-floating my-2 px-1 col-4">
                <input type="text" class="form-control" placeholder="Nazwa" v-model="catName">
                <label>Nazwa</label>
            </div>
            <div class="form-floating my-2 px-1 col-4 h-100">
                <button @click="addCategory(catName)" class="btn btn-success btn-lg w-100" style="height: 100%;">Dodaj
                    kategorię</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import Preloader from '../Preloader.vue';

const categories = ref([]);
const catName = ref("");

//RESOLVERS
const GET_CATEGORY = gql`
query getCategories {
  getCategories {
    id
    title
		products {
		  id
		}
  }
}
`;

const CREATE_CATEGORY = gql`
  mutation createCategory($title: String!) {
    createCategory(title: $title)
  }
`;

const DELETE_CATEGORY = gql`
  mutation deleteCategory($title: String!) {
    deleteCategory(title: $title)
  }
`;

const { mutate: createCategory } = useMutation(CREATE_CATEGORY);
const { mutate: deleteCategory } = useMutation(DELETE_CATEGORY);

async function addCategory(newCategoryTitle: string) {
    try {
        loading.value = true;
        await createCategory({ title: newCategoryTitle });
        await fetchCategory();
        
        //@ts-ignore
        categories.value = result.value['getCategories'].map(category => {
            return {
                title: category.title,
                productCount: category.products ? category.products.length : 0
            };
        });
        catName.value = "";
    } catch (error) {
        console.error('Wystąpił błąd podczas tworzenia kategorii:', error);
    }
}

async function doDeleteCategory(categoryTitle: string) {
    try {
        loading.value = true;
        await deleteCategory({ title: categoryTitle });
        await fetchCategory();
        
        //@ts-ignore
        categories.value = result.value['getCategories'].map(category => {
            return {
                title: category.title,
                productCount: category.products ? category.products.length : 0
            };
        });
    } catch (error) {
        console.error('Wystąpił błąd podczas usuwania kategorii:', error);
    }
}

const { result, loading, refetch: fetchCategory } = useQuery(GET_CATEGORY);

const props = defineProps<{
    showed: string;
}>();

watch(() => props.showed, (newVal) => {
    if (newVal == 'categories') {
        fetchCategory();
        //@ts-ignore
        categories.value = result.value['getCategories'].map(category => {
            return {
                title: category.title,
                productCount: category.products ? category.products.length : 0
            };
        });
    }
});

</script>

<style scoped>
td {
    vertical-align: middle;
}
</style>