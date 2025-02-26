<template>
    <q-card :class="['apartment-card', $q.screen.gt.md ? $q.screen.gt.lg ? '' : 'width-lg' : $q.screen.lt.md ? 'width-sm' : 'width-md']">
        <!-- Apartment Image -->
        <q-img :src="serviceOffer.files?.[0].url" class="apartment-image">

        </q-img>
        <div class="overlay" @click="showDialog">
            <!-- Apartment Details -->
            <div class="apartment-details">
                <div class="apartment-title">{{ capitalize(serviceOffer.type?.replaceAll('_', ' ') || (serviceOffer as ServiceOffer).name) }}</div>
                <div v-if="location" class="apartment-location"><q-icon :color="'red-6'" name="place" :size="'1rem'" />{{ location?.city + ', ' + location?.country}}</div>
                <div class="flex row justify-between items-center">
                    <div class="apartment-type">{{ serviceOffer.type }}</div>
                    <div class="apartment-price">₦{{ serviceOffer.priceOptions?.[0].price.toLocaleString('en-US') }}</div>
                </div>
            </div>
            <!-- Features Section -->
            <div class="features">
                <template v-if="$q.screen.gt.sm">
                <div  v-for="(feature, index) of serviceOffer.features?.slice(0, 3)" :key="index" class="feature">
                    <q-icon :name="feature.icon || 'safe'" size="20px" />
                    <span>{{ feature.name }}</span>
                </div>
                </template>
                <template v-else>
                    <div  v-for="(feature, index) of serviceOffer.features?.slice(0, 2)" :key="index" class="feature">
                    <q-icon :name="feature.icon || 'safe'" size="20px" />
                    <span>{{ feature.name }}</span>
                </div>
                    <span>+{{ 2 }} More</span>
                </template>
            </div>
        </div>

        <q-dialog v-model="dialogOpen" full-height style="height: min-content; overflow: scroll;">
            <offer-details-component :offer="serviceOffer" :current-booking-component-name="currentBookingComponentName" />
        </q-dialog>
    </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { defineProps, onMounted, ref } from 'vue';
import OfferDetailsComponent from './OfferDetailsComponent.vue';
import SuitesModel from 'src/models/suite.model';
import { ServiceOffer } from 'src/lib/types';
import { capitalize } from 'lodash';
import AutoServiceOfferModel from 'src/models/autoServiceOffer.model';
import TourServiceOfferModel from 'src/models/tourServiceOffer.model';
import VisaServiceOfferModel from 'src/models/visaServiceOffer.mode';
import { BookingComponentName } from './PaymentComponent.vue';

// Define apartment data as props for reusability
export type ServiceOfferType =  (SuitesModel | AutoServiceOfferModel | TourServiceOfferModel | VisaServiceOfferModel | ServiceOffer)
const props = defineProps<{serviceOffer: ServiceOfferType, currentBookingComponentName?: BookingComponentName}>();

const dialogOpen = ref(false);
const location = ref((props.serviceOffer as SuitesModel).location);

const showDialog = () => {
    // Open the dialog
    dialogOpen.value = true;
    console.log('Dialog Opened');
};

const $q = useQuasar();

onMounted(() => {
    console.log('Service Offer Tile Component Mounted: ', props.serviceOffer);
});
</script>

<style scoped lang="scss">
.apartment-card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    min-width: 22vw;
    position: relative;
    transition: all 0.3s;
    &.width-sm {
        width: 80vw;
    }

    &.width-md {
        width: 40vw;
    }

    &.width-lg {
        width: 30vw;
    }

    &:hover {
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
        transform: translateY(-4px);
    }
}

.apartment-image {
    height: 20rem;
}

.overlay {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 2px;
    width: 98%;
    background-image: repeating-linear-gradient(90deg,
     rgba(33, 33, 33, 0.06) 0px,
      rgba(33, 33, 33, 0.06) 2px,
       transparent 2px, transparent 4px),
        linear-gradient(90deg, rgb(33, 33, 33), transparent), 
        linear-gradient(0deg, rgb(33, 33, 33), transparent), 
        linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4));
//         background: repeating-linear-gradient(
//     -45deg, 
//     #2e7d32,  /* Dark Green */
//     #2e7d32 10%, 
//     #4caf50 10%, /* Medium Green */
//     #4caf50 20%, 
//     #66bb6a 20%, /* Light Green */
//     #66bb6a 30% 
//   );
    color: white;
    padding: 12px;
    border-radius: 1.2rem !important;
}

.apartment-details {
    display: flex;
    flex-direction: column;
}

.apartment-title {
    font-size: 1rem;
    font-weight: bold;
}

.apartment-location {
    font-size: 0.85rem;
    opacity: 0.8;
}

.apartment-price {
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 4px;
}

.apartment-type {
    font-size: 0.9rem;
    opacity: 0.8;
}

/* Features Section */
.features {
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;
    background: #e6e5e573;
    border-radius: 12px;
}

.feature {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.85rem;
}
</style>