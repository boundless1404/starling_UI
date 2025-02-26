<template>
  <q-dialog v-model="showModalBookingModal" :persistent="formSubmitted">
    <q-card class="booking-modal" style="min-width: 60vw; max-width: 80vw">
      <q-card-section class="text-h6 text-left text-bold">{{
        bookingModalTitle
      }}</q-card-section>
      <template
        v-if="
          currentBookingComponentName === 'suiteBooking' &&
          suiteBookingComponentProps
        "
      >
        <suite-booking-component
          v-bind="suiteBookingComponentProps"
          @update:selected-price-id="(value: string) => $emit('update:selectedPriceId', value)"
        />
      </template>
      <template
        v-else-if="
          currentBookingComponentName === 'autoBooking' &&
          offerBookingComponentProps
        "
      >
        <auto-booking-component
          v-bind="{...offerBookingComponentProps, serviceOffers: offerBookingComponentProps.serviceOffer}" :service-offer="offerBookingComponentProps.serviceOffer"
          @update:show-modal="(value) => $emit('update:showModal', value)"
        />
      </template>
      <template
        v-else-if="
          currentBookingComponentName === 'visaBooking' &&
          offerBookingComponentProps
        "
      >
        <visa-booking-component
          v-bind="offerBookingComponentProps"
          @update:show-modal="(value) => $emit('update:showModal', value)"
        />
      </template>
      <template
        v-else-if="
          currentBookingComponentName === 'tourBooking' &&
          offerBookingComponentProps
        "
      >
        <tour-booking-component
          v-bind="offerBookingComponentProps"
          @update:show-modal="(value) => $emit('update:showModal', value)"
        />
      </template>

    <CurrentBookingComponent v-slot="{currentBooking, autoBooking: autoBookingCost, suiteBooking: suiteBookingCost, visaBooking: visaBookingCost, tourBooking: tourBookingCost }">
      <q-card-section class="flex justify-between q-pa-lg full-width">
        <div>
            <q-btn class="bg-sectwo q-pa-md" dense rounded icon="arrow_back" href="/"  />
        </div>

        <div>
          <div class="q-mb-md">
            <div class="text-subtitle2">Choose Currency</div>
            <q-radio
              v-model="paymentModel.currency"
              val="NGN"
              label="NAIRA (₦)"
            />
            <q-radio
              v-model="paymentModel.currency"
              val="USD"
              label="USD ($)"
              disable
            />
          </div>
         <PaymentComponent :current-booking-cost="currentBooking" :currency="paymentModel.currency" v-slot="{ handlePayment }">
          <q-btn
            class="text-subtitle1 bg-black text-white no-margin"
            dense
            no-caps
            @click="handlePayment"
            :disabled="currentBooking === 0"
            >Make Payment</q-btn
          >
         </PaymentComponent>
        </div>
      </q-card-section>
      <!-- Services Sections -->
      <q-expansion-item
        label="Cart"
        header-style="background-color: black"
        header-class="text-left text-white"
        default-opened
      >
        <template v-slot:header>
          <div class="row justify-between full-width">
            <div class="row items-center">
              <div class="col q-pl-md">Cart</div>
              <div class="col-auto">
                <q-icon name="shopping_cart" :class="[$q.screen.gt.md ? 'icon-lg' : $q.screen.gt.sm ? 'icon-md' : 'icon-sm', 'position-relative']">
                  <q-badge style="position: absolute; top: -10px; right: -10px" color="red" floating v-if="currentBooking > 0" />
                </q-icon>
              </div>
            </div>
            <div>
              <q-chip class="text-subtitle1 text-black bg-white"
                >Total Cost: {{ '\u20A6'
                }}{{ currentBookingCost.toLocaleString('en-US') }}</q-chip
              >
            </div>
          </div>
        </template>
        <div class="q-mt-lg">
        
          <!-- Suites Apartments -->
          <q-expansion-item
            default-opened
            label="Suites"
            header-class="text-subtitle1"
          >
            <template v-slot:header>
              <div
                class="row justify-between full-width sec-bg-purple text-white"
              >
                <div class="row items-center">
                  <div class="col q-pl-md">Suite</div>
                  <div class="col-auto">
                    <q-icon name="apartment"> </q-icon>
                  </div>
                </div>
                <div>
                  <q-chip class="text-subtitle1 text-black bg-white">Suite Booking Cost: {{ '\u20A6' }}{{ suiteBookingCost.toLocaleString('en-US') }}</q-chip>
                </div>
              </div>
            </template>
            <q-table
              :rows="suiteBooking"
              :columns="suiteColumns"
              row-key="id"
              flat
              bordered
              class="q-mt-md"
            >
              <template v-slot:body-cell-image="props">
                <q-td :props="props">
                  <q-img
                    :src="
                      getImageUrlForServiceOfferWithId(
                        props.row.suitePropertyId
                      )
                    "
                    width="120px"
                    height="80px"
                  />
                </q-td>
              </template>
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn
                    round
                    icon="cancel"
                    color="negative"
                    @click="removeBooking('suiteBooking', props.row.id)"
                    :size="$q.screen.gt.md ? '0.8rem' : $q.screen.gt.sm ? '0.6rem' : '0.4rem'"
                    style="width: auto"
                  />
                </q-td>
              </template>
            </q-table>
          </q-expansion-item>
          <!-- Car Hire -->
          <q-expansion-item default-opened header-class="text-subtitle1">
            <template v-slot:header>
              <div
                class="row justify-between full-width sec-bg-purple text-white"
              >
                <div class="row items-center">
                  <div class="col q-pl-md">Auto</div>
                  <div class="col-auto">
                    <q-icon name="directions_car"> </q-icon>
                  </div>
                </div>
                <div>
                  <q-chip class="text-subtitle1 text-black bg-white">Auto Booking Cost: {{ '\u20A6' }}{{ autoBookingCost.toLocaleString('en-US') }}</q-chip>
                </div>
              </div>
            </template>
            <q-table
              :rows="autoBooking"
              :columns="autoColumns"
              row-key="id"
              flat
              bordered
              class="q-mt-md"
            >
              <template v-slot:body-cell-image="props">
                <q-td :props="props">
                  <q-img
                    :src="
                      getImageUrlForServiceOfferWithId(props.row.serviceOfferId)
                    "
                    width="120px"
                    height="80px"
                  />
                </q-td>
              </template>
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn
                  round
                    icon="cancel"
                    color="negative"
                    @click="removeBooking('suiteBooking', props.row.id)"
                    :size="$q.screen.gt.md ? '0.8rem' : $q.screen.gt.sm ? '0.6rem' : '0.4rem'"
                    style="width: auto"
                  />
                </q-td>
              </template>
            </q-table>
          </q-expansion-item>

          <!-- Visa -->
          <q-expansion-item default-opened header-class="text-subtitle1">
            <template v-slot:header>
              <div
                class="row justify-between full-width sec-bg-purple text-white"
              >
                <div class="row items-center">
                  <div class="col q-pl-md">Visa</div>
                  <div class="col-auto">
                    <q-icon name="article"> </q-icon>
                  </div>
                </div>
                <div>
                  <q-chip class="text-subtitle1 text-black bg-white">Visa Booking Cost: {{ '\u20A6' }}{{ visaBookingCost.toLocaleString('en-US') }}</q-chip>
                </div>
              </div>
            </template>
            <q-table
              :rows="visaBooking"
              :columns="visaColumns"
              row-key="id"
              flat
              bordered
              class="q-mt-md"
            >
              <template v-slot:body-cell-image="props">
                <q-td :props="props">
                  <q-img
                    :src="
                      getImageUrlForServiceOfferWithId(props.row.serviceOfferId)
                    "
                    width="120px"
                    height="80px"
                  />
                </q-td>
              </template>
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn
                  round
                    icon="cancel"
                    color="negative"
                    @click="removeBooking('suiteBooking', props.row.id)"
                    :size="$q.screen.gt.md ? '0.8rem' : $q.screen.gt.sm ? '0.6rem' : '0.4rem'"
                    style="width: auto"
                  />
                </q-td>
              </template>
            </q-table>
          </q-expansion-item>

          <!-- Tour -->
          <q-expansion-item
            default-opened
            icon="tour"
            label="Tour"
            header-class="text-subtitle1 text-center"
            header-style="background-color: var(--sec-bg-purple); color: hsl(197, 70%, 30%);"
          >
            <template v-slot:header>
              <div
                class="row justify-between full-width sec-bg-purple text-white"
              >
                <div class="row items-center">
                  <div class="col q-pl-md">Tour</div>

                  <div class="col-auto">
                    <q-icon name="tour"> </q-icon>
                  </div>
                </div>
                <div>
                  <q-chip class="text-subtitle1 text-black bg-white">Tour Booking Cost: {{ '\u20A6' }}{{ tourBookingCost.toLocaleString('en-US') }}</q-chip>
                </div>
              </div>
            </template>
            <q-table
              :rows="tourBooking"
              :columns="tourColumns"
              row-key="id"
              flat
              bordered
              class="q-mt-md"
            >
              <template v-slot:body-cell-image="props">
                <q-td :props="props">
                  <q-img
                    :src="
                      getImageUrlForServiceOfferWithId(props.row.serviceOfferId)
                    "
                    width="120px"
                    height="80px"
                  />
                </q-td>
              </template>
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn
                  round
                    icon="cancel"
                    color="negative"
                    @click="removeBooking('suiteBooking', props.row.id)"
                    :size="$q.screen.gt.md ? '0.8rem' : $q.screen.gt.sm ? '0.6rem' : '0.4rem'"
                    style="width: auto"
                  />
                </q-td>
              </template>
            </q-table>
          </q-expansion-item>
        </div>
      </q-expansion-item>
      </CurrentBookingComponent >
      <!-- <q-card-section class="flex justify-between q-pa-lg full-width">
                <q-btn class="bg-sectwo" dense rounded icon="arrow_back" href="/services" label="Continue Booking" />
                
                <q-btn class="text-subtitle1" color="secondary" dense no-caps icon-right="arrow_forward" rounded
                    to="/payment">Proceed to Payment</q-btn>

            </q-card-section> -->
            
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, inject } from 'vue';
import { useQuasar } from 'quasar';
import BookingsModel from 'src/models/bookingsModel.model';
import BookingsViewModel from 'src/view-models/bookings.view-model';
import SuiteBookingComponent, {
  SuiteBookingComponentProps,
} from './SuiteBookingComponent.vue';
import VisaBookingComponent from './VisaBookingComponent.vue';
import AutoBookingComponent from './AutoBookingComponent.vue';
import TourBookingComponent from './TourBookingComponent.vue';
import {
  HospitalityBookings,
  ServiceOffer,
  ServiceOfferPriceOption,
} from 'src/lib/types';
import PriceOption from 'src/models/priceVariation.model';
import { EventBus } from 'quasar';
import PaymentModel from 'src/models/paymentModel.model';
import PaymentViewModel from 'src/view-models/payment.view-model';
import CurrentBookingComponent from 'src/components/CurrentBookingComponent.vue';
import PaymentComponent from 'src/components/PaymentComponent.vue';
import AutoServiceOfferModel from 'src/models/autoServiceOffer.model';
import TourServiceOfferModel from 'src/models/tourServiceOffer.model';
import VisaServiceOfferModel from 'src/models/visaServiceOffer.mode';

