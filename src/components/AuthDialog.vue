<template>
    <q-dialog v-model="dialogState">
       <div class="auth-modal dialog-width">
        <signup-component v-if="dialogPurpose === 'signup'" @toggle-auth-component="toggleAuthComponent" @signup-success="onAuth"></signup-component>
        <signin-component v-else @toggle-auth-component="toggleAuthComponent" @signin-success="onAuth"></signin-component>
       </div>
    </q-dialog>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import SignupComponent from './SignupComponent.vue';
import SigninComponent from './SigninComponent.vue';
import { useRouter } from 'vue-router';
import { useNotify } from 'src/composables/composable';


const props = defineProps<{
    open: boolean;
    purpose: 'signup' | 'signin';
}>();

const emits = defineEmits(['close']);

const toggleAuthComponent = () => {
    dialogPurpose.value = dialogPurpose.value === 'signup' ? 'signin' : 'signup';
};

// refs
const $router = useRouter()
const dialogState = ref(props.open);
const dialogPurpose = ref(props.purpose);

// function
function onAuth() {
    // refresh page
    $router.go(0);
    useNotify({
        type: 'positive',
        message: 'Please, refresh the page if page does not reload automatically'
    });
}

// watchers
watch(() => props.open, (newVal) => {
    dialogState.value = newVal;
});

watch(() => props.purpose, (newVal) => {
    dialogPurpose.value = newVal;
});

watch(() => dialogState.value, (newVal) => {
    if (!newVal) {
        emits('close');
    }
});
</script>
<style scoped lang="scss">
    // .q-dialog {
    //     background-color: rgba(0, 0, 0, 0.5);
    // }
    .auth-modal {
        background-color: white;
    }

    .dialog-width {
        min-width: 60vw;
    }

    @media screen and (max-width: 600px) {
        .dialog-width {
            min-width: 90vw;
        }
        
    }
</style>