<template>
  <q-page class=" ">
    <page-carousel />

    <!-- discover our services -->
    <div>
      <SectionTitle
        title="DISCOVER OUR SERVICES"
        description="Hi John, Here are some of our service for you to pick from"
      />
      <ServiceDiscover />
    </div>

    <!-- Why choose us -->
    <div>
      <SectionTitle
        title="WHY CHOOSE US"
        description="At Starlings Hospitality, we believe that travel should be effortless, personalized, and unforgettable. We're more than just a booking platform; we're your trusted partner in crafting seamless travel experiences tailored to your unique desires. Here's why travelers choose Starlings for their journeys."
      />
      <WhyChooseUs />
    </div>

    <!-- partners -->
    <div>
      <SectionTitle title="MEET OUR PARTNERS" />
      <!-- <PartnersComponent /> -->
    </div>

    <!-- Customer review -->
    <div>
      <SectionTitle
        title="CUSTOMER REVIEW"
        description="see what our satisfied customers are saying"
      />
    </div>
    <!-- <div
      class="q-px-md"
      style="margin: calc(10rem + 15vw) 0 calc(2rem + 5vw) 0; height: 8vw"
    >
      <div style="font-size: calc(0.5rem + 2vw)">Our Partners</div>
      <div class="flex row justify-center items-center" style="width: 100%">
        <div>
          <q-btn color="primary" round outline size="1vw">
            <q-icon name="arrow_left" color="primary" />
          </q-btn>
        </div>
        <div style="width: 78vw" class="flex row justify-around">
          <div style="width: calc(2rem + 6vw); height: calc(0.8rem + 5vh)">
            <q-img src="assets/hilton.png" />
          </div>
          <div style="width: calc(2rem + 6vw); height: calc(0.8rem + 5vh)">
            <q-img src="assets/marriot.png" />
          </div>
          <div style="width: calc(2rem + 6vw); height: calc(0.8rem + 5vh)">
            <q-img src="assets/radisson.png" />
          </div>
        </div>
        <div>
          <q-btn color="primary" round outline size="1vw">
            <q-icon name="arrow_right" color="primary" />
          </q-btn>
        </div>
      </div>
    </div> -->
  </q-page>
</template>

<script setup lang="ts">
import PageCarousel from '../components/PageCarousel.vue';
import SectionTitle from '../components/SectionTitle.vue';
import ServiceDiscover from '../components/ServiceDiscover.vue';
import WhyChooseUs from 'src/components/WhyChooseUs.vue';
import PartnersComponent from 'src/components/PartnersComponent.vue';

import { ref, computed } from 'vue';

const circleWidth = ref('100px'); // Default width of the circle
const circlePositionX = ref('50%'); // Default horizontal position (centered)
</script>

<style lang="scss" scoped>
.circle {
  border-radius: 50%;
  background: linear-gradient(180deg, #fbae66, #603f8b);
}

.bulge {
  animation: grow-shrink 5s infinite;

  &:nth-of-type(odd) {
    animation-delay: 2.5s;
  }
}

@keyframes grow-shrink {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(2);
  }
}

.container {
  width: 100%;
  height: 30rem;
  position: relative;
  background-color: #f5f5f5; /* Example background color for the container */
}

.shadow-box {
  box-shadow: rgba(154, 206, 202, 0.25) -6px -8px 18.5px 8px;
}

.shadow-box-1 {
  box-shadow: rgba(154, 206, 202, 0.5) 0.4vw 0.5vw 0.5vw 1.2vw;
}
</style>
