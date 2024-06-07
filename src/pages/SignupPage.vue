<template>
  <q-page class="flex row signup-page-font-size" style="max-width: 100vw">
    <!-- left-side -->
    <div class="q-pa-xl" style="width: 55%; overflow-y: scroll">
      <div
        class="text-h2 text-bolder q-mb-md"
        style="font-size: 5rem; letter-spacing: 1px; font-weight: 900"
      >
        Sign up
      </div>
      <q-tab-panels
        v-model="currentPanel"
        style="width: 100%; height: 100%"
        animated
      >
        <q-tab-panel :name="SignupPanels.SIGNUP_FORM" style="width: 100%">
          <div style="width: 100%">
            <q-form style="width: 100%" ref="signupFormRef">
              <div class="flex column q-gutter-lg" style="width: 100%">
                <div
                  style="height: 50vh; width: 80%"
                  class="flex row q-gutter-lg q-ml-md items-end justify-center"
                >
                  <!-- left-side -->
                  <div class="flex column q-gutter-lg" style="width: 46%">
                    <div class="flex column">
                      <span class="q-ml-lg">First Name</span>
                      <q-input
                        color="secondary"
                        outlined
                        rounded
                        v-model="signupModel.firstName"
                        :rules="[
                          () => $validateField(signupModel, 'firstName'),
                        ]"
                      />
                    </div>
                    <div class="flex column">
                      <span class="q-ml-lg">Email</span>
                      <q-input
                        color="secondary"
                        outlined
                        rounded
                        v-model="signupModel.email"
                        :rules="[() => $validateField(signupModel, 'email')]"
                      />
                    </div>
                    <div class="flex column">
                      <span class="q-ml-lg">Password</span>
                      <q-input
                        outlined
                        rounded
                        type="password"
                        v-model="signupModel.password"
                        :rules="[() => $validateField(signupModel, 'password')]"
                      />
                    </div>
                  </div>
                  <!-- right-side -->
                  <div class="flex column q-gutter-lg" style="width: 46%">
                    <div class="flex column">
                      <span class="q-ml-lg">Last Name</span>
                      <q-input
                        color="secondary"
                        outlined
                        rounded
                        v-model="signupModel.lastName"
                        :rules="[() => $validateField(signupModel, 'lastName')]"
                      />
                    </div>
                    <div class="flex column">
                      <span class="q-ml-lg">Phone Number</span>
                      <div class="flex row">
                        <q-select
                          outlined
                          rounded
                          :style="{
                            width: '20%',
                          }"
                          v-model="signupModel.phoneCodeId"
                          :options="phoneCodeIdOptions"
                          class="text-bolder"
                          bg-color="secondary"
                          :rules="[
                            () => $validateField(signupModel, 'phoneCodeId'),
                          ]"
                          emit-value
                          map-options
                        />
                        <q-input
                          :style="{
                            width: '80%',
                          }"
                          color="secondary"
                          v-model="signupModel.phone"
                          outlined
                          rounded
                          :rules="[() => $validateField(signupModel, 'phone')]"
                        />
                      </div>
                    </div>
                    <div class="flex column">
                      <span class="q-ml-lg">Confirm Password</span>
                      <q-input
                        type="password"
                        outlined
                        rounded
                        v-model="confirmPassword"
                        color="secondary"
                        :rules="[validateConfirmPassword]"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="flex row flex-center"
                  style="width: 75%; color: #fff"
                >
                  <q-btn
                    class="bg-primary q-py-sm q-px-sm"
                    label="Register"
                    style="width: 60%; font-size: 1.2rem"
                    rounded
                    no-caps
                    @click="register"
                    :disable="requestingServer"
                  />
                </div>
              </div>
            </q-form>
          </div>
        </q-tab-panel>
        <q-tab-panel :name="SignupPanels.CONFIRMATION">
          <div>
            <q-form>
              <div class="flex column justify-end">
                <div class="q-pa-xl q-mt-xl q-mx-*" style="margin-top: 20vh">
                  <p class="text-h5">Complete your verification:</p>
                  <div class="flex column" style="margin-left: 5vw">
                    <span class="q-ml-lg q-mt-xl"
                      >Type the code sent to your email in here</span
                    >
                    <div class="q-mt-sm">
                      <div class="flex row">
                        <q-input
                          style="width: 80%"
                          rounded
                          outlined
                          v-model="tokenCoirmationModel.code"
                          color="secondary"
                        />

                        <q-btn
                          class="q-px-lg q-ml-md bg-secondary text-white"
                          icon="trending_flat"
                          rounded
                          @click="submitToken"
                        >
                          <q-tooltip
                            class="bg-accent text-bold shadow-4"
                            title="Verify"
                            >Verify
                          </q-tooltip>
                        </q-btn>
                      </div>
                      <div class="text-center" style="width: 80%">
                        <span>Didn't Receive code? </span
                        ><span
                          class="text-secondary q-ml-md"
                          style="cursor: pointer"
                          >Resend Verification Code</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </q-form>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <!-- right-side -->
    <div class="signup-right-side" style="width: 45%">
      <q-img
        style="height: 100vh"
        src="/assets/hotel_reception.png"
        fit="fill"
      />
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
import { SignupModel } from 'src/models/signup.model';
import { SignupViewModel } from 'src/view-models/signup.view-model';
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

