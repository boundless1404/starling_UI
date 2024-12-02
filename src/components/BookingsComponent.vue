<template>
    <q-dialog v-model="showModalBookingModal" :persistent="formSubmitted">
        <q-card class="booking-modal" style="min-width: 60vw; max-width: 80vw;">
            <q-card-section class="flex justify-between q-pb-none full-width sticky-top">
                <q-chip class="text-h6 text-white" color="secondary">{{ bookingModalTitle }}</q-chip>
                <!-- current booking cost -->
                <q-chip class="text-h6 bg-sectwo cursor-pointer" rounded><q-chip class="bg-primary text-white">Current Cost:</q-chip>
                <span>{{
                    '\u20A6' }}{{ currentBookingCost.toLocaleString('en-US') }}</span><q-tooltip class="bg-accent">Checkout</q-tooltip><q-icon class="q-ml-md " name="arrow_forward" /></q-chip>

            </q-card-section>
            <template v-if="currentBookingComponentName === 'suiteBookingComponent' && suiteBookingComponentProps">
                <suite-booking-component v-bind="suiteBookingComponentProps"
                    @update:selected-price-id="(value: string) => $emit('update:selectedPriceId', value)" />
            </template>
            <template v-else-if="currentBookingComponentName === 'autoBookingComponent' && autoBookingComponentProps">
                <auto-booking-component v-bind="autoBookingComponentProps"
                    @update:show-modal="(value) => $emit('update:showModal', value)" />
            </template>
            <!-- Services Sections -->
            <div class="q-mt-lg">
                <!-- Car Hire -->
                <q-expansion-item group="services" icon="directions_car" label="Car Hire"
                    header-class="text-subtitle1 text-center"
                    header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);">
                    <div class="q-pa-md" style="width: 100%;">
                        <template v-if="autoBooking?.length">
                            <div class="" v-for="auto in autoBooking"
                                :key="auto.id">
                                <div class="row col-12 items-center">
                                    <div class="col-2 offset-1">
                                        <q-img :src="getImageUrlForServiceOfferWithId(auto.serviceOfferId)" width="120px" height="80px" />
                                    </div>
                                    <div  class="col-2">
                                        <q-chip class="text-subtitle2">{{ getServiceOffer(auto.serviceOfferId)?.name }}</q-chip>
                                    </div>
                                    <div  class="col-2">
                                        <q-chip class="text-subtitle2">{{ getServiceOffer(auto.serviceOfferId)?.type || [] }}</q-chip>
                                    </div>
                                     <div class="flex column justify-start col-2" >
                                        <div><q-chip class="bg-sectwo"><q-chip class="bg-primary text-white">Start Date</q-chip>{{ auto.startDate }}</q-chip></div>
                                        <div><q-chip class="bg-sectwo"><q-chip class="bg-primary text-white">End Date</q-chip>{{ auto.endDate }}</q-chip></div>
                                     </div>
                                     <div class="text-primary text-bold col-2">
                                        <q-chip class="bg-sectwo text-h6 q-px-xl">{{ '\u20A6' }}{{auto.price.toLocaleString('en-US') }}</q-chip>
                                     </div>
                                     <div class="self-start">
                                        <q-btn class="q-pa-none" round icon="cancel" color="negative" @click="removeBooking('autoBooking', auto.id)" />
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
                <q-expansion-item group="services" icon="article" label="Visa" header-class="text-subtitle1 text-center"
                    header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);">
                    <div class="row q-col-gutter-sm q-pa-md">
                        <template v-if="visaBooking?.length">
                            <div class="col-12 col-sm-6 col-md-3" v-for="visaOption in visaBooking"
                                :key="visaOption.id">
                                <q-card flat bordered class="text-center" style="cursor: pointer;"
                                    @click="console.log('visaOption', visaOption)">
                                    <q-card-section>
                                        <div class="text-subtitle2">{{ '' }}</div>
                                        <div class="text-primary text-bold">{{ '\u20A6' }}{{
                                            visaOption.price.toLocaleString('en-US') }}
                                        </div>
                                    </q-card-section>
                                </q-card>
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
                <q-expansion-item group="services" icon="tour" label="Tour" header-class="text-subtitle1 text-center"
                    header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);">
                    <div class="row q-col-gutter-sm q-pa-md">
                        <template v-if="tourBooking?.length">
                            <div class="col-12 col-sm-6 col-md-3" v-for="tourOption in tourBooking"
                                :key="tourOption.id">
                                <q-card flat bordered class="text-center" style="cursor: pointer;"
                                    @click="console.log('tourOption', tourOption)">
                                    <q-card-section>
                                        <div class="text-subtitle2">{{ '' }}</div>
                                        <div class="text-primary text-bold">{{ '\u20A6' }}{{
                                            tourOption.price.toLocaleString('en-US') }}
                                        </div>
                                    </q-card-section>
                                </q-card>
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
                <q-btn class="text-h6" color="secondary" dense no-caps  icon-right="arrow_forward" rounded to="/payment">Proceed to Payment</q-btn>

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
import { AutoServiceOfferBookingProps } from './AutoBookingComponent.vue';
import AutoBookingComponent from './AutoBookingComponent.vue';

