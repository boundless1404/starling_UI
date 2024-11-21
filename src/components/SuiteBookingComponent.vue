<template>
    <q-dialog v-model="showModal" :persistent="formSubmitted">

        <q-card class="booking-modal" style="min-width: 60vw; max-width: 80vw;">
            <q-card-section class="text-center q-pb-none">
                <div class="text-h6">Suite Booking</div>
            </q-card-section>
            <q-form ref="bookingFormRef" @submit.prevent="handleBooking">
                <q-card-section>
                    <div class="bg-grey-3 text-center q-py-sm q-mb-lg" style="border-radius: 25px;">
                        {{ serviceProviderName }}, {{ currentCategory }}
                    </div>

                    <div class="row q-col-gutter-md">
                        <!-- First Name -->
                        <div class="col-12 col-sm-6">
                            <q-input v-model="suiteBookingModel.firstName" label="First Name" outlined rounded
                                class="booking-input" :rules="[
                                    () => $validateField(suiteBookingModel, 'firstName'),
                                ]" />
                        </div>

                        <!-- Last Name -->
                        <div class="col-12 col-sm-6">
                            <q-input v-model="suiteBookingModel.lastName" label="Last Name" outlined rounded
                                class="booking-input" :rules="[
                                    () => $validateField(suiteBookingModel, 'lastName'),
                                ]" />
                        </div>

                        <!-- Email -->
                        <div class="col-12 col-sm-6">
                            <q-input v-model="suiteBookingModel.email" label="Email" outlined rounded
                                class="booking-input" type="email" :rules="[
                                    () => $validateField(suiteBookingModel, 'email'),
                                ]" />
                        </div>

                        <!-- Phone -->
                        <div class="col-12 col-sm-6">
                            <div class="row">
                                <div class="col-4">
                                    <q-select outlined rounded v-model="suiteBookingModel.phoneCodeId"
                                        :options="phoneCodeIdOptions" bg-color="secondary" :rules="[
                                            () => $validateField(suiteBookingModel, 'phoneCodeId'),
                                        ]" emit-value map-options />
                                </div>
                                <div class="col-8">
                                    <q-input v-model="suiteBookingModel.phone" outlined rounded class="booking-input"
                                        type="tel" :rules="[
                                            () => $validateField(suiteBookingModel, 'phone'),
                                        ]" />
                                </div>
                            </div>
                        </div>

                        <!-- Check In Date -->
                        <div class="col-12 col-sm-6">
                            <q-input v-model="suiteBookingModel.checkInDate" label="Check In Date" outlined rounded
                                class="booking-input" :rules="[
                                    () => $validateField(suiteBookingModel, 'checkInDate'),
                                ]" readonly>
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                            <q-date v-model="suiteBookingModel.checkInDate" mask="YYYY-MM-DD"
                                                today-btn />
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>

                        <!-- Check Out Date -->
                        <div class="col-12 col-sm-6">
                            <q-input v-model="suiteBookingModel.checkOutDate" label="Check Out Date" outlined rounded
                                class="booking-input" :rules="[
                                    () => $validateField(suiteBookingModel, 'checkOutDate'),
                                ]" readonly>
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                            <q-date v-model="suiteBookingModel.checkOutDate" mask="YYYY-MM-DD"
                                                today-btn />
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>

                        <!-- Adults -->
                        <div class="col-12 col-sm-6">
                            <q-select v-model="suiteBookingModel.noOfAdults" :options="[1, 2, 3, 4, 5]" label="Adult"
                                outlined rounded class="booking-input" :rules="[
                                    () => $validateField(suiteBookingModel, 'noOfAdults'),
                                ]" />
                        </div>

                        <!-- Children -->
                        <div class="col-12 col-sm-6">
                            <q-select v-model="suiteBookingModel.noOfChhildren" :options="[0, 1, 2, 3, 4]"
                                label="Children" outlined rounded class="booking-input" :rules="[
                                    () => $validateField(suiteBookingModel, 'noOfChhildren'),
                                ]" />
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
                                            {{ currentSelectedPriceOption?.description || '' }}
                                        </q-tooltip>
                                    </q-chip>
                                    <q-select class="col" v-model="selectedRoomPriceId" :options="priceSelectOptions"
                                        dense options-dense outlined rounded emit-value map-options />
                                </div>

                            </div>
                            <div class="col-12 col-sm-6">
                                <div class="text-subtitle1 q-mb-md">Room Price</div>
                                <div class="row items-center q-gutter-sm col-12 col-md-auto">
                                    <q-input class="col" style="" dense v-model.number="suiteBookingModel.roomsCount"
                                        label="Number of Rooms" outlined rounded type="number" :rules="[
                                            () => $validateField(suiteBookingModel, 'roomsCount'),
                                        ]" />
                                    <q-chip color="primary" text-color="white">
                                        {{ '\u20A6' }}{{ roomPriceComputed.toLocaleString('en-US') }}
                                    </q-chip>
                                </div>
                            </div>


                        </div>

                    </div>

                    <!-- Suite Property Section -->
                    <!-- <div class="q-mt-lg">
                    <div class="text-subtitle1 q-mb-md">Choose from the following Suite Property Section</div>
                    <div class="q-gutter-y-sm">
                        <q-radio v-model="bookingData.selectedSection" val="section_a_room_1"
                            label="Section A Room 1" />
                        <q-radio v-model="bookingData.selectedSection" val="section_a_room_2"
                            label="Section A Room 2" />
                    </div>
                </div> -->
                </q-card-section>

                <q-card-actions align="center" class="q-pa-md">
                    <q-btn label="Book Now" color="primary" class="full-width" rounded style="max-width: 400px"
                        @click="handleBooking" :loading="loading" />
                </q-card-actions>
            </q-form>
        </q-card>

    </q-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { QForm, useQuasar } from 'quasar';
