<template>
  <div class="page-carousel">
    <q-carousel v-model="carousel" swipeable animated :control-type="controlType" control-color="white"
      :autoplay="autoplay" transition-prev="slide-right" transition-next="slide-left" transition-duration="1500"
      @mouseenter="autoplay = true" @mouseleave="autoplay = true" padding :height="height" infinite>
      <template v-if="carouselFiles">
        <q-carousel-slide v-for="(file, index) in carouselFiles" :key="index" :name="file.name"
          :img-src="file.src"></q-carousel-slide>
      </template>
      <template v-else>
        <q-carousel-slide name="suite 1" img-src="assets/carousel-img-1.jpeg">
        </q-carousel-slide>
        <q-carousel-slide name="auto 1" img-src="assets/carousel-img-2.jpeg">
          <div :class="[headlineText, 'flex column grey-tint']">
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tour 1" img-src="assets/carousel-img-3.jpeg">
          <div :class="[headlineText, 'flex column grey-tint']">
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="visa 1" img-src="assets/carousel-img-4.jpeg">
        </q-carousel-slide>
        <q-carousel-slide name="suite 2" img-src="assets/carousel-img-5.jpeg">
          <div :class="[headlineText, 'flex column grey-tint']">
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="auto 2" img-src="assets/carousel-img-6.jpeg">
          <div :class="[headlineText, 'flex column grey-tint']">
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tour 2" img-src="assets/carousel-img-7.jpeg">
          <div :class="[headlineText, 'flex column grey-tint']">
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="visa 2" img-src="assets/carousel-img-8.jpeg">
          <div :class="[headlineText, 'flex column grey-tint']">
          </div>
        </q-carousel-slide>
      </template>
    </q-carousel>
    <div class="slide-title-carousel">
      <q-carousel v-model="carouselTitle" vertical animated :autoplay="autoplay" transition-prev="slide-down"
        transition-next="slide-up" transition-duration="1500" @mouseenter="autoplay = true"
        @mouseleave="autoplay = true" padding :height="'calc(3/7 * 100vh)'" style="background-color: transparent;"
        infinite>
        <q-carousel-slide name="suite 1">
          <!-- <div class=""></div> -->
          <template v-if="$q.screen.lt.md">
            <div :class="[headlineText, 'flex column flex-center']" style="font-size: 3rem">
            <span :class="['text-gradient', ]" >Suite &</span>
            <span :class="['text-gradient']">Apartments</span>
          </div>
          </template>
          <template v-else>
            <div :class="[headlineText, 'flex column flex-center']">
            <span :class="['text-gradient', suiteTextStyle]">Suite &</span>
            <span class="text-gradient">Apartments</span>
          </div>
          </template>
        </q-carousel-slide>
        <q-carousel-slide name="auto 1">
          <div :class="[headlineText, 'flex column flex-center']">
            <span class="text-gradient gap-tight">Autos</span>
            <!-- <span class="text-gradient">Apartment</span> -->
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tour 1">
          <div :class="[headlineText, 'flex column flex-center']">
            <span class="text-gradient gap-tight">Tour</span>
            <!-- <span class="text-gradient">Apartment</span> -->
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="visa 1">
          <div :class="[headlineText, 'flex column flex-center']">
            <span class="text-gradient gap-tight">Visa</span>
            <!-- <span class="text-gradient">Apartment</span> -->
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="suite 2">
          <template v-if="$q.screen.lt.md">
            <div :class="[headlineText, 'flex column flex-center']" style="font-size: 3rem">
            <span :class="['text-gradient', ]" >Suite &</span>
            <span :class="['text-gradient']">Apartments</span>
          </div>
          </template>
          <template v-else>
            <div :class="[headlineText, 'flex column']">
            <span :class="['text-gradient', suiteTextStyle]">Suite &</span>
            <span class="text-gradient">Apartments</span>
          </div>
          </template>
        </q-carousel-slide>
        <q-carousel-slide name="auto 2">
          <div :class="[headlineText, 'flex column flex-center']">
            <span class="text-gradient gap-tight">Autos</span>
            <!-- <span class="text-gradient">Apartment</span> -->
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tour 2">
          <div :class="[headlineText, 'flex column flex-center']">
            <span class="text-gradient gap-tight">Tour</span>
            <!-- <span class="text-gradient">Apartment</span> -->
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="visa 2">
          <div :class="[headlineText, 'flex column flex-center']">
            <span class="text-gradient gap-tight">Visa</span>
            <!-- <span class="text-gradient">Apartment</span> -->
          </div>
        </q-carousel-slide>
      </q-carousel>
      <q-carousel v-model="carouselDescription" vertical animated :autoplay="autoplay" transition-prev="slide-down"
        transition-next="slide-up" transition-duration="1500" @mouseenter="autoplay = true"
        @mouseleave="autoplay = true" padding :height="'calc(2/7 * 100vh)'" style="background-color: transparent;"
        infinite>
        <q-carousel-slide name="suite 1">
          <div :class="[headlineText, 'flex flex-center']">
            <span style="font-size: 1.5rem; width: 80vw; color: white">
              Discover your home away from home with Starlings. We offer
              personalized suites and apartments, designed for comfort and
              luxury. Experience seamless accommodation that caters to your
              unique needs, from short stays to extended escapes. Enjoy curated
              spaces that blend aspirational elegance with home-like
              convenience. Let us redefine your travel experience.
            </span>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="auto 1">
          <div :class="[headlineText, 'flex flex-center']">
            <span style="font-size: 1.5rem; width: 80vw; color: white">
              Discover your home away from home with Starlings. We offer
              personalized suites and apartments, designed for comfort and
              luxury. Experience seamless accommodation that caters to your
              unique needs, from short stays to extended escapes. Enjoy curated
              spaces that blend aspirational elegance with home-like
              convenience. Let us redefine your travel experience.
            </span>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tour 1">
          <div :class="[headlineText, 'flex flex-center']">
            <span style="font-size: 1.5rem; width: 80vw; color: white">
              Discover your home away from home with Starlings. We offer
              personalized suites and apartments, designed for comfort and
              luxury. Experience seamless accommodation that caters to your
              unique needs, from short stays to extended escapes. Enjoy curated
              spaces that blend aspirational elegance with home-like
              convenience. Let us redefine your travel experience.
            </span>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="visa 1">
          <div :class="[headlineText, 'flex flex-center']">
            <span style="font-size: 1.5rem; width: 80vw; color: white">
              Discover your home away from home with Starlings. We offer
              personalized suites and apartments, designed for comfort and
              luxury. Experience seamless accommodation that caters to your
              unique needs, from short stays to extended escapes. Enjoy curated
              spaces that blend aspirational elegance with home-like
              convenience. Let us redefine your travel experience.
            </span>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="suite 2">
          <div :class="[headlineText, 'flex flex-center']">
            <span style="font-size: 1.5rem; width: 80vw; color: white">
              Discover your home away from home with Starlings. We offer
              personalized suites and apartments, designed for comfort and
              luxury. Experience seamless accommodation that caters to your
              unique needs, from short stays to extended escapes. Enjoy curated
              spaces that blend aspirational elegance with home-like
              convenience. Let us redefine your travel experience.
            </span>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="auto 2">
          <div :class="[headlineText, 'flex flex-center']">
            <span style="font-size: 1.5rem; width: 80vw; color: white">
              Discover your home away from home with Starlings. We offer
              personalized suites and apartments, designed for comfort and
              luxury. Experience seamless accommodation that caters to your
              unique needs, from short stays to extended escapes. Enjoy curated
              spaces that blend aspirational elegance with home-like
              convenience. Let us redefine your travel experience.
            </span>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tour 2">
          <div :class="[headlineText, 'flex flex-center']">
            <span style="font-size: 1.5rem; width: 80vw; color: white">
              Discover your home away from home with Starlings. We offer
              personalized suites and apartments, designed for comfort and
              luxury. Experience seamless accommodation that caters to your
              unique needs, from short stays to extended escapes. Enjoy curated
              spaces that blend aspirational elegance with home-like
              convenience. Let us redefine your travel experience.
            </span>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="visa 2">
          <div :class="[headlineText, 'flex flex-center']">
            <span style="font-size: 1.5rem; width: 80vw; color: white">
              Discover your home away from home with Starlings. We offer
              personalized suites and apartments, designed for comfort and
              luxury. Experience seamless accommodation that caters to your
              unique needs, from short stays to extended escapes. Enjoy curated
              spaces that blend aspirational elegance with home-like
              convenience. Let us redefine your travel experience.
            </span>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { QCarouselControlEnum } from '../lib/enums/q-carousel-control-enum.enum';
