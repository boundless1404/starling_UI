<template>
  <q-page class="q-mx-md">
    <page-carousel />
    <div style="position: relative">
      <div style="position: relative">
        <q-img src="assets/Polygon 1.svg" />
        <div
          class="flex column items center text-center"
          style="
            position: absolute;
            height: 50%;
            width: max-content;
            font-size: 2rem;
            top: 15vh;
            left: 10vw;
          "
        >
          <span>"Plan, Book, and Enjoy -</span>
          <span> All in One App!"</span>
        </div>
      </div>
      <div
        style="
          position: absolute;
          right: 0;
          top: 0;
          height: 30vh;
          width: 40vw;
          z-index: 99;
        "
      >
        <q-img src="assets/Rectangle 100.svg" />
      </div>
      <div
        style="
          position: absolute;
          right: 20vw;
          top: 31vh;
          height: 40vh;
          width: 40vw;
        "
      >
        <q-img src="assets/Rectangle 101.png" />
      </div>
    </div>
    <!-- travel companion -->
    <div
      style="
        position: relative;
        height: 25vh;
        margin: 20rem 0 10rem 0;
        padding-top: 5rem;
      "
    >
      <div
        style="width: 100%; font-size: 7rem; color: #603f8b; text-align: center"
      >
        Your Ultimate Travel Companion
      </div>
      <div
        class="flex column text-right"
        style="width: 100%; font-size: 3rem; padding: 0 7rem"
      >
        <span>Explore the world effortlessly with our</span>
        <span>comprehensive travel and hospitality solutions</span>
      </div>
      <div
        class="circle"
        style="
          width: 10rem;
          height: 10rem;
          opacity: 0.5;
          position: absolute;
          top: 0;
          left: 2vw;
        "
      ></div>
      <div
        class="circle"
        style="
          width: 10rem;
          height: 10rem;
          opacity: 0.9;
          position: absolute;
          top: 30vh;
          left: 15vw;
        "
      ></div>
      <div
        class="circle"
        style="
          width: 3rem;
          height: 3rem;
          opacity: 0.5;
          position: absolute;
          top: 2vh;
          left: 40vw;
        "
      ></div>

      <div
        class="circle"
        style="
          width: 1.5rem;
          height: 1.5rem;
          opacity: 0.5;
          position: absolute;
          top: 25;
          left: 50vw;
        "
      ></div>

      <div
        class="circle"
        style="
          width: 3rem;
          height: 3rem;
          opacity: 0.8;
          position: absolute;
          top: 23vh;
          left: 60vw;
        "
      ></div>

      <div
        class="circle"
        style="
          width: 8rem;
          height: 8rem;
          opacity: 0.3;
          position: absolute;
          top: 15vh;
          left: 85vw;
        "
      ></div>
      <div
        class="circle"
        style="
          width: 6rem;
          height: 6rem;
          opacity: 0.9;
          position: absolute;
          top: 0;
          left: 70vw;
        "
      ></div>
    </div>
    <!-- best deals -->

    <div
      style="
        width: 100%;
        position: relative;
        margin-top: 15rem;
        padding-top: 15rem;
      "
    >
      <div
        class="flex column items-end"
        style="width: 100%; position: absolute; top: 0; right: 8vw"
      >
        <div class="flex column flex-center text-center">
          <div
            class="text-center"
            style="font-size: 2rem; width: 18rem; padding-right: 5rem"
          >
            Find Best Deals On
          </div>
          <div
            class="flex row flex-center q-mr-xl shadow-box"
            style="
              border-top-left-radius: 1rem;
              border-top-right-radius: 3.5rem;
              border-bottom-right-radius: 1rem;
              border-bottom-left-radius: 3rem;
              transform: rotate(45deg);
              padding: 6rem;
              border-width: 1.2rem;
              border-color: #fbb96f;
              border-style: solid;
              background-color: #9aceca;
              width: 20rem;
              height: 20rem;
              margin-top: 5rem;
            "
          >
            <div style="transform: rotate(-45deg); font-size: 4rem">Hotels</div>
          </div>
        </div>
      </div>
      <div
        style="
          width: 60rem;
          height: 50rem;
          position: absolute;
          bottom: -8vh;
          left: -2vw;
          z-index: 99;
          transform: rotate(195deg);
        "
      >
        <q-img img-class="shadow-box-1" src="assets/Rectangle 101.png" />
      </div>
      <q-img src="assets/Rectangle 104.svg" />
    </div>
    <!-- bookings -->
    <div>
      <div
        style="
          height: 90vh;
          width: 95vw;
          background-color: #9fd2d3;
          margin-top: 2rem;
        "
      >
        <div
          class="text-center"
          style="width: 100%; font-size: 3.8rem; padding: 8vh 8vw"
        >
          Enjoy personalized recommendations and seamless bookings
        </div>
        <div class="text-center text-h5 q-mb-md">
          <span class="q-ma-xl">Etensive Search and Seamless bookings</span
          ><q-btn
            class="bg-primary text-white q-px-lg"
            label="Get Started"
            rounded
          />
        </div>
        <div class="flex column items-center justify-start" style="width: 100%">
          <div style="border-radius: 10rem; width: 40rem; height: 40rem">
            <q-img src="assets/booking-search-1.jpg" fit="fill" />
          </div>
          <div class="text-subtitle1 text-bold">
            <q-icon class="q-mr-sm" name="search" />Easily search and book
            accommodations, flights, and tours.
          </div>
        </div>
      </div>
    </div>
    <!-- partners -->
    <div class="q-px-md" style="margin: 35vh 0 20vh 0; height: 12vh">
      <div class="text-h4">Our Partners</div>
      <div class="flex row justify-around items-center" style="width: 100%">
        <div>
          <q-btn color="primary" round outline>
            <q-icon name="arrow_left" color="primary" />
          </q-btn>
        </div>
        <div style="width: 92%" class="flex row justify-around">
          <div style="width: 8rem; height: 6rem">
            <q-img src="assets/hilton.png" />
          </div>
          <div style="width: 8rem; height: 6rem">
            <q-img src="assets/marriot.png" />
          </div>
          <div style="width: 8rem; height: 6rem">
            <q-img src="assets/radisson.png" />
          </div>
          <!-- <div style="width: 8rem; height: 6rem">
            <q-img src="assets/hilton.png" />
          </div>
          <div style="width: 8rem; height: 6rem">
            <q-img src="assets/marriot.png" />
          </div> -->
        </div>
        <div>
          <q-btn color="primary" round outline>
            <q-icon name="arrow_right" color="primary" />
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import PageCarousel from '../components/PageCarousel.vue';

import { ref, computed } from 'vue';

const circleWidth = ref('100px'); // Default width of the circle
const circlePositionX = ref('50%'); // Default horizontal position (centered)
</script>

<style lang="scss" scoped>
.circle {
  border-radius: 50%;
  background: linear-gradient(180deg, #fbae66, #603f8b);
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
  box-shadow: rgba(154, 206, 202, 0.5) 6px 8px 8px 20px;
}
</style>
