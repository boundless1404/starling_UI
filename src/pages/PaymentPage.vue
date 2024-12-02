<template>
    <q-page padding class="bg-grey-1">
      <q-card class="q-ma-md q-pa-lg" flat bordered>
        <q-card-section>
          <div class="text-h6 text-center">Checkout Payment</div>
        </q-card-section>
  
        <!-- Booking Summary -->
        <q-separator spaced />
        <q-card-section>
          <div class="text-h7 text-bold">Booking Summary</div>
          <q-list bordered>
            <q-item v-for="booking in bookings" :key="booking.id">
              <q-item-section avatar>
                <q-img :src="getImageUrlForServiceOfferWithId(booking.serviceOfferId)" width="60px" height="60px" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ getServiceOffer(booking.serviceOfferId)?.client.firstName }}</q-item-label>
                <q-item-label caption>
                  {{ booking.startDate }} - {{ booking.endDate }}
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-primary">
                  {{ '\u20A6' }}{{ booking.price.toLocaleString('en-US') }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
  
        <!-- Payment Form -->
        <q-separator spaced />
        <q-card-section>
          <div class="text-h7 text-bold">Payment Details</div>
          <q-form @submit.prevent="processPayment" ref="paymentForm">
            <q-input
              filled
              v-model="paymentDetails.cardNumber"
              label="Card Number"
              mask="#### #### #### ####"
              hint="Enter your 16-digit card number"
              lazy-rules
              :rules="[val => val?.length === 19 || 'Invalid card number']"
            />
  
            <div class="row q-col-gutter-md">
              <q-input
                class="col"
                filled
                v-model="paymentDetails.expiryDate"
                label="Expiry Date"
                mask="##/##"
                hint="MM/YY"
                lazy-rules
                :rules="[val => /^[0-1][0-9]\/[0-9]{2}$/.test(val) || 'Invalid date']"
              />
              <q-input
                class="col"
                filled
                v-model="paymentDetails.cvv"
                label="CVV"
                type="password"
                mask="###"
                hint="3-digit code"
                lazy-rules
                :rules="[val => val?.length === 3 || 'Invalid CVV']"
              />
            </div>
  
            <q-input
              filled
              v-model="paymentDetails.cardHolderName"
              label="Cardholder Name"
              hint="Enter the name as it appears on the card"
              lazy-rules
              :rules="[val => !!val || 'Name is required']"
            />
  
            <!-- Submit Button -->
            <div class="row justify-center q-mt-md">
              <q-btn type="submit" label="Pay Now" color="primary" unelevated :loading="isProcessing" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue';
import useBookingStore from '../stores/booking-store';
import { useQuasar } from 'quasar';

const bookingStore = useBookingStore();
const $q = useQuasar();

// Mock data: Bookings summary
const bookings = bookingStore.autoBooking;

// Reactive state for payment details
const paymentDetails = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardHolderName: ''
});

// Loading state for the payment process
const isProcessing = ref(false);

// Process the payment
const processPayment = async () => {
  if (!paymentDetails.value.cardNumber || !paymentDetails.value.cvv || !paymentDetails.value.expiryDate) {
    $q.notify({
      type: 'negative',
      message: 'Please fill in all the required payment details'
    });
    return;
  }

  try {
    isProcessing.value = true;
    // Simulate payment processing (replace with API call)
    await new Promise(resolve => setTimeout(resolve, 2000));

    $q.notify({
      type: 'positive',
      message: 'Payment processed successfully!'
    });

    // Reset the form
    paymentDetails.value = {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolderName: ''
    };

    // Redirect to success page or clear bookings
    bookingStore.$reset();
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Payment failed. Please try again.'
    });
  } finally {
    isProcessing.value = false;
  }
};

// Utility functions
const getImageUrlForServiceOfferWithId = (id: string) => `/images/services/${id}.jpg`;
const getServiceOffer = (id: string) => bookingStore.getBooking('autoBooking').find(item => item.id === id);
</script>
<style scoped>
.booking-card {
  margin-bottom: 1rem;
}

.q-card {
  max-width: 600px;
  margin: auto;
}

.q-input {
  margin-bottom: 1rem;
}

.q-list {
  margin-bottom: 1rem;
}
</style>
