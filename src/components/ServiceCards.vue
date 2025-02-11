<template>
  <div>
    <div :class="[$q.screen.lt.md ? 'text-h5' : $q.screen.lt.lg ? 'text-h4' : 'text-h3']">{{ groupTitle }}</div>
    <div :class="[$q.screen.lt.md ? 'text-subtitle1' : 'text-h6']">{{ groupDescription }}</div>
    <div class="body q-mx-auto">
      <div class="inner-body">
        <ServiceOfferTileComponent v-for="(apartment, index) of serviceData" :key="index" :apartment="apartment" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { computed } from 'vue';
import { useQuasar } from 'quasar';
import ServiceOfferTileComponent from './ServiceOfferTileComponent.vue';

export type PageCarouselProps = {
  title: string;
  description?: string;
};

withDefaults(
  defineProps<{
    groupTitle?: string;
    groupDescription?: string;
  }>(),
  {
    groupTitle: 'This should be a section title',
    groupDescription: 'This should be a section description',
  }
);

// consts
const $q = useQuasar();
const serviceData = ref([
{
  name: 'Aurora Apartment',
  location: 'Near Tafawa Balewa Square, Lagos, Nigeria',
  price: 85000,
  type: 'Luxury Room',
  bedrooms: 2,
  bathrooms: 2,
  size: 400,
  rating: 4.8,
  image: 'assets/0b9a53c5-dde1-49c8-af78-1b9b3876147e.jpg' // Replace with actual image URL
},
{
  name: 'Aurora Apartment',
  location: 'Near Tafawa Balewa Square, Lagos, Nigeria',
  price: 85000,
  type: 'Luxury Room',
  bedrooms: 2,
  bathrooms: 2,
  size: 400,
  rating: 4.8,
  image: 'assets/0b9a53c5-dde1-49c8-af78-1b9b3876147e.jpg' // Replace with actual image URL
},
{
  name: 'Aurora Apartment',
  location: 'Near Tafawa Balewa Square, Lagos, Nigeria',
  price: 85000,
  type: 'Luxury Room',
  bedrooms: 2,
  bathrooms: 2,
  size: 400,
  rating: 4.8,
  image: 'assets/0b9a53c5-dde1-49c8-af78-1b9b3876147e.jpg' // Replace with actual image URL
},
{
  name: 'Aurora Apartment',
  location: 'Near Tafawa Balewa Square, Lagos, Nigeria',
  price: 85000,
  type: 'Luxury Room',
  bedrooms: 2,
  bathrooms: 2,
  size: 400,
  rating: 4.8,
  image: 'assets/0b9a53c5-dde1-49c8-af78-1b9b3876147e.jpg' // Replace with actual image URL
},
]);
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
}

.text-h3 {
  font-family: 'poppins', serif;
  font-weight: 700;
  margin: 0;
  margin-top: 2.5rem;
}

.text-h4 {
  font-family: 'poppins', serif;
  font-weight: 600;
  margin: 0;
  margin-top: 2.5rem;
}

.text-h5 {
  font-family: 'poppins', serif;
  font-weight: 500;
  margin: 0;
  margin-top: 2.5rem;
}

h6 {
  font-family: 'poppins', serif;
  margin: 0;
}

p {
  font-family: 'poppins', serif;
}

.inner-body {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  overflow-x: auto;
}

.body {
  background-color: inherit;
  border-radius: 15px;
  padding: 1.5rem;
  overflow-x: auto;
  max-width: 98vw
}

.cards {
  width: 100%;
  margin: 0;
  border-radius: 12px;
}

.description {
  border-radius: 12px;
}
</style>
