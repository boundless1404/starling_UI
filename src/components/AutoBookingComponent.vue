<template>
<q-form ref="bookingFormRef" @submit.prevent="addToBooking">
    <q-card class="booking-card">
      <!-- Service Information -->
    <div class="service-info row q-col-gutter-md">
      <div class="col-12 col-md-8 service-text">
        <h2 class="service-title">{{ serviceOfferProviderName }} {{ `${serviceOfferCategory? `, ${serviceOfferCategory}` : ''}` }}</h2>
        <!-- <p class="service-location">📍 {{ serviceOfferLocation }}</p> -->
        <p class="service-rating">⭐⭐⭐⭐⭐ 4.8</p>
        <p class="service-price">&#8358;{{ currentSelectedPriceOption?.price || autoBookingModel.price || 0 }}</p>
      </div>
      <div class="col-12 col-md-4">
        <q-img style="height: 100%; width:100%" :src="serviceOffer?.files?.[0].url" class="service-image" />
      </div>
      </div>
      
      <!-- Form Fields -->
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-6">
            <q-input v-model="autoBookingModel.client.firstName" label="First Name" outlined class="booking-input" :rules="[() => $validateField(autoBookingModel, 'client.firstName')]" />
          </div>
          <div class="col-12 col-sm-6">
            <q-input v-model="autoBookingModel.client.lastName" label="Last Name" outlined class="booking-input" :rules="[() => $validateField(autoBookingModel, 'client.lastName')]" />
          </div>
          <div class="col-12 col-sm-6">
            <q-input v-model="autoBookingModel.client.email" label="Email" outlined class="booking-input" type="email" :rules="[() => $validateField(autoBookingModel, 'client.email')]" />
          </div>
          <div class="col-12 col-sm-6 phone-input row justify-between">
              <PhoneCodesComponents v-slot="{ phoneCodes }" >
              <select-with-image-icon-component class="col-5" :phone-codes="phoneCodes"
              :selected-phon-code-id="autoBookingModel.client.phoneCodeId || ''"
              @update:selected-phon-code-id="updateSelectedPhoneCodeId" borderless ref="searchInputRef"
              />
            </PhoneCodesComponents>
            <q-input v-model="autoBookingModel.client.phone" outlined class="booking-input phone-number col-7" type="tel" :rules="[() => $validateField(autoBookingModel, 'client.phone')]" />
          </div>
          <div class="col-12 col-sm-6">
            <q-input v-model="autoBookingModel.startDate" label="Start Date" outlined class="booking-input" type="date" :rules="[() => $validateField(autoBookingModel, 'startDate')]" />
          </div>
          <div class="col-12 col-sm-6">
            <q-input v-model="autoBookingModel.endDate" label="End Date" outlined class="booking-input" type="date" :rules="[() => $validateField(autoBookingModel, 'endDate')]" />
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
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { QForm, useQuasar } from 'quasar';
import { asyncComputed } from '@vueuse/core';
import { isModelValid } from 'src/lib/utils';
import AutoServiceOfferBookingViewModel from 'src/view-models/autoServiceOfferBooking.view-model';
import AutoServiceOfferBooking from 'src/models/autoServiceOfferBooking.model';
import { OfferBookingProps } from './VisaBookingComponent.vue';
import SelectWithImageIconComponent from './SelectWithImageIconComponent.vue';
import PhoneCodesComponents from './PhoneCodesComponents.vue';

const $q = useQuasar();

const props = withDefaults(defineProps<OfferBookingProps>(), {
});

const emit = defineEmits(['update:showModal',]);

const phoneCodeIds = ref<{ name: string; id: string }[]>([
    { name: '234', id: '151' },
]);
const formSubmitted = ref(false);
const bookingFormRef = ref<QForm>();

//#region view models
const autoBookingViewModel = new AutoServiceOfferBookingViewModel(reactive(new AutoServiceOfferBooking()));
const autoBookingModel = autoBookingViewModel.model;
//#endregion

