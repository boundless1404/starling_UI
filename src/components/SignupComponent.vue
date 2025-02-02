<template>
  <div :class="[$q.screen.lt.lg ? 'relative-position overflow-scroll' : 'row']">
    <!-- Left side -->
    <div class="col-5 q-px-md signup-img">
      <q-img src="assets/signup_img.png" />
      <!-- Higher screen -->
      <div class="img-screen higher-screen">
        <div :class="['transparent-box', $q.screen.lt.lg ? 'strg-hidden': '']"></div>
        <q-img :class="[$q.screen.lt.lg ? 'strg-hidden': '']" src="assets/starlings_logo.png" />
      </div>
      <!-- Lower screen -->
      <div :class="['img-screen lower-screen', $q.screen.lt.lg ? 'strg-hidden': '']">
        <q-img src="assets/starlings_logo.png" />
      </div>
    </div>

    <!-- Right side -->
    <q-tab-panels v-model="currentPanel" :class="[$q.screen.lt.lg ? 'col-12 auth-panel-smaller-screen' : 'col-6' ] " :style="{
      backgroundColor: 'transparent',
    }" animated>

      <q-tab-panel :name="SignupPanels.SIGNUP_FORM" style="width: 100%" class="form-panel">
        <div>
          <h3>Sign up</h3>
          <q-form class="q-pl-" ref="signupFormRef">
            <div class="row q-col-gutter-sm">
              <div :class="[$q.screen.gt.md ? 'col-6' : 'col-12', 'q-mb-md']">
                <q-input outlined v-model="signupModel.firstName" label="First Name" class=""
                  :rules="[() => $validateField(signupModel, 'firstName')]" />
              </div>
              <div :class="[$q.screen.gt.md ? 'col-6' : 'col-12', 'q-mb-md']">
                <q-input ref="lastNameRef" outlined v-model="signupModel.lastName" label="Last Name" class=""
                  :rules="[() => $validateField(signupModel, 'lastName')]" />
              </div>
              <div :class="[$q.screen.gt.md ? 'col-6' : 'col-12', 'q-mb-md']">
                <q-input outlined v-model="signupModel.email" label="Email" class=""
                  :rules="[() => $validateField(signupModel, 'email')]" />
              </div>
              <div :class="[$q.screen.gt.md ? 'col-6' : 'col-12', 'q-mb-md']">
                <div class="row">
                  <select-with-image-icon-component class="col-5" :phone-codes="phoneCodes"
                    :selected-phon-code-id="signupModel.phoneCodeId || ''"
                    @update:selected-phon-code-id="updateSelectedPhoneCodeId" borderless ref="searchInputRef"
                    @clicked:searchInput="searchInputRef.value?.focus()" />
                  <q-input class="col-7" outlined v-model="signupModel.phone" label="Phone Number"
                    :rules="[() => $validateField(signupModel, 'phone')]" />
                </div>
              </div>
              <div :class="[$q.screen.gt.md ? 'col-6' : 'col-12', 'q-mb-md']">
                <q-input outlined v-model="signupModel.password" :type="showPassword ? 'text' : 'password'"
                  label="Password" class="" :rules="[() => $validateField(signupModel, 'password')]">
                  <template v-slot:append>
                    <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                      @click="togglePasswordVisibility" />
                  </template>
                </q-input>
              </div>
              <div :class="[$q.screen.gt.md ? 'col-6' : 'col-12', 'q-mb-md']">
                <q-input outlined v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                  label="Confirm Password" class="" :rules="[() => getConfirmPasswordError(confirmPassword)]">
                  <template v-slot:append>
                    <q-icon :name="showConfirmPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                      @click="toggleConfirmPasswordVisibility" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 q-mt-md">
                <q-btn class="q-py-sm full-width bg-primary-red btn-border-radius" label="Register" no-caps
                  color="primary" @click="register" />
                <span class="q-ml-md q-mt-md">Have an exiting account? <q-btn class="text-primary" label="Sign in" flat
                    dense no-caps @click="toggleAuthComponent" /></span>
              </div>
            </div>
          </q-form>
        </div>
      </q-tab-panel>
      <q-tab-panel :name="SignupPanels.CONFIRMATION">
        <h3>Sign up</h3>
        <div>
          <q-form ref="tokenConfirmationFormRef">
            <div class="flex column justify-end">
              <div class="q-pa-xl q-mt-xl q-mx-*" style="margin-top: 20vh">
                <p class="text-h5">Complete your verification:</p>
                <div class="flex column" style="margin-left: 5vw">
                  <span class="q-ml-xs q-mt-xl text-subtitle1">Type the code sent to your email in here</span>
                  <div class="q-mt-sm">
                    <div class="flex row">
                      <q-input style="width: 58%" input-style="letter-spacing: 0.75vw; text-align: center" rounded outlined
                        v-model="tokenCoirmationModel.code" color="secondary" maxlength="6" />

                      <q-btn class="q-px-md q-ml-md bg-primary-red text-white" icon="trending_flat" rounded
                        @click="submitToken">
                        <q-tooltip class="bg-accent text-bold shadow-4" title="Verify">Verify
                        </q-tooltip>
                      </q-btn>
                    </div>
                    <div class="text-center text-caption q-mt-sm" style="width: 80%">
                      <span>Didn't Receive code? </span><span class="text-primary" style="cursor: pointer"
                        @click="resendToken">Resend Verification Code</span>
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
</template>

