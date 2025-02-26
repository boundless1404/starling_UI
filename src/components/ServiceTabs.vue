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
            @click="getServices"
          />
          <q-tab
            class="text-black tab-labels custom-fonts"
            name="auto"
            :label="$q.screen.lt.md ? '' : 'Autos'"
            :style="{padding: '1rem', ...($q.screen.lt.md ? {padding: '0.6rem'} : '')}"
            icon="fa-solid fa-car"
            @click="getServices"
          />
          <q-tab
            class="text-black tab-labels custom-fonts"
            name="tour"
            :label="$q.screen.lt.md ? '' : 'Tour'"
            :style="{padding: '1rem', ...($q.screen.lt.md ? {padding: '0.6rem'} : '')}"
            icon="fa-solid fa-mountain-sun"
            @click="getServices"
          />
          <q-tab
            class="text-black tab-labels custom-fonts"
            name="visa"
            :label="$q.screen.lt.md ? '' : 'Visa'"
            :style="{padding: '1rem', ...($q.screen.lt.md ? {padding: '0.6rem'} : '')}"
            icon="fa-solid fa-plane-departure"
            @click="getServices"
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
            <text-button-component buttonText="Easily search and book accommodations, flights, and tours." @search-button:clicked="searchSuites" />
          </q-tab-panel>

          <!-- <q-tab-panel name="auto">
            <div
              class="text-h6 row"
              style="display: flex; justify-content: space-around"
            >
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
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
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
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
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                <span class="text-white">Start Date</span>
                <q-input v-model="searchAutosModel.startDate" input-class="text-white" label="Start Date" filled
                         :rules="[() => $validateField(searchAutosModel, 'startDate')]"
                        >
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer" color="white">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="searchAutosModel.startDate" mask="YYYY-MM-DD" today-btn />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                <span class="text-white">End Date</span>
                <q-input filled v-model="searchAutosModel.endDate" label="End date" input-class="text-white"
                :rules="[() => $validateField(searchAutosModel, 'endDate')]"
                >
                      <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer" color="white">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="searchAutosModel.endDate" mask="YYYY-MM-DD" today-btn />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                </q-input>
              </div>
            </div>
            <text-button-component buttonText="Search Autos"  @search-button:clicked="searchAutos" />
          </q-tab-panel> -->

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
              :service-offers="topPicksSuites"
              :current-booking-component-name="'suiteBooking'"
            />
          </q-tab-panel>

          <q-tab-panel name="autos">
            <ServiceCards
                group-title="Our top picks for you"
              group-description="Popular picks just for you"
              :service-offers="topPicksAutos"
            />
          </q-tab-panel>

          <!-- <q-tab-panel name="tour">
            <ServiceCards />
          </q-tab-panel>

          <q-tab-panel name="visa">
            <ServiceCards />
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
              group-title="Discover your ideal stay"
              group-description="Discover our range of property for every traveler's preference"
              :service-offers="discoverOffers"
              :current-booking-component-name="'suiteBooking'"
            />
          </q-tab-panel>

          <q-tab-panel name="auto">
            <ServiceCards
            group-title="Want some more"
             group-description="Discover more autos for your trip"
              :service-offers="discoverOffers"
              :current-booking-component-name="'autoBooking'"
            />
          </q-tab-panel>

          <q-tab-panel name="tour">
            <ServiceCards
              group-title="Explore our tours"
              group-description="Discover our range of property for every traveler's preference"
              :service-offers="discoverOffers"
              :current-booking-component-name="'tourBooking'"
             />
          </q-tab-panel>

          <q-tab-panel name="visa">
            <ServiceCards 
              group-title="Get your visa"
                group-description="Find the best visa options tailored for your travel needs"
              :service-offers="discoverOffers"
              :current-booking-component-name="'visaBooking'"
            />
          </q-tab-panel>
        </q-tab-panels>
        <!-- <q-tab-panels
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
        </q-tab-panels> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { capitalize, onMounted, reactive, ref } from 'vue';
import ServiceCards from './ServiceCards.vue';
import { useQuasar } from 'quasar';
import { SearchSuitesModel } from 'src/models/searchSuites.model';
import { SearchSuitesViewModel } from 'src/view-models/searchSuites.view-model';
import { asyncComputed } from '@vueuse/core';
import { SearchAutosModel } from 'src/models/searchAutos.model';
import { SearchAutosViewModel } from 'src/view-models/searchAutosViewModel.view-model';
import TextButtonComponent from './TextButtonComponent.vue';
import SuitesModel from 'src/models/suite.model';
import { ServiceOffer } from 'src/lib/types';
import ServicesPageModel from 'src/models/servicesPage.model';
import ServicesViewModel from 'src/view-models/services.view-model';
import ServiceModel from 'src/models/service.model';
import AutoServiceOfferModel from 'src/models/autoServiceOffer.model';
import TourServiceOfferModel from 'src/models/tourServiceOffer.model';
import VisaServiceOfferModel from 'src/models/visaServiceOffer.mode';
import { SearchTourViewModel } from 'src/view-models/searchTours.view-model';
import { SearchTourModel } from 'src/models/searchTour.mode';
// import { SearchVisaViewModel } from 'src/view-models/searchVisa.view-model';
// import { SearchVisaModel } from 'src/models/searchVisa.model';
// import { isModelValid } from 'src/lib/utils';

