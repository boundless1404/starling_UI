<template>
  <div class="wrapper">
    <div class="body">
      <vue-marquee-slider class="inner-body">
        <q-card
          v-for="(partner, index) in partners"
          :key="index"
          class="cards"
          flat
        >
          <q-img :src="partner.logo" style="margin: 3rem" />
        </q-card>
      </vue-marquee-slider>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueMarqueeSlider from 'vue-marquee-slider';
import { defineComponent, ref } from 'vue';
// import { computed } from 'vue';
// import { useQuasar } from 'quasar';

export type PageCarouselProps = {
  title: string;
  description?: string;
};

withDefaults(
  defineProps<{
    title?: string;
    description?: string;
  }>(),
  {
    title: 'This should be a section title',
  }
);

// consts

// const $q = useQuasar();
const partners = ref([
  {
    logo: 'icons/thinkglobe.png',
  },
  {
    logo: 'icons/starjournal.png',
  },
  {
    logo: 'icons/securecheck.png',
  },
]);

defineComponent({
  name: 'PartnersComponent',
});
</script>

<style lang="scss" scoped></style>
