<template>
    <div class="library-card p-3 border-1 rounded-2 cl-bg-white cl-border border-2 col-10 position-fixed">
        <div class="position-absolute d-flex bottom-100">
            <div class="cl-bg-white p-2 px-3 cl-border border-2 me-3 library-cat"
                :class="{ 'library-cat-active': card === 1 }" @click="card = 1">
                <span>Biblioteka</span>
            </div>
            <div class="cl-bg-white p-2 px-3 cl-border border-2 library-cat"
                :class="{ 'library-cat-active': card === 2 }" @click="card = 2">
                <span>Wysyłanie</span>
            </div>
        </div>

        <div class="row" v-if="card == 1" style="min-height: 75vh; max-height: 75vh;">
            <div class="col-3 border-end p-5 flex-column">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Wpisz tytuł">
                    <button class="btn btn-success cl-white" type="button">Szukaj</button>
                </div>

                <div class="form-check">
                    <input type="radio" class="form-check-input" id="radio1" name="optradio" value="option1"
                        checked>Wszystko
                </div>
                <div class="form-check">
                    <input type="radio" class="form-check-input" id="radio1" name="optradio" value="option1"
                        checked>Zdjęcia
                </div>
                <div class="form-check mb-3">
                    <input type="radio" class="form-check-input" id="radio2" name="optradio" value="option2">Filmy /
                    Gify /
                    Animacje
                </div>

                Szukaj od daty <span class="cursor-pointer cl-text-primary" v-if="picked"
                    style="text-decoration: underline;" @click="picked = null">(wyczyść)</span>:
                <Datepicker v-model="picked" :locale="pl" class="form-control" placeholder="Dowolna" />

            </div>


            <div class="col-6 border-end" style="overflow-y: scroll; max-width: 50%; align-items: start;">
                <div class="col-12  d-flex flex-wrap" style="max-height: 75vh; overflow-y: auto;">
                    <div class="col-2 text-center img-container my-3" v-for="item in mediaData.getMedia">
                        <div>
                            <img class="img-library-thumbnail rounded cursor-pointer" @click="chooseMedia(item.source)"
                                :class="{ 'highlighted': sourceIsInLinks(item.source) }" :title="item.title"
                                :src="`http://localhost:4000` + item.source">
                            <span v-if="sourceIsInLinks(item.source)"
                                class="material-symbols-outlined position-absolute cl-text-primary"
                                style="bottom: -0%; right: 25%; font-size: 2em;">
                                task_alt
                            </span>
                        </div>
                    </div>
                </div>
                <div class="d-flex w-75 justify-content-around"
                    v-if="mode == 'select' || mode == 'singleSelect'"
                    style="position: sticky; top: 90%; transform: translateX(15%);">
                    <button class="btn btn-lg col-4 btn-success" @click="getImageArrays">Zapisz</button>
                    <button class="btn btn-lg col-4 btn-secondary" @click="closeAction">Anuluj</button>

                </div>
            </div>

            <div class="col-3">
                <div class="mb-3">
                    <div ref="previewFullScreen">
                        <img class="w-100 border border-2" :style="{
                    width: isFullscreen ? 'auto' : '373px',
                    height: isFullscreen ? 'auto' : '280px',
                    maxWidth: isFullscreen ? '100%' : '100%',
                    maxHeight: isFullscreen ? '100%' : '100%',
                    objectFit: isFullscreen ? 'contain' : 'contain',
                }" :src="choosenMedia && choosenMedia.source ? (`http://localhost:4000` + choosenMedia.source) : 'http://placehold.co/256x256'" />
                    </div>
                    <div class="position-absolute end-0 bottom-0" v-if="choosenMedia != null">
                        <div v-if="deleteConfirm == 0" class="sub-btn" style="background-color: lightcoral;"
                            @click="deleteConfirm = 1">
                            <span>&nbsp;</span>
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                            <span>&nbsp;</span>
                        </div>
                        <div v-if="deleteConfirm == 1" class="sub-btn" style="background-color: lightcoral;"
                            @click="doDeleteMedia()">
                            <span>Czy na pewno?</span>
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                            <span>&nbsp;</span>
                        </div>
                        <div class="sub-btn" style="border-left: none; border-right: none; background-color: lightblue;"
                            @click="downloadImage">
                            <span>&nbsp;</span>
                            <span class="material-symbols-outlined">
                                download
                            </span>
                            <span>&nbsp;</span>
                        </div>
                        <div class="sub-btn" style="background-color: lightslategrey;" @click="toggleFullscreen(true)">
                            <span>&nbsp;</span>
                            <span class="material-symbols-outlined">
                                pan_zoom
                            </span>
                            <span>&nbsp;</span>
                        </div>
                    </div>

                </div>
                <!-- to-do v-if -->
                <div>
                    Data ostatniej modyfikacji: <span></span>
                </div>

                <hr class="my-2">
                <div>
                    <label class="form-label m-0">Tytuł</label>
                    <input type="text" class="form-control" v-model="editTitle">
                </div>
                <div>
                    <label class="form-label m-0">Tekst alternatywny</label>
                    <input type="text" class="form-control" v-model="editAlt">
                </div>
                <div>
                    <label class="form-label m-0">Krótki opis</label>
                    <textarea class="form-control" rows="3" style="resize: none;" v-model="editDescription"></textarea>
                </div>

                <div class="input-group my-3">
                    <div class="input-group-text"><span class="cl-text me-2">W karuzeli</span>
                        <input class="form-check-input mt-0" type="checkbox" value="">
                    </div>
                    <input type="text" class="form-control" aria-label="Text input with checkbox">
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="">
                    <label class="form-check-label">
                        Zdjęcie profilowe
                    </label>
                </div>

                <div class="col-12 text-center">
                    <button class="btn btn-success col-8 mx-auto mt-3 mb-2">Zapisz</button>
                </div>
            </div>
        </div>

        <div class="row" v-if="card == 2" style="min-height: 75vh; max-height: 75vh;">

            <div class="col-6 border-end d-flex flex-column align-items-center justify-content-center"
                style="overflow-y: auto; max-width: 50%;">
                <Preloader v-if="loadingUpload" style="max-height: 100%;"></Preloader>

                <div v-if="filePreview">
                    <div ref="imgFull" v-if="isImage">
                        <img class="img-library" :style="{
                    width: isFullscreen ? 'auto' : '100%',
                    height: isFullscreen ? 'auto' : '100%',
                    maxWidth: isFullscreen ? '100%' : '100%',
                    maxHeight: isFullscreen ? '100%' : '100%',
                }" :src="filePreview" />
                    </div>

                    <video v-else controls width="300">
                        <source :src="filePreview" type="video/mp4">
                        Twoja przeglądarka nie wspiera podglądu wideo
                    </video>

                    <div class="position-absolute end-0 bottom-0" v-if="isImage">
                        <div class="sub-btn" style="background-color: lightslategrey;" @click="toggleFullscreen()">
                            <span class="material-symbols-outlined">
                                pan_zoom
                            </span>
                        </div>
                    </div>
                </div>

                <button v-else class="btn btn-success col-6 py-3 mt-3 mb-2" @click="openFileInput">Prześlij
                    plik</button>
                <span class="text-danger" v-if="mimeError">Podany plik jest niepoprawny</span>
                <span class="text-danger" v-if="uploadImageInfo == 1">Nie udało się wysłać zdjęcia</span>
                <span class="text-success" v-if="uploadImageInfo == 2">Zdjęcie zostało wysłane pomyślnie</span>
                <input type="file" ref="fileInput" @change="handleFileChange" style="display: none"
                    accept="image/*, video/*, .gif" />
            </div>

            <div class="col-6 p-5 flex-column">

                <div class="mb-1">
                    <label class="form-label">Tytuł</label>
                    <input type="text" v-model="imgTitle" class="form-control" :disabled="!isSelected">
                </div>
                <div class="mb-1">
                    <label class="form-label">Tekst alternatywny</label>
                    <input type="text" v-model="imgAlt" class="form-control" :disabled="!isSelected">
                </div>
                <div class="mb-1">
                    <label class="form-label">Krótki opis</label>
                    <textarea class="form-control" v-model="imgDescription" rows="3" style="resize: none;"
                        :disabled="!isSelected"></textarea>
                </div>
                <div class="mb-1 form-check">
                    <input type="checkbox" class="form-check-input" v-model="isCarousel" :disabled="!isSelected">
                    <label class="form-check-label">W karuzeli</label>
                </div>
                <div class="mb-1 form-check">
                    <input type="checkbox" class="form-check-input" v-model="isProfile" :disabled="!isSelected">
                    <label class="form-check-label">Dostępne dla użytkowników</label>
                </div>
                <div>
                    <span v-if="!imgTitle && isSelected" class="text-danger">Zdjęcie nie ma tytułu</span>
                    <span v-else-if="!imgAlt && isSelected" class="text-warning">Zdjęcie nie ma opisu
                        alternatywnego</span>
                    <span v-else>&nbsp;</span>
                </div>
                <div class="col-12  d-flex justify-content-around">
                    <button class="btn btn-success col-4 py-3 mx-auto mt-3 mb-2" @click="doUploadFile()"
                        :disabled="!imgTitle || !isSelected">Zapisz</button>
                    <button class="btn btn-secondary col-4 py-3 mx-auto mt-3 mb-2" @click="clearUpload()"
                        :disabled="!isSelected">Anuluj</button>
                </div>
            </div>
        </div>
    </div>

    <div style="width: 200vw; height: 200vh; position: absolute; top: -100%; left: -100%;" class="lightbox"
        @click="closeAction">

    </div>
