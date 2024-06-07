<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="alegreya" style="max-height: 60vh">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@font-face {
  font-family: 'alegreya';
  src: url('../css/fonts/AlegreyaSans-Bold.ttf');
}

.alegreya {
  font-family: 'alegreya';
}
</style>