export type BookingComponentName =
  | 'suiteBooking'
  | 'autoBooking'
  | 'visaBooking'
  | 'tourBooking';
const $q = useQuasar();
const eventBus = inject('eventBus') as EventBus;

interface BookingComponentProps {
  suiteBookingComponentProps?: SuiteBookingComponentProps;
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
  serviceOffer:  AutoServiceOfferModel | TourServiceOfferModel | VisaServiceOfferModel | ServiceOffer;
}

const props = withDefaults(defineProps<BookingComponentProps>(), {
  showModal: false,
});

const emit = defineEmits<{
  'update:showModal'?: [value: boolean];
  'update:selectedPriceId'?: [value: string];
}>();

const formSubmitted = ref(false);

//#region view models
const paymentViewModel = new PaymentViewModel(reactive(new PaymentModel()));
const paymentModel = paymentViewModel.model;
const bookingsViewModel = new BookingsViewModel(reactive(new BookingsModel()));
const bookingsModel = bookingsViewModel.model;

const serviceOffers = ref<ServiceOffer[]>([]);

// columns
const suiteColumns = [
  {
    name: 'image',
    required: true,
    label: 'Image',
    align: 'center',
    field: 'image',
    format: (val: string) => `<img src="${val}" width="80" height="80" />`,
  },
  { name: 'name', required: true, label: 'Name', align: 'center', field: 'name' },
  { name: 'price', required: true, label: 'Price', align: 'center', field: 'price' },
  { name: 'checkInDate', required: true, label: 'Check-In Date', align: 'center', field: 'checkInDate' },
  { name: 'checkOutDate', required: true, label: 'Check-Out Date', align: 'center', field: 'checkOutDate' },
  { name: 'noOfAdults', required: true, label: 'No. of Adults', align: 'center', field: 'noOfAdults' },
  { name: 'noOfChildren', required: false, label: 'No. of Children', align: 'center', field: 'noOfChildren' },
  { name: 'roomsCount', required: true, label: 'Rooms Count', align: 'center', field: 'roomsCount' },
  { name: 'actions', required: true, label: 'Actions', align: 'center', field: 'actions' },
];

