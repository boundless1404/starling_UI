<template>
    <div :class="[$q.screen.lt.lg ? 'relative-position overflow-scroll' : 'row']">
        <!-- Left side -->
        <div class="col-5 q-pr-xs signin-img">
            <q-img src="assets/signin_img.png" />
            <!-- Background overlay -->
            <div :class="['img-screen', $q.screen.lt.lg ? 'img-screen-smaller' : ' higher-screen']">
                <h1 :class="[$q.screen.lt.lg ? 'strg-hidden' : 'welcome-text']">Welcome back!<br />Plan your next trip</h1>
            </div>
            <div :class="['img-screen lower-screen', $q.screen.lt.lg ? 'img-screen-smaller' : '']">
                <h1 :class="[$q.screen.lt.lg ? 'strg-hidden' : 'welcome-text']">Welcome back!<br />Plan your next trip</h1>
            </div>
        </div>

        <!-- Right side -->
        <div :class="['col-6 ', $q.screen.lt.lg ? 'auth-panel-smaller-screen q-px-lg' : 'q-pa-xl']">
            <h3>Sign in</h3>
            <div class="row q-col-gutter-md">
                <div class="col-12 q-mb-md">
                    <q-input outlined v-model="signinModel.email" label="Email" class=""
                        :rules="[() => $validateField(signinModel, 'email')]" />
                </div>
                <div class="col-12 q-mb-md">
                    <q-input outlined v-model="signinModel.password" :type="showPassword ? 'text' : 'password'"
                        label="Password" class="" :rules="[() => $validateField(signinModel, 'password')]">
                        <template v-slot:append>
                            <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="togglePasswordVisibility" />
                        </template>
                    </q-input>
                </div>
                <div class="col-12 q-mt-md">
                    <q-btn class="q-py-sm full-width bg-primary-red btn-border-radius" label="Sign in" no-caps
                        color="primary" @click="signin" />
                    <div class="q-ml-md q-mt-md">
                        <span>Don't have an account? </span>
                        <q-btn class="text-primary" label="Sign up" flat dense no-caps @click="toggleAuthComponent" />
                    </div>
                </div>
            </div>
        </div>
    </div>
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
const emits = defineEmits(['toggle-auth-component']);
const $q = useQuasar();
const router = useRouter();
let postSignupTimer: NodeJS.Timeout;

// refs
const requestingServer = ref(false);
const signinFormRef = ref<QForm>();
// refs for password visibility
const showPassword = ref(false);

// models and view-models
const signinViewModel = new SigninViewModel(new SigninModel());
const tokenConfirmationViewModel = new TokenConfirmationViewModel(
    new SignupConfirmationModel()
);

const signinModel = reactive(signinViewModel.model);
const tokenCoirmationModel = reactive(tokenConfirmationViewModel.model);

// computed
asyncComputed(async () => {
    await signinModel.validate?.();
});

asyncComputed(async () => {
    await tokenCoirmationModel.validate?.();
});

// methods
async function toggleAuthComponent() {
  emits('toggle-auth-component');
}

function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
}

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
            clearUIEffects({
                loader: $q.loading,
                timer: postSignupTimer,
                requestProcessingRef: requestingServer,
            });

            await router.replace('/services');
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

function isfullModelValid() {
    return isModelValid(signinModel);
}
</script>

<style scoped lang="scss">
.strg-hidden {
  display: none;
}

.auth-panel-smaller-screen {
  position: absolute;
  top: 5vh;
  bottom: 0;
}

.overflow-scroll {
  overflow: scroll;
}

.signin-img {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.img-screen-smaller {
    top: 30px;
    left: 20px;
}

.signin-img .img-screen {
    background:
        linear-gradient(to right,
            rgba(192, 192, 192, 0.2) 40%,
            rgba(185, 184, 184, 0.3) 65%),
        radial-gradient(circle at 40% 55%,
            rgba(62, 62, 62, 0.3) 20% 20%,
            /* Darkest at the center */
            rgba(59, 58, 58, 0.05) 40%,
            /* Lighter outward */
            rgba(59, 58, 58, 0.05) 40%,
            /* Lighter outward */
            rgba(254, 254, 254, 0.3) 80%
            /* Almost transparent at the edges */
        );
    position: absolute;
    height: 88%;
    width: 85%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(4px);
    // box-shadow: 0 0 20px rgba(172, 172, 172, 0.3),
    //     0 0 20px rgba(82, 82, 82, 0.1);
}

.signin-img .welcome-text {
    margin-top: 20px;
    text-align: center;
    color: #ffffff;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 2px;
    font-family: 'poppins', sans-serif;
}

.signin-img .higher-screen {
    top: 50px;
    left: 40px;
}

.signin-img .lower-screen {
    top: 70px;
    /* Slightly higher than before */
    left: 42px;
    /* Slightly shifted horizontally */
    opacity: 0.4;
    /* Make it very faint */
    transform: scale(1.10);
    /* Slightly more stretched */
    filter: blur(5px);
    /* Add blur effect */
}

.lower-screen .welcome-text {
    color: black;
    box-shadow: 0 12px 12px rgba(165, 165, 165, 0.134);
    font-weight: 900;
}

</style>