</template>

<script setup lang="ts">
import Datepicker from 'vue3-datepicker';
import { getCurrentInstance, onMounted, ref } from 'vue'
import { pl } from 'date-fns/locale'
import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import Preloader from './Preloader.vue';
import { defineProps } from 'vue';


const instance = getCurrentInstance();

const props = defineProps({
    titleImage: {
        type: String,
        default: null
    },
    productImages: {
        type: Array as () => string[],
        default: () => []
    },
    mode: {
        type: String,
        default: null
    }
});

let selectedFiles: any = ref([]);
let selectedFileSingular: any = ref([]);

if (props.mode == "select") {
    selectedFiles.value = props.productImages;
    console.log("multiSelect", selectedFiles.value, props.productImages);
}

else if (props.mode == "singleSelect") {
    selectedFileSingular.value = [];
    selectedFileSingular.value.push(props.titleImage);
    console.log("singleSelect", selectedFileSingular.value, props.titleImage);

}

const card = ref(1);
const picked = ref();
const imgFull = ref<HTMLInputElement | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const filePreview = ref<string | null>(null);
const isImage = ref(true);
const mimeError = ref(false);
const isSelected = ref();
const loadingUpload = ref(false);
const uploadImageInfo = ref();
const isFullscreen = ref(false);




const choosenMedia = ref();
const previewFullScreen = ref<HTMLInputElement | null>(null);

