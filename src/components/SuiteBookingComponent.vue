<template>

    <q-form ref="bookingFormRef" @submit.prevent="addToBooking">
        <q-card-section>
            <div class="bg-grey-3 text-center q-py-sm q-mb-lg" style="border-radius: 25px;">
                {{ serviceProviderName }}, {{ currentCategory }}
            </div>

            <div class="row q-col-gutter-md">
                <!-- First Name -->
                <div class="col-12 col-sm-6">
                    <q-input v-model="suiteBookingModel.client.firstName" label="First Name" outlined rounded
                        class="booking-input" :rules="[() => $validateField(suiteBookingModel, 'client.firstName')]" />
                </div>

                <!-- Last Name -->
                <div class="col-12 col-sm-6">
                    <q-input v-model="suiteBookingModel.client.lastName" label="Last Name" outlined rounded
                        class="booking-input" :rules="[() => $validateField(suiteBookingModel, 'client.lastName')]" />
                </div>

                <!-- Email -->
                <div class="col-12 col-sm-6">
                    <q-input v-model="suiteBookingModel.client.email" label="Email" outlined rounded
                        class="booking-input" type="email"
                        :rules="[() => $validateField(suiteBookingModel, 'client.email')]" />
                </div>

                <!-- Phone -->
                <div class="col-12 col-sm-6">
                    <div class="row">
                        <div class="col-4">
                            <q-select outlined rounded v-model="suiteBookingModel.client.phoneCodeId"
                                :options="phoneCodeIdOptions" bg-color="secondary"
                                :rules="[() => $validateField(suiteBookingModel, 'client.phoneCodeId')]" emit-value
                                map-options />
                        </div>
                        <div class="col-8">
                            <q-input v-model="suiteBookingModel.client.phone" outlined rounded class="booking-input"
                                type="tel" :rules="[() => $validateField(suiteBookingModel, 'client.phone')]" />
                        </div>
                    </div>
                </div>

                <!-- Check In Date -->
                <div class="col-12 col-sm-6">
                    <q-input v-model="suiteBookingModel.checkInDate" label="Check In Date" outlined rounded
                        class="booking-input" :rules="[() => $validateField(suiteBookingModel, 'checkInDate')]"
                        readonly>
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="suiteBookingModel.checkInDate" mask="YYYY-MM-DD" today-btn />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>

                <!-- Check Out Date -->
                <div class="col-12 col-sm-6">
                    <q-input v-model="suiteBookingModel.checkOutDate" label="Check Out Date" outlined rounded
                        class="booking-input" :rules="[() => $validateField(suiteBookingModel, 'checkOutDate')]"
                        readonly>
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="suiteBookingModel.checkOutDate" mask="YYYY-MM-DD" today-btn />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>

                <!-- Adults -->
                <div class="col-12 col-sm-6">
                    <q-select v-model="suiteBookingModel.noOfAdults" :options="[1, 2, 3, 4, 5]" label="Adult" outlined
                        rounded class="booking-input"
                        :rules="[() => $validateField(suiteBookingModel, 'noOfAdults')]" />
                </div>

                <!-- Children -->
                <div class="col-12 col-sm-6">
                    <q-select v-model="suiteBookingModel.noOfChhildren" :options="[0, 1, 2, 3, 4]" label="Children"
                        outlined rounded class="booking-input"
                        :rules="[() => $validateField(suiteBookingModel, 'noOfChhildren')]" />
                </div>
            </div>

            <!-- Price Selection -->
            <div class="q-mt-lg">
                <div class="row q-col-gutter-md">
                    <div class="col-12 col-sm-6">
                        <div class="text-subtitle1 q-mb-md">Price Options</div>
                        <div class="row items-center q-gutter-sm col-12 col-md-auto; flex-wrap: wrap">
                            <q-chip color="primary" text-color="white">
                                {{ '\u20A6' }}{{ currentSelectedPriceOption?.price || 0 }}
                                <q-tooltip>
                                    {{ (currentSelectedPriceOption as PriceOption)?.description || '' }}
                                </q-tooltip>
                            </q-chip>
                            <q-select class="col" v-model="selectedRoomPriceId" :options="priceSelectOptions" dense
                                options-dense outlined rounded emit-value map-options />
                        </div>
                    </div>
                    <div class="col-12 col-sm-6">
                        <div class="text-subtitle1 q-mb-md">Room Price</div>
                        <div class="row items-center q-gutter-sm col-12 col-md-auto">
                            <q-input class="col" style="" dense v-model.number="suiteBookingModel.roomsCount"
                                label="Number of Rooms" outlined rounded type="number"
                                :rules="[() => $validateField(suiteBookingModel, 'roomsCount')]" />
                            <q-chip color="primary" text-color="white">
                                {{ '\u20A6' }}{{ roomPriceComputed.toLocaleString('en-US') }}
                            </q-chip>
                        </div>
                    </div>
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
import { ref, reactive, computed, watch, onMounted, watchEffect } from 'vue';
import { QForm, useQuasar } from 'quasar';
import SuitesModel from '../models/suite.model';
import PriceOption from 'src/models/priceVariation.model';
import SuiteBookingViewModel from 'src/view-models/suite.view-model';
import SuiteBookingModel from 'src/models/suiteBooking.model';
import { asyncComputed } from '@vueuse/core';
import { isModelValid } from 'src/lib/utils';
import { ServiceOfferPriceOption } from 'src/lib/types';

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

const phoneCodeIds = ref<{ name: string; id: string }[]>([
    { name: '234', id: '151' },
]);
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

const phoneCodeIdOptions = computed(() => {
    return phoneCodeIds.value.map((code) => ({
        label: code.name,
        value: code.id,
    }));
});

const roomPriceComputed = computed(() => {
    return ((props.currentSelectedPriceOption as PriceOption)?.price || 0) as number * suiteBookingModel.roomsCount;
})

// Methods
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
</style>