<template>
  <div :class="['wrapper q-mt-sm', $q.screen.gt.md ? '' : $q.screen.lt.md ? 'padding-sm' :    'padding-md' ]">
    <div class="row">
      <div v-for="(icon, index) in allIcons"
      :key="index" class="col-lg-4 col-md-6 col-sm-6 col-xs-12 q-pa-md">
        <div
          
          class="cards text-overlay-container"
          flat
        >
          <q-img :src="icon.iconUrl" />
          <div class="text-overlay">{{ 'We serve at a local scale from a global stand point' }}</div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
// import { computed } from 'vue';
import { useQuasar } from 'quasar';

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
const $q = useQuasar();
const allIcons = ref([
  {
    iconUrl: 'icons/thinkglobe.png',
    title: 'Hilton',
    description: 'lorem ipsum blah blah',
  },
  {
    iconUrl: 'icons/starjournal.png',
    title: 'Hilton',
    description: 'lorem ipsum blah blah',
  },
  {
    iconUrl: 'icons/securecheck.png',
    title: 'Hilton',
    description: 'lorem ipsum blah blah',
  },
  {
    iconUrl: 'icons/thinksupport.png',
    title: 'Hilton',
    description: 'lorem ipsum blah blah',
  },
  {
    iconUrl: 'icons/handheart.png',
    title: 'Hilton',
    description: 'lorem ipsum blah blah',
  },
  {
    iconUrl: 'icons/plane.png',
    title: 'Hilton',
    description: 'lorem ipsum blah blah',
  },
]);

defineComponent({
  name: 'WhyChooseUs',
});
</script>

<style lang="scss" scoped>
@import 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
h1 {
  font-family: 'poppins', serif;
  font-weight: bold;
  color: lightgray;
  opacity: 0.2;
}
h3 {
  font-family: 'poppins', serif;
  font-weight: bold;
}
p {
  font-family: 'poppins', serif;
}
.wrapper {
  width: 100%;
  padding: 2rem 10rem;
  &.padding-md {
    padding: 2rem 5rem;
  }

  &.padding-sm {
    padding: 2rem 2rem;
  }
}
.body {
  padding: 1rem;
}
.cards {
  aspect-ratio: 1/1;
  border-radius: 16px;
  border: 1px solid black;
}

.text-overlay-container {
  position: relative;
}

.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  font-size: 1.5rem;
  opacity: 0;
  color: white;
  padding: 1rem;
  transition: opacity 0.3s ease;
  background-image: repeating-linear-gradient(90deg,
     rgba(33, 33, 33, 0.06) 0px,
      rgba(33, 33, 33, 0.06) 2px,
       transparent 2px, transparent 4px),
        linear-gradient(90deg, rgb(33, 33, 33), transparent), 
        linear-gradient(0deg, rgb(33, 33, 33), transparent), 
        linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4));
  border-radius: 16px;
}

.cards:hover .text-overlay {
  opacity: 1;
}
</style>
