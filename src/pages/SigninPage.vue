<template>
  <q-page
    :class="[
      `${isGtMd ? 'flex row justify-end' : ''}`,
      'signin-page-font-size',
    ]"
    :style-fn="stylefn"
  >
    <!-- left-side -->
    <div
      :style="{
        width: isGtMd ? 'calc(0.8rem + 52vw)' : '100vw',
        overflow: 'hidden',
        backgroundImage: isGtMd ? '' : 'url(/assets/hotel_reception.png)',
      }"
    >
      <div
        class="text-h2 text-bolder q-mb-sm"
        style="
          font-size: calc(2.4vh + 0.6vw);
          letter-spacing: 1px;
          font-weight: 900;
        "
      >
        Sign in
      </div>
      <q-form ref="signinFormRef">
        <div
          :class="[
            'flex column q-pa-md',
            isGtMd ? '' : isGtSm ? 'grt-sm' : 'lst-sm',
          ]"
          style="background-color: rgba(255, 255, 255, 0.7); font-weight: 600"
        >
          <div class="flex column field q-mb-md">
            <span class="q-ml-lg">Email</span>
            <q-input
              color="black"
              outlined
              rounded
              v-model="signinModel.email"
              :rules="[() => $validateField(signinModel, 'email')]"
            />
          </div>
          <div class="flex column field q-mb-md">
            <span class="q-ml-lg">Password</span>
            <q-input
              outlined
              rounded
              type="password"
              v-model="signinModel.password"
              :rules="[() => $validateField(signinModel, 'password')]"
            />
          </div>
          <div
            class="flex column items-center"
            style="width: 100%; color: #fff; margin-top: 2rem"
          >
            <div class="flex column items-center" style="width: 100%">
              <q-btn
                class="bg-primary q-py-sm q-px-md q-mb-sm"
                label="Sign In"
                style="font-size: 1rem; width: 80%"
                rounded
                no-caps
                @click="signin"
                :disable="requestingServer"
              />
            </div>
            <p class="text-secondary">
              Dont have account?
              <span
                class="text-primary text-bolder cursor-pointer"
                @click="$router.push('/signup')"
                >Signup</span
              >.
            </p>
          </div>
        </div>
      </q-form>
    </div>
    <!-- right-side -->
    <div
      v-if="isGtMd"
      class="signin-right-side flex row justify-end"
      style="height: 100vh; width: 100%; width: 45vw; overflow: hidden"
    >
      <q-img src="/assets/hotel_reception.png" fit="fill" />
      <q-img
        class="logo-img"
        src="/assets/starglings_logo_bird_text 2_xpoint75.png"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { SignupConfirmationModel } from '../../src/models/signupConfirmationModel.model';
import { asyncComputed } from '@vueuse/core';
import { QForm, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { SigninModel } from 'src/models/signin.model';
import { SigninViewModel } from 'src/view-models/signin.view-model';
import { TokenConfirmationViewModel } from 'src/view-models/tokenConfirmation.view-model';
import {
  useNotify,
  useRequestionProcessingChecker,
  useRequestionProcessingNotification,
} from 'src/composables/composable';
import { clearUIEffects, isModelValid } from 'src/lib/utils';
import { loadingTimeout } from 'src/lib/projectConstants';

// consts
const $q = useQuasar();
const router = useRouter();
let postSignupTimer: NodeJS.Timeout;
const screen = $q.screen;

enum SignupPanels {
  SIGNUP_FORM = 'signup-form',
  CONFIRMATION = 'confirmation',
}

function stylefn() {
  return {
    height: 'fit-content',
    width: '100vw',
  };
}

// refs
const currentPanel = ref(SignupPanels.SIGNUP_FORM);
const requestingServer = ref(false);
const signinFormRef = ref<QForm>();

// models and view-models
const signinViewModel = new SigninViewModel(new SigninModel());
const tokenConfirmationViewModel = new TokenConfirmationViewModel(
  new SignupConfirmationModel()
);

const signinModel = reactive(signinViewModel.model);
const tokenCoirmationModel = reactive(tokenConfirmationViewModel.model);

// computed
const isGtSm = computed(() => {
  return screen.gt.sm;
});
const isGtMd = computed(() => {
  return screen.gt.md;
});
asyncComputed(async () => {
  await signinModel.validate();
});

asyncComputed(async () => {
  await tokenCoirmationModel.validate();
});

// methods

async function signin() {
  useRequestionProcessingChecker(requestingServer);
  if (!isfullModelValid()) {
    await signinFormRef.value?.validate(true);
    return;
  }

  useRequestionProcessingNotification(
    requestingServer,
    $q.loading,
    'Please, wait.'
  );

  await signinViewModel.signin({
    async onSuccess() {
      // switch to next panel
      currentPanel.value = SignupPanels.CONFIRMATION;
      clearUIEffects({
        loader: $q.loading,
        timer: postSignupTimer,
        requestProcessingRef: requestingServer,
      });

      await router.push({ name: 'services' });
    },
    async onError(error) {
      useNotify({
        type: 'negative',
        ...(error ? { message: error } : {}),
      });
      clearUIEffects({
        loader: $q.loading,
        timer: postSignupTimer,
        requestProcessingRef: requestingServer,
      });
    },
  });

  postSignupTimer = setTimeout(() => {
    $q.loading.hide();
  }, loadingTimeout);

  // currentPanel.value = SignupPanels.CONFIRMATION;
}

function isfullModelValid() {
  return isModelValid(signinModel);
}
</script>

<style lang="scss" scoped>
.form-panel {
  & .field {
    width: 40%;
  }

  & .grt-sm .field {
    width: 40%;
  }

  & .lst-sm .field {
    width: 80%;
  }

  & button {
    width: 60%;
  }

  & .grt-sm button,
  & .grt-sm button {
    width: 80%;
  }
}
.signin-right-side {
  position: relative;
}
.logo-img {
  position: absolute;
  top: -7%;
  right: 1%;
  width: 65%;
}

.signin-page-font-size {
  font-size: calc(0.2rem + 0.2vw + 1vh);
}

.input-focus:focus-within {
  outline: none;
  border-color: solid var(--q-primary);
}
</style>