const loading = ref(false);
const selectedAutoPriceId = ref(props.serviceOfferPriceOptionId);
const bookingAdded = ref(false);

// Computed
asyncComputed(async () => {
    await autoBookingModel.validate?.()
})

const phoneCodeIdOptions = computed(() => {
    return phoneCodeIds.value.map((code) => ({
        label: code.name,
        value: code.id,
    }));
});

const roomPriceComputed = computed(() => {
    console.log('this is the current selected price option in auto booking', props.currentSelectedPriceOption?.price)
    return (props.currentSelectedPriceOption?.price || 0) as number  * 1;
})

// Methods
async function updateSelectedPhoneCodeId(value: string) {
  autoBookingModel.client.phoneCodeId = value;
}

const addToBooking = async () => {
    bookingAdded.value = false;
    if (!isModelValid(autoBookingModel)) {
        await bookingFormRef.value?.validate();
        return;
    }

    autoBookingModel.price = Number(autoBookingModel.price);
    await autoBookingViewModel.addToBooking('autoBooking', autoBookingModel);
    bookingFormRef.value?.reset();
};

// Watchers
watch(bookingAdded, (newVal) => {
    if (newVal) {
        emit('update:showModal', false);
    }
});

watch(roomPriceComputed, (newVal) => {
    console.log('this is the service offer price --> ', props.serviceOfferPrice )
    console.log('this is the service offer price  new val--> ', newVal )
    autoBookingModel.price = (newVal || props.serviceOfferPrice || 0) as NonNullable<number>;
});
watch(() => props.serviceOfferPriceOptionId, (newVal) => {
    selectedAutoPriceId.value = String(newVal);
})

// watch(() => props.serviceOfferPrice, (newVal) => {
//     autoBookingModel.price = (newVal || 0) as NonNullable<number>;
// })

// hooks
onMounted(() => {
    console.log('auto booking mounted: -->',props.serviceOffer)
    autoBookingModel.price = (props.serviceOfferPrice || 0) as NonNullable<number>;
    autoBookingModel.serviceOfferId = props.serviceOfferId;
    autoBookingModel.serviceOfferPriceOptionId = props.serviceOfferPriceOptionId as string;
    // TODO: removed this:
    if (!autoBookingModel.serviceOfferPriceOptionId) {
        autoBookingModel.serviceOfferPriceOptionId = new Date().toISOString().split('T')[0];
    }
    if (!props.bookingClientEmail) {
        autoBookingModel.client.firstName = autoBookingViewModel.currentUser?.userData?.firstName || 'Please, enter your name.'
    autoBookingModel.client.lastName = autoBookingViewModel.currentUser?.userData?.lastName || 'Please, enter your name.';
    autoBookingModel.client.email = autoBookingViewModel.currentUser?.userData?.email || 'Please, enter your email.';
    autoBookingModel.client.phone = autoBookingViewModel.currentUser?.userData?.phone || 'Please, enter your phone number.';
        autoBookingModel.startDate = new Date().toISOString().split('T')[0];  // Set today's date as the default check-in date
        autoBookingModel.endDate = new Date(new Date().getTime() + 86400000).toISOString().split('T')[0]; // Set check-out date as one day after the check-in date
    }
});

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
.service-info {
  display: flex;
  background: #000;
  color: white;
  padding: 16px;
  border-radius: 12px;
}
.service-text { flex: 1; }
.service-title { font-size: 1.5em; font-weight: bold; }
.service-location, .suite-rating, .suite-price { margin: 4px 0; }
.service-image { width: 150px; height: 100px; background: url('/path-to-image.jpg') center/cover; border-radius: 8px; }
.booking-input { width: 100%; }
.phone-input { display: flex; gap: 8px; }
.phone-code { width: 30%; }
.phone-number { flex: 1; }
.booking-btn { width: 100%; max-width: 300px; margin-top: 16px; }
</style>