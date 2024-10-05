<template>
  <router-view />
</template>

<script setup lang="ts">
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
