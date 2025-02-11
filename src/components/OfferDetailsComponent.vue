<template>
    <q-card class="apartment-card">
      <q-card-section class="gallery">
        <div class="main-image">
          <q-img :src="mainImage" class="rounded" />
        </div>
        <div class="side-images">
          <q-img v-for="(image, index) in sideImages" :key="index" :src="image" class="rounded side-img" />
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
            <h4 class="q-mb-none">Aurora Apartment</h4>
            <q-icon name="place" color="red" /> Near Tafawa Balewa Square, Lagos, Nigeria.
            <div class="rating">
              <q-rating v-model="rating" max="5" readonly size="20px" color="yellow" />
              <span class="q-ml-sm">{{ rating }} (210 Reviews)</span>
            </div>
          </div>
          <q-btn label="Book Now" color="black" unelevated />
        </div>
  
        <h3 class="price">70,000</h3>
  
        <div class="features">
          <q-item v-for="feature in features" :key="feature.text">
            <q-item-section avatar>
              <q-icon :name="feature.icon" />
            </q-item-section>
            <q-item-section>{{ feature.text }}</q-item-section>
          </q-item>
        </div>
      </q-card-section>
  
      <q-card-section>
        <h5>Add your comment</h5>
        <q-input v-model="comment" filled type="textarea" />
        <q-btn label="Send" color="black" class="q-mt-sm" />
      </q-card-section>
    </q-card>
  </template>

<script setup lang="ts">
import { ref } from 'vue';

const mainImage = 'path/to/main-image.jpg'; // Replace with actual image path
const sideImages = ['path/to/image1.jpg', 'path/to/image2.jpg', 'path/to/image3.jpg'];

const tab = ref('overview');
const rating = ref(4.8);
const comment = ref('');

const features = [
  { icon: 'hotel', text: '2 Bedroom' },
  { icon: 'bathtub', text: '2 Bathrooms' },
  { icon: 'ac_unit', text: 'Air condition' },
  { icon: 'pool', text: 'Swimming pool' },
  { icon: 'wifi', text: 'Free wifi' },
  { icon: 'local_parking', text: 'Parking available' },
  { icon: 'square_foot', text: '400 square feet' },
  { icon: 'star', text: 'Top rated' },
];
</script>

<style scoped lang="scss">
.apartment-card {
  max-width: 800px;
  margin: auto;
}
.gallery {
  display: flex;
}
.main-image {
  flex: 2;
}
.side-images {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.side-img {
  height: 100px;
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