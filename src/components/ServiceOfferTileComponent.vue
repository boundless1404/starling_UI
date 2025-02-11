<template>
    <q-card :class="['apartment-card', $q.screen.gt.md ? $q.screen.gt.lg ? '' : 'width-lg' : $q.screen.lt.md ? 'width-sm' : 'width-md']">
        <!-- Apartment Image -->
        <q-img :src="apartment.image" class="apartment-image">

        </q-img>
        <div class="overlay" @click="showDialog">
            <!-- Apartment Details -->
            <div class="apartment-details">
                <div class="apartment-title">{{ apartment.name }}</div>
                <div class="apartment-location"><q-icon :color="'red-6'" name="place" :size="'1rem'" />{{ apartment.location }}</div>
                <div class="flex row justify-between items-center">
                    <div class="apartment-type">{{ apartment.type }}</div>
                    <div class="apartment-price">₦{{ apartment.price.toLocaleString() }}</div>
                </div>
            </div>
            <!-- Features Section -->
            <div class="features">
                <div class="feature">
                    <q-icon name="bed" size="20px" />
                    <span>{{ apartment.bedrooms }} Bed</span>
                </div>
                <template v-if="$q.screen.gt.sm">
                    <div class="feature">
                    <q-icon name="bathtub" size="20px" />
                    <span>{{ apartment.bathrooms }} Bath</span>
                </div>
                <div class="feature gt-xs">
                    <q-icon name="square_foot" size="20px" />
                    <span>{{ apartment.size }} sqft</span>
                </div>
                </template>
                <template v-else>
                    <span>+{{ 2 }} More</span>
                </template>
                <div class="feature">
                    <q-icon name="star" color="yellow-8" size="20px" />
                    <span>{{ apartment.rating }}</span>
                </div>
            </div>
        </div>

        <q-dialog v-model="dialogOpen">
            <offer-details-component />
        </q-dialog>
    </q-card>
</template>

<script setup lang="ts">
import { Q } from 'app/dist/spa/assets/QLayout.60eaca2e';
import { useQuasar } from 'quasar';
import { defineProps, ref } from 'vue';
import OfferDetailsComponent from './OfferDetailsComponent.vue';

// Define apartment data as props for reusability
const props = defineProps({
    apartment: {
        type: Object,
        required: true,
        default: () => ({
            name: 'Aurora Apartment',
            location: 'Near Tafawa Balewa Square, Lagos, Nigeria',
            price: 85000,
            type: 'Luxury Room',
            bedrooms: 2,
            bathrooms: 2,
            size: 400,
            rating: 4.8,
            image: 'assets/0b9a53c5-dde1-49c8-af78-1b9b3876147e.jpg'
        })
    }
});

const dialogOpen = ref(false);

const showDialog = () => {
    // Open the dialog
    dialogOpen.value = true;
    console.log('Dialog Opened');
};

const $q = useQuasar();
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