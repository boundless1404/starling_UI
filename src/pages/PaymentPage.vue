<template>
  <q-page padding class="bg-grey-1">
    <q-card class="full-width" flat bordered sty>
      <q-card-section>
        <div class="text-h6 text-center">Checkout Payment</div>
      </q-card-section>

      <!-- Booking Summary -->
      <q-separator spaced />
      <q-card-section class="full-width">
        <div class="text-h7 text-bold full-width">Booking Summary</div>

        <div class="q-mt-lg">
          <!-- Suites Apartments -->
          <q-expansion-item default-opened icon="apartment" label="Suites" header-class="text-subtitle1 text-center"
            header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);">
            <div class="q-pa-md" style="width: 100%;">
              <template v-if="suiteBooking?.length">
                <div class="" v-for="suite in suiteBooking" :key="suite.id">
                  <div class="" style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="col-2">
                      <q-img :src="getServiceOffer(suite.suitePropertyId)?.files?.[0].url" width="120px"
                        height="80px" />
                    </div>
                    <div class="col-2">
                      <q-chip class="text-subtitle2">{{ getServiceOffer(suite.suitePropertyId)?.name }}</q-chip>
                    </div>
                    <div class="col-2">
                      <q-chip class="text-subtitle2">{{ getServiceOffer(suite.suitePropertyId)?.type || [] }}</q-chip>
                    </div>
                    <div class="flex column justify-start col-2">
                      <div><q-chip class="bg-sectwo"><q-chip class="bg-primary text-white">Check In Date</q-chip>{{
                        suite.checkInDate }}</q-chip></div>
                      <div><q-chip class="bg-sectwo"><q-chip class="bg-primary text-white">Check out Date</q-chip>{{
                        suite.checkOutDate }}</q-chip></div>
                    </div>
                    <div class="text-primary text-bold col-2">
                      <q-chip class="bg-sectwo text-subtitle1 q-px-xl">{{ '\u20A6'
                        }}{{ suite.price.toLocaleString('en-US') }}</q-chip>
                    </div>
                    <div >
                      <q-btn class="q-pa-none" round icon="cancel" color="negative"
                        @click="removeBooking('suiteBooking', suite.id)" />
                    </div>
                  </div>
                </div>
              </template>
              <!-- <template v-else>
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
              </template> -->

            </div>
          </q-expansion-item>
          <!-- Car Hire -->
          <q-expansion-item default-opened icon="directions_car" label="Car Hire"
            header-class="text-subtitle1 text-center"
            header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);">
            <div class="q-pa-md" style="width: 100%;">
              <template v-if="autoBooking?.length">
                <div class="" v-for="auto in autoBooking" :key="auto.id">
                  <div class="" style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="col-2 offset-1">
                      <q-img :src="getServiceOffer(auto.serviceOfferId)?.files?.[0].url" width="120px" height="80px" />
                    </div>
                    <div class="col-2">
                      <q-chip class="text-subtitle2">{{ getServiceOffer(auto.serviceOfferId)?.name }}</q-chip>
                    </div>
                    <div class="col-2">
                      <q-chip class="text-subtitle2">{{ getServiceOffer(auto.serviceOfferId)?.type || [] }}</q-chip>
                    </div>
                    <div class="flex column justify-start col-2">
                      <div><q-chip class="bg-sectwo"><q-chip class="bg-primary text-white">Start Date</q-chip>{{
                        auto.startDate }}</q-chip></div>
                      <div><q-chip class="bg-sectwo"><q-chip class="bg-primary text-white">End Date</q-chip>{{
                        auto.endDate }}</q-chip></div>
                    </div>
                    <div class="text-primary text-bold col-2">
                      <q-chip class="bg-sectwo text-subtitle1 q-px-xl">{{ '\u20A6'
                        }}{{ auto.price.toLocaleString('en-US') }}</q-chip>
                    </div>
                    <div >
                      <q-btn class="q-pa-none" round icon="cancel" color="negative"
                        @click="removeBooking('autoBooking', auto.id)" />
                    </div>
                  </div>
                </div>
              </template>
              <!-- <template v-else>
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
              </template> -->

            </div>
          </q-expansion-item>

          <!-- Visa -->
          <q-expansion-item default-opened icon="article" label="Visa" header-class="text-subtitle1 text-center"
            header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);">
            <div class="row q-col-gutter-sm q-pa-md">
              <template v-if="visaBooking?.length">
                <div class="full-width" v-for="visa in visaBooking" :key="visa.id">
                  <div class="full-width" style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="col-2">
                      <q-img :src="getServiceOffer(visa.serviceOfferId)?.files?.[0].url" width="120px" height="80px" />
                    </div>
                    <div class="col-2">
                      <q-chip class="text-subtitle2">{{ getServiceOffer(visa.serviceOfferId)?.name }}</q-chip>
                    </div>
                    <div class="col-2">
                      <q-chip class="text-subtitle2">{{ getServiceOffer(visa.serviceOfferId)?.type || [] }}</q-chip>
                    </div>
                    <div class="text-primary text-bold col-2">
                      <q-chip class="bg-sectwo text-subtitle1 q-px-xl">{{ '\u20A6'
                        }}{{ visa.price.toLocaleString('en-US') }}</q-chip>
                    </div>
                    <div>
                      <q-btn class="q-pa-none" round icon="cancel" color="negative"
                        @click="removeBooking('visaBooking', visa.id)" />
                    </div>
                  </div>
                </div>
              </template>
              <!-- <template v-else>
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
              </template> -->
            </div>
          </q-expansion-item>

          <!-- Tour -->
          <q-expansion-item default-opened icon="tour" label="Tour" header-class="text-subtitle1 text-center"
            header-style="background-color: hsl(197, 70%, 41%, 20%); color: hsl(197, 70%, 30%);">
            <div class="q-pa-md">
              <template v-if="tourBooking?.length">
                <div class="full-width" v-for="tour in tourBooking" :key="tour.id">
                  <div class="full-width" style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="col-2">
                      <q-img :src="getServiceOffer(tour.serviceOfferId)?.files?.[0]?.url" width="120px" height="80px" />
                    </div>
                    <div class="col-3">
                      <q-chip class="text-subtitle2">{{ getServiceOffer(tour.serviceOfferId)?.name }}</q-chip>
                    </div>
                    <div class="col-2">
                      <q-chip class="text-subtitle2">{{ getServiceOffer(tour.serviceOfferId)?.type || [] }}</q-chip>
                    </div>
                    <div class="flex col-2">
                      <div><q-chip class="bg-sectwo"><q-chip class="bg-primary text-white">Start Date</q-chip>{{
                        tour.date }}</q-chip></div>
                    </div>
                    <div class="text-primary text-bold col-2">
                      <q-chip class="bg-sectwo text-subtitle1 q-px-xl">{{ '\u20A6'
                        }}{{ tour.price.toLocaleString('en-US') }}</q-chip>
                    </div>
                    <div>
                      <q-btn class="q-pa-none" round icon="cancel" color="negative"
                        @click="removeBooking('tourBooking', tour.id)" />
                    </div>
                  </div>
                </div>
              </template>
              <!-- <template v-else>
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
              </template> -->
            </div>
          </q-expansion-item>
        </div>

      </q-card-section>
      <q-card-section class="flex justify-between q-pa-lg full-width">
        <q-btn class="bg-sectwo q-pa-md" dense rounded icon="arrow_back" href="/services" label="Continue Booking" />

        <div>
          
        <q-chip class="bg-sectwo cursor-pointer q-py-md text-h5" rounded><q-chip
            class="bg-primary text-white q-pa-md">Total
            :</q-chip>
          <span>{{ '₦' + currentBookingCost.toLocaleString('en-US') }}</span></q-chip>
          <q-chip v-show="currencySymbol === '$'" class="bg-sectwo q-pa-lg">Price in USD<q-chip class="bg-accent text-white text-h6">{{ currencySymbol + currentBookingCostUSD.toLocaleString('en-US') }}</q-chip></q-chip>
        </div>
      </q-card-section>

      <!-- Payment Form -->
      <q-separator spaced />
      <q-card-section class="full-width">
        <div class="text-h7 text-bold">Payment Details</div>
        <q-form @submit.prevent="" ref="paymentFormRef" class="full-width">

          <!-- Currency Selection -->
          <div class="q-mb-md">
            <div class="text-subtitle2">Choose Currency</div>
            <q-radio v-model="paymentModel.currency" val="NGN" label="NAIRA (₦)" />
            <q-radio v-model="paymentModel.currency" val="USD" label="USD ($)" />
          </div>
          
          <!-- Card Number -->
          <!-- <q-input filled v-model="paymentModel.cardNumber" label="Card Number" mask="#### #### #### ####"
            hint="Enter your 16-digit card number" lazy-rules
            :rules="[val => val?.length === 19 || 'Invalid card number']" /> -->

          <!-- Expiry Date and CVV -->
          <!-- <div class="row q-col-gutter-md">
            <q-input class="col" filled v-model="paymentModel.expiryDate" label="Expiry Date" mask="##/##" hint="MM/YY"
              lazy-rules :rules="[val => /^[0-1][0-9]\/[0-9]{2}$/.test(val) || 'Invalid date']" />
            <q-input class="col" filled v-model="paymentModel.cvv" label="CVV" type="password" mask="###"
              hint="3-digit code" lazy-rules :rules="[val => val?.length === 3 || 'Invalid CVV']" />
          </div> -->

          <!-- Cardholder Name -->
          <!-- <q-input filled v-model="paymentModel.cardHolderName" label="Cardholder Name"
            hint="Enter the name as it appears on the card" lazy-rules :rules="[val => !!val || 'Name is required']" /> -->

          <!-- Submit Button -->

          <div class="full-width text-center">
            <q-btn class="q-pa-md" color="primary" rounded @click="handlePaystackPayment">
              <q-spinner v-if="isProcessing" class="q-mr-sm" color="white" size="2em" />
              <q-icon v-else name="payment" size="2em" />
              Make Payment
            </q-btn>
          </div>

        </q-form>
      </q-card-section>

    </q-card>
  </q-page>
