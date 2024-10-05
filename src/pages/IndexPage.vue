<template>
  <q-page class="q-mx-md">
    <page-carousel />
    <div style="position: relative">
      <div style="position: relative">
        <q-img src="assets/Polygon 1.svg" />
        <div
          class="flex column items-center text-center"
          :style="{
            position: 'absolute',
            width: 'max-content',
            fontSize: $q.screen.gt.md
              ? '2rem'
              : $q.screen.lt.md
              ? '1rem'
              : '1.6rem',
            top: $q.screen.gt.md ? '15vh' : $q.screen.lt.md ? '5vh' : '10vh',
            left: '10vw',
          }"
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
        style="position: absolute; right: 20vw; height: 40vh; width: 40vw"
        :style="{
          top: $q.screen.gt.sm ? '31vh' : '15vh',
        }"
      >
        <q-img src="assets/Rectangle 101.png" />
      </div>
    </div>
    <!-- travel companion -->
    <div
      style="
        position: relative;
        height: 25vh;
        margin: 20vh 0 10vh 0;
        padding-top: 5rem;
      "
    >
      <div
        style="
          width: 100%;
          font-size: calc(2rem + 4vw);
          color: #603f8b;
          text-align: center;
        "
      >
        Your Ultimate Travel Companion
      </div>
      <div
        class="flex column text-right"
        style="width: 100%; font-size: calc(0.5rem + 2.5vw); padding: 0 6vw"
      >
        <span>Explore the world effortlessly with our</span>
        <span>comprehensive travel and hospitality solutions</span>
      </div>
      <div
        class="circle bulge"
        style="
          width: 10vw;
          height: 10vw;
          opacity: 0.5;
          position: absolute;
          top: 0;
          left: 2vw;
        "
      ></div>
      <div
        class="circle bulge"
        style="
          width: 10vw;
          height: 10vw;
          opacity: 0.9;
          position: absolute;
          top: 30vh;
          left: 15vw;
        "
      ></div>
      <div
        class="circle bulge"
        style="
          width: 3vw;
          height: 3vw;
          opacity: 0.5;
          position: absolute;
          top: 2vh;
          left: 40vw;
        "
      ></div>

      <div
        class="circle bulge"
        style="
          width: 1.5vw;
          height: 1.5vw;
          opacity: 0.5;
          position: absolute;
          top: 25vh;
          left: 50vw;
        "
      ></div>

      <div
        class="circle bulge"
        style="
          width: 3vw;
          height: 3vw;
          opacity: 0.8;
          position: absolute;
          top: 23vh;
          left: 60vw;
        "
      ></div>

      <div
        class="circle bulge"
        style="
          width: 8vw;
          height: 8vw;
          opacity: 0.3;
          position: absolute;
          top: 15vh;
          left: 85vw;
        "
      ></div>
      <div
        class="circle bulge"
        style="
          width: 6vw;
          height: 6vw;
          opacity: 0.9;
          position: absolute;
          top: 0;
          left: 70vw;
        "
      ></div>
      <div
        class="circle bulge"
        style="
          width: 6vw;
          height: 6vw;
          opacity: 0.3;
          position: absolute;
          top: 30vh;
          left: 70vw;
        "
      ></div>
      <div
        class="circle bulge"
        style="
          width: 3vw;
          height: 3vw;
          opacity: 0.8;
          position: absolute;
          top: 35vh;
          left: 35vw;
        "
      ></div>
      <div
        class="circle bulge"
        style="
          width: 1.5vw;
          height: 1.5vw;
          opacity: 0.8;
          position: absolute;
          top: 40vh;
          left: 50vw;
        "
      ></div>
    </div>
    <!-- best deals -->

    <div
      style="
        width: 100%;
        position: relative;
        margin-top: calc(10rem + 5vw);
        padding-top: 15rem;
      "
      :style="{
        ...($q.screen.md ? { marginTop: 'calc(15rem + 2vw)' } : {}),
      }"
    >
      <div
        class="flex column items-end"
        style="width: 100%; position: absolute; top: 0; right: 8vw"
      >
        <div class="flex column flex-center text-center">
          <div
            class="text-center"
            style="
              font-size: calc(0.5rem + 1.5vw);
              width: calc(6rem + 12vw);
              padding-right: calc(0.5rem + 4.5vw);
            "
          >
            Find Best Deals On
          </div>
          <div
            class="flex row flex-center q-mr-xl shadow-box"
            style="
              border-top-left-radius: 1vw;
              border-top-right-radius: 3.5vw;
              border-bottom-right-radius: 1vw;
              border-bottom-left-radius: 3vw;
              transform: rotate(45deg);
              padding: 6vw;
              border-width: 1.2rem;
              border-color: #fbb96f;
              border-style: solid;
              background-color: #9aceca;
              width: calc(4rem + 16vw);
              height: calc(4rem + 16vw);
              margin-top: calc(1.2rem + 4vh);
            "
          >
            <div
              style="transform: rotate(-45deg); font-size: calc(0.8rem + 3.2vw)"
            >
              Hotels
            </div>
          </div>
        </div>
      </div>
      <div
        style="
          width: calc(7rem + 48vw);
          height: calc(12rem + 42vh);
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
          style="width: 100%; font-size: calc(0.8rem + 3vw); padding: 8vh 8vw"
        >
          Enjoy personalized recommendations and seamless bookings
        </div>
        <div
          class="text-center q-mb-md"
          style="font-size: calc(0.6rem + 0.8vw)"
        >
          <span class="q-ma-lg">Extensive Search and Seamless bookings</span
          ><q-btn
            class="bg-primary text-white q-px-md"
            label="Get Started"
            rounded
            no-caps
            to="/signup"
          />
        </div>
        <div class="flex column items-center justify-start" style="width: 100%">
          <div
            style="
              border-radius: 10rem;
              width: calc(10rem + 30vw);
              height: calc(10rem + 30vw);
            "
          >
            <q-img src="assets/booking-search-1.jpg" fit="fill" />
          </div>
          <div class="text-bold" style="font-size: calc(0.2rem + 1vw)">
            <q-icon class="q-mr-sm" name="search" />Easily search and book
            accommodations, flights, and tours.
          </div>
        </div>
      </div>
    </div>
    <!-- partners -->
    <div
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
          <!-- <div style="width: calc(2rem + 6vw); height: calc(1rem + 5vh)">
            <q-img src="assets/hilton.png" />
          </div>
          <div style="width: calc(2rem + 6vw); height: calc(1rem + 5vh)">
            <q-img src="assets/marriot.png" />
          </div> -->
        </div>
        <div>
          <q-btn color="primary" round outline size="1vw">
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
