<template>
    <q-dialog v-model="showModalBookingModal" :persistent="formSubmitted">
        <q-card class="booking-modal" style="min-width: 60vw; max-width: 80vw;">
            <q-card-section class="flex justify-between q-pb-none full-width sticky-top">
                <q-chip class="text-subtitle1 text-white" color="secondary">{{ bookingModalTitle }}</q-chip>
                <!-- current booking cost -->
                <q-chip class="text-subtitle1 bg-sectwo cursor-pointer" rounded><q-chip
                        class="bg-primary text-white">Current Cost:</q-chip>
                    <span>{{
                        '\u20A6' }}{{ currentBookingCost.toLocaleString('en-US') }}</span><q-tooltip
                        class="bg-accent">Checkout</q-tooltip><q-icon class="q-ml-md " name="arrow_forward" /></q-chip>

            </q-card-section>
            <template v-if="currentBookingComponentName === 'suiteBooking' && suiteBookingComponentProps">
                <suite-booking-component v-bind="suiteBookingComponentProps"
                    @update:selected-price-id="(value: string) => $emit('update:selectedPriceId', value)" />
            </template>
            <template v-else-if="currentBookingComponentName === 'autoBooking' && offerBookingComponentProps">
                <auto-booking-component v-bind="offerBookingComponentProps"
                    @update:show-modal="(value) => $emit('update:showModal', value)" />
            </template>
            <template v-else-if="currentBookingComponentName === 'visaBooking' && offerBookingComponentProps">
                <visa-booking-component v-bind="offerBookingComponentProps"
                    @update:show-modal="(value) => $emit('update:showModal', value)" />
            </template>
            <template v-else-if="currentBookingComponentName === 'tourBooking' && offerBookingComponentProps">
                <tour-booking-component v-bind="offerBookingComponentProps"
                    @update:show-modal="(value) => $emit('update:showModal', value)" />
            </template>
            <!-- Services Sections -->
            <div class="q-mt-lg">
                <!-- Suites Apartments -->
                <q-expansion-item tour icon="apartment" label="Suites" header-class="text-subtitle1 text-center"
                    header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);">
                    <div class="q-pa-md" style="width: 100%;">
                        <template v-if="suiteBooking?.length">
                            <div class="" v-for="suite in suiteBooking" :key="suite.id">
                                <div class=""
                                    style="display: flex; justify-content: space-between; align-items: center;">
                                    <div class="col-2">
                                        <q-img :src="getImageUrlForServiceOfferWithId(suite.suitePropertyId)"
                                            width="120px" height="80px" />
                                    </div>
                                    <div class="col-2">
                                        <q-chip class="text-subtitle2">{{ getServiceOffer(suite.suitePropertyId)?.name
                                            }}</q-chip>
                                    </div>
                                    <div class="col-2">
                                        <q-chip class="text-subtitle2">{{ getServiceOffer(suite.suitePropertyId)?.type
                                            || [] }}</q-chip>
                                    </div>
                                    <div class="flex column justify-start col-2">
                                        <div><q-chip class="bg-sectwo"><q-chip class="bg-primary text-white">Check In
                                                    Date</q-chip>{{ suite.checkInDate }}</q-chip></div>
                                        <div><q-chip class="bg-sectwo"><q-chip class="bg-primary text-white">Check out
                                                    Date</q-chip>{{ suite.checkOutDate }}</q-chip></div>
                                    </div>
                                    <div class="text-primary text-bold col-2">
                                        <q-chip class="bg-sectwo text-subtitle1 q-px-xl">{{ '\u20A6'
                                            }}{{ suite.price.toLocaleString('en-US') }}</q-chip>
                                    </div>
                                    <div class="self-start">
                                        <q-btn class="q-pa-none" round icon="cancel" color="negative"
                                            @click="removeBooking('suiteBooking', suite.id)" />
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="col-12 col-sm-6 col-md-3 full-width flex flex-center">
                                <q-card flat bordered class="q-pa-md">
                                    <q-card-section>
                                        <q-icon name="apartment" size="100px" />
                                    </q-card-section>
                                    <card-section>
                                        <div class="text-subtitle2">You have not booked any suite</div>
                                    </card-section>
                                </q-card>
                            </div>
                        </template>

                    </div>
                </q-expansion-item>
                <!-- Car Hire -->
                <q-expansion-item tour icon="directions_car" label="Car Hire" header-class="text-subtitle1 text-center"
                    header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);">
                    <div class="q-pa-md" style="width: 100%;">
                        <template v-if="autoBooking?.length">
                            <div class="" v-for="auto in autoBooking" :key="auto.id">
                                <div class=""
                                    style="display: flex; justify-content: space-between; align-items: center;">
                                    <div class="col-2 offset-1">
                                        <q-img :src="getImageUrlForServiceOfferWithId(auto.serviceOfferId)"
                                            width="120px" height="80px" />
                                    </div>
                                    <div class="col-2">
                                        <q-chip class="text-subtitle2">{{ getServiceOffer(auto.serviceOfferId)?.name
                                            }}</q-chip>
                                    </div>
                                    <div class="col-2">
                                        <q-chip class="text-subtitle2">{{ getServiceOffer(auto.serviceOfferId)?.type ||
                                            [] }}</q-chip>
                                    </div>
                                    <div class="flex column justify-start col-2">
                                        <div><q-chip class="bg-sectwo"><q-chip class="bg-primary text-white">Start
                                                    Date</q-chip>{{ auto.startDate }}</q-chip></div>
                                        <div><q-chip class="bg-sectwo"><q-chip class="bg-primary text-white">End
                                                    Date</q-chip>{{ auto.endDate }}</q-chip></div>
                                    </div>
                                    <div class="text-primary text-bold col-2">
                                        <q-chip class="bg-sectwo text-subtitle1 q-px-xl">{{ '\u20A6'
                                            }}{{ auto.price.toLocaleString('en-US') }}</q-chip>
                                    </div>
                                    <div class="self-start">
                                        <q-btn class="q-pa-none" round icon="cancel" color="negative"
                                            @click="removeBooking('autoBooking', auto.id)" />
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="col-12 col-sm-6 col-md-3 full-width flex flex-center">
                                <q-card flat bordered class="q-pa-md">
                                    <q-card-section>
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
                <q-expansion-item tour icon="article" label="Visa" header-class="text-subtitle1 text-center"
                    header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);">
                    <div class="row q-col-gutter-sm q-pa-md">
                        <template v-if="visaBooking?.length">
                            <div class="full-width" v-for="visa in visaBooking" :key="visa.id">
                                <div class="full-width"
                                    style="display: flex; justify-content: space-between; align-items: center;">
                                    <div class="col-2">
                                        <q-img :src="getImageUrlForServiceOfferWithId(visa.serviceOfferId)"
                                            width="120px" height="80px" />
                                    </div>
                                    <div class="col-2">
                                        <q-chip class="text-subtitle2">{{ getServiceOffer(visa.serviceOfferId)?.name
                                            }}</q-chip>
                                    </div>
                                    <div class="col-2">
                                        <q-chip class="text-subtitle2">{{ getServiceOffer(visa.serviceOfferId)?.type ||
                                            [] }}</q-chip>
                                    </div>
                                    <div class="text-primary text-bold col-2">
                                        <q-chip class="bg-sectwo text-subtitle1 q-px-xl">{{ '\u20A6'
                                            }}{{ visa.price.toLocaleString('en-US') }}</q-chip>
                                    </div>
                                    <div class="self-start">
                                        <q-btn class="q-pa-none" round icon="cancel" color="negative"
                                            @click="removeBooking('visaBooking', visa.id)" />
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="col-12 col-sm-6 col-md-3 full-width flex flex-center">
                                <q-card flat bordered class="q-pa-md">
                                    <q-card-section>
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
                <q-expansion-item tour icon="tour" label="Tour" header-class="text-subtitle1 text-center"
                    header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);">
                    <div class="q-pa-md">
                        <template v-if="tourBooking?.length">
                            <div class="full-width" v-for="tour in tourBooking" :key="tour.id">
                                <div class="full-width"
                                    style="display: flex; justify-content: space-between; align-items: center;">
                                    <div class="col-2">
                                        <q-img :src="getImageUrlForServiceOfferWithId(tour.serviceOfferId)"
                                            width="120px" height="80px" />
                                    </div>
                                    <div class="col-3">
                                        <q-chip class="text-subtitle2">{{ getServiceOffer(tour.serviceOfferId)?.name
                                            }}</q-chip>
                                    </div>
                                    <div class="col-2">
                                        <q-chip class="text-subtitle2">{{ getServiceOffer(tour.serviceOfferId)?.type ||
                                            [] }}</q-chip>
                                    </div>
                                    <div class="flex col-2">
                                        <div><q-chip class="bg-sectwo"><q-chip class="bg-primary text-white">Start
                                                    Date</q-chip>{{ tour.date }}</q-chip></div>
                                    </div>
                                    <div class="text-primary text-bold col-2">
                                        <q-chip class="bg-sectwo text-subtitle1 q-px-xl">{{ '\u20A6'
                                            }}{{ tour.price.toLocaleString('en-US') }}</q-chip>
                                    </div>
                                    <div class="self-start">
                                        <q-btn class="q-pa-none" round icon="cancel" color="negative"
                                            @click="removeBooking('tourBooking', tour.id)" />
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="col-12 col-sm-6 col-md-3 full-width flex flex-center">
                                <q-card flat bordered class="q-pa-md">
                                    <q-card-section>
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
            <q-card-section class="flex justify-between q-pa-lg full-width">
                <q-btn class="bg-sectwo" dense rounded icon="arrow_back" href="/services" label="Continue Booking" />
                <!-- current booking cost -->
                <q-btn class="text-subtitle1" color="secondary" dense no-caps icon-right="arrow_forward" rounded
                    to="/payment">Proceed to Payment</q-btn>

            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import BookingsModel from 'src/models/bookingsModel.model';