enum SignupPanels {
  SIGNUP_FORM = 'signup-form',
  CONFIRMATION = 'confirmation',
}

// refs
const confirmPassword = ref('');
const confirmPasswordIsValid = ref(false);
const currentPanel = ref(SignupPanels.SIGNUP_FORM);
const requestingServer = ref(false);
const signupFormRef = ref<QForm>();
const phoneCodeIds = ref<{ name: string; id: string }[]>([
  { name: '234', id: '151' },
]);
const tokenConfirmationFormRef = ref<QForm>();

// models and view-models
const signupViewModel = new SignupViewModel(new SignupModel());
const tokenConfirmationViewModel = new TokenConfirmationViewModel(
  new SignupConfirmationModel()
);

const signupModel = reactive(signupViewModel.model);
const tokenCoirmationModel = reactive(tokenConfirmationViewModel.model);

// computed
asyncComputed(async () => {
  await signupModel.validate();
});

asyncComputed(async () => {
  await tokenCoirmationModel.validate();
});

const phoneCodeIdOptions = computed(() => {
  return phoneCodeIds.value.map((code) => ({
    label: code.name,
    value: code.id,
  }));
});

// methods
async function submitToken() {
  //
  // useRequestionProcessingChecker(requestingServer);
  tokenConfirmationViewModel.submitToken(signupModel.email, {
    async onSuccess() {
      // clearUIEffects({ loader: $q.loading, timer: postSignupTimer });
      await router.push('/services');
    },
    async onError(error) {
      // clearUIEffects({ loader: $q.loading, timer: postSignupTimer });
      useNotify({
        type: 'negative',
        ...(error ? { message: error } : {}),
      });
    },
  });
}

async function register() {
  useRequestionProcessingChecker(requestingServer);

  if (!isfullModelValid()) {
    await signupFormRef.value?.validate();
    return;
  }

  useRequestionProcessingNotification(
    requestingServer,
    $q.loading,
    'Please, wait.'
  );

  await signupViewModel.signup({
    async onSuccess() {
      // switch to next panel
      currentPanel.value = SignupPanels.CONFIRMATION;
      clearUIEffects({
        loader: $q.loading,
        timer: postSignupTimer,
        requestProcessingRef: requestingServer,
      });
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

function validateConfirmPassword(value: string) {
  confirmPasswordIsValid.value = !!value && value === signupModel.password;
  return confirmPasswordIsValid.value || 'Value must match Password value.';
}

function isfullModelValid() {
  return isModelValid(signupModel) && confirmPasswordIsValid.value;
}
</script>

<style lang="scss" scoped>
.signup-right-side {
  position: relative;
}
.logo-img {
  position: absolute;
  top: -7%;
  right: 1%;
  width: 65%;
}

.signup-page-font-size {
  font-size: 1.2rem;
}

.input-focus:focus-within {
  outline: none;
  border-color: solid var(--q-primary);
}
</style>
../models/signup.model src/composables/useNotify.composable
