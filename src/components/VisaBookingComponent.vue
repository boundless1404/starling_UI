<template>

    <q-form ref="bookingFormRef" @submit.prevent="addToBooking">
        <q-card-section>
            <div class="bg-grey-3 text-center q-py-sm q-mb-lg" style="border-radius: 25px;">
                {{ serviceOfferProviderName }} {{ `${serviceOfferCategory? `, ${serviceOfferCategory}` : ''}` }}
            </div>

            <div class="row q-col-gutter-md">
                <!-- First Name -->
                <div class="col-12 col-sm-6">
                    <q-input v-model="visaBookingModel.client.firstName" label="First Name" outlined rounded
                        class="booking-input" :rules="[() => $validateField(visaBookingModel, 'client.firstName')]" />
                </div>

                <!-- Last Name -->
                <div class="col-12 col-sm-6">
                    <q-input v-model="visaBookingModel.client.lastName" label="Last Name" outlined rounded
                        class="booking-input" :rules="[() => $validateField(visaBookingModel, 'client.lastName')]" />
                </div>

                <!-- Email -->
                <div class="col-12 col-sm-6">
                    <q-input v-model="visaBookingModel.client.email" label="Email" outlined rounded
                        class="booking-input" type="email"
                        :rules="[() => $validateField(visaBookingModel, 'client.email')]" />
                </div>

                <!-- Phone -->
                <div class="col-12 col-sm-6">
                    <div class="row">
                        <div class="col-4">
                            <q-select outlined rounded v-model="visaBookingModel.client.phoneCodeId"
                                :options="phoneCodeIdOptions" bg-color="secondary"
                                :rules="[() => $validateField(visaBookingModel, 'client.phoneCodeId')]" emit-value
                                map-options />
                        </div>
                        <div class="col-8">
                            <q-input v-model="visaBookingModel.client.phone" outlined rounded class="booking-input"
                                type="tel" :rules="[() => $validateField(visaBookingModel, 'client.phone')]" />
                        </div>
                    </div>
                </div>

                <!-- Start Date -->
                <!-- <div class="col-12 col-sm-6">
                    <q-input v-model="visaBookingModel" label="Start Date" outlined rounded
                        class="booking-input" :rules="[() => $validateField(visaBookingModel, 'startDate')]"
                        readonly>
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="visaBookingModel.startDate" mask="YYYY-MM-DD" today-btn />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div> -->

                <!-- End Date -->
                <!-- <div class="col-12 col-sm-6">
                    <q-input v-model="visaBookingModel.endDate" label="End Date" outlined rounded
                        class="booking-input" :rules="[() => $validateField(visaBookingModel, 'checkOutDate')]"
                        readonly>
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="visaBookingModel.endDate" mask="YYYY-MM-DD" today-btn />
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
                                {{ '\u20A6' }}{{ currentSelectedPriceOption?.price || visaBookingModel.price || 0 }}
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
import PriceOption from 'src/models/priceVariation.model';
import { asyncComputed } from '@vueuse/core';
import { isModelValid } from 'src/lib/utils';
import { ServiceOfferPriceOption } from 'src/lib/types';
import VisaServiceOfferBookingViewModel from 'src/view-models/visaServiceOfferBooking.view-model';
import VisaServiceOfferBooking from 'src/models/visaServiceOfferBooking.model';

const $q = useQuasar();

export interface OfferBookingProps {
    serviceOfferId: string;
    serviceOfferPriceOptionId: string | undefined;
    currentSelectedPriceOption: ServiceOfferPriceOption | PriceOption | undefined;
    priceSelectOptions: any[] | undefined;
    serviceOfferProviderName: string;
    serviceOfferCategory?: string;
    /**To Edit Current Auto Service Offer Booking */
    bookingClientEmail?: string;
    serviceOfferPrice?: number | string | undefined;
}

const props = withDefaults(defineProps<OfferBookingProps>(), {
});

const emit = defineEmits(['update:showModal',]);

const phoneCodeIds = ref<{ name: string; id: string }[]>([
    { name: '234', id: '151' },
]);
const formSubmitted = ref(false);
const bookingFormRef = ref<QForm>();

//#region view models
const visaBookingViewModel = new VisaServiceOfferBookingViewModel(reactive(new VisaServiceOfferBooking()));
const visaBookingModel = visaBookingViewModel.model;
//#endregion

const loading = ref(false);
const selectedAutoPriceId = ref(props.serviceOfferPriceOptionId);
const bookingAdded = ref(false);

// Computed
asyncComputed(async () => {
    await visaBookingModel.validate?.()
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
    if (!isModelValid(visaBookingModel)) {
        await bookingFormRef.value?.validate();
        return;
    }

    visaBookingModel.price = Number(visaBookingModel.price);
    await visaBookingViewModel.addToBooking('visaBooking', visaBookingModel);
    // visaBookingModel.clearValues?.();
    bookingFormRef.value?.reset()
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
    visaBookingModel.price = (newVal || props.serviceOfferPrice || 0) as NonNullable<number>;
});
watch(() => props.serviceOfferPriceOptionId, (newVal) => {
    selectedAutoPriceId.value = String(newVal);
})

// watch(() => props.serviceOfferPrice, (newVal) => {
//     visaBookingModel.price = (newVal || 0) as NonNullable<number>;
// })

watch(() => roomPriceComputed.value, (newVal) => {
    visaBookingModel.price = (newVal || 0) as NonNullable<number>;
})

// hooks
onMounted(() => {
    console.log('Visa Booking Mounted: -->',props.priceSelectOptions)
    visaBookingModel.price = (props.serviceOfferPrice || 0) as NonNullable<number>;
    visaBookingModel.serviceOfferId = props.serviceOfferId;
    visaBookingModel.serviceOfferPriceOptionId = props.serviceOfferPriceOptionId as string;
    // TODO: removed this:
    if (!visaBookingModel.serviceOfferPriceOptionId) {
        visaBookingModel.serviceOfferPriceOptionId = new Date().toISOString().split('T')[0];
    }
    if (!props.bookingClientEmail) {
        visaBookingModel.client.firstName = visaBookingViewModel.currentUser?.userData?.firstName || 'Please, enter your name.'
    visaBookingModel.client.lastName = visaBookingViewModel.currentUser?.userData?.lastName || 'Please, enter your name.';
    visaBookingModel.client.email = visaBookingViewModel.currentUser?.userData?.email || 'Please, enter your email.';
    visaBookingModel.client.phone = visaBookingViewModel.currentUser?.userData?.phone || 'Please, enter your phone number.';
        // visaBookingModel.startDate = new Date().toISOString().split('T')[0];  // Set today's date as the default check-in date
        // visaBookingModel.endDate = new Date(new Date().getTime() + 86400000).toISOString().split('T')[0]; // Set check-out date as one day after the check-in date
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