import BookingsViewModel from 'src/view-models/bookings.view-model';
import SuiteBookingComponent, { SuiteBookingComponentProps } from './SuiteBookingComponent.vue';
import VisaBookingComponent from './VisaBookingComponent.vue';
import AutoBookingComponent from './AutoBookingComponent.vue';
import TourBookingComponent from './TourBookingComponent.vue';
import { HospitalityBookings, ServiceOffer, ServiceOfferPriceOption } from 'src/lib/types';
import PriceOption from 'src/models/priceVariation.model';

export type BookingComponentName = 'suiteBooking' | 'autoBooking' | 'visaBooking' | 'tourBooking';
const $q = useQuasar();

interface BookingComponentProps {
    suiteBookingComponentProps?: SuiteBookingComponentProps
    offerBookingComponentProps?: OfferBookingProps;
    currentBookingComponentName: BookingComponentName;
    showModal: boolean;
}

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

const props = withDefaults(defineProps<BookingComponentProps>(), {
    showModal: false,
});

const emit = defineEmits<{
    'update:showModal'?: [value: boolean]
    'update:selectedPriceId'?: [value: string]
}>()




const formSubmitted = ref(false);

//#region view models

const bookingsViewModel = new BookingsViewModel(reactive(new BookingsModel()));
const bookingsModel = bookingsViewModel.model;

