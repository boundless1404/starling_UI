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
                            <q-input v-model="suiteBookingModel.client.firstName" label="First Name" outlined rounded
                                class="booking-input" :rules="[() => $validateField(suiteBookingModel, 'firstName')]" />
                        </div>

                        <!-- Last Name -->
                        <div class="col-12 col-sm-6">
                            <q-input v-model="suiteBookingModel.client.lastName" label="Last Name" outlined rounded
                                class="booking-input" :rules="[() => $validateField(suiteBookingModel, 'lastName')]" />
                        </div>

                        <!-- Email -->
                        <div class="col-12 col-sm-6">
                            <q-input v-model="suiteBookingModel.client.email" label="Email" outlined rounded
                                class="booking-input" type="email"
                                :rules="[() => $validateField(suiteBookingModel, 'email')]" />
                        </div>

                        <!-- Phone -->
                        <div class="col-12 col-sm-6">
                            <div class="row">
                                <div class="col-4">
                                    <q-select outlined rounded v-model="suiteBookingModel.client.phoneCodeId"
                                        :options="phoneCodeIdOptions" bg-color="secondary"
                                        :rules="[() => $validateField(suiteBookingModel, 'phoneCodeId')]" emit-value
                                        map-options />
                                </div>
                                <div class="col-8">
                                    <q-input v-model="suiteBookingModel.client.phone" outlined rounded class="booking-input"
                                        type="tel" :rules="[() => $validateField(suiteBookingModel, 'phone')]" />
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
                                class="booking-input" :rules="[() => $validateField(suiteBookingModel, 'checkOutDate')]"
                                readonly>
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
                                outlined rounded class="booking-input"
                                :rules="[() => $validateField(suiteBookingModel, 'noOfAdults')]" />
                        </div>

                        <!-- Children -->
                        <div class="col-12 col-sm-6">
                            <q-select v-model="suiteBookingModel.noOfChhildren" :options="[0, 1, 2, 3, 4]"
                                label="Children" outlined rounded class="booking-input"
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
                                        label="Number of Rooms" outlined rounded type="number"
                                        :rules="[() => $validateField(suiteBookingModel, 'roomsCount')]" />
                                    <q-chip color="primary" text-color="white">
                                        {{ '\u20A6' }}{{ roomPriceComputed.toLocaleString('en-US') }}
                                    </q-chip>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Services Sections -->
                    <div class="q-mt-lg">
                        <!-- Car Hire -->
                        <q-expansion-item group="services" icon="directions_car" label="Car Hire"
                            header-class="text-subtitle1 text-center" header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);">
                            <div class="row q-col-gutter-sm q-pa-md">
                                <template v-if="carHireOptions.length > 0">
                                <div class="col-12 col-sm-6 col-md-3" v-for="carOption in carHireOptions"
                                    :key="carOption.id">
                                    <q-card flat bordered class="text-center" style="cursor: pointer;"
                                        @click="selectCarOption(carOption)">
                                        <q-card-section>
                                            <q-img :src="carOption.image" width="120px" height="80px" />
                                        </q-card-section>
                                        <q-card-section>
                                            <div class="text-subtitle2">{{ carOption.name }}</div>
                                            <div class="text-primary text-bold">{{ '\u20A6' }}{{
                                                carOption.price.toLocaleString('en-US') }}
                                            </div>
                                        </q-card-section>
                                    </q-card>
                                </div>
                            </template>
                            <!-- an empty state -->
                            <template v-else>
                                <div class="col-12 col-sm-6 col-md-3 full-width flex flex-center">
                                    <q-card flat bordered class="q-pa-md">
                                        <q-card-section >
                                            <q-icon name="directions_car" size="100px" />
                                        </q-card-section>
                                        <card-section>
                                            <div class="text-subtitle2">No Car Option Available</div>
                                        </card-section>
                                    </q-card>
                                </div>
                            </template>
                                            
                            </div>
                        </q-expansion-item>

                        <!-- Visa -->
                        <q-expansion-item group="services" icon="article" label="Visa" header-class="text-subtitle1 text-center" header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);">
                            <div class="row q-col-gutter-sm q-pa-md">
                                <template v-if="visaOptions.length > 0">
                                <div class="col-12 col-sm-6 col-md-3" v-for="visaOption in visaOptions"
                                    :key="visaOption.id">
                                    <q-card flat bordered class="text-center" style="cursor: pointer;"
                                        @click="selectVisaOption(visaOption)">
                                        <q-card-section>
                                            <div class="text-subtitle2">{{ visaOption.name }}</div>
                                            <div class="text-primary text-bold">{{ '\u20A6' }}{{
                                                visaOption.price.toLocaleString('en-US') }}
                                            </div>
                                        </q-card-section>
                                    </q-card>
                                </div>
                                </template>
                                           <!-- an empty state -->
                            <template v-else>
                                <div class="col-12 col-sm-6 col-md-3 full-width flex flex-center">
                                    <q-card flat bordered class="q-pa-md">
                                        <q-card-section >
                                            <q-icon name="article" size="100px" />
                                        </q-card-section>
                                        <card-section>
                                            <div class="text-subtitle2">No Visa Option Available</div>
                                        </card-section>
                                    </q-card>
                                </div>
                            </template>
                            </div>
                        </q-expansion-item>

                        <!-- Tour -->
                        <q-expansion-item group="services" icon="tour" label="Tour" header-class="text-subtitle1 text-center" header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);">
                            <div class="row q-col-gutter-sm q-pa-md">
                                <template v-if="tourOptions.length > 0">
                                <div class="col-12 col-sm-6 col-md-3" v-for="tourOption in tourOptions"
                                    :key="tourOption.id">
                                    <q-card flat bordered class="text-center" style="cursor: pointer;"
                                        @click="selectTourOption(tourOption)">
                                        <q-card-section>
                                            <div class="text-subtitle2">{{ tourOption.name }}</div>
                                            <div class="text-primary text-bold">{{ '\u20A6' }}{{
                                                tourOption.price.toLocaleString('en-US') }}
                                            </div>
                                        </q-card-section>
                                    </q-card>
                                </div>
                                </template>
                                           <!-- an empty state -->
                            <template v-else>
                                <div class="col-12 col-sm-6 col-md-3 full-width flex flex-center">
                                    <q-card flat bordered class="q-pa-md">
                                        <q-card-section >
                                            <q-icon name="tour" size="100px" />
                                        </q-card-section>
                                        <card-section>
                                            <div class="text-subtitle2">No Tour Option Available</div>
                                        </card-section>
                                    </q-card>
                                </div>
                            </template>
                            </div>
                        </q-expansion-item>
                    </div>

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
import BookingsViewModel from 'src/view-models/bookings.view-model';
import SuiteBookingModel from 'src/models/suiteBooking.model';
import CarHireOption from 'src/models/carHire.model';
import VisaOption from 'src/models/visa.model';
import TourOption from 'src/models/tour.model';
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
    carHireOptions: CarHireOption[];
    visaOptions: VisaOption[];
    tourOptions: TourOption[];
}

