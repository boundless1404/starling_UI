<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      class="bg-white"
      bordered
      style="border-bottom-style: solid; border-bottom-width: 0.2rem"
    >
      <q-toolbar class="flex row justify-between">
        <q-toolbar-title
          class="q-mt-sm cursor-pointer"
          style="max-width: max-content"
        >
          <q-img
            :height="$q.screen.lt.lg ? '6rem' : '8rem'"
            :width="$q.screen.lt.lg ? '8rem' : '10rem'"
            fit="cover"
            src="/assets/starglings_logo_bird_text 2_xpoint5.png"
          />
        </q-toolbar-title>
        <!-- nav >= md -->
        <div
          v-show="$q.screen.gt.sm"
          class="flex row justify-around float-left"
          style="width: 40%"
        >
          <q-btn
            color="primary"
            label="Home"
            :size="$q.screen.lt.lg ? '0.5rem' : ''"
            rounded
            outline
            no-caps
          />
          <q-btn
            color="primary"
            label="Features"
            :size="$q.screen.lt.lg ? '0.5rem' : ''"
            rounded
            outline
            no-caps
          />
          <q-btn
            color="primary"
            label="About"
            :size="$q.screen.lt.lg ? '0.5rem' : ''"
            rounded
            outline
            no-caps
          />
        </div>
        <div class="text-primary q-mr-xl">
          <q-btn
            class="q-px-lg"
            label="Get Started"
            :size="$q.screen.lt.lg ? '0.6rem' : '1.2rem'"
            rounded
            outline
            no-caps
          />
        </div>
        <q-btn color="primary" v-if="$q.screen.lt.md" flat round dense>
          <q-icon :name="menuIsActive ? 'close' : 'menu'" />
          <q-menu @show="toggleMenu" @hide="toggleMenu">
            <q-list :style="{ width: $q.screen.width }">
              <q-item clickable v-close-popup>
                <q-item-section>Home</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Features</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>About</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container class="alegreya" style="max-height: 100vh">
      <router-view />
      <!-- footer -->
      <div
        class="bg-white"
        style="
          position: relative;
          bottom: 0;
          width: 100%;
          height: 8rem;
          margin-top: 2rem;
          z-index: 0 !important;
        "
      >
        <div>
          <div style="position: relative">
            <q-img src="assets/Rectangle 110.png" />
            <div
              class="text-white text-center"
              style="position: absolute; bottom: 0; z-index: 9999; width: 100%"
            >
              <span>&copy;2024</span> | <span>boundlessedge</span>
            </div>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const menuIsActive = ref(false);

// methods
function toggleMenu() {
  menuIsActive.value = !menuIsActive.value;
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'alegreya';
  src: url('../css/fonts/AlegreyaSans-Bold.ttf');
}

.alegreya {
  font-family: 'alegreya';
}
</style>
