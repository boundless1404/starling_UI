<template>
  <q-page
    :class="[
      `${isGtMd ? 'flex row justify-end' : ''}`,
      'signup-page-font-size',
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
        Sign up
      </div>
      <q-tab-panels
        v-model="currentPanel"
        :style="{
          width: isGtMd ? '100%' : '100vw',
          height: isGtMd ? '100%' : '100vh',
          backgroundColor: 'transparent',
        }"
        animated
      >
        <q-tab-panel
          :name="SignupPanels.SIGNUP_FORM"
          style="width: 100%"
          class="form-panel"
        >
          <div style="width: 100%; height: 60vh">
            <q-form ref="signupFormRef">
              <div
                :class="[
                  'flex column q-pa-md',
                  isGtMd ? '' : isGtSm ? 'grt-sm' : 'lst-sm',
                ]"
                style="
                  background-color: rgba(255, 255, 255, 0.7);
                  font-weight: 600;
                "
              >
                <div
                  :class="[
                    'flex',
                    isGtMd
                      ? 'row items-end justify-around'
                      : isGtSm
                      ? 'row items-end justify-around'
                      : 'column flex-center',
                  ]"
                >
                  <div class="flex column field">
                    <span class="q-ml-lg">First Name</span>
                    <q-input
                      color="secondary"
                      outlined
                      rounded
                      v-model="signupModel.firstName"
                      :rules="[() => $validateField(signupModel, 'firstName')]"
                    />
                  </div>
                  <div class="flex column field">
                    <span class="q-ml-lg">Last Name</span>
                    <q-input
                      color="secondary"
                      outlined
                      rounded
                      v-model="signupModel.lastName"
                      :rules="[() => $validateField(signupModel, 'lastName')]"
                    />
                  </div>
                </div>
                <div
                  :class="[
                    'flex',
                    isGtMd
                      ? 'row items-end justify-around'
                      : isGtSm
                      ? 'row items-end justify-around'
                      : 'column flex-center',
                  ]"
                >
                  <div class="flex column field">
                    <span class="q-ml-lg">Email</span>
                    <q-input
                      color="black"
                      outlined
                      rounded
                      v-model="signupModel.email"
                      :rules="[() => $validateField(signupModel, 'email')]"
                    />
                  </div>
                  <div class="flex column field">
                    <span class="q-ml-lg">Phone Number</span>
                    <div class="flex row q-mr-sm">
                      <q-select
                        outlined
                        rounded
                        :style="{
                          width: isGtMd ? '20%' : '40%',
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
                          width: isGtMd ? '80%' : '60%',
                        }"
                        color="secondary"
                        v-model="signupModel.phone"
                        outlined
                        rounded
                        :rules="[() => $validateField(signupModel, 'phone')]"
                      />
                    </div>
                  </div>
                </div>
                <div
                  :class="[
                    'flex',
                    isGtMd
                      ? 'row items-end justify-around'
                      : isGtSm
                      ? 'row items-end justify-around'
                      : 'column flex-center',
                  ]"
                >
                  <div class="flex column field">
                    <span class="q-ml-lg">Password</span>
                    <q-input
                      outlined
                      rounded
                      type="password"
                      v-model="signupModel.password"
                      :rules="[() => $validateField(signupModel, 'password')]"
                    />
                  </div>
                  <div class="flex column field">
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

                <div
                  :class="[
                    'flex',
                    isGtMd
                      ? 'row items-end justify-around'
                      : isGtSm
                      ? 'row items-end justify-around'
                      : 'column flex-center',
                  ]"
                  style="width: 100%; color: #fff; margin-top: 2rem"
                >
                  <q-btn
                    class="bg-primary q-py-sm q-px-sm q-mx-auto"
                    label="Register"
                    style="font-size: 1rem"
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
                          style="width: 58%"
                          input-style="letter-spacing: 2vw; text-align: center"
                          rounded
                          outlined
                          v-model="tokenCoirmationModel.code"
                          color="secondary"
                          maxlength="6"
                        />

                        <q-btn
                          class="q-px-md q-ml-md bg-secondary text-white"
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
                      <div class="text-center q-mt-sm" style="width: 80%">
                        <span>Didn't Receive code? </span
                        ><span
                          class="text-secondary q-ml-md"
                          style="cursor: pointer"
                          @click="resendToken"
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
    <div
      v-if="isGtMd"
      class="signup-right-side flex row justify-end"
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
import { SignupModel } from 'src/models/signup.model';
import { SignupViewModel } from 'src/view-models/signup.view-model';
import { TokenConfirmationViewModel } from 'src/view-models/tokenConfirmation.view-model';
import useUiProcessHandler, {
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
const isGtSm = computed(() => {
  return screen.gt.sm;
});
const isGtMd = computed(() => {
  return screen.gt.md;
});
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

async function resendToken() {
  //
  await useUiProcessHandler({
    async process() {
      signupViewModel.resendToken({
        async onSuccess() {
          //
        },
      });
    },
    loader: $q.loading,
    loaderMessage: 'Requesting',
    useNotifer: true,
  });
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
  font-size: calc(0.2rem + 0.2vw + 1vh);
}

.input-focus:focus-within {
  outline: none;
  border-color: solid var(--q-primary);
}
</style>