import SuitesModel from '../models/suite.model';
import PriceOption from 'src/models/priceVariation.model';
import SuiteBookingViewModel from 'src/view-models/suiteBooking.view-model';
import SuiteBookingModel from 'src/models/suiteBooking.model';
import { asyncComputed } from '@vueuse/core';
import { isModelValid } from 'src/lib/utils';

const $q = useQuasar();

interface Props {
    currentSuite?: SuitesModel;
    selectedPriceId: string;
    currentSelectedPriceOption: PriceOption | undefined;
    priceSelectOptions: any[] | undefined;
    showModal: boolean;
    serviceProviderName: string;
    currentCategory: string;
}

const props = withDefaults(defineProps<Props>(), {
    showModal: false,
});

const emit = defineEmits(['update:showModal', 'update:selectedPriceId', 'book']);

const phoneCodeIds = ref<{ name: string; id: string }[]>([
    { name: '234', id: '151' },
]);
const formSubmitted = ref(false);
const bookingFormRef = ref<QForm>();

const suiteBookingViewModel = new SuiteBookingViewModel(reactive(new SuiteBookingModel()));
const suiteBookingModel = suiteBookingViewModel.model;

const loading = ref(false);
const selectedRoomPriceId = ref('');
const roomsCount = ref(0);

// Computed
asyncComputed(async () => {
    await suiteBookingModel.validate()
})

const phoneCodeIdOptions = computed(() => {
    return phoneCodeIds.value.map((code) => ({
        label: code.name,
        value: code.id,
    }));
});

const roomPriceComputed = computed(() => {
    return (props.currentSelectedPriceOption?.price || 0) * suiteBookingModel.roomsCount;
})

const showModal = computed({
    get: () => props.showModal,
    set: (value) => emit('update:showModal', value)
});

// Methods
const handleBooking = async () => {

    if (!isModelValid(suiteBookingModel)) {
        await bookingFormRef.value?.validate();
        return;
    }

    try {
        loading.value = true;
        // Here you would typically make an API call to your booking endpoint
        // await bookingSuiteService.createBooking(bookingData);

        $q.notify({
            color: 'positive',
            message: 'Booking submitted successfully'
        });

        // emit('book', bookingData);
        formSubmitted.value = true;
        showModal.value = false;
    } catch (error) {
        $q.notify({
            color: 'negative',
            message: 'Failed to submit booking'
        });
    } finally {
        loading.value = false;
    }
};

// Watchers
watch(() => props.selectedPriceId, (newVal) => {
    selectedRoomPriceId.value = String(newVal);
})

watch(selectedRoomPriceId, (newVal) => {
    suiteBookingModel.priceOptionId = newVal;
    emit('update:selectedPriceId', newVal)
});

watch(() => props.currentSuite, (newVal) => {
    if (newVal) {
        suiteBookingModel.suitePropertyId = newVal.id;
    }
});

// hooks
onMounted(() => {
    // suiteBookingModel.priceOptionId = props.selectedPriceId;
    // suiteBookingModel.suitePropertyId = props.currentSuite?.id;
    suiteBookingModel.firstName = suiteBookingViewModel.currentUser?.userData?.firstName || 'Please, enter your name.'
    suiteBookingModel.lastName = suiteBookingViewModel.currentUser?.userData?.lastName || 'Please, enter your name.';
    suiteBookingModel.email = suiteBookingViewModel.currentUser?.userData?.email || 'Please, enter your email.';
    suiteBookingModel.phone = suiteBookingViewModel.currentUser?.userData?.phone || 'Please, enter your phone number.';
    suiteBookingModel.phoneCodeId = suiteBookingViewModel.currentUser?.userData?.phoneCodeId || 'Please, enter your phone number.';
});
</script>

<style scoped>
.booking-modal {
    border-radius: 12px;
}

.booking-input {
    width: 100%;
}

:deep(.q-field) {
    font-size: 14px;
}
</style>