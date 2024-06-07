<template>
  <q-page>
    <div>
      <div><h4>Hi, Olatayo</h4></div>
      <p class="q-ml-xl q-pl-sm">
        Here are some services for you to pick from.
      </p>
      <div class="flex row justify-evenly q-gutter-sm-md">
        <div class="flex column" style="width: min-content">
          <q-card
            class="q-pb-none rounded-borders cursor-pointer"
            style="width: 28rem; height: 28rem; border-radius: 2rem"
            bordered
            v-ripple
            @click="gotoServicePage('suites')"
          >
            <q-card-section
              class="q-pa-none q-ma-none"
              style="position: relative"
            >
              <q-chip
                class="absolute-top-left q-px-xl q-ml-lg q-mt-lg text-h6 text-white bg-accent shadow-1"
                style="z-index: 999"
                label="Suite"
              />
              <!-- <q-img
              style="border-radius: 2rem"
              height="28rem"
              width="100%"
              fit="fill"
              src="/assets/Starling_Suite.png"
            /> -->
              <q-carousel
                style="width: 28rem; height: 28rem; border-radius: 2rem"
                animated
                v-model="suitePanel"
                navigation
                infinite
                :control-type="controlType"
                :autoplay="autoPlay"
                :arrows="false"
                transition-prev="slide-right"
                transition-next="slide-left"
                @mouseenter="autoPlay = false"
                @mouseleave="autoPlay = true"
              >
                <q-carousel-slide
                  :name="1"
                  img-src="/assets/Starling_Cars.png"
                />
                <q-carousel-slide
                  :name="2"
                  img-src="/assets/Starling_Tour_Guide.png"
                />
                <q-carousel-slide
                  :name="3"
                  img-src="/assets/Starling_Suite.png"
                />
              </q-carousel>
            </q-card-section>
          </q-card>
          <div
            class="q-mt-md"
            :style="{ color: `${$getColor('blue-grey-10')}` }"
          >
            <p>
              Lorem ipsum dolor sit amet consectetur. Dictum id elementum mi
              quam mauris interdum mi purus.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur. Dictum id elementum mi
              quam mauris interdum mi purus.
            </p>
          </div>
        </div>
        <div class="flex column" style="width: min-content">
          <q-card
            class="q-pb-none rounded-borders cursor-pointer"
            style="width: 28rem; height: 28rem; border-radius: 2rem"
            bordered
            v-ripple
          >
            <q-card-section
              class="q-pa-none q-ma-none"
              style="position: relative"
            >
              <q-chip
                class="absolute-top-left q-px-xl q-ml-lg q-mt-lg text-h6 text-white bg-accent shadow-1"
                style="z-index: 999"
                label="Cars"
              />
              <!-- <q-img
              style="border-radius: 2rem"
              height="28rem"
              width="100%"
              fit="fill"
              src="/assets/Starling_Suite.png"
            /> -->
              <q-carousel
                style="width: 28rem; height: 28rem; border-radius: 2rem"
                animated
                v-model="suitePanel"
                navigation
                infinite
                :control-type="controlType"
                :autoplay="autoPlay"
                :arrows="false"
                transition-prev="slide-right"
                transition-next="slide-left"
                @mouseenter="autoPlay = false"
                @mouseleave="autoPlay = true"
              >
                <q-carousel-slide
                  :name="1"
                  img-src="/assets/Starling_Cars.png"
                />
                <q-carousel-slide
                  :name="2"
                  img-src="/assets/Starling_Tour_Guide.png"
                />
                <q-carousel-slide
                  :name="3"
                  img-src="/assets/Starling_Suite.png"
                />
              </q-carousel>
            </q-card-section>
          </q-card>
          <div
            class="q-mt-md"
            :style="{ color: `${$getColor('blue-grey-10')}` }"
          >
            <p>
              Lorem ipsum dolor sit amet consectetur. Dictum id elementum mi
              quam mauris interdum mi purus.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur. Dictum id elementum mi
              quam mauris interdum mi purus.
            </p>
          </div>
        </div>
        <div class="flex column" style="width: min-content">
          <q-card
            class="q-pb-none rounded-borders cursor-pointer"
            style="width: 28rem; height: 28rem; border-radius: 2rem"
            bordered
            v-ripple
          >
            <q-card-section
              class="q-pa-none q-ma-none"
              style="position: relative"
            >
              <q-chip
                class="absolute-top-left q-px-xl q-ml-lg q-mt-lg text-h6 text-white bg-accent shadow-1"
                style="z-index: 999"
                label="Tourism"
              />
              <!-- <q-img
              style="border-radius: 2rem"
              height="28rem"
              width="100%"
              fit="fill"
              src="/assets/Starling_Suite.png"
            /> -->
              <q-carousel
                style="width: 28rem; height: 28rem; border-radius: 2rem"
                animated
                v-model="suitePanel"
                navigation
                infinite
                :control-type="controlType"
                :autoplay="autoPlay"
                :arrows="false"
                transition-prev="slide-right"
                transition-next="slide-left"
                @mouseenter="autoPlay = false"
                @mouseleave="autoPlay = true"
              >
                <q-carousel-slide
                  :name="1"
                  img-src="/assets/Starling_Cars.png"
                />
                <q-carousel-slide
                  :name="2"
                  img-src="/assets/Starling_Tour_Guide.png"
                />
                <q-carousel-slide
                  :name="3"
                  img-src="/assets/Starling_Suite.png"
                />
              </q-carousel>
            </q-card-section>
          </q-card>
          <div
            class="q-mt-md"
            :style="{ color: `${$getColor('blue-grey-10')}` }"
          >
            <p>
              Lorem ipsum dolor sit amet consectetur. Dictum id elementum mi
              quam mauris interdum mi purus.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur. Dictum id elementum mi
              quam mauris interdum mi purus.
            </p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// consts
const $router = useRouter();
// refs
const controlType = ref<'outline' | 'regular' | 'flat' | 'unelevated' | 'push'>(
  'outline'
);
const suitePanel = ref('SuitePanel');
const carPanel = ref('CarsPanel');
const tourPanel = ref('TourPanel');
const autoPlay = ref(true);

// methods
function gotoServicePage(servicenName: 'suites') {
  $router.push(`/${servicenName}`);
}
</script>