<style scoped lang="scss">
.overflow-scroll {
  overflow: scroll;
}
.auth-panel-smaller-screen {
  position: absolute;
  top: 5vh;
  bottom: 0;
}
.strg-hidden {
  display: none;
}
.signup-img {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  // height: 100%;
}

.signup-img .img-screen {
  background:
    linear-gradient(to right,
      rgba(255, 255, 255, 0.5) 70%,
      rgba(255, 255, 255, 0.9) 95%),
    radial-gradient(circle at center,
      rgba(123, 122, 122, 0.305) 50%,
      rgba(43, 43, 43, 0.125) 80%,
      rgba(92, 92, 92, 0.039) 100%);
  position: absolute;
  height: 88%;
  width: 85%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(8px);
  box-shadow: 10px 0 30px rgba(255, 255, 255, 0.3),
    -10px 0 20px rgba(82, 82, 82, 0.1);
}

.signup-img .img-screen q-img {
  max-width: 70%;
  max-height: 100%;
  object-fit:fill;
}

.signup-img .higher-screen {
  top: 50px;
  left: 60px;
  padding: 0 1.8vw 0 0;
}

/* Transparent screen box around the higher logo */
.signup-img .higher-screen .transparent-box {
  position: absolute;
  top: 280px;
  /* Adjust spaces above */
  left: 2px;
  /* Adjust spaces to the left */
  right: -20px;
  /* Adjust spaces to the right */
  bottom: 240px;
  /* Adjust spaces below */
  background: rgba(254, 254, 254, 0.051);
  /* Almost transparent white */
  border-radius: 12px;
  /* Rounded corners */
  border: 1px solid rgba(184, 184, 184, 0.035);
  /* Subtle border */
  box-shadow: 0 2px 2px rgba(165, 165, 165, 0.134);
  /* Subtle shadow for depth */
  backdrop-filter: blur(2px);
  /* Glass effect */
  pointer-events: none;
  /* Prevent interfering with clicks */
}

.signup-img .lower-screen {
  top: 80px;
  /* Slightly higher than before */
  left: 62px;
  /* Slightly shifted horizontally */
  opacity: 0.1;
  /* Make it very faint */
  transform: scale(1.15);
  /* Slightly more stretched */
  filter: blur(2px);
  /* Add blur effect */
  padding: 0 1.8vw 0 0;
}

.btn-border-radius {
  border-radius: var(--q-btn-border-radius) !important;
  /* Make the border rounded */
}
</style>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
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
import SelectWithImageIconComponent from './SelectWithImageIconComponent.vue';
import { PhoneCode } from 'src/lib/types';


// consts
const emits = defineEmits(['toggle-auth-component']);
const $q = useQuasar();
const router = useRouter();
let postSignupTimer: NodeJS.Timeout;
const screen = $q.screen;

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
const phoneCodes = ref<PhoneCode[]>([]);
// refs for password visibility
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const lastNameRef = ref<HTMLInputElement | null>();
const searchInputRef = ref();

// models and view-models
const signupViewModel = new SignupViewModel(new SignupModel());
const tokenConfirmationViewModel = new TokenConfirmationViewModel(
  new SignupConfirmationModel()
);

const signupModel = reactive(signupViewModel.model);
const tokenCoirmationModel = reactive(tokenConfirmationViewModel.model);

// computed
asyncComputed(async () => {
  await signupModel.validate?.();
});

asyncComputed(async () => {
  await tokenCoirmationModel.validate?.();
  console.log('signup model changed');
});


// methods
async function updateSelectedPhoneCodeId(value: string) {
  signupModel.phoneCodeId = value;
}

async function toggleAuthComponent() {
  emits('toggle-auth-component');
}

async function submitToken() {
  //
  // useRequestionProcessingChecker(requestingServer);
  const tokenIsValid = tokenCoirmationModel.code.length === 6;
  if (!tokenIsValid) {
    useNotify({
      type: 'negative',
      message: 'Please, input the verification code sent to your email..'
    })

    return;
  }
  tokenConfirmationViewModel.submitToken(signupModel.email, {
    async onSuccess() {
      // clearUIEffects({ loader: $q.loading, timer: postSignupTimer });
      await router.replace('/services');
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
    await signupFormRef.value?.validate(true);
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

      currentPanel.value = SignupPanels.CONFIRMATION;
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

function getConfirmPasswordError(value: string) {
  if (!value) {
    return 'Please confirm your password';
  }

  if (value !== signupModel.password) {
    return 'Passwords do not match';
  }

  confirmPasswordIsValid.value = true;
  return true;
}

function isfullModelValid() {
  return isModelValid(signupModel) && confirmPasswordIsValid.value;
}

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

function toggleConfirmPasswordVisibility() {
  showConfirmPassword.value = !showConfirmPassword.value;
}

// watchers
watchEffect(() => {
  confirmPasswordIsValid.value = !!confirmPassword.value && confirmPassword.value === signupModel.password;
})

onMounted(async () => {
  console.log('Component mounted', lastNameRef.value, searchInputRef.value);
  await signupViewModel.getPhoneCodes({
    onSuccess: (data) => {
      phoneCodes.value = data as unknown as PhoneCode[];
    },
    onError: (error) => {
      useNotify({
        type: 'negative',
        ...(error ? { message: error } : {}),
      });
    }
  });
})
</script>
