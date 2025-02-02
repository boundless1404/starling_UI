<template>
  <router-view />
</template>

<script setup lang="ts">
import 'reflect-metadata'
import { useMeta, useQuasar } from 'quasar';
import useAuthStore from './stores/auth-store';
const $q = useQuasar();

// initialize stores
const stores: { initializeStore: () => Promise<void> }[] = [useAuthStore()];

Promise.all(stores.map(async (store) => await store.initializeStore()));

// configure screen break points
$q.screen.setSizes({ sm: 300, md: 500, lg: 1000, xl: 2000 });

useMeta({
  title: 'Starlings Hospitality',
});
</script>
<style lang="scss">
 .bg-sectwo {
  background-color: var(--q-sectwo)
 }

 .text-sectwo {
  color: var(--q-sectwo)
 }

 .bg-primary-red {
  background-color: var(--q-primary-red) !important;
 }

 .text-primary-red {
  color: var(--q-primary-red) !important;
 }

 .overflow-scroll {
  overflow: scroll;
}

.strg-hidden {
  display: none;
}
</style>
