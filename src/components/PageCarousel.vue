<template>
  <div class="page-carousel">
    <q-carousel
      v-model="carousel"
      swipeable
      animated
      :control-type="controlType"
      control-color="purple"
      navigation
      :autoplay="autoplay"
      transition-prev="slide-right"
      transition-next="slide-left"
      transition-duration="200"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      padding
      arrows
      :height="height"
      infinite
    >
      <template v-if="carouselFiles">
        <q-carousel-slide
          v-for="(file, index) in carouselFiles"
          :key="index"
          :name="file.name"
          :img-src="file.src"
        ></q-carousel-slide>
      </template>
      <template v-else>
        <q-carousel-slide
          name="business-stay"
          img-src="assets/perfect-business-stay-1.png"
        >
          <div
            class="headline-text perfect-business-stay flex column items-end q-mt-xl q-mr-lg"
          >
            <span class="q-mt-lg">Find Your Perfect</span>
            <span>Business Stay</span>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="exquisite-room"
          img-src="assets/exquisite-room-1.png"
        >
          <div
            class="headline-text exquisite-room flex column justify-end q-mt-xl items-center text-bolder"
          >
            <span class="q-mt-lg">Exquisite Hotel Rooms</span>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="service-apartment"
          img-src="assets/service-apartment-1.png"
        >
          <div
            class="headline-text service-apartment flex column items-start q-mt-md q-ml-xl"
          >
            <span class="q-mt-lg">Comfortable</span>
            <span>Service</span>
            <span>Apartments</span>
          </div>
        </q-carousel-slide>
      </template>
    </q-carousel>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { QCarouselControlEnum } from '../lib/enums/q-carousel-control-enum.enum';

const controlType = ref(QCarouselControlEnum.OUTLINE);
const carousel = ref('page-carousel');
const autoplay = ref(true);

export type PageCarouselProps = {
  name: string;
  carouselFiles?: { name: string; src: string }[];
};

// defineProps<{
//   carouselFiles?: { name: string; src: string }[];
//   height?: string;
// }>();

withDefaults(
  defineProps<{
    carouselFiles?: { name: string; src: string }[];
    height?: string;
  }>(),
  {
    height: '80vh',
  }
);

defineComponent({
  name: 'PageCarousel',
});
</script>
<style lang="scss" scoped>
.page-carousel {
  & .headline-text {
    font-size: 4.2rem;
  }
  & .perfect-business-stay {
    color: #9fd2d3;
  }

  .exquisite-room {
    color: #052409;
    height: 100%;
  }

  .service-apartment {
    color: #603f;
    margin-left: 12rem;
  }
}
</style>