const serviceOffers = ref<ServiceOffer[]>([]);

//#endregion
//refs
const suiteBooking = ref(bookingsViewModel.stores.bookings?.suiteBooking)
const autoBooking = ref(bookingsViewModel.stores.bookings?.autoBooking);
const visaBooking = ref(bookingsViewModel.stores.bookings?.visaBooking)
const tourBooking = ref(bookingsViewModel.stores.bookings?.tourBooking)

// Computed
const bookingModalTitle = computed(() => {
    switch (props.currentBookingComponentName) {
        case 'suiteBooking':
            return 'Suite Booking';
        case 'autoBooking':
            return 'Auto Booking';
        case 'visaBooking':
            return 'Visa Booking';
        case 'tourBooking':
            return 'Tour Booking';
        default:
            return 'Booking';
    }
})
const showModalBookingModal = computed({
    get: () => props.showModal,
    set: (value) => (emit as (name: string, value: unknown) => void)('update:showModal', value)
});

const currentBookingCost = computed(() => {
    let cost = 0;
    const suiteBookingOption = suiteBooking.value?.reduce((prev, curr) => {
        prev += curr.price;
        return prev;
    }, 0) || 0;

    const autoServiceCost = autoBooking.value?.reduce((prev, curr) => {
        prev += curr.price;
        return prev;
    }, 0) || 0;

    const visaCost = visaBooking.value?.reduce((prev, curr) => {
        prev += curr.price;
        return prev;
    }, 0) || 0;

    const tourCost = tourBooking.value?.reduce((prev, curr) => {
        prev += curr.price;
        return prev;
    }, 0) || 0;

    cost = suiteBookingOption + autoServiceCost + visaCost + tourCost;
    return cost;
});




// Methods
async function removeBooking<
    T extends keyof Omit<HospitalityBookings, 'currentSubscriberUserId'>
>(type: T, offerBookingId: string) {
    // TODO: implement this
    await bookingsViewModel.removeBooking(type, offerBookingId);
}
function getImageUrlForServiceOfferWithId(serviceOfferId: string) {
    return serviceOffers.value.find((so) => so.id === serviceOfferId)?.files?.[0]?.url || 'https://www.motortrend.com/uploads/sites/10/2015/11/2012-toyota-matrix-s-at-hatchback-angular-front.png'
}

function getServiceOffer(serviceOfferId: string) {
    // console.log('serviceOffers', serviceOffers.value);
    // console.log('serviceOfferId', serviceOfferId);
    const offer = serviceOffers.value.find(serviceOffer => serviceOffer.id === serviceOfferId);
    // console.log('offer', offer);
    return offer;
}
// hooks
onMounted(async () => {
    await bookingsViewModel.initializeBookings();
    await bookingsViewModel.stores.serviceWithOffer?.initializeStore()
})

onMounted(async () => {
    // console.log('suite booking from booking component: -->', suiteBooking);
    serviceOffers.value = await bookingsViewModel.stores.serviceWithOffer?.getAllServiceOffers() || [];
    console.log('currentBookingComponentName', props.currentBookingComponentName);
})

onMounted(async () => {
    bookingsViewModel.stores.bookings?.$subscribe((mutation, state) => {
        suiteBooking.value = state.suiteBooking;
        autoBooking.value = state.autoBooking;
        visaBooking.value = state.visaBooking;
        tourBooking.value = state.tourBooking;
    });

});

// Helper function to validate a specific field in the model

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