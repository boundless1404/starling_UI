<template>
  <q-page>
    <div>
      <div><h4>Suite yourself, Olatayo,</h4></div>
      <p class="q-ml-xl q-pl-sm">
        Choose from the myriads suites in your preferred location.
      </p>
      <div class="q-px-lg">
        <!-- rooms-icon area -->
        <div class="flex flex-center">
          <div
            class="border-rounded-sm q-mx-lg"
            :style="{
              width: '98%',
              height: '5rem',
              border: `solid ${$getColor('secondary')} 0.1rem`,
            }"
          >
            <div class="flex row flex-center q-gutter-sm-md q-py-sm">
              <q-btn
                class="q-pa-md"
                :style="{
                  border: `${$getColor('secondary')} solid 0.1px`,
                }"
                icon="arrow_left"
                round
                flat
                outline
                color="secondary"
              />
              <div
                class="flex flex-center rooms-type-slide"
                style="height: 100%"
              >
                <q-btn
                  icon="apartment"
                  label="Accessible Rooms"
                  flat
                  outline
                  color="secondary"
                  stack
                  no-caps
                />
                <q-btn
                  icon="apartment"
                  label="Accessible Rooms"
                  flat
                  outline
                  color="secondary"
                  stack
                  no-caps
                />
                <q-btn
                  icon="apartment"
                  label="Accessible Rooms"
                  flat
                  outline
                  color="secondary"
                  stack
                  no-caps
                />
              </div>
              <q-btn
                :style="{
                  border: `${$getColor('secondary')} solid 0.1px`,
                }"
                icon="arrow_right"
                round
                flat
                outline
                color="secondary"
                class="q-pa-md"
              />
            </div>
          </div>
        </div>
        <!-- suite-provider drop-down -->
        <div class="q-mt-lg q-ml-lg">
          <span class="q-ml-sm">Suite Providers:</span>
          <q-select
            style="width: 20%"
            color="secondary"
            label="All"
            v-model="selectedSuiteProvider"
            :options="suiteProvidersOptions"
            emit-value
            map-options
            outlined
            rounded
            dense
          />
        </div>
        <!-- suites-show area -->
        <div class="flex column q-gutter-lg q-mt-xl">
          <div class="flex row justify-evenly q-gutter-sm-lg">
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
                    label="Marriot"
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
                <p>Ikeja, Lagos, Nigeria.</p>
                <p>
                  About location: ikeja is the capital of lagos with great
                  attractions around the city.
                </p>
                <p>Users Ratings: 4.8</p>
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
                    label="Eko Hotel"
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
                <p>Abuja, Lagos, Nigeria.</p>
                <p>
                  About location: ikeja is the capital of lagos with great
                  attractions around the city.
                </p>
                <p>Users Ratings: 4.8</p>
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
                <p>Lekki, Lagos, Nigeria.</p>
                <p>
                  About location: ikeja is the capital of lagos with great
                  attractions around the city.
                </p>
                <p>Users Ratings: 4.8</p>
              </div>
            </div>
          </div>
          <div class="flex row justify-evenly q-gutter-sm-md">
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
                    label="Marriot"
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
                <p>Ikeja, Lagos, Nigeria.</p>
                <p>
                  About location: ikeja is the capital of lagos with great
                  attractions around the city.
                </p>
                <p>Users Ratings: 4.8</p>
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
                    label="Eko Hotel"
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
                <p>Abuja, Lagos, Nigeria.</p>
                <p>
                  About location: ikeja is the capital of lagos with great
                  attractions around the city.
                </p>
                <p>Users Ratings: 4.8</p>
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
                <p>Lekki, Lagos, Nigeria.</p>
                <p>
                  About location: ikeja is the capital of lagos with great
                  attractions around the city.
                </p>
                <p>Users Ratings: 4.8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';

// consts
//refs
const controlType = ref<'outline' | 'regular' | 'flat' | 'unelevated' | 'push'>(
  'outline'
);
const suitePanel = ref('SuitePanel');
const autoPlay = ref(true);
const selectedSuiteProvider = ref('');
const suiteProvidersOptions = ref([
  {
    label: 'Marriot',
    value: 'Marriot',
  },
  {
    label: 'Eko Hotel',
    value: 'Eko Hotel',
  },
  {
    label: 'Radisson',
    value: 'Radisson',
  },
  {
    label: 'Hilton',
    value: 'Hilton',
  },
]);
//methods
//watchers
// hooks
</script>
<style lang="scss">
.rooms-type-slide {
  & button {
    font-size: medium;
  }
}
</style>
