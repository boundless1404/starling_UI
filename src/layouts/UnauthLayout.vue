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
            height="8rem"
            width="10rem"
            fit="cover"
            src="/assets/starglings_logo_bird_text 2_xpoint5.png"
          />
        </q-toolbar-title>
        <div class="flex row justify-around float-left" style="width: 20rem">
          <q-btn color="primary q-px-lg" label="Home" rounded outline no-caps />
          <q-btn
            color="primary q-px-lg"
            label="Features"
            rounded
            outline
            no-caps
          />
          <q-btn
            color="primary q-px-lg"
            label="About"
            rounded
            outline
            no-caps
          />
        </div>
        <div class="text-primary q-mr-xl">
          <q-btn
            class="q-px-lg"
            label="Get Started"
            size="1. 2rem"
            rounded
            outline
            no-caps
          />
        </div>
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
          margin-top: 20rem;
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
