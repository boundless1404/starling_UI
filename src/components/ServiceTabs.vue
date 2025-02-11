<template>
  <div :class="[$q.screen.lt.md ? 'q-pa-xs' : 'q-pa-md']">
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
          :style="{borderRadius: '12px 12px 0 0', marginBottom: '0', ...($q.screen.lt.md ? {width: '80vw'} : '')}"
        >
          <q-tab
            class="text-black tab-labels custom-fonts"
            name="apartments"
            :label="$q.screen.lt.md ? '' : 'Suite & Apartments'"
            :style="{padding: '1rem', ...($q.screen.lt.md ? {padding: '0.6rem'} : '')}"
            icon="fa-solid fa-building"
          />
          <q-tab
            class="text-black tab-labels custom-fonts"
            name="autos"
            :label="$q.screen.lt.md ? '' : 'Autos'"
            :style="{padding: '1rem', ...($q.screen.lt.md ? {padding: '0.6rem'} : '')}"
            icon="fa-solid fa-car"
          />
          <q-tab
            class="text-black tab-labels custom-fonts"
            name="tour"
            :label="$q.screen.lt.md ? '' : 'Tour'"
            :style="{padding: '1rem', ...($q.screen.lt.md ? {padding: '0.6rem'} : '')}"
            icon="fa-solid fa-mountain-sun"
          />
          <q-tab
            class="text-black tab-labels custom-fonts"
            name="visa"
            :label="$q.screen.lt.md ? '' : 'Visa'"
            :style="{padding: '1rem', ...($q.screen.lt.md ? {padding: '0.6rem'} : '')}"
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
          class="bg-black text-white q-mx-auto"
          style="margin-top: 0; border-radius: 12px; padding: 0.25rem; width: 90vw;"
        >
          <q-tab-panel name="apartments">
            <div
              class="text-h6 row gap-md"
            >
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                <span class="text-white">Location</span>
                <q-input
                  input-class="text-white"
                  borderless
                  :options="options"
                  label-color="grey"
                  label="Enter Location"
                  v-model="searchSuitesModel.location"
                  :rules="[() => $validateField(searchSuitesModel, 'location')]"
                />
              </div>
              <div class="col-xs-12 col-md-6 col-sm-12 col-md-6 col-lg-3">
                <span class="text-white">Apartment Type</span>
                <q-select
                  input-class="text-white"
                  borderless
                  :options="filteredOptions"
                  label-color="grey"
                  label="Choose apartment type"
                  v-model="searchSuitesModel.apartmentType"
                  emit-value
                  map-options
                  use-input
                  input-debounce="0"
                  @filter="filterFn"
                >
                  <template v-slot:selected="">
                  <q-chip
                    class="text-white bg-black"
                    removable
                    v-if="searchSuitesModel.apartmentType"
                    @remove="(removed) => searchSuitesModel.apartmentType = ''"
                  >
                    {{ options.find((o) => o.value === searchSuitesModel.apartmentType)?.label || '' }}
                  </q-chip>
                  </template>
                </q-select>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                <span class="text-white">Check-in</span>
                <q-input v-model="searchSuitesModel.checkInDate" input-class="text-white" label="Check In Date" filled
                         :rules="[() => $validateField(searchSuitesModel, 'checkInDate')]"
                        >
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer" color="white">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="searchSuitesModel.checkInDate" mask="YYYY-MM-DD" today-btn />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                <span class="text-white">Check-out</span>
                <q-input filled v-model="searchSuitesModel.checkOutDate" label="Check out date" input-class="text-white"
                :rules="[() => $validateField(searchSuitesModel, 'checkOutDate')]"
                clearable
                >
                      <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer" color="white">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="searchSuitesModel.checkOutDate" mask="YYYY-MM-DD" today-btn />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                </q-input>
              </div>
            </div>
            <text-button-component buttonText="Easily search and book accommodations, flights, and tours." @search-button:clicked="searchSuitesViewModel.getSuites" />
          </q-tab-panel>

          <q-tab-panel name="autos">
            <div
              class="text-h6"
              style="display: flex; justify-content: space-around"
            >
              <div>
                <span class="text-white">Type</span>
                <q-input
                  input-class="text-white"
                  borderless
                  :options="options"
                  label-color="grey"
                  label="Enter Type"
                  v-model="searchAutosModel.type"
                  :rules="[() => $validateField(searchAutosModel, 'type')]"
                />
              </div>
              <div>
                <span class="text-white">Price</span>
                <q-input
                  input-class="text-white"
                  borderless
                  :options="options"
                  label-color="grey"
                  label="Enter Price"
                  v-model="searchAutosModel.price"
                  :rules="[() => $validateField(searchAutosModel, 'price')]"
                />
              </div>
            </div>
            <text-button-component buttonText="Search Autos" />
          </q-tab-panel>

          <!-- <q-tab-panel name="tour">
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
          </q-tab-panel> -->
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
              group-description="Popular picks just for you"
            />
          </q-tab-panel>

          <q-tab-panel name="autos">
            <ServiceCards
                group-title="Our top picks for you"
              group-description="Popular picks just for you"
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
            <ServiceCards
            group-title="Want some more"
             group-description="Discover more autos for your trip"
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import ServiceCards from './ServiceCards.vue';
import { useQuasar } from 'quasar';
import { SearchSuitesModel } from 'src/models/searchSuites.model';
import { SearchSuitesViewModel } from 'src/view-models/searchSuites.view-model';
import { asyncComputed } from '@vueuse/core';
import { SearchAutosModel } from 'src/models/searchAutos.model';
import { SearchAutosViewModel } from 'src/view-models/searchAutosViewModel.view-model';
import TextButtonComponent from './TextButtonComponent.vue';

const $q = useQuasar();
const tab = ref('apartments');
const options = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
  { label: 'Option 4', value: 'opt4' },
];
const searchSuitesResults = ref<Record<string, unknown>[]>([]);

const searchSuitesViewModel = new SearchSuitesViewModel(reactive(new SearchSuitesModel()));
const searchSuitesModel = searchSuitesViewModel.model;

const searchAutosViewModel = new SearchAutosViewModel(reactive(new SearchAutosModel()));
const searchAutosModel = searchAutosViewModel.model;
const filteredOptions = ref([...options]); // Initialize with all options

const filterFn = (val: string, update: (cb: () => void) => void) => {
  update(() => {
    if (val === '') {
      filteredOptions.value = options;
    } else {
      const needle = val.toLowerCase();
      filteredOptions.value = options.filter(
        v => v.label.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};

// computed
// const computedOptions = 

asyncComputed( async () => {
  await searchSuitesViewModel.validateModel?.();
})

asyncComputed(async () => {
  await searchAutosViewModel.validateModel?.();
})

// functions
async function searchSuites() {
  searchSuitesResults.value = await searchSuitesViewModel.getSuites();
}

// watchers
watch(() => searchSuitesModel.checkInDate, (newVal) => {
  console.log('this is the new checkInDateVal', newVal)
})



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