const props = withDefaults(defineProps<Props>(), {
    showModal: false,
    carHireOptions: () => [],
    visaOptions: () => [],
    tourOptions: () => [],
});

const emit = defineEmits(['update:showModal', 'update:selectedPriceId', 'book', 'selectCarOption', 'selectVisaOption', 'selectTourOption']);

const phoneCodeIds = ref<{ name: string; id: string }[]>([
    { name: '234', id: '151' },
]);
const formSubmitted = ref(false);
const bookingFormRef = ref<QForm>();

const suiteBookingViewModel = new BookingsViewModel(reactive(new SuiteBookingModel()));
const suiteBookingModel = suiteBookingViewModel.model;

const loading = ref(false);
const selectedRoomPriceId = ref('');
const roomsCount = ref(0);
const selectedCarOption = ref<CarHireOption | null>(null);
const selectedVisaOption = ref<VisaOption | null>(null);
const selectedTourOption = ref<TourOption | null>(null);

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

const selectCarOption = (carOption: CarHireOption) => {
    selectedCarOption.value = carOption;
    emit('selectCarOption', carOption);
}

const selectVisaOption = (visaOption: VisaOption) => {
    selectedVisaOption.value = visaOption;
    emit('selectVisaOption', visaOption);
}

const selectTourOption = (tourOption: TourOption) => {
    selectedTourOption.value = tourOption;
    emit('selectTourOption', tourOption);
}

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
    suiteBookingModel.client.firstName = suiteBookingViewModel.currentUser?.userData?.firstName || 'Please, enter your name.'
    suiteBookingModel.client.lastName = suiteBookingViewModel.currentUser?.userData?.lastName || 'Please, enter your name.';
    suiteBookingModel.client.email = suiteBookingViewModel.currentUser?.userData?.email || 'Please, enter your email.';
    suiteBookingModel.client.phone = suiteBookingViewModel.currentUser?.userData?.phone || 'Please, enter your phone number.';
    suiteBookingModel.checkInDate = new Date().toISOString().split('T')[0];  // Set today's date as the default check-in date
    suiteBookingModel.checkOutDate = new Date(new Date().getTime() + 86400000).toISOString().split('T')[0]; // Set check-out date as one day after the check-in date
    suiteBookingModel.noOfAdults = 1; // Default number of adults
    suiteBookingModel.noOfChhildren = 0; // Default number of children
    suiteBookingModel.roomsCount = 1; // Default number of rooms
});

// Helper function to validate a specific field in the model
const $validateField = (model: any, field: string) => {
    const value = model[field];
    if (!value || (typeof value === 'string' && value.trim() === '')) {
        return `The ${field} field is required.`;
    }
    return true;
};

// Optional method to compute total cost including optional selections
const calculateTotalCost = computed(() => {
    let totalCost = roomPriceComputed.value;
    if (selectedCarOption.value) {
        totalCost += selectedCarOption.value.price;
    }
    if (selectedVisaOption.value) {
        totalCost += selectedVisaOption.value.price;
    }
    if (selectedTourOption.value) {
        totalCost += selectedTourOption.value.price;
    }
    return totalCost;
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