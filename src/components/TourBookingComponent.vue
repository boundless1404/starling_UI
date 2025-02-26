<template>
<q-form ref="bookingFormRef" @submit.prevent="addToBooking">
    <q-card class="booking-card">
      <!-- Service Information -->
    <div class="service-info row q-col-gutter-md">
      <div class="col-12 col-md-8 service-text">
        <h2 class="service-title">{{ serviceOfferProviderName }} {{ `${serviceOfferCategory? `, ${serviceOfferCategory}` : ''}` }}</h2>
        <p class="service-location">📍 {{ serviceOfferLocation }}</p>
        <p class="service-rating">⭐⭐⭐⭐⭐ 4.8</p>
        <p class="service-price">&#8358;{{ currentSelectedPriceOption?.price || tourBookingModel.price || 0 }}</p>
      </div>
      <div class="col-12 col-md-4">
        <q-img style="height: 100%; width:100%" :src="serviceOffer?.files?.[0].url" class="service-image" />
      </div>
      </div>
      
      <!-- Form Fields -->
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-6">
            <q-input v-model="tourBookingModel.client.firstName" label="First Name" outlined class="booking-input" :rules="[() => $validateField(tourBookingModel, 'client.firstName')]" />
          </div>
          <div class="col-12 col-sm-6">
            <q-input v-model="tourBookingModel.client.lastName" label="Last Name" outlined class="booking-input" :rules="[() => $validateField(tourBookingModel, 'client.lastName')]" />
          </div>
          <div class="col-12 col-sm-6">
            <q-input v-model="tourBookingModel.client.email" label="Email" outlined class="booking-input" type="email" :rules="[() => $validateField(tourBookingModel, 'client.email')]" />
          </div>
          <div class="col-12 col-sm-6 phone-input row justify-between">
              <PhoneCodesComponents v-slot="{ phoneCodes }" >
              <select-with-image-icon-component class="col-5" :phone-codes="phoneCodes"
              :selected-phon-code-id="tourBookingModel.client.phoneCodeId || ''"
              @update:selected-phon-code-id="updateSelectedPhoneCodeId" borderless ref="searchInputRef"
              />
            </PhoneCodesComponents>
            <q-input v-model="tourBookingModel.client.phone" outlined class="booking-input phone-number col-7" type="tel" :rules="[() => $validateField(tourBookingModel, 'client.phone')]" />
          </div>
          <div class="col-12 col-sm-6">
            <q-input v-model="tourBookingModel.date" label="Start Date" outlined class="booking-input" type="date" :rules="[() => $validateField(tourBookingModel, 'date')]" />
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
import TourServiceOfferBookingViewModel from 'src/view-models/tourServiceOfferBooking.view-model';
import TourServiceOfferBooking from 'src/models/tourServiceOfferBooking.model';
import { OfferBookingProps } from './BookingsComponent.vue';
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
const tourServiceBookingViewModel = new TourServiceOfferBookingViewModel(reactive(new TourServiceOfferBooking()));
const tourBookingModel = tourServiceBookingViewModel.model;
//#endregion

const loading = ref(false);
const selectedAutoPriceId = ref(props.serviceOfferPriceOptionId);
const bookingAdded = ref(false);

// Computed
asyncComputed(async () => {
    await tourBookingModel.validate?.()
})

const phoneCodeIdOptions = computed(() => {
    return phoneCodeIds.value.map((code) => ({
        label: code.name,
        value: code.id,
    }));
});

const roomPriceComputed = computed(() => {
    console.log('this is the current selected price option in tour booking', props.currentSelectedPriceOption?.price)
    return (props.currentSelectedPriceOption?.price || 0) as number  * 1;
})

// Methods
async function updateSelectedPhoneCodeId(value: string) {
  tourBookingModel.client.phoneCodeId = value;
}

const addToBooking = async () => {
    bookingAdded.value = false;
    if (!isModelValid(tourBookingModel)) {
        await bookingFormRef.value?.validate();
        return;
    }

    tourBookingModel.price = Number(tourBookingModel.price);
    await tourServiceBookingViewModel.addToBooking('tourBooking', tourBookingModel);
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
    tourBookingModel.price = (newVal || props.serviceOfferPrice || 0) as NonNullable<number>;
});
watch(() => props.serviceOfferPriceOptionId, (newVal) => {
    selectedAutoPriceId.value = String(newVal);
})

// hooks
onMounted(() => {
    console.log('tour booking mounted: -->',props.priceSelectOptions)
    tourBookingModel.price = (props.serviceOfferPrice || 0) as NonNullable<number>;
    tourBookingModel.serviceOfferId = props.serviceOfferId;
    tourBookingModel.serviceOfferPriceOptionId = props.serviceOfferPriceOptionId as string;
    // TODO: removed this:
    if (!tourBookingModel.serviceOfferPriceOptionId) {
        tourBookingModel.serviceOfferPriceOptionId = new Date().toISOString().split('T')[0];
    }
    if (!props.bookingClientEmail) {
        tourBookingModel.client.firstName = tourServiceBookingViewModel.currentUser?.userData?.firstName || 'Please, enter your name.'
    tourBookingModel.client.lastName = tourServiceBookingViewModel.currentUser?.userData?.lastName || 'Please, enter your name.';
    tourBookingModel.client.email = tourServiceBookingViewModel.currentUser?.userData?.email || 'Please, enter your email.';
    tourBookingModel.client.phone = tourServiceBookingViewModel.currentUser?.userData?.phone || 'Please, enter your phone number.';
        tourBookingModel.date = new Date().toISOString().split('T')[0];  // Set today's date as the default check-in date
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