const autoColumns = [
  {
    name: 'image',
    required: true,
    label: 'Image',
    align: 'center',
    field: 'image',
    format: (val: string) => `<img src="${val}" width="80" height="80" />`,
  },
  { name: 'name', required: true, label: 'Name', align: 'center', field: 'name' },
  { name: 'price', required: true, label: 'Price', align: 'center', field: 'price' },
  { name: 'startDate', required: true, label: 'Start Date', align: 'center', field: 'startDate' },
  { name: 'endDate', required: true, label: 'End Date', align: 'center', field: 'endDate' },
  { name: 'actions', required: true, label: 'Actions', align: 'center', field: 'actions' },
];

const visaColumns = [
  {
    name: 'image',
    required: true,
    label: 'Image',
    align: 'center',
    field: 'image',
    format: (val: string) => `<img src="${val}" width="80" height="80" />`,
  },
  { name: 'name', required: true, label: 'Name', align: 'center', field: 'name' },
  { name: 'price', required: true, label: 'Price', align: 'center', field: 'price' },
  { name: 'actions', required: true, label: 'Actions', align: 'center', field: 'actions' },
];

const tourColumns = [
  {
    name: 'image',
    required: true,
    label: 'Image',
    align: 'center',
    field: 'image',
    format: (val: string) => `<img src="${val}" width="80" height="80" />`,
  },
  { name: 'name', required: true, label: 'Name', align: 'center', field: 'name' },
  { name: 'price', required: true, label: 'Price', align: 'center', field: 'price' },
  { name: 'actions', required: true, label: 'Actions', align: 'center', field: 'actions' },
];

