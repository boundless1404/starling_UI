<template>
  <router-view />
</template>

<script setup lang="ts">
import { useMeta, useQuasar } from 'quasar';
import { watch } from 'vue';
const $q = useQuasar();

$q.screen.setSizes({ sm: 300, md: 500, lg: 1000, xl: 2000 });

useMeta({
  title: 'Starlings Hospitality',
});

watch(
  () => [
    $q.screen.lg,
    $q.screen.md,
    $q.screen.sm,
    $q.screen.xs,
    $q.screen.width,
  ],
  (newVal) => {
    console.log(newVal);
  }
);
</script>
