<template>
  <div class="wrapper relative text-center">
    <div class="relative text-center">
      <h1 class="absolute">
        {{ title }}
      </h1>
      <h3 class="absolute" style="padding-top: 3rem">{{ title }}</h3>
    </div>
    <div
      class="absolute"
      style="margin-top: 11rem; font-size: 1.5rem; padding: 0 5rem"
    >
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { computed } from 'vue';
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

defineComponent({
  name: 'SectionTitle',
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
  height: 18rem;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>
