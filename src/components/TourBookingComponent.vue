<template>

    <q-form ref="bookingFormRef" @submit.prevent="addToBooking">
        <q-card-section>
            <div class="bg-grey-3 text-center q-py-sm q-mb-lg" style="border-radius: 25px;">
                {{ serviceOfferProviderName }} {{ `${serviceOfferCategory? `, ${serviceOfferCategory}` : ''}` }}
            </div>

            <div class="row q-col-gutter-md">
                <!-- First Name -->
                <div class="col-12 col-sm-6">
                    <q-input v-model="tourBookingModel.client.firstName" label="First Name" outlined rounded
                        class="booking-input" :rules="[() => $validateField(tourBookingModel, 'client.firstName')]" />
                </div>

                <!-- Last Name -->
                <div class="col-12 col-sm-6">
                    <q-input v-model="tourBookingModel.client.lastName" label="Last Name" outlined rounded
                        class="booking-input" :rules="[() => $validateField(tourBookingModel, 'client.lastName')]" />
                </div>

                <!-- Email -->
                <div class="col-12 col-sm-6">
                    <q-input v-model="tourBookingModel.client.email" label="Email" outlined rounded
                        class="booking-input" type="email"
                        :rules="[() => $validateField(tourBookingModel, 'client.email')]" />
                </div>

                <!-- Phone -->
                <div class="col-12 col-sm-6">
                    <div class="row">
                        <div class="col-4">
                            <q-select outlined rounded v-model="tourBookingModel.client.phoneCodeId"
                                :options="phoneCodeIdOptions" bg-color="secondary"
                                :rules="[() => $validateField(tourBookingModel, 'client.phoneCodeId')]" emit-value
                                map-options />
                        </div>
                        <div class="col-8">
                            <q-input v-model="tourBookingModel.client.phone" outlined rounded class="booking-input"
                                type="tel" :rules="[() => $validateField(tourBookingModel, 'client.phone')]" />
                        </div>
                    </div>
                </div>

                <!-- Start Date -->
                <div class="col-12 col-sm-6">
                    <q-input v-model="tourBookingModel.date" label="Start Date" outlined rounded
                        class="booking-input" :rules="[() => $validateField(tourBookingModel, 'startDate')]"
                        readonly>
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="tourBookingModel.date" mask="YYYY-MM-DD" today-btn />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>

                <!-- End Date -->
                <!-- <div class="col-12 col-sm-6">
                    <q-input v-model="autoBookingModel.endDate" label="End Date" outlined rounded
                        class="booking-input" :rules="[() => $validateField(autoBookingModel, 'checkOutDate')]"
                        readonly>
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="autoBookingModel.endDate" mask="YYYY-MM-DD" today-btn />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div> -->
            </div>

            <!-- Price Selection -->
            <div class="q-mt-lg">
                <div class="row q-col-gutter-md">
                    <div class="col-12 col-sm-6">
                        <div class="text-subtitle1 q-mb-md">Price Options</div>
                        <div class="row items-center q-gutter-sm col-12 col-md-auto; flex-wrap: wrap">
                            <q-chip color="primary" text-color="white">
                                {{ '\u20A6' }}{{ currentSelectedPriceOption?.price || tourBookingModel.price || 0 }}
                                <q-tooltip>
                                    {{ currentSelectedPriceOption?.description || '' }}
                                </q-tooltip>
                            </q-chip>
                            <q-select v-show="priceSelectOptions && priceSelectOptions.length > 0" class="col" v-model="selectedAutoPriceId" :options="priceSelectOptions" dense
                                options-dense outlined rounded emit-value map-options />
                        </div>
                    </div>
                    <!-- <div class="col-12 col-sm-6">
                        <div class="text-subtitle1 q-mb-md">Room Price</div>
                        <div class="row items-center q-gutter-sm col-12 col-md-auto">
                            <q-input class="col" style="" dense v-model.number="autoBookingModel.roomsCount"
                                label="Number of Rooms" outlined rounded type="number"
                                :rules="[() => $validateField(autoBookingModel, 'roomsCount')]" />
                            <q-chip color="primary" text-color="white">
                                {{ '\u20A6' }}{{ roomPriceComputed.toLocaleString('en-US') }}
                            </q-chip>
                        </div>
                    </div> -->
                </div>
            </div>
        </q-card-section>

        <q-card-actions align="center" class="q-pa-md">
            <q-btn label="Add To Booking" color="primary" class="full-width" rounded style="max-width: 400px"
                @click="addToBooking" :loading="loading" />
        </q-card-actions>
    </q-form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { QForm, useQuasar } from 'quasar';
import { asyncComputed } from '@vueuse/core';
import { isModelValid } from 'src/lib/utils';
import TourServiceOfferBookingViewModel from 'src/view-models/tourServiceOfferBooking.view-model';
import TourServiceOfferBooking from 'src/models/tourServiceOfferBooking.model';
import { OfferBookingProps } from './VisaBookingComponent.vue';

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
    console.log('this is the current selected price option in auto booking', props.currentSelectedPriceOption?.price)
    return (props.currentSelectedPriceOption?.price || 0) as number  * 1;
})

// Methods
const addToBooking = async () => {
    bookingAdded.value = false;
    if (!isModelValid(tourBookingModel)) {
        await bookingFormRef.value?.validate();
        return;
    }

    tourBookingModel.price = Number(tourBookingModel.price);
    await tourServiceBookingViewModel.addToBooking('tourBooking', tourBookingModel);
    // bookingAdded.value = true;
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

watch(() => props.serviceOfferPrice, (newVal) => {
    tourBookingModel.price = (newVal || 0) as NonNullable<number>;
    tourBookingModel.serviceOfferPriceOptionId = new Date().toISOString().split('T')[0];
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
        // tourBookingModel.endDate = new Date(new Date().getTime() + 86400000).toISOString().split('T')[0]; // Set check-out date as one day after the check-in date
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
</style>