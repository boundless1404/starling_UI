<template>
  <div :class="['wrapper relative text-center text-poppins-serif', $q.screen.gt.md ? '' : $q.screen.lt.md ? 'height-sm' : 'height-md']">
    <div class="relative text-center q-pt-md">
      <div :class="['absolute background-text', $q.screen.gt.md ? 'text-h1 text-weight-bolder' : $q.screen.lt.md ? 'text-h4 text-weight-bold' : 'text-h2 text-weight-bold']">
        {{ title }}
      </div>
      <div :class="['absolute ', $q.screen.gt.md ? 'text-h3 text-weight-bolder q-pt-lg' : $q.screen.lt.md ? 'text-h5 text-weight-bold q-pt-sm' : 'text-h4 text-weight-bold q-pt-md']" >{{ title }}</div>
    </div>
    <div
      :class="['absolute choose-us-description', $q.screen.lt.lg ? $q.screen.lt.md ? 'des-sm' : 'des-md' : '']"
    >
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
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
.background-text {
  color: lightgray;
  opacity: 0.2;
}

.wrapper {
  width: 100%;
  height: 20vh;
  &.height-sm {
    height: 11vh
  }

  &.height-md {
    height: 14vh
  }
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

.choose-us-description {
  margin-top: 7rem; font-size: 1.5rem; padding: 0 3rem;
  &.des-md {
    margin-top: 4rem; font-size: 1.2rem; padding: 0 1rem
  }

  &.des-sm {
    margin-top: 3rem; font-size: 0.8rem; padding: 0 .3rem
  }

}

</style>
