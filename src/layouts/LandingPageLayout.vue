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
            src="/assets/starlings_logo.png"
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
            v-show="false"
          />
          <q-btn
            color="primary"
            label="Features"
            :size="$q.screen.lt.lg ? '0.5rem' : ''"
            rounded
            outline
            no-caps
            v-show="false"
          />
          <q-btn
            color="primary"
            label="About"
            :size="$q.screen.lt.lg ? '0.5rem' : ''"
            rounded
            outline
            no-caps
            v-show="false"
          />
        </div>
        <div class="text-primary q-mr-xl">
          <q-btn
            class="q-px-lg q-mx-sm cursor-pointer"
            label="Get Started"
            :size="$q.screen.lt.lg ? '0.6rem' : '0.8rem'"
            rounded
            outline
            no-caps
            @click="handleGetStarted"
          />
          <q-btn
            class="q-px-lg cursor-pointer"
            label="Sign In"
            :size="$q.screen.lt.lg ? '0.6rem' : '0.8rem'"
            rounded
            outline
            no-caps
            @click="handleSignin"
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
      <loading-spinner v-if="isLoading" :loading="isLoading" />
      <router-view v-else />
      <auth-dialog v-if="dialogOpen" :open="dialogOpen" :purpose="dialogPurpose" @close="closeDialog" />
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
import AuthDialog from 'src/components/AuthDialog.vue';

// consts
const router = useRouter();

// refs
const isLoading = ref(false);
const menuIsActive = ref(false);
const dialogOpen = ref(false);
const dialogPurpose = ref<'signup' | 'signin'>('signup');

// methods
function closeDialog() {
  dialogOpen.value = false;
}
function handleGetStarted(){
  // router.push('/signup');
  dialogOpen.value = true;
  dialogPurpose.value = 'signup';

};

function handleSignin() {
  //
  dialogOpen.value = true;
  dialogPurpose.value = 'signin';
}

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
