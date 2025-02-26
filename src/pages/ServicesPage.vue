<template>
  <q-page>
    <div>
      <div>
        <h4>{{ servicesPageModel.message }}</h4>
      </div>
      <p class="q-ml-xl q-pl-sm">
        {{ servicesPageModel.submessage }}
      </p>
      <div :class="[
        'row',
        'justify-evenly q-gutter-sm',
      ]
        ">

        <div v-for="(service, index) of servicesPageModel.servicesWithProviders" :key="index"
          class="col-lg-3 col-md-4 col-sm-12" :style="{
            width: carouselWidthHeight,

          }
            ">
          <q-card class="q-pb-none rounded-border cursor-pointer" style="border-radius: 2rem;" bordered v-ripple>
            <q-card-section class="q-pa-none q-ma-none" style="position: relative"
              @click="gotoServicePage(service.id, service.name)">
              <q-chip class="absolute-top-left q-px-xl q-ml-lg q-mt-lg text-h6 text-white bg-accent shadow-1"
                style="z-index: 999; max-width: 80%" :label="service.name" />
              <q-img :src="service.files?.[0].url" :style="{
                width: carouselWidthHeight,
                height: carouselWidthHeight,
                borderRadius: '2rem',
              }" />
            </q-card-section>
          </q-card>
          <div class="q-mt-md" :style="{ color: `${$getColor('blue-grey-10')}` }">
            <p class="suite-service-description">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <service-dialogue :is-open="serviceDialogueIsOpen" :selected-service="selectedService"
      @update:is-open="serviceDialogueIsOpen = $event" />
  </q-page>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import ServicesPageModel from 'src/models/servicesPage.model';
import ServicesViewModel from 'src/view-models/services.view-model';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import ServiceDialogue from 'src/components/ServiceDialogue.vue';
import ServiceModel from 'src/models/service.model';
import { ServiceOffer, ServiceWithOffers } from 'src/lib/types';

// consts
const $router = useRouter();
const $q = useQuasar();
// refs
const controlType = ref<'outline' | 'regular' | 'flat' | 'unelevated' | 'push'>(
  'outline'
);

const refershCount = ref(0);
const suitePanel = ref('SuitePanel');
const autoPlay = ref(true);
const serviceDialogueIsOpen = ref(false);

const selectedService = ref<ServiceModel>({} as ServiceModel);
const carouselWidthHeight = computed(() => {
  return $q.screen.lt.lg ? '32vw' : '20vw';
});

const serviceViewModel = new ServicesViewModel(
  reactive(new ServicesPageModel())
);
const servicesPageModel = serviceViewModel.model;

// methods
async function gotoServicePage(serviceId: string, serviceName: string) {
  // const service = serviceViewModel.getServiceById(serviceId);
  if (serviceName.toLowerCase().indexOf('apartment') > -1) {
    $router.push(`${$router.currentRoute.value.path}/${serviceId}/suites`);
  }
  else {
    await serviceViewModel.getServiceOffers(serviceId);
    selectedService.value = servicesPageModel.selectedService as ServiceWithOffers
    serviceDialogueIsOpen.value = true;
    // add service offer to store
    await serviceViewModel.stores.serviceWithOffer
    ?.insertServiceOfferIntoService(serviceId, servicesPageModel.selectedService.offers as ServiceOffer[])
  }
}

onMounted(async () => {
  await serviceViewModel.getServices();
  await serviceViewModel.stores.serviceWithOffer?.initializeStore();
  console.log('from mounted ', servicesPageModel.servicesWithProviders)
  serviceViewModel.stores.serviceWithOffer?.insertServices(servicesPageModel.servicesWithProviders)
  // referesh
  if (refershCount.value < 1) {
    // $router.go(0);
    refershCount.value++;
    return;
  }
});
</script>