//#endregion
//refs
const suiteBooking = ref(bookingsViewModel.stores.bookings?.suiteBooking);
const autoBooking = ref(bookingsViewModel.stores.bookings?.autoBooking);
const visaBooking = ref(bookingsViewModel.stores.bookings?.visaBooking);
const tourBooking = ref(bookingsViewModel.stores.bookings?.tourBooking);

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
});
const showModalBookingModal = computed({
  get: () => props.showModal,
  set: (value) =>
    (emit as (name: string, value: unknown) => void)('update:showModal', value),
});

const currentBookingCost = computed(() => {
  let cost = 0;
  const suiteBookingOption =
    suiteBooking.value?.reduce((prev, curr) => {
      prev += curr.price;
      return prev;
    }, 0) || 0;

  const autoServiceCost =
    autoBooking.value?.reduce((prev, curr) => {
      prev += curr.price;
      return prev;
    }, 0) || 0;

  const visaCost =
    visaBooking.value?.reduce((prev, curr) => {
      prev += curr.price;
      return prev;
    }, 0) || 0;

  const tourCost =
    tourBooking.value?.reduce((prev, curr) => {
      prev += curr.price;
      return prev;
    }, 0) || 0;

  cost = suiteBookingOption + autoServiceCost + visaCost + tourCost;

  eventBus.emit('cart:updated', cost);
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
  return (
    serviceOffers.value.find((so) => so.id === serviceOfferId)?.files?.[0]
      ?.url ||
    'https://www.motortrend.com/uploads/sites/10/2015/11/2012-toyota-matrix-s-at-hatchback-angular-front.png'
  );
}

function getServiceOffer(serviceOfferId: string) {
  // console.log('serviceOffers', serviceOffers.value);
  // console.log('serviceOfferId', serviceOfferId);
  const offer = serviceOffers.value.find(
    (serviceOffer) => serviceOffer.id === serviceOfferId
  );
  // console.log('offer', offer);
  return offer;
}
// hooks
onMounted(async () => {
  await bookingsViewModel.initializeBookings();
  await bookingsViewModel.stores.serviceWithOffer?.initializeStore();
});

onMounted(async () => {
  console.log('booking component mounted', props.offerBookingComponentProps);
  // console.log('suite booking from booking component: -->', suiteBooking);
  serviceOffers.value =
    (await bookingsViewModel.stores.serviceWithOffer?.getAllServiceOffers()) ||
    [];
  console.log('currentBookingComponentName', props.currentBookingComponentName);
});

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