const clearUpload = (code: number = 0) => {
    isSelected.value = false;
    filePreview.value = null;
    imgTitle.value = "";
    imgAlt.value = "";
    imgDescription.value = "";
    isProfile.value = false;
    isCarousel.value = false;
    switch (code) {
        case 1:
            uploadImageInfo.value = 1;
            break;
        case 2:
            uploadImageInfo.value = 2;
            break;
        default:
            uploadImageInfo.value = 0;
            break;
    }
};

const openFileInput = () => {
    (fileInput.value as HTMLInputElement)?.click(); // Explicitly assert type
};

const toggleFullscreen = (flag: boolean = false) => {
    if (document.fullscreenElement) {
        isFullscreen.value = false;
        document.exitFullscreen();
    }

    else if (flag) {
        previewFullScreen.value?.requestFullscreen();
        isFullscreen.value = true;
    }

    else {
        if (isImage.value) {
            isFullscreen.value = true;
            imgFull.value?.requestFullscreen();
        }
    }
};

const handleFileChange = () => {
    mimeError.value = false;
    const selectedFile = (fileInput.value as HTMLInputElement)?.files?.[0]; // Explicitly assert type

    if (selectedFile) {
        const fileType = selectedFile.type;
        const fileName = selectedFile.name;

        if (!(fileType.startsWith('image/') || fileType.startsWith('video/') || fileName.toLowerCase().endsWith('.gif'))) {
            mimeError.value = true;
            isSelected.value = false;
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            filePreview.value = e.target?.result as string;
            isImage.value = selectedFile.type.startsWith('image/');
        };
        reader.readAsDataURL(selectedFile);
        isSelected.value = true;
    }
};

const downloadImage = () => {
    // to-do fix
    // const downloadLink = document.createElement('a');
    // downloadLink.href = choosenMedia.value;
    // downloadLink.target = '_blank';
    // downloadLink.setAttribute('download', '');
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
};

const editTitle = ref("");
const editAlt = ref("");
const editDescription = ref("");
const editIsCarousel = ref("");
const editRefLink = ref("");
const editIsProfile = ref("");

const choosenMediaSource = ref("");

const sourceIsInLinks = (source: any) => {
    if (props.mode == "select") {
        return selectedFiles.value.includes(source);
    }

    if (props.mode == "singleSelect") {
        return selectedFileSingular.value.includes(source);
    }
}
const sourceIsInLink = (source: any) => selectedFileSingular.value.includes(source);