</template>
<script setup lang="ts">
import { ref, reactive, computed, onMounted, watchEffect, watch } from 'vue';
import { QForm, QSpinnerGears, useQuasar } from 'quasar';
import BookingsModel from 'src/models/bookingsModel.model';
import BookingsViewModel from 'src/view-models/bookings.view-model';
import { HospitalityBookings, ServiceOffer, ServiceOfferPriceOption } from 'src/lib/types';
import PriceOption from 'src/models/priceVariation.model';
import { SuiteBookingComponentProps } from 'src/components/SuiteBookingComponent.vue';
import PaymentViewModel from 'src/view-models/payment.view-model';
import PaymentModel from 'src/models/paymentModel.model';
import { asyncComputed } from '@vueuse/core';
import { isModelValid } from 'src/lib/utils';
import { useRouter } from 'vue-router';

export type BookingComponentName = 'suiteBooking' | 'autoBooking' | 'visaBooking' | 'tourBooking';
const $q = useQuasar();
const $router = useRouter();

interface BookingComponentProps {
  suiteBookingComponentProps?: SuiteBookingComponentProps
  offerBookingComponentProps?: OfferBookingProps;
  currentBookingComponentName: BookingComponentName;
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

const props = defineProps<BookingComponentProps>();

//#region view models

const bookingsViewModel = new BookingsViewModel(reactive(new BookingsModel()));

const paymentViewModel = new PaymentViewModel(reactive(new PaymentModel()));
const paymentModel = paymentViewModel.model;

const serviceOffers = ref<ServiceOffer[]>([]);

//#endregion
//refs
const paymentFormRef = ref<QForm>()
const paymentSuccessful = ref(false);
const isProcessing = ref(false);
const suiteBooking = ref(bookingsViewModel.stores.bookings?.suiteBooking)
const autoBooking = ref(bookingsViewModel.stores.bookings?.autoBooking);
const visaBooking = ref(bookingsViewModel.stores.bookings?.visaBooking);
const tourBooking = ref(bookingsViewModel.stores.bookings?.tourBooking);
const paystackPublicKey = ref('');
const dollarRate = ref(1);

// computed
asyncComputed(async () => {
  await paymentModel.validate?.();
})

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

const currencySymbol = computed(() => {
  return paymentModel.currency === 'NGN' ? '₦' : '$';
});

const currentBookingCostUSD = computed(() => {
  return currentBookingCost.value / dollarRate.value;
});

// asyncComputed(async () => {
//   if (paymentSuccessful.value) {
//     // submit booking to database
//     // clear bookings store
//     await bookingsViewModel.clearBookingStore();
//     paymentSuccessful.value = false;
//   }
// })




// Methods

const handlePaystackPayment = async () => {
  if (!isModelValid(paymentModel)) {
    console.log('model errors', paymentModel.errors);
    $q.notify({
      type: 'negative',
      message: 'Please fill in all the required payment details',
      position: 'top'
    });

    await paymentFormRef.value?.validate();
    return;
  }

  if (paymentModel.amount <= 0) {
    $q.notify({
      type: 'negative',
      message: 'You have not selected any service to book',
      position: 'top'
    });
    return;
  }


  $q.loading.show({
    message: 'Processing Payment',
    spinnerSize: 100,
    spinnerColor: 'primary',
    backgroundColor: 'white',
    spinner: QSpinnerGears
  });

  try { await paymentViewModel.submitBookings(); } catch (err) {
    console.log('error', err);
    $q.notify({
      type: 'negative',
      message: 'An error occurred while processing your payment',
      position: 'top'
    });
    $q.loading.hide();
    return;
  }

  $q.loading.hide();

  const handler = window.PaystackPop.setup({
    key: paystackPublicKey.value, // Replace with your Paystack public key
    email: paymentModel.email,
    amount: 50000,
    // amount: paymentModel.amount,
    currency: paymentModel.currency,
    ref: paymentModel.reference, // Generate unique reference
    callback: (res) => {
      if (res.status === 'success') {
        paymentSuccessful.value = true;
      }
    },
    onClose: () => {
      console.log('Payment Closed');
      isProcessing.value = false;
    },
  });

  handler.openIframe();
};


async function removeBooking<
  T extends keyof Omit<HospitalityBookings, 'currentSubscriberUserId'>
>(type: T, offerBookingId: string) {
  // TODO: implement this
  await bookingsViewModel.removeBooking(type, offerBookingId);
}


// function getImageUrlForServiceOfferWithId(serviceOfferId: string) {
//   return serviceOffers.value.find((so) => so.id === serviceOfferId)?.files?.[0]?.url || 'https://www.motortrend.com/uploads/sites/10/2015/11/2012-toyota-matrix-s-at-hatchback-angular-front.png'
// }

function getServiceOffer(serviceOfferId: string) {
  // console.log('serviceOffers', serviceOffers.value);
  // console.log('serviceOfferId', serviceOfferId);
  const offer = serviceOffers.value.find(serviceOffer => serviceOffer.id === serviceOfferId);
  // console.log('offer', offer);
  return offer;
}

watchEffect(() => {
  paymentModel.amount = currentBookingCost.value;
});

watch(() => paymentModel.currency, () => {
  paymentModel.amount = currentBookingCost.value;
});

watch(() => paymentSuccessful.value, () => {
  bookingsViewModel.clearBookingStore();
  $router.replace('/bookings');
});

// hooks
onMounted(async () => {
  await bookingsViewModel.initializeBookings();
  await bookingsViewModel.stores.serviceWithOffer?.initializeStore();
  serviceOffers.value = await bookingsViewModel.stores.serviceWithOffer?.getAllServiceOffers() || [];
  console.log('currentBookingComponentName', props.currentBookingComponentName);
})

onMounted(async () => {
  const currentuser = paymentViewModel.getCurrentUser()
  paymentModel.email = currentuser?.email || 'Please, Enter a valid email';
  paymentModel.clientSubscriberUserId = currentuser?.id || '';
  paymentModel.currency = 'NGN';
})

onMounted(async () => {
  paystackPublicKey.value = await paymentViewModel.getPaystackPublicKey();
  dollarRate.value = (await paymentViewModel.getDollarRate())?.dollarRate || dollarRate.value;
  console.log('paystackPublicKey', paystackPublicKey.value);
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
.booking-card {
  margin-bottom: 1rem;
}

.q-card {
  margin: auto;
}

.q-input {
  margin-bottom: 1rem;
}

.q-list {
  margin-bottom: 1rem;
}
</style>