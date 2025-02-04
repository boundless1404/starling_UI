<template>
  <div class="q-pa-md" style="padding: 2rem 7rem">
    <div>
      <div style="display: flex; justify-content: center; font-size: 1rem">
        <q-tabs
          v-model="tab"
          align="justify"
          class="q-mb-lg bg-white"
          no-caps
          indicator-color="transparent"
          active-color="grey"
          active-bg-color="black"
          inline-label
          style="border-radius: 12px 12px 0 0; margin-bottom: 0; width: 70vw"
        >
          <q-tab
            class="text-black tab-labels custom-fonts"
            name="apartments"
            label="Suite & Apartments"
            style="padding: 1rem"
            icon="fa-solid fa-building"
          />
          <q-tab
            class="text-black tab-labels custom-fonts"
            name="autos"
            label="Autos"
            style="padding: 1rem"
            icon="fa-solid fa-car"
          />
          <q-tab
            class="text-black tab-labels custom-fonts"
            name="tour"
            label="Tour"
            style="padding: 1rem"
            icon="fa-solid fa-mountain-sun"
          />
          <q-tab
            class="text-black tab-labels custom-fonts"
            name="visa"
            label="Visa"
            style="padding: 1rem"
            icon="fa-solid fa-plane-departure"
          />
        </q-tabs>
      </div>

      <div class="q-gutter-y-sm">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
          class="bg-black text-white"
          style="margin-top: 0; border-radius: 12px; padding: 0.25rem 2rem"
        >
          <q-tab-panel name="apartments">
            <div
              class="text-h6"
              style="display: flex; justify-content: space-between"
            >
              <div>
                <span class="text-white">Location</span>
                <q-select
                  class="text-white"
                  borderless
                  :options="options"
                  placeholder="Enter Location"
                  label-color="grey"
                  label="Enter Location"
                />
              </div>
              <div>
                <span class="text-white">Apartment Type</span>
                <q-select
                  class="text-white"
                  borderless
                  :options="options"
                  placeholder="Enter Location"
                  label-color="grey"
                  label="Enter Location"
                />
              </div>
              <div>
                <span class="text-white">Check-in</span>
                <q-input filled v-model="date" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div>
                <span class="text-white">Check-out</span>
                <q-input filled v-model="date" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div>
                <span class="text-white">Location</span>
                <q-select
                  class="text-white"
                  borderless
                  :options="options"
                  placeholder="Enter Location"
                  label-color="grey"
                  label="Enter Location"
                />
              </div>
            </div>
            <div class="text-center">
              <span
                >Easily search and book accommodations, flights, and
                tours.</span
              >
            </div>
          </q-tab-panel>

          <q-tab-panel name="autos">
            <div
              class="text-h6"
              style="display: flex; justify-content: space-between"
            >
              <div>
                <span class="text-white">Location</span>
                <q-select
                  class="text-white"
                  borderless
                  :options="options"
                  placeholder="Enter Location"
                  label-color="grey"
                  label="Enter Location"
                />
              </div>
              <div>
                <span class="text-white">Apartment Type</span>
                <q-select
                  class="text-white"
                  borderless
                  :options="options"
                  placeholder="Enter Location"
                  label-color="grey"
                  label="Enter Location"
                />
              </div>
              <div>
                <span class="text-white">Check-in</span>
                <q-input filled v-model="date" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div>
                <span class="text-white">Check-out</span>
                <q-input filled v-model="date" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div>
                <span class="text-white">Location</span>
                <q-select
                  class="text-white"
                  borderless
                  :options="options"
                  placeholder="Enter Location"
                  label-color="grey"
                  label="Enter Location"
                />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="tour">
            <div
              class="text-h6"
              style="display: flex; justify-content: space-between"
            >
              <div>
                <span class="text-white">Location</span>
                <q-select
                  class="text-white"
                  borderless
                  :options="options"
                  placeholder="Enter Location"
                  label-color="grey"
                  label="Enter Location"
                />
              </div>
              <div>
                <span class="text-white">Apartment Type</span>
                <q-select
                  class="text-white"
                  borderless
                  :options="options"
                  placeholder="Enter Location"
                  label-color="grey"
                  label="Enter Location"
                />
              </div>
              <div>
                <span class="text-white">Check-in</span>
                <q-input filled v-model="date" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div>
                <span class="text-white">Check-out</span>
                <q-input filled v-model="date" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div>
                <span class="text-white">Location</span>
                <q-select
                  class="text-white"
                  borderless
                  :options="options"
                  placeholder="Enter Location"
                  label-color="grey"
                  label="Enter Location"
                />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="visa">
            <div
              class="text-h6"
              style="display: flex; justify-content: space-between"
            >
              <div>
                <span class="text-white">Location</span>
                <q-select
                  class="text-white"
                  borderless
                  :options="options"
                  placeholder="Enter Location"
                  label-color="grey"
                  label="Enter Location"
                />
              </div>
              <div>
                <span class="text-white">Apartment Type</span>
                <q-select
                  class="text-white"
                  borderless
                  :options="options"
                  placeholder="Enter Location"
                  label-color="grey"
                  label="Enter Location"
                />
              </div>
              <div>
                <span class="text-white">Check-in</span>
                <q-input filled v-model="date" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div>
                <span class="text-white">Check-out</span>
                <q-input filled v-model="date" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div>
                <span class="text-white">Location</span>
                <q-select
                  class="text-white"
                  borderless
                  :options="options"
                  placeholder="Enter Location"
                  label-color="grey"
                  label="Enter Location"
                />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>

        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
          class="text-black"
        >
          <q-tab-panel name="apartments">
            <ServiceCards
              group-title="Explore accommodation types"
              group-description="Discover our range of property for every traveler's preference"
            />
          </q-tab-panel>

          <q-tab-panel name="autos">
            <ServiceCards
              group-title="Discover your ideal stay"
              group-description="Discover our range of property for every traveler's preference"
            />
          </q-tab-panel>

          <q-tab-panel name="tour">
            <ServiceCards />
          </q-tab-panel>

          <q-tab-panel name="visa">
            <ServiceCards />
          </q-tab-panel>
        </q-tab-panels>

        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
          class="text-black"
        >
          <q-tab-panel name="apartments">
            <ServiceCards
              group-title="Discover your ideal stay"
              group-description="Discover our range of property for every traveler's preference"
            />
          </q-tab-panel>

          <q-tab-panel name="autos">
            <ServiceCards />
          </q-tab-panel>

          <q-tab-panel name="tour">
            <ServiceCards />
          </q-tab-panel>

          <q-tab-panel name="visa">
            <ServiceCards />
          </q-tab-panel>
        </q-tab-panels>

        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
          class="text-black"
        >
          <q-tab-panel name="apartments">
            <ServiceCards
              group-title="Our top picks for you"
              group-description="Popular picks recommended just for you"
            />
          </q-tab-panel>

          <q-tab-panel name="autos">
            <ServiceCards />
          </q-tab-panel>

          <q-tab-panel name="tour">
            <ServiceCards />
          </q-tab-panel>

          <q-tab-panel name="visa">
            <ServiceCards />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ServiceCards from './ServiceCards.vue';

const tab = ref('apartments');
const options = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
  { label: 'Option 4', value: 'opt4' },
];
</script>

<style>
.tab-labels {
  font-size: 2rem;
}

.q-tab .q-tab__label {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
