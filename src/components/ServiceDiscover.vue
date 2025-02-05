<template>
  <div class="wrapper">
    <div class="body">
      <div class="inner-body">
        <q-card
          v-for="(services, index) in serviceData"
          :key="index"
          class="cards"
        >
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom text-h6">Title</div>
          </q-img>

          <q-card-section>
            {{ services.description }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
// import { computed } from 'vue';
import { useQuasar } from 'quasar';

export type PageCarouselProps = {
  title: string;
  description?: string;
};

withDefaults(
  defineProps<{
    title?: string;
    description?: string;
  }>(),
  {
    title: 'This should be a section title',
  }
);

// consts
const $q = useQuasar();
const serviceData = ref([
  {
    title: 'Suite and Apartments',
    description:
      'Experience unparalleled opulence in our high-end suite accommodations... ',
    image: 'assets/hotel-management.jpg',
  },
  {
    title: 'Autos',
    description: 'Comprehensive car rental solutions for travelers...',
    image: 'assets/event-management.jpg',
  },
  {
    title: 'Tour',
    description: 'Exciting guided tours to various destinations...',
    image: 'assets/travel-management.jpg',
  },
  {
    title: 'Visa',
    description: 'Streamlined visa application assistance...',
    image: 'assets/restaurant-management.jpg',
  },
]);

defineComponent({
  name: 'ServiceDiscover',
});
</script>

<style lang="scss" scoped>
@import 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
h1 {
  font-family: 'poppins', serif;
  font-weight: bold;
  color: lightgray;
  opacity: 0.2;
}
h3 {
  font-family: 'poppins', serif;
  font-weight: bold;
}
p {
  font-family: 'poppins', serif;
}
.wrapper {
  width: 100%;
  padding: 2rem 7rem;
}
.inner-body {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
}
.body {
  background-color: black;
  border-radius: 15px;
  padding: 1rem;
}
.cards {
  width: 100%;
  margin: 0;
  border-radius: 0;
}
</style>
