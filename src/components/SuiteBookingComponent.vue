<template>
<q-form ref="bookingFormRef" @submit.prevent="addToBooking">
    <q-card class="booking-card">
      <!-- Suite Information -->
    <div class="suite-info row q-col-gutter-md">
      <div class="col-12 col-md-8 suite-text">
        <h2 class="suite-title">{{capitalize(currentCategory.replaceAll('_', ' ')) + ' Suite' + ' - ' +currentSuite?.provider.name}}</h2>
        <p class="suite-location">📍 {{currentSuite?.location.city}}</p>
        <p class="suite-rating">⭐⭐⭐⭐⭐ 4.8</p>
        <p class="suite-price">&#8358;{{priceSelectOptions?.[0]?.price}}</p>
      </div>
      <div class="col-12 col-md-4">
        <q-img style="height: 100%; width:100%" :src="currentSuite?.files[0].url" class="suite-image" />
      </div>
      </div>
      
      <!-- Form Fields -->
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-6">
            <q-input v-model="suiteBookingModel.client.firstName" label="First Name" outlined class="booking-input" :rules="[() => $validateField(suiteBookingModel, 'client.firstName')]" />
          </div>
          <div class="col-12 col-sm-6">
            <q-input v-model="suiteBookingModel.client.lastName" label="Last Name" outlined class="booking-input" :rules="[() => $validateField(suiteBookingModel, 'client.lastName')]" />
          </div>
          <div class="col-12 col-sm-6">
            <q-input v-model="suiteBookingModel.client.email" label="Email" outlined class="booking-input" type="email" :rules="[() => $validateField(suiteBookingModel, 'client.email')]" />
          </div>
          <div class="col-12 col-sm-6 phone-input row justify-between">
              <PhoneCodesComponents v-slot="{ phoneCodes }" >
              <select-with-image-icon-component class="col-5" :phone-codes="phoneCodes"
              :selected-phon-code-id="suiteBookingModel.client.phoneCodeId || ''"
              @update:selected-phon-code-id="updateSelectedPhoneCodeId" borderless ref="searchInputRef"
              />
            </PhoneCodesComponents>
            <q-input v-model="suiteBookingModel.client.phone" outlined class="booking-input phone-number col-7" type="tel" :rules="[() => $validateField(suiteBookingModel, 'client.phone')]" />
          </div>
          <div class="col-12 col-sm-6">
            <q-input v-model="suiteBookingModel.checkInDate" label="Check-in Date" outlined class="booking-input" type="date" :rules="[() => $validateField(suiteBookingModel, 'checkInDate')]" />
          </div>
          <div class="col-12 col-sm-6">
            <q-input v-model="suiteBookingModel.checkOutDate" label="Check-out Date" outlined class="booking-input" type="date" :rules="[() => $validateField(suiteBookingModel, 'checkOutDate')]" />
          </div>
          <div class="col-12 col-sm-6">
            <q-select v-model="suiteBookingModel.noOfAdults" :options="[1, 2, 3, 4, 5]" label="Adult" outlined class="booking-input" :rules="[() => $validateField(suiteBookingModel, 'noOfAdults')]" />
          </div>
          <div class="col-12 col-sm-6">
            <q-select v-model="suiteBookingModel.noOfChhildren" :options="[0, 1, 2, 3, 4]" label="Children" outlined class="booking-input" :rules="[() => $validateField(suiteBookingModel, 'noOfChhildren')]" />
          </div>
        </div>
      </q-card-section>
      
      <!-- Booking Button -->
      <q-card-actions align="center">
        <q-btn label="Add to Booking" class="booking-btn sec-bg-purple text-white"  @click="addToBooking" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, watchEffect, capitalize } from 'vue';
import { QForm, useQuasar } from 'quasar';
import SuitesModel from '../models/suite.model';
import PriceOption from 'src/models/priceVariation.model';
import SuiteBookingViewModel from 'src/view-models/suite.view-model';
import SuiteBookingModel from 'src/models/suiteBooking.model';
import { asyncComputed } from '@vueuse/core';
import { isModelValid } from 'src/lib/utils';
import { ServiceOfferPriceOption } from 'src/lib/types';
import SelectWithImageIconComponent from './SelectWithImageIconComponent.vue';
import PhoneCodesComponents from './PhoneCodesComponents.vue';

const $q = useQuasar();

export interface SuiteBookingComponentProps {
    currentSuite?: SuitesModel;
    selectedPriceId: string;
    currentSelectedPriceOption: PriceOption | ServiceOfferPriceOption | undefined;
    priceSelectOptions: any[] | undefined;
    serviceProviderName: string;
    currentCategory: string;
    suiteBookingModelId?: string;
}

const props = withDefaults(defineProps<SuiteBookingComponentProps>(), {
});

const emit = defineEmits(['update:showModal', 'update:selectedPriceId', 'book', 'selectCarOption', 'selectVisaOption', 'selectTourOption']);
const formSubmitted = ref(false);
const bookingFormRef = ref<QForm>();