const chooseMedia = (source: any) => {
    choosenMedia.value = mediaData.value.getMedia.find((media: any) => media.source == source);
    editTitle.value = choosenMedia.value.title;
    editAlt.value = choosenMedia.value.altString;
    editDescription.value = choosenMedia.value.description;
    editIsCarousel.value = choosenMedia.value.isCarousel;
    editRefLink.value = choosenMedia.value.refLink;
    editIsProfile.value = choosenMedia.value.isProfile;
    choosenMediaSource.value = source;

    if (props.mode == "select") {
        if (selectedFiles.value.includes(source)) {
            selectedFiles.value.splice(selectedFiles.value.indexOf(source), 1);
        }
        else {
            selectedFiles.value.push(source);
        }
    }

    if (props.mode == "singleSelect") {
        selectedFileSingular.value = [];
        selectedFileSingular.value.push(source);
    }
};

const getImageArrays = () => {
    if (instance) {
        if (props.mode === "singleSelect") {
            instance.emit('getImageArrays', selectedFileSingular.value, props.mode);
        } else if (props.mode === "select") {
            instance.emit('getImageArrays', selectedFiles.value, props.mode);
        } else {
            instance.emit('closeAction', false);
        }
    }
}

const closeAction = () => {
    if (instance) {
        instance.emit('closeAction', false);
    }
}

const imgTitle = ref("");
const imgAlt = ref("");
const imgDescription = ref("");
const imgRef = ref("");

const isCarousel = ref(false);
const isProfile = ref(false);


//RESOLVERS
const UPLOAD_FILE = gql`
  mutation UploadFile(
    $file: Upload!,
    $title: String!,
    $description: String!,
    $altString: String!,
    $refLink: String!,
    $isCarousel: Boolean!,
    $isProfile: Boolean!
  ) {
    uploadFileMedia(
      file: $file,
      title: $title,
      description: $description,
      altString: $altString,
      refLink: $refLink,
      isCarousel: $isCarousel,
      isProfile: $isProfile
    )
  }
`;
const { mutate: fileUpload } = useMutation(UPLOAD_FILE);
const doUploadFile = async () => {
    loadingUpload.value = true;
    const file = fileInput.value?.files?.[0];
    if (!file) {
        loadingUpload.value = false;
        return;
    }
    try {
        await fileUpload({
            file,
            title: imgTitle.value,
            description: imgDescription.value,
            altString: imgAlt.value,
            refLink: imgRef.value,
            isCarousel: isCarousel.value,
            isProfile: isProfile.value,
        });
        clearUpload(2);
        await fetchMedia();
        mediaData.value = result.value || [];
    } catch (error) {
        clearUpload(1);
    } finally {
        loadingUpload.value = false;
    }
};

const GET_MEDIA = gql`
query GetMedia {
  getMedia {
    id
    title
    description
    createdAt
    source
    refLink
    isCarousel
    isProfile
    altString
  }
}
`;

interface MediaItem {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    source: string;
    altString: string;
    refLink: string;
    isCarousel: boolean;
    isProfile: boolean;
}
const mediaData = ref<{ getMedia: MediaItem[] }>({ getMedia: [] });
const { result, loading, refetch: fetchMedia } = useQuery(GET_MEDIA);




//delete
const deleteConfirm = ref(0);

const DELETE_MEDIA = gql`
  mutation DeleteMedia(
    $fileName: String!,
  ) {
    deleteMedia(
      fileName: $fileName,
    )
  }
`;
const { mutate: deleteMedia } = useMutation(DELETE_MEDIA);

const doDeleteMedia = async () => {
    try {
        deleteConfirm.value = 0;
        await deleteMedia({
            fileName: choosenMedia.value.title
        });
        choosenMedia.value = null;
        await fetchMedia();
        if (selectedFiles.value.includes(choosenMediaSource)) {
            selectedFiles.value.splice(selectedFiles.value.indexOf(choosenMediaSource), 1);
            choosenMediaSource.value = "";
        }
        mediaData.value = result.value || [];
    } catch (error) {
        console.log(error)
    }
};

onMounted(async () => {
    try {
        await fetchMedia();
        mediaData.value = result.value || [];
    } catch (error) {
        console.error('Błąd pobierania danych z GraphQL', error);
    }
});


</script>

<style scoped>
.sub-btn {
    padding: 5px;
    border: solid 0.3px lightgray;
    display: inline-flex;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

.sub-btn:hover {
    filter: brightness(0.8);
}

.library-card {
    z-index: 99991;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.highlighted {
    border: 3px solid var(--color-primary);
    box-sizing: border-box;
}

.library-cat {
    border-radius: 10px 10px 0 0;
    cursor: pointer;
}

.library-cat-active {
    border-bottom: none;
    cursor: pointer;
}

.lightbox {
    background-color: lightgray;
    opacity: 0.4;
    z-index: 9999;
}

.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 700,
        'GRAD' 200,
        'opsz' 24
}
</style>