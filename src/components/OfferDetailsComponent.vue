<template>
  <q-card class="apartment-card">
    <q-card-section class="gallery">
      <div class="image-grid">
        <q-img
          v-for="(image, index) in allImages"
          :key="index"
          :src="image.url"
          class="rounded grid-img"
          @click="openImage(image.url)"
        />
      </div>
    </q-card-section>

    <q-card-section>
      <q-tabs v-model="tab" dense class="text-primary">
        <q-tab name="overview" label="Overview" />
        <q-tab name="reviews" label="Customer review" />
      </q-tabs>
    </q-card-section>

    <q-card-section>
      <div class="title-section">
        <div>
          <h4 class="q-mb-none">
            {{ (offer as SuitesModel)?.provider?.name }}
          </h4>
          <div>{{ offer.description }}</div>
          <span v-if="location">
            <q-icon name="place" color="red" /> {{ location.landmark }},
            {{ location.city }}, {{ location.country }}.
          </span>
          <div class="rating">
            <q-rating
              v-model="rating"
              max="5"
              readonly
              size="20px"
              color="yellow"
            />
          </div>
        </div>
        <q-btn label="Book Now" color="black" unelevated @click="bookNow" />
      </div>

      <div class="q-mr-md">
        <h3 class="price">₦{{ priceOptions?.[0].price }}</h3>
      </div>

      <div class="features">
        <q-item v-for="feature in features" :key="feature.name">
          <q-item-section avatar>
            <q-icon :name="feature.icon" />
          </q-item-section>
          <q-item-section>{{ feature.description }}</q-item-section>
        </q-item>
      </div>
    </q-card-section>

    <q-card-section>
      <h5>Add your comment</h5>
      <q-input v-model="comment" filled type="textarea" />
      <q-btn label="Send" color="black" class="q-mt-sm" />
    </q-card-section>

    <q-dialog v-model="imageDialogOpen">
      <q-img :src="selectedImage" class="popup-image" />
    </q-dialog>
  </q-card>
  <auth-dialog
    v-if="dialogOpen"
    :open="dialogOpen"
    :purpose="dialogPurpose"
    @close="closeDialog"
  />
  <template v-if="currentBookingComponentName === 'suiteBooking'">
    <bookings-component
    :show-modal="showBookingModal"
    @update:show-modal="showBookingModal = false"
    v-bind:suite-booking-component-props="{
    currentSuite: serviceOffer,
    selectedPriceId: offer.priceOptions?.[0].id || '',
    currentSelectedPriceOption: offer.priceOptions?.[0],
    priceSelectOptions: offer.priceOptions,
    serviceProviderName: serviceOffer.provider ? serviceOffer.provider.name : '',
    currentCategory: serviceOffer.category,
    suiteBookingModelId: offer.id as string,
  }"
    :current-booking-component-name="currentBookingComponentName"

    
  />
  </template>
  <template v-else>
    <bookings-component
    :show-modal="showBookingModal"
    @update:show-modal="showBookingModal = false"
    v-bind:offer-booking-component-props="{
      serviceOfferId: String(offer.id),
      serviceOfferPriceOptionId: offer.priceOptions?.[0].id,
      priceSelectOptions: offer.priceOptions,
      serviceOfferPrice: offer.priceOptions?.[0].price,
      serviceOffer: offer as AutoServiceOfferModel | TourServiceOfferModel | VisaServiceOfferModel | ServiceOffer,
      currentSelectedPriceOption: offer.priceOptions?.[0],
      serviceOfferProviderName: (offer as ServiceOffer).name,
    }"
    :current-booking-component-name="currentBookingComponentName"

    
  />
  </template>
</template>

<script setup lang="ts">
import { ServiceOffer } from 'src/lib/types';
import SuitesModel from 'src/models/suite.model';
import { ref, defineProps, onMounted } from 'vue';
import useAuthStore  from 'src/stores/auth-store';
import { useQuasar } from 'quasar';
import AuthDialog from 'src/components/AuthDialog.vue';
import BookingsComponent, { BookingComponentName } from './BookingsComponent.vue';
import AutoServiceOfferModel from 'src/models/autoServiceOffer.model';
import TourServiceOfferModel from 'src/models/tourServiceOffer.model';
import VisaServiceOfferModel from 'src/models/visaServiceOffer.mode';

const props =
withDefaults(defineProps<{offer: SuitesModel | AutoServiceOfferModel | TourServiceOfferModel | VisaServiceOfferModel | ServiceOffer, currentBookingComponentName?: BookingComponentName}>(), {
  currentBookingComponentName: 'suiteBooking'
})
const $q = useQuasar ()

// quick quth store import
const authStore = useAuthStore();

const allImages = ref(props.offer.files?.slice(0, 4) || []);
const location = ref((props.offer as SuitesModel)?.location);
const priceOptions = ref(props.offer.priceOptions);
const features = ref(props.offer.features);
const serviceOffer = ref(props.offer as SuitesModel);

const tab = ref('overview');
const rating = ref(4.8);
const comment = ref('');
const showBookingModal = ref(false);

// dialog state
const dialogPurpose = ref<'signup'|'signin'>('signup');

const dialogOpen = ref(false);
const imageDialogOpen = ref(false);
const selectedImage = ref('');

const openImage = (url: string) => {
  debugger;
  selectedImage.value = url;
  imageDialogOpen.value = true;
};

// function to handle booking
const bookNow = () => {
  // check if user is logged in
  if (!authStore.userIsAuthenticated()) {
    // flaggg ui pop up
    $q.notify({
      type: 'negative',
      message: 'You need to sign up to book this offer, or sign in if you already have an account',
      position: 'top-right',
      multiLine: true,
      timeout: 5000,
      actions: [{ icon: 'close', color: 'white' }]
    });
    dialogOpen.value = true;
    return;
  }
  // proceed with booking
  showBookingModal.value = true;
};

const closeDialog = () => {
  dialogOpen.value = false;
};

onMounted(() => {
  console.log('Service Offer Tile Component Mounted: ', props.offer);
})
</script>

<style scoped lang="scss">
.apartment-card {
  max-width: 1000px;
  margin: auto;
  width: 90%;
  overflow-y: auto !important;
}
.gallery {
  display: flex;
  flex-wrap: wrap;
}
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
  width: 100%;
}
.grid-img {
  width: 100%;
  height: 30vw;
  cursor: pointer;
  transition: transform 0.3s;
}
.grid-img:hover {
  transform: scale(1.05);
}
.popup-image {
  width: 90vw;
  max-height: 80vh;
}
.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rating {
  display: flex;
  align-items: center;
}
.price {
  font-size: 24px;
  font-weight: bold;
}
.features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
</style>