//#region view models
const suiteBookingViewModel = new SuiteBookingViewModel(reactive(new SuiteBookingModel()));
const suiteBookingModel = suiteBookingViewModel.model;
//#endregion

const loading = ref(false);
const selectedRoomPriceId = ref(props.selectedPriceId);
const bookingAdded = ref(false);

// Computed
asyncComputed(async () => {
    await suiteBookingModel.validate?.()
})

const roomPriceComputed = computed(() => {
    return ((props.currentSelectedPriceOption as PriceOption)?.price || 0) as number * suiteBookingModel.roomsCount;
})

// Methods
async function updateSelectedPhoneCodeId(value: string) {
  suiteBookingModel.client.phoneCodeId = value;
}

const addToBooking = async () => {
    bookingAdded.value = false;
    if (!isModelValid(suiteBookingModel)) {
        await bookingFormRef.value?.validate();
        return;
    }
    suiteBookingModel.price = roomPriceComputed.value;
    suiteBookingModel.suitePropertyId = props.currentSuite?.id as string;
    await suiteBookingViewModel.addToBooking('suiteBooking', suiteBookingModel);
    bookingAdded.value = true;
    bookingFormRef.value?.reset();
};

// Watchers
watch(bookingAdded, (newVal) => {
    if (newVal) {
        emit('update:showModal', false);
    }
});
watch(() => props.selectedPriceId, (newVal) => {
    selectedRoomPriceId.value = String(newVal);
})

watch(selectedRoomPriceId, (newVal) => {
    suiteBookingModel.serviceOfferPriceOptionId = newVal;
    emit('update:selectedPriceId', newVal)
});

// watch(() => props.currentSuite, (newVal) => {
//     if (newVal) {
//         console.log('the current suite id from: ', newVal.id)
//         suiteBookingModel.suitePropertyId = newVal.id;
//         console.log('the current suite id to: ', suiteBookingModel.suitePropertyId)
//     }
// });

watchEffect(() => {
    console.log('the current suite id before: ', props.currentSuite?.id);
        suiteBookingModel.suitePropertyId = props.currentSuite?.id as string;
        console.log('the current suite id after: ', suiteBookingModel.suitePropertyId);
     
}
);

// hooks
onMounted(async () => {
    if (props.suiteBookingModelId) {
        suiteBookingViewModel.getSuiteBooking(props.suiteBookingModelId)
    }
})
onMounted(() => {
    console.log('the currenct suite from mounted is: ', props.currentSuite)
    suiteBookingModel.client.firstName = suiteBookingViewModel.currentUser?.userData?.firstName || 'Please, enter your name.'
    suiteBookingModel.client.lastName = suiteBookingViewModel.currentUser?.userData?.lastName || 'Please, enter your name.';
    suiteBookingModel.client.email = suiteBookingViewModel.currentUser?.userData?.email || 'Please, enter your email.';
    suiteBookingModel.client.phone = suiteBookingViewModel.currentUser?.userData?.phone || 'Please, enter your phone number.';

    if (!props.suiteBookingModelId) {
        suiteBookingModel.checkInDate = new Date().toISOString().split('T')[0];  // Set today's date as the default check-in date
        suiteBookingModel.checkOutDate = new Date(new Date().getTime() + 86400000).toISOString().split('T')[0]; // Set check-out date as one day after the check-in date
        suiteBookingModel.noOfAdults = 1; // Default number of adults
        suiteBookingModel.noOfChhildren = 0; // Default number of children
        suiteBookingModel.roomsCount = 1; // Default number of rooms
    }
});

// Helper function to validate a specific field in the model
// const $validateField = (model: any, field: string) => {
//     const value = model[field];
//     if (!value || (typeof value === 'string' && value.trim() === '')) {
//         return `The ${field} field is required.`;
//     }
//     return true;
// };

</script>

<style scoped>
.booking-modal {
    max-width: 800px;
    min-width: 60vw;
}

.booking-input {
    max-width: 100%;
}

.q-select,
.q-input {
    width: 100%;
}

.q-chip {
    margin-right: 8px;
}

.q-btn {
    width: 100%;
    max-width: 300px;
    margin-top: 16px;
}

.booking-card {
  max-width: 800px;
  margin: auto;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
}
.suite-info {
  display: flex;
  background: #000;
  color: white;
  padding: 16px;
  border-radius: 12px;
}
.suite-text { flex: 1; }
.suite-title { font-size: 1.5em; font-weight: bold; }
.suite-location, .suite-rating, .suite-price { margin: 4px 0; }
.suite-image { width: 150px; height: 100px; background: url('/path-to-image.jpg') center/cover; border-radius: 8px; }
.booking-input { width: 100%; }
.phone-input { display: flex; gap: 8px; }
.phone-code { width: 30%; }
.phone-number { flex: 1; }
.booking-btn { width: 100%; max-width: 300px; margin-top: 16px; }
</style>