import { computed } from 'vue';
import { useQuasar } from 'quasar';

const controlType = ref(QCarouselControlEnum.OUTLINE);
const carousel = ref('page-carousel');
const carouselTitle = ref('page-carousel-title');
const carouselDescription = ref('page-carousel-description');
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
    height: 'calc(4/5* 100vh)',
  }
);

// consts
const $q = useQuasar();

// refs
const headlineText = computed(() => {
  console.log('reading screen size: ', $q.screen.width);
  let text = '';
  switch (true) {
    case $q.screen.gt.md:
      text = 'headline-text items-center';
      break;
    case $q.screen.md:
      text = 'headline-text-md items-center';
      break;
    case $q.screen.lt.md:
      text = 'headline-text-sm center';
  }
  return text;
});

const suiteTextStyle = computed(() => {
  switch(true) {
    case $q.screen.gt.md:
      return 'gap-tight';
    case $q.screen.md:
      return 'gap-tight';
    case $q.screen.lt.md:
      return 'gap-tight-sm';
    default:
      return 'gap-tight';
  }
})

defineComponent({
  name: 'PageCarousel',
});
</script>
<style lang="scss" scoped>
@import 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';


.page-carousel {
  position: relative;

  & .slide-title-carousel {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }

  & .headline-text {
    font-size: 9rem;
    padding-top: 1vw;
    z-index: 10;
  }

  & .headline-text-sm {
    padding-top: 10vh;
    font-size: 5rem;
  }

  & .headline-text-md {
    padding-top: 1vw;
    font-size: 7rem;
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
    margin-left: 10vw;
  }

  & .headline-text-sm.service-apartment {
    font-size: 2rem;
  }
}

.text-gradient {
  font-family: 'Poppins', serif;
  font-weight: 800;
  font-style: normal;
  background: -webkit-linear-gradient(#fff,
      #fff,
      #fff,
      transparent,
      transparent);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.grey-tint {
  // width: 100vw;
  // height: 150vh;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(116, 115, 115, 0.3);
}

.gap-tight {
  margin-bottom: calc(-4vw + -6vh);
}

.gap-tight-sm {
  margin-bottom: calc(-24vh);
}
</style>
