<template>
  <div>
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
      height="80vh"
      infinite
    >
      <template v-if="carouselFiles">
        <q-carousel-slide
          v-for="file of carouselFiles"
          :name="file.name"
          :img-src="file.src"
        ></q-carousel-slide>
      </template>
      <template v-else>
        <q-carousel-slide
          name="business-stay"
          img-src="assets/business-stay-1.png"
        ></q-carousel-slide>
        <q-carousel-slide
          name="exquisite-room"
          img-src="assets/exquisite-room-1.png"
        ></q-carousel-slide>
        <q-carousel-slide
          name="service-apartment"
          img-src="assets/service-apartment-1.png"
        ></q-carousel-slide>
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

defineProps<{
  carouselFiles?: { name: string; src: string }[];
}>();

// withDefaults(defineProps<PageCarouselProps>(), {
//   name: '',
//   carouselFiles: [],
// });

defineComponent({
  name: 'PageCarousel',
});
</script>
