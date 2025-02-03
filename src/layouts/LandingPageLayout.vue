<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      class="bg-gradient"
      style="
        height: auto;
        background: linear-gradient(to right, white, transparent, white);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(7px);
        padding: 0.25rem 1rem;
      "
    >
      <q-toolbar class="flex row justify-between">
        <q-toolbar-title
          class="q-mt-sm cursor-pointer"
          style="max-width: max-content"
        >
          <q-img
            :width="$q.screen.lt.lg ? '8rem' : '10rem'"
            fit="cover"
            src="/assets/starlings_logo.png"
          />
        </q-toolbar-title>
        <!-- nav >= md -->
        <!-- <div
          v-show="$q.screen.gt.md"
          class="flex row justify-right"
          style="width: 40%"
        ></div> -->
        <div class="text-primary q-mr-xl">
          <q-btn
            color="black"
            label="Home"
            :size="$q.screen.lt.lg ? '0.5rem' : ''"
            flat
            no-caps
            v-show="true"
          />
          <q-btn
            color="black"
            label="Features"
            :size="$q.screen.lt.lg ? '0.5rem' : ''"
            flat
            no-caps
            v-show="true"
          />
          <q-btn
            color="black"
            label="About"
            :size="$q.screen.lt.lg ? '0.5rem' : ''"
            flat
            no-caps
            v-show="true"
          />
          <q-btn
            color="black"
            class="q-px-lg q-mx-sm cursor-pointer"
            label="Get Started"
            :size="$q.screen.lt.lg ? '0.6rem' : '0.8rem'"
            flat
            no-caps
            @click="handleGetStarted"
          />
          <q-btn
            color="black"
            class="q-px-lg cursor-pointer"
            label="Sign In"
            :size="$q.screen.lt.lg ? '0.6rem' : '0.8rem'"
            no-caps
            @click="$router.push('/signin')"
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
    <q-page-container class="alegreya" style="max-height: 100vh; padding: 0">
      <loading-spinner v-if="isLoading" :loading="isLoading" />
      <router-view v-else />
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
              <span>&copy;2024</span> | <span>Starlings Properties</span>
              <span> | </span>
              <span>Powered by: boundlessedge</span>
            </div>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import LoadingSpinner from 'src/components/LoadingSpinner.vue';

// consts
const router = useRouter();

// refs
const isLoading = ref(false);
const menuIsActive = ref(false);

// methods
const handleGetStarted = () => {
  // isLoading.value = true;
  router.push('/signup');
  // .then(() => {
  //   isLoading.value = false;
  // });
};

function toggleMenu() {
  menuIsActive.value = !menuIsActive.value;
}

const startLoading = () => {
  isLoading.value = true;
};

const stopLoading = () => {
  isLoading.value = false;
};

onMounted(() => {
  router.beforeEach((to, from, next) => {
    startLoading();
    next();
  });

  router.afterEach(() => {
    setTimeout(stopLoading, 500); // Add a small delay for better visual effect
  });
});
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
