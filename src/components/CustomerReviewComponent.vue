<template>
    <div :class="['wrapper', $q.screen.gt.md ? '' : $q.screen.lt.md ? 'padding-sm' : 'padding-md']">
        <!-- Review Section -->
        <div class="row justify-center">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-card class="review-card flex column flex-center">
                    <!-- User Info -->
                    <div class="user-info">
                        <q-avatar size="60px">
                            <img :src="currentReview.avatar" />
                        </q-avatar>
                        <div class="user-details">
                            <div class="user-name">{{ currentReview.name }}</div>
                            <div class="user-location">{{ currentReview.location }}</div>
                        </div>
                    </div>

                    <!-- Rating -->
                    <div class="rating-section">
                        <q-rating v-model="currentReview.rating" size="20px" color="yellow-8" readonly />
                        <span class="rating-score">{{ currentReview.rating }}</span>
                    </div>

                    <!-- Hotel Name -->
                    <div class="hotel-name">{{ currentReview.hotel }}</div>

                    <!-- Review Text -->
                    <div class="review-text">
                        {{ currentReview.text }}
                    </div>

                    <!-- Navigation Buttons -->
                    <div class="nav-buttons">
                        <q-btn flat round icon="chevron_left" @click="prevReview" />
                        <q-btn flat round icon="chevron_right" @click="nextReview" />
                    </div>
                </q-card>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 row justify-center">
            <!-- Image Grid -->
            <div v-for="(image, index) in images" :key="index" class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pa-sm">
                <q-img :src="image" class="grid-image" />
            </div>
        </div>
        </div>



    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

interface Review {
    avatar: string;
    name: string;
    location: string;
    rating: number;
    hotel: string;
    text: string;
}

// Sample images
const images = ref([
    'assets/Starling_Suite.png',
    'assets/service-apartment.jpg',
    'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/7216482a-3fbb-4f22-96d4-ae100fcb32ef.jpg',
    'https://boundlessobs.s3.eu-north-1.amazonaws.com/test-images/6889df68-8c28-4cee-9989-1bd9cdfce18b.jpg'
]);

// Sample review data
const reviews = ref<Review[]>([
    {
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        name: 'Jane Doe',
        location: 'Enugu',
        rating: 4.7,
        hotel: 'Ikoyi Hotel',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        name: 'John Smith',
        location: 'Lagos',
        rating: 4.3,
        hotel: 'Eko Hotel',
        text: 'Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus.'
    },
    {
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
        name: 'Lisa Brown',
        location: 'Abuja',
        rating: 4.8,
        hotel: 'Transcorp Hilton',
        text: 'Maecenas eget condimentum velit, sit amet feugiat lectus.'
    }
]);

// Current review index
const currentIndex = ref(0);

// Computed property to get the current review
const currentReview = computed(() => reviews.value[currentIndex.value]);

// Function to go to the previous review
const prevReview = () => {
    currentIndex.value = (currentIndex.value - 1 + reviews.value.length) % reviews.value.length;
};

// Function to go to the next review
const nextReview = () => {
    currentIndex.value = (currentIndex.value + 1) % reviews.value.length;
};
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
    padding: 0 10rem;

    &.padding-md {
        padding: 0 5rem;
    }

    &.padding-sm {
        padding: 0 2rem;
    }
}

/* Image Grid */
.grid-image {
    width: 100%;
    aspect-ratio: 4/3;
    border-radius: 12px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

/* Review Card */
.review-card {
    padding: 20px;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    height: 100%;
}

/* User Info */
.user-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.user-details {
    display: flex;
    flex-direction: column;
}

.user-name {
    font-weight: bold;
    font-size: 18px;
}

.user-location {
    font-size: 14px;
    color: gray;
}

/* Rating */
.rating-section {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 10px;
}

.rating-score {
    font-weight: bold;
    font-size: 16px;
}

/* Hotel Name */
.hotel-name {
    font-weight: bold;
    font-size: 20px;
    margin-top: 10px;
}

/* Review Text */
.review-text {
    font-size: 14px;
    color: #555;
    margin-top: 10px;
}

/* Navigation Buttons */
.nav-buttons {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    justify-content: center;
}
</style>