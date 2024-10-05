<template>
  <q-page>
    <div>
      <div>
        <h4>{{ servicesPageModel.message }}</h4>
      </div>
      <p class="q-ml-xl q-pl-sm">
        {{ servicesPageModel.submessage }}
      </p>
      <div
        :class="[
          'flex',
          $q.screen.lt.lg ? 'column items-center' : 'row',
          'justify-evenly q-gutter-sm',
        ]"
      >
        <div
          v-for="(service, index) of servicesPageModel.servicesWithProviders"
          :key="index"
          class="flex column"
          style="width: min-content"
        >
          <q-card
            class="q-pb-none rounded-borders cursor-pointer"
            style="
              width: carouselWidthHeight;
              height: carouselWidthHeight;
              border-radius: 2rem;
            "
            bordered
            v-ripple
          >
            <q-card-section
              class="q-pa-none q-ma-none"
              style="position: relative"
            >
              <q-chip
                class="absolute-top-left q-px-xl q-ml-lg q-mt-lg text-h6 text-white bg-accent shadow-1"
                style="z-index: 999; max-width: 80%"
                :label="service.name"
              />
              <q-carousel
                :style="{
                  width: carouselWidthHeight,
                  height: carouselWidthHeight,
                  borderRadius: '4vw',
                }"
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
                  v-for="(file, carousel_index) of service.files"
                  :key="carousel_index"
                  :name="file.filename"
                  @click="gotoServicePage(service.id)"
                >
                  <template v-slot:default>
                    <q-img
                      :src="file.url"
                      :ratio="1"
                      spinner-color="primary"
                      spinner-size="82px"
                      loading="lazy"
                    />
                  </template>
                </q-carousel-slide>
              </q-carousel>
            </q-card-section>
          </q-card>
          <div
            class="q-mt-md"
            :style="{ color: `${$getColor('blue-grey-10')}` }"
          >
            <p>
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import ServicesPageModel from 'src/models/servicesPage.model';
import ServicesViewModel from 'src/view-models/Services.view-model';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

// consts
const $router = useRouter();
const $q = useQuasar();
// refs
const controlType = ref<'outline' | 'regular' | 'flat' | 'unelevated' | 'push'>(
  'outline'
);
const suitePanel = ref('SuitePanel');
const autoPlay = ref(true);

const carouselWidthHeight = computed(() => {
  return $q.screen.lt.lg ? '40vw' : '28vw';
});

const serviceViewModel = new ServicesViewModel(
  reactive(new ServicesPageModel())
);
const servicesPageModel = serviceViewModel.model;

// methods
function gotoServicePage(serviceId: string) {
  $router.push(`${$router.currentRoute.value.path}/${serviceId}/suites`);
}

onMounted(async () => {
  await serviceViewModel.getServices();
});
</script>
