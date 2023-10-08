<template>
  <div class="container-fluid p-0" style="height: 100vh; overflow-x: hidden;">
    <Header></Header>

    <div class="carousel w-100 mb-4">
      <swiper :spaceBetween="30" :centeredSlides="true" :slidesPerView="1" :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }" :pagination="{
  clickable: true,
}" :navigation="true" class="h-100">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
      </swiper>
    </div>

    <div class="cl-break"></div>


    <div class="w-100 p-0 leafy-background ">

      <img v-for="i in 45" src="@/assets/static/images/leaf.png"
        class="position-absolute blowing-leaf img-sm d-none d-sm-block" :style="{
          transform: `translateY(${(Math.random() * 50)}%) rotate(${Math.random() * 360}deg) scale(${Math.random() * (0.3 - 0.1) + 0.3})`,
          left: `${(Math.random() * -75)}%`,
          top: `${(Math.random() * 90 - 90)}%`,
          animationDuration: `${Math.random() * (20 - 11.5) + 11.5}s`

        }" />

      <div class=" cl-bg-background-soft p-4 rounded motd col-12 col-sm-11 col-md-8 col-lg-6 mx-auto">
        <p class="h5 m-0 text-center" style="font-family: 'Dancing Script', cursive;">Tutaj pojawiają się wiadomości dnia
        </p>
      </div>
    </div>

    <div class="cl-break"></div>

    <!-- PROMOCJE  -->
    <div class="row w-100 mx-auto px-md-5 px-0 my-3">
      <div class="w-100 border rounded p-0 pb-3 my-3">
        <div class="tag d-flex align-items-center bg-background">
          <img src="@/assets/static/images/discount.png" class="img-md unselectable">
          <h2 class="cl-text-primary fw-bold unselectable">&nbsp;PROMOCJE</h2>
        </div>

        <br />
        <br />

        <swiper :slidesPerView="slidesPerView" :centeredSlides="false" :spaceBetween="30" :navigation="true"
          :key="discountSlideIdx" class="col-11">

          <swiper-slide>
            <div class="rounded unselectable text-truncate product-card cursor-pointer cl-shadow">
              <div>
                <img src='@/assets/static/Products/plant-test.jpg' alt="alt" class="w-100 rounded-top">

                <span class="product-overlay">CHWILOWO NIEDOSTĘPNE</span>
              </div>
              <div class="p-3">
                <div class="d-flex p-0 w-100 justify-content-around mb-2">
                  <span class="price">1999 zł</span>
                  <span class="discount">2999 zł</span>
                </div>
                <div class="text-truncate text-center my-3">
                  <span class="h5">Planticae </span>
                </div>
                <div class="d-flex align-items-center justify-content-around">
                  <vue3starRatings v-bind="test" :rating="3.8" :read-only="true" :increment="0.01" />
                  <span>(100)</span>
                </div>
                <star-rating :rating="3.8" :read-only="true" :increment="0.01"></star-rating>
              </div>
            </div>
          </swiper-slide>


          <swiper-slide v-for="i in 12" :key="i">
            <div class="rounded unselectable product-card cursor-pointer cl-shadow" style="background-color: white;">
              <div>
                <img src='@/assets/static/Products/rose-test.jpg' alt="alt" class="w-100 rounded-top">
                <span class="badge rounded-pill bg-primary product-label">label test</span>
              </div>
              <div class="p-3">
                <div class="d-flex p-0 w-100 justify-content-around mb-2">
                  <span class="price">1999 zł</span>
                  <span class="discount">2999 zł</span>
                </div>
                <div class="text-truncate text-center my-3">
                  <span class="h5">Róża Ziemowitka</span>
                </div>
                <div class="d-flex align-items-center justify-content-around">
                  <vue3starRatings v-bind="test" :rating="3.8" :read-only="true" :increment="0.01" />
                  <span>(100)</span>
                </div>
                <star-rating :rating="3.8" :read-only="true" :increment="0.01"></star-rating>
              </div>
            </div>
          </swiper-slide>

        </swiper>
      </div>
    </div>

    <div class="cl-break"></div>

    <!-- NAJWYŻEJ OCENIANE  -->
    <div class="row w-100 mx-auto px-5 my-3">
      <div class="w-100 border rounded p-2 my-3">
        <div class="tag d-flex align-items-center bg-background">
          <img src="@/assets/static/images/trend.png" class="img-md unselectable align-self-start">
          <h2 class="cl-text-primary fw-bold unselectable">&nbsp;POPULARNE</h2>
        </div>

        <div class="cl-break"></div>

        <swiper :slidesPerView="slidesPerView" :centeredSlides="false" :spaceBetween="30" :navigation="true"
          :key="discountSlideIdx" class="col-11">

          <swiper-slide>
            <div class="rounded unselectable text-truncate product-card cursor-pointer cl-shadow">
              <div>
                <img src='@/assets/static/Products/plant-test.jpg' alt="alt" class="w-100 rounded-top">

                <span class="product-overlay">CHWILOWO NIEDOSTĘPNE</span>
              </div>
              <div class="p-3">
                <div class="d-flex p-0 w-100 justify-content-around mb-2">
                  <span class="price">1999 zł</span>
                  <span class="discount">2999 zł</span>
                </div>
                <div class="text-truncate text-center my-3">
                  <span class="h5">Planticae </span>
                </div>
                <div class="d-flex align-items-center justify-content-around">
                  <vue3starRatings v-bind="test" :rating="3.8" :read-only="true" :increment="0.01" />
                  <span>(100)</span>
                </div>
                <star-rating :rating="3.8" :read-only="true" :increment="0.01"></star-rating>
              </div>
            </div>
          </swiper-slide>


          <swiper-slide v-for="i in 12" :key="i">
            <div class="rounded unselectable product-card cursor-pointer cl-shadow" style="background-color: white;">
              <div>
                <img src='@/assets/static/Products/rose-test.jpg' alt="alt" class="w-100 rounded-top">
                <span class="badge rounded-pill bg-primary product-label">label test</span>
              </div>
              <div class="p-3">
                <div class="d-flex p-0 w-100 justify-content-around mb-2">
                  <span class="price">1999 zł</span>
                  <span class="discount">2999 zł</span>
                </div>
                <div class="text-truncate text-center my-3">
                  <span class="h5">Róża Ziemowitka</span>
                </div>
                <div class="d-flex align-items-center justify-content-around">
                  <vue3starRatings v-bind="test" :rating="3.8" :read-only="true" :increment="0.01" />
                  <span>(100)</span>
                </div>
                <star-rating :rating="3.8" :read-only="true" :increment="0.01"></star-rating>
              </div>
            </div>
          </swiper-slide>

        </swiper>

      </div>

      <div class="cl-break"></div>
      <div class="cl-break"></div>

      <div class="my-5 text-center" style="overflow-x:visible;">
        <p class="text-center col-12 h2 mb-4">Zapraszamy do naszego katalogu!</p>
        <button class="btn btn-success-outline btn-lg mx-auto">PRZEJDŹ DO PRODUKTÓW</button>
      </div>

      <div class="cl-break"></div>
      <div class="cl-break"></div>


    </div>
    <Footer></Footer>

    <!-- WSZYSTKIE  -->



    <!-- <div class="row w-100 mx-auto px-5">

      <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3" v-for="i in 10" style="max-width: 100vw;">
      

        <div class="rounded border unselectable">
          <div>
            <img src='@/assets/static/Products/rose-test.jpg' alt="alt" class="w-100 rounded">
          </div>


          <div class="p-3">
            <div class="d-flex p-0 w-100 justify-content-around mb-2">
              <span class="price">1999 zł</span>
              <span class="discount">2999 zł</span>
            </div>
            <div class="text-truncate text-center my-3">
              <span class="h5">Róża Ziemowitka</span>
            </div>
            <div class="d-flex align-items-center justify-content-around">
              <vue3starRatings v-bind="test" :rating="3.8" :read-only="true" :increment="0.01" />
              <span>(100)</span>
            </div>
            <star-rating :rating="3.8" :read-only="true" :increment="0.01"></star-rating>
          </div>
        </div>

      </div>

    </div> -->

  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