const $q = useQuasar();
const tab = ref('apartments');
const options = ref<{label: string, value: string}[]>([]);
const topPicksSuites = ref<SuitesModel[]>([]);
const topPicksAutos = ref<AutoServiceOfferModel[]>([]);
const topPicksTours = ref<TourServiceOfferModel[]>([]);
const topPicksVisas = ref<VisaServiceOfferModel[]>([]);
const discoverOffers = ref<(SuitesModel | AutoServiceOfferModel | TourServiceOfferModel | VisaServiceOfferModel)[]>([]);
// const discoverTours = ref<TourServiceOfferModel[]>([]);
// const discoverVisas = ref<VisaServiceOfferModel[]>([]);
const filteredOptions = ref([...options.value]); // Initialize with all options
const serviceId = ref('');
const selectedService = ref<ServiceModel>({} as ServiceModel);
const services = ['suite', 'auto', 'tour', 'visa'];
const servicesMap = ref<{[key in typeof services[number]]: ServiceModel}>({});

const searchSuitesViewModel = new SearchSuitesViewModel(reactive(new SearchSuitesModel()));
const searchSuitesModel = searchSuitesViewModel.model;

const searchAutosViewModel = new SearchAutosViewModel(reactive(new SearchAutosModel()));
const searchAutosModel = searchAutosViewModel.model;

const searchToursViewModel = new SearchTourViewModel(reactive(new SearchTourModel()));
// const searchToursModel = searchToursViewModel.model;

// const searchVisasViewModel = new SearchVisaViewModel(reactive(new SearchVisaModel()));

const filterFn = (val: string, update: (cb: () => void) => void) => {
  update(() => {
    if (val === '') {
      filteredOptions.value = options.value;
    } else {
      const needle = val.toLowerCase();
      filteredOptions.value = options.value.filter(
        v => v.label.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};


const serviceViewModel = new ServicesViewModel(
  reactive(new ServicesPageModel())
);
const servicesPageModel = serviceViewModel.model;

// computed
// const computedOptions = 

asyncComputed( async () => {
  await searchSuitesViewModel.validateModel?.();
})

asyncComputed(async () => {
  await searchAutosViewModel.validateModel?.();
})

// functions
const getTabService = (tab: string) => {
  tab = tab === 'suite' || tab === 'apart' ? 'suite' : tab;
  return servicesMap.value[tab]?.id;
}

async function getServices() {
  serviceId.value = getTabService(tab.value.length >= 5? tab.value.toLowerCase().slice(0, 5) : tab.value.toLowerCase());
  await serviceViewModel.getServiceOffers(serviceId.value);
    selectedService.value = servicesPageModel.selectedService

    if (tab.value === 'auto') {
      discoverOffers.value = servicesPageModel.selectedService.offers?.filter((o, i) => i < 10) as unknown as AutoServiceOfferModel[]; 
    } else if (tab.value === 'tour') {
      discoverOffers.value = servicesPageModel.selectedService.offers?.filter((o, i) => i < 10) as unknown as AutoServiceOfferModel[]; 
    } else if (tab.value === 'visa') {
      discoverOffers.value = servicesPageModel.selectedService.offers?.filter((o, i) => i < 10) as unknown as AutoServiceOfferModel[]; 
    }

  await serviceViewModel.stores.serviceWithOffer
  ?.insertServiceOfferIntoService(serviceId.value, servicesPageModel.selectedService.offers as ServiceOffer[])

}

async function searchSuites() {
  topPicksSuites.value = await searchSuitesViewModel.getSuites() as SuitesModel[];
}

async function searchAutos() {
  topPicksAutos.value = await searchAutosViewModel.getAutos() as AutoServiceOfferModel[];
}

// async function searchTours() {
//   topPicksTours.value = await searchToursViewModel.getTours() as TourServiceOfferModel[];
// }

// async function searchVisas() {
//   topPicksVisas.value = await searchVisasViewModel.getVisas() as VisaServiceOfferModel[];
// }

function fillServiceMap(servicesWithProviders: ServiceModel[]) {
  servicesWithProviders.forEach((s) => {
    switch(true) {
      case s.name.toLowerCase().indexOf('suite') > -1 || s.name.toLocaleLowerCase().indexOf('apartment') > -1:
        servicesMap.value.suite = s;
        break;
      case s.name.toLowerCase().indexOf('auto') > -1:
        servicesMap.value.auto = s;
        break;
      case s.name.toLowerCase().indexOf('tour') > -1:
        servicesMap.value.tour = s;
        break;
      case s.name.toLowerCase().indexOf('visa') > -1:
        servicesMap.value.visa = s;
        break;
    }
  })
}

// watchers


onMounted(async () => {
  const categories = await searchSuitesViewModel.getCategories() as string[];
  options.value = categories.map((c) => ({label: capitalize(c.replaceAll('_', ' ')), value: c}));
  topPicksSuites.value = await searchSuitesViewModel.getSuites({firstTen: true});
  //
  discoverOffers.value = await searchSuitesViewModel.getSuites({random: true});

  await serviceViewModel.getServices();
  await serviceViewModel.stores.serviceWithOffer?.initializeStore();
  console.log('from mounted ', servicesPageModel.servicesWithProviders)
  serviceViewModel.stores.serviceWithOffer?.insertServices(servicesPageModel.servicesWithProviders)
  fillServiceMap(servicesPageModel.servicesWithProviders);
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
