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
@import 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';

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

.text-poppins-serif {
  font-family: 'poppins', serif;
}

.sec-text-purple {
  color: var(--q-secondary-purple);
}

.sec-bg-purple {
  background-color: var(--q-secondary-purple);
}
</style>