//@ts-ignore
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
SwiperCore.use([Autoplay, Pagination, Navigation]);

const discountSlideIdx = ref("0");
const slidesPerView = ref(7);


const screenWidth = ref(window.innerWidth);
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
  if (screenWidth.value >= 1650) slidesPerView.value = 7;
  else if (screenWidth.value >= 1220) slidesPerView.value = 5;
  else if (screenWidth.value >= 975) slidesPerView.value = 4;
  else if (screenWidth.value >= 755) slidesPerView.value = 3;
  else if (screenWidth.value >= 515) slidesPerView.value = 2;
  else slidesPerView.value = 1;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
  updateScreenWidth();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenWidth);
});



// import vue3starRatings from "vue3-star-ratings";
//@ts-ignore
import vue3starRatings from 'vue-star-rating';

const test = ref({
  activeColor: "#6d9b76",
  starSize: 22,
  inactiveColor: "#c5c5c5",
  rating: 4,
  showRating: false
});

const images = ref([]);




</script>

<style>
.deco-1 {
  position: absolute;
  width: 140vw;
  left: -10%;
  top: -70%;
  rotate: 15deg;
  z-index: -10;
  /* height: 100px; */

}

.carousel {
  height: 40vh;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-button-prev {
  left: 0%;
}

.swiper-button-next {
  right: 0%;
}

.swiper-button-prev,
.swiper-button-next {
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  height: 50%;
  top: 25%;
  /* transform: translateY(25%); */
  width: 40px;
}

.swiper-button-disabled {
  display: none;
}

.swiper-pagination-bullet-active {
  background-color: var(--color-primary);
}

.tag {
  position: absolute;
  top: 0;
  transform: translateY(-50%);
  left: 1%;
}

.motd {
  border: dashed 2px var(--color-primary);
}

.product-label {
  position: absolute;
  top: 4%;
  right: 4%;
}

.product-card {
  min-width: 200px;
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  color: white;
  font-weight: 700;
  height: 100%;
  width: 100%;
  font-size: 0.8vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4b674fb9;
}

.leafy-background {
  position: relative;
  overflow: hidden;
}

.blowing-leaf {
  top: 0;
  left: 0%;
  animation: moveRight 4s linear infinite;
}

@keyframes moveRight {
  100% {
    left: 110%;
  }
}


@keyframes wave {
  0% {
    background-position: 0% center;
  }

  100% {
    background-position: 100% center;
  }
}
</style>