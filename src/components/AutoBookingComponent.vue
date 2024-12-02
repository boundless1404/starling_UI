<template>

    <q-form ref="bookingFormRef" @submit.prevent="addToBooking">
        <q-card-section>
            <div class="bg-grey-3 text-center q-py-sm q-mb-lg" style="border-radius: 25px;">
                {{ serviceOfferProviderName }} {{ `${serviceOfferCategory? `, ${serviceOfferCategory}` : ''}` }}
            </div>

            <div class="row q-col-gutter-md">
                <!-- First Name -->
                <div class="col-12 col-sm-6">
                    <q-input v-model="autoBookingModel.client.firstName" label="First Name" outlined rounded
                        class="booking-input" :rules="[() => $validateField(autoBookingModel, 'client.firstName')]" />
                </div>

                <!-- Last Name -->
                <div class="col-12 col-sm-6">
                    <q-input v-model="autoBookingModel.client.lastName" label="Last Name" outlined rounded
                        class="booking-input" :rules="[() => $validateField(autoBookingModel, 'client.lastName')]" />
                </div>

                <!-- Email -->
                <div class="col-12 col-sm-6">
                    <q-input v-model="autoBookingModel.client.email" label="Email" outlined rounded
                        class="booking-input" type="email"
                        :rules="[() => $validateField(autoBookingModel, 'client.email')]" />
                </div>

                <!-- Phone -->
                <div class="col-12 col-sm-6">
                    <div class="row">
                        <div class="col-4">
                            <q-select outlined rounded v-model="autoBookingModel.client.phoneCodeId"
                                :options="phoneCodeIdOptions" bg-color="secondary"
                                :rules="[() => $validateField(autoBookingModel, 'client.phoneCodeId')]" emit-value
                                map-options />
                        </div>
                        <div class="col-8">
                            <q-input v-model="autoBookingModel.client.phone" outlined rounded class="booking-input"
                                type="tel" :rules="[() => $validateField(autoBookingModel, 'client.phone')]" />
                        </div>
                    </div>
                </div>

                <!-- Start Date -->
                <div class="col-12 col-sm-6">
                    <q-input v-model="autoBookingModel.startDate" label="Start Date" outlined rounded
                        class="booking-input" :rules="[() => $validateField(autoBookingModel, 'startDate')]"
                        readonly>
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="autoBookingModel.startDate" mask="YYYY-MM-DD" today-btn />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>

                <!-- End Date -->
                <div class="col-12 col-sm-6">
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
                </div>
            </div>

            <!-- Price Selection -->
            <div class="q-mt-lg">
                <div class="row q-col-gutter-md">
                    <div class="col-12 col-sm-6">
                        <div class="text-subtitle1 q-mb-md">Price Options</div>
                        <div class="row items-center q-gutter-sm col-12 col-md-auto; flex-wrap: wrap">
                            <q-chip color="primary" text-color="white">
                                {{ '\u20A6' }}{{ currentSelectedPriceOption?.price || autoBookingModel.price || 0 }}
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
import AutoServiceOfferBookingViewModel from 'src/view-models/autoServiceOfferBooking.view-model';
import AutoServiceOfferBooking from 'src/models/autoServiceOfferBooking.model';

const $q = useQuasar();

export interface AutoServiceOfferBookingProps {
    serviceOfferId: string;
    serviceOfferPriceOptionId: string;
    currentSelectedPriceOption: PriceOption | undefined;
    priceSelectOptions: any[] | undefined;
    serviceOfferProviderName: string;
    serviceOfferCategory?: string;
    /**To Edit Current Auto Service Offer Booking */
    bookingClientEmail?: string;
    serviceOfferPrice?: number;
}

const props = withDefaults(defineProps<AutoServiceOfferBookingProps>(), {
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
    return (props.currentSelectedPriceOption?.price || 0) * 1;
})

// Methods
const addToBooking = async () => {
    bookingAdded.value = false;
    if (!isModelValid(autoBookingModel)) {
        await bookingFormRef.value?.validate();
        return;
    }

    //#region 
    // try {
    //     loading.value = true;
    //     // Here you would typically make an API call to your booking endpoint
    //     // await bookingSuiteService.createBooking(bookingData);

    //     $q.notify({
    //         color: 'positive',
    //         message: 'Booking submitted successfully'
    //     });

    //     // emit('book', bookingData);
    //     formSubmitted.value = true;
    //     showModal.value = false;
    // } catch (error) {
    //     $q.notify({
    //         color: 'negative',
    //         message: 'Failed to submit booking'
    //     });
    // } finally {
    //     loading.value = false;
    // }
    //#endregion
    autoBookingModel.price = Number(autoBookingModel.price);
    await autoBookingViewModel.addToBooking('autoBooking', autoBookingModel);
    // bookingAdded.value = true;
};

// Watchers
watch(bookingAdded, (newVal) => {
    if (newVal) {
        emit('update:showModal', false);
    }
});

watch(roomPriceComputed, (newVal) => {
    autoBookingModel.price = newVal || props.serviceOfferPrice || 0;
});
watch(() => props.serviceOfferPriceOptionId, (newVal) => {
    selectedAutoPriceId.value = String(newVal);
})

watch(() => props.serviceOfferPrice, (newVal) => {
    autoBookingModel.price = newVal || 0;
    autoBookingModel.serviceOfferPriceOptionId = new Date().toISOString().split('T')[0];
})

// hooks
onMounted(() => {
    autoBookingModel.price = props.serviceOfferPrice || 0;
    autoBookingModel.serviceOfferId = props.serviceOfferId;
    autoBookingModel.serviceOfferPriceOptionId = props.serviceOfferPriceOptionId;
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
</style>