export type BookingComponentName = 'suiteBookingComponent' | 'autoBookingComponent' | 'visaBookingComponent' | 'tourBookingComponent';
const $q = useQuasar();

interface BookingComponentProps {
    suiteBookingComponentProps?: SuiteBookingComponentProps
    autoBookingComponentProps?: AutoServiceOfferBookingProps;
    currentBookingComponentName: BookingComponentName;
    showModal: boolean;
}

const props = withDefaults(defineProps<BookingComponentProps>(), {
    showModal: false,
});

const emit = defineEmits<{
    'update:showModal'?: [value: boolean]
    'update:selectedPriceId'?: [value: string]
}>()

// TODO: remove offer
const serviceOffers = [
    {
      id: 'ch-001',
      name: 'Matrix Car',
      price: '25000',
      type: 'Sedan',
      description: 'Experience luxury and comfort with our premium Matrix Car. Perfect for business trips and special occasions. Includes professional driver and fuel.',
      features: [
        { id: '1', name: 'Air Conditioning', icon: 'ac_unit' },
        { id: '2', name: 'Leather Seats', icon: 'airline_seat_recline_extra' },
        { id: '3', name: 'Bluetooth Audio', icon: 'bluetooth_audio' },
        { id: '4', name: 'GPS Navigation', icon: 'navigation' },
        { id: '5', name: '24/7 Support', icon: 'support_agent' },
        { id: '6', name: 'Free WiFi', icon: 'wifi' },
        { id: '7', name: 'Child Seat Available', icon: 'child_care' },
        { id: '8', name: 'Insurance Included', icon: 'security' },
        { id: '9', name: 'Unlimited Mileage', icon: 'speed' },
        { id: '10', name: 'Professional Driver', icon: 'person' },
        { id: '11', name: 'Fuel Included', icon: 'local_gas_station' },
        { id: '12', name: 'Airport Pickup', icon: 'flight' },
        { id: '13', name: 'Roadside Assistance', icon: 'build' },
        { id: '14', name: 'Multiple Payment Options', icon: 'payment' },
        { id: '15', name: 'Free Cancellation', icon: 'cancel' }
      ]
    },
    {
      id: 'ch-002',
      name: 'Luxury Sedan',
      price: '30000',
      type: 'Sedan',
      description: 'Enjoy a smooth, comfortable ride in our Luxury Sedan, designed for style and performance. Ideal for corporate events or high-end leisure.',
      features: [
        { id: '1', name: 'Leather Seats', icon: 'airline_seat_recline_extra' },
        { id: '2', name: 'Bluetooth Connectivity', icon: 'bluetooth_audio' },
        { id: '3', name: 'GPS Navigation', icon: 'navigation' },
        { id: '4', name: 'Sunroof', icon: 'wb_sunny' },
        { id: '5', name: 'Heated Seats', icon: 'ac_unit' },
        { id: '6', name: 'Premium Audio System', icon: 'speaker' },
        { id: '7', name: 'Satellite Radio', icon: 'radio' },
        { id: '8', name: 'Remote Start', icon: 'play_arrow' },
        { id: '9', name: 'Parking Assistance', icon: 'directions_car' },
        { id: '10', name: 'Luxury Interior', icon: 'king_bed' }
      ]
    },
    {
      id: 'ch-003',
      name: 'Matrix Car',
      type: 'Sedan',
      price: '25000',
      description: 'Experience luxury and comfort with our premium Matrix Car. Perfect for business trips and special occasions. Includes professional driver and fuel.',
      features: [
        { id: '1', name: 'Air Conditioning', icon: 'ac_unit' },
        { id: '2', name: 'Leather Seats', icon: 'airline_seat_recline_extra' },
        { id: '3', name: 'Bluetooth Audio', icon: 'bluetooth_audio' },
        { id: '4', name: 'GPS Navigation', icon: 'navigation' },
        { id: '5', name: '24/7 Support', icon: 'support_agent' },
        { id: '6', name: 'Free WiFi', icon: 'wifi' },
        { id: '7', name: 'Child Seat Available', icon: 'child_care' },
        { id: '8', name: 'Insurance Included', icon: 'security' },
        { id: '9', name: 'Unlimited Mileage', icon: 'speed' },
        { id: '10', name: 'Professional Driver', icon: 'person' },
        { id: '11', name: 'Fuel Included', icon: 'local_gas_station' },
        { id: '12', name: 'Airport Pickup', icon: 'flight' },
        { id: '13', name: 'Roadside Assistance', icon: 'build' },
        { id: '14', name: 'Multiple Payment Options', icon: 'payment' },
        { id: '15', name: 'Free Cancellation', icon: 'cancel' }
      ]
    },
    {
      id: 'ch-004',
      name: 'Sporty SUV',
      type: 'SUV',
      price: '35000',
      description: 'The Sporty SUV offers the perfect blend of rugged durability and modern luxury. Ideal for outdoor adventures or family trips.',
      features: [
        { id: '1', name: 'All-Wheel Drive', icon: 'directions_car' },
        { id: '2', name: 'GPS Navigation', icon: 'navigation' },
        { id: '3', name: 'Bluetooth Connectivity', icon: 'bluetooth_audio' },
        { id: '4', name: 'Sport Mode', icon: 'sports_score' },
        { id: '5', name: 'Leather Upholstery', icon: 'airline_seat_recline_extra' },
        { id: '6', name: 'Backup Camera', icon: 'camera_alt' },
        { id: '7', name: 'Roof Rack', icon: 'roofing' },
        { id: '8', name: 'Towing Capacity', icon: 'tow' },
        { id: '9', name: 'Panoramic Sunroof', icon: 'wb_sunny' },
        { id: '10', name: 'Heated Steering Wheel', icon: 'ac_unit' },
        { id: '11', name: 'Free Roadside Assistance', icon: 'build' },
        { id: '12', name: 'Advanced Safety Features', icon: 'security' }
      ]
    },
    {
      id: 'ch-005',
      name: 'Matrix Car',
      type: 'Sedan',
      price: '25000',
      description: 'Experience luxury and comfort with our premium Matrix Car. Perfect for business trips and special occasions. Includes professional driver and fuel.',
      features: [
        { id: '1', name: 'Air Conditioning', icon: 'ac_unit' },
        { id: '2', name: 'Leather Seats', icon: 'airline_seat_recline_extra' },
        { id: '3', name: 'Bluetooth Audio', icon: 'bluetooth_audio' },
        { id: '4', name: 'GPS Navigation', icon: 'navigation' },
        { id: '5', name: '24/7 Support', icon: 'support_agent' },
        { id: '6', name: 'Free WiFi', icon: 'wifi' },
        { id: '7', name: 'Child Seat Available', icon: 'child_care' },
        { id: '8', name: 'Insurance Included', icon: 'security' },
        { id: '9', name: 'Unlimited Mileage', icon: 'speed' },
        { id: '10', name: 'Professional Driver', icon: 'person' },
        { id: '11', name: 'Fuel Included', icon: 'local_gas_station' },
        { id: '12', name: 'Airport Pickup', icon: 'flight' },
        { id: '13', name: 'Roadside Assistance', icon: 'build' },
        { id: '14', name: 'Multiple Payment Options', icon: 'payment' },
        { id: '15', name: 'Free Cancellation', icon: 'cancel' }
      ]
    },
    {
      id: 'ch-006',
      name: 'Electric Car',
      type: 'Electric',
      price: '40000',
      description: 'Go green with our Electric Car, offering both sustainability and efficiency. Ideal for eco-conscious drivers who want a modern, smooth driving experience.',
      features: [
        { id: '1', name: 'Zero Emissions', icon: 'cloud' },
        { id: '2', name: 'Fast Charging', icon: 'battery_charging_full' },
        { id: '3', name: 'Bluetooth Audio', icon: 'bluetooth_audio' },
        { id: '4', name: 'Regenerative Braking', icon: 'battery_full' },
        { id: '5', name: 'GPS Navigation', icon: 'navigation' },
        { id: '6', name: 'Heated Seats', icon: 'ac_unit' },
        { id: '7', name: 'Autopilot Mode', icon: 'drive_eta' },
        { id: '8', name: 'Remote Climate Control', icon: 'ac_unit' },
        { id: '9', name: 'Lane Assist', icon: 'directions' },
        { id: '10', name: 'Eco Mode', icon: 'eco' }
      ]
    },
    {
      id: 'ch-007',
      name: 'Matrix Car',
      type: 'Sedan',
      price: '25000',
      description: 'Experience luxury and comfort with our premium Matrix Car. Perfect for business trips and special occasions. Includes professional driver and fuel.',
      features: [
        { id: '1', name: 'Air Conditioning', icon: 'ac_unit' },
        { id: '2', name: 'Leather Seats', icon: 'airline_seat_recline_extra' },
        { id: '3', name: 'Bluetooth Audio', icon: 'bluetooth_audio' },
        { id: '4', name: 'GPS Navigation', icon: 'navigation' },
        { id: '5', name: '24/7 Support', icon: 'support_agent' },
        { id: '6', name: 'Free WiFi', icon: 'wifi' },
        { id: '7', name: 'Child Seat Available', icon: 'child_care' },
        { id: '8', name: 'Insurance Included', icon: 'security' },
        { id: '9', name: 'Unlimited Mileage', icon: 'speed' },
        { id: '10', name: 'Professional Driver', icon: 'person' },
        { id: '11', name: 'Fuel Included', icon: 'local_gas_station' },
        { id: '12', name: 'Airport Pickup', icon: 'flight' },
        { id: '13', name: 'Roadside Assistance', icon: 'build' },
        { id: '14', name: 'Multiple Payment Options', icon: 'payment' },
        { id: '15', name: 'Free Cancellation', icon: 'cancel' }
      ]
    },
    {
      id: 'ch-008',
      name: 'Convertible Roadster',
      type: 'Convertible',
      price: '55000',
      description: 'Feel the wind in your hair with our Convertible Roadster. Perfect for scenic drives and those who love the open road.',
      features: [
        { id: '1', name: 'Convertible Top', icon: 'sunny' },
        { id: '2', name: 'Bluetooth Audio', icon: 'bluetooth_audio' },
        { id: '3', name: 'Leather Seats', icon: 'airline_seat_recline_extra' },
        { id: '4', name: 'Sport Suspension', icon: 'sports_score' },
        { id: '5', name: 'Advanced Audio System', icon: 'speaker' },
        { id: '6', name: 'GPS Navigation', icon: 'navigation' },
        { id: '7', name: 'Rearview Camera', icon: 'camera_alt' },
        { id: '8', name: 'Premium Wheels', icon: 'luggage' },
        { id: '9', name: 'Push-Button Start', icon: 'power_settings_new' },
        { id: '10', name: 'Heated Seats', icon: 'ac_unit' }
      ]
    }
  ]



const formSubmitted = ref(false);

//#region view models

const bookingsViewModel = new BookingsViewModel(reactive(new BookingsModel()));
const bookingsModel = bookingsViewModel.model;

//#endregion
//refs
const suiteBooking = ref(bookingsViewModel.stores.bookings?.suiteBooking)
const autoBooking = ref(bookingsViewModel.stores.bookings?.autoBooking);
const visaBooking = ref(bookingsViewModel.stores.bookings?.visaBooking)
const tourBooking = ref(bookingsViewModel.stores.bookings?.tourBooking)

// Computed
const bookingModalTitle = computed(() => {
    switch (props.currentBookingComponentName) {
        case 'suiteBookingComponent':
            return 'Suite Booking';
        case 'autoBookingComponent':
            return 'Auto Booking';
        case 'visaBookingComponent':
            return 'Visa Booking';
        case 'tourBookingComponent':
            return 'Tour Booking';
        default:
            return 'Booking';
    }
})
const showModalBookingModal = computed({
    get: () => props.showModal,
    set: (value) => (emit as (name: string, value: unknown) => void)('update:showModal', value)
});

const currentBookingComponentProps = computed(() => {
    switch (props.currentBookingComponentName) {
        case 'suiteBookingComponent':
            return props.suiteBookingComponentProps;
        default:
            return props.suiteBookingComponentProps;
    }
})
// const currentBookingComponent = computed(() => {
//     let component: typeof SuiteBookingComponent | null = null;
//     switch (props.currentBookingComponentName) {
//         case 'suiteBookingComponent':
//             component = SuiteBookingComponent;

//     }
//     return component;
// });

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
function removeBooking(type: string, bookingOfferId: string) {
    // TODO: implement this
    // bookingsViewModel.removeAutoBooking(type, bookingOfferId);
}
function getImageUrlForServiceOfferWithId(serviceOfferId: string) {
    //TODO: implement this.
    return 'https://www.motortrend.com/uploads/sites/10/2015/11/2012-toyota-matrix-s-at-hatchback-angular-front.png'
}

function getServiceOffer(serviceOfferId: string) {
    return serviceOffers.find((s) => s.id === serviceOfferId)
}
// hooks
onMounted(async () => {
    await bookingsViewModel.initializeBookings();
})

onMounted(() => {
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