<template>
  <div class="wrapper">
    <div class="body">
      <div class="inner-body">
        <q-card
          v-for="(icon, index) in allIcons"
          :key="index"
          class="cards"
          flat
        >
          <q-img :src="icon.iconUrl" style="margin: 3rem" />
        </q-card>
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
}
.inner-body {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
}
.body {
  padding: 1rem;
}
.cards {
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  border-radius: 15px;
  border: 1px solid black;
}
</style>
