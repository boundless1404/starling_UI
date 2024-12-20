<template>
  <q-page>
    <div>
      <div>
        <h4>{{ suitesDetailsPageModel.serviceProviderName }} {{ suitesDetailsPageModel.serviceType }} - ables</h4>
      </div>
      <p class="q-ml-xl q-pl-sm">
        {{ suitesPageModel.submessage }}
      </p>
      <div class="q-px-lg">
        <!-- rooms-icon area -->
        <div class="flex flex-center">
          <div class="border-rounded-sm q-mx-lg" :style="{
            width: '98%',
            height: '12vh',
            border: `solid ${$getColor('secondary')} 0.1rem`,
          }">
            <div class="flex row flex-center q-py-xs">
              <q-btn class="q-pa-sm" :style="{
                border: `${$getColor('secondary')} solid 0.1px`,
              }" icon="arrow_left" size="1.2vw" round flat outline color="secondary" @click="decrementCategoryIndex" />
              <div class="flex row flex-center rooms-type-slide" style="height: 100%; width: 70%">
                <q-btn v-for="(category, index) of categoriesForSlideComputed" :key="index" icon="apartment" :label="($q.screen.lt.lg ? category.slice(0, 14) : category)
                  .split('_')
                  .join(' ')
                  " flat size="1.4vw" outline :color="selectedCategory === category ? 'accent' : 'secondary'
                    " stack no-caps @click="getSuitesByCategory(category)" />
              </div>
              <q-btn :style="{
                border: `${$getColor('secondary')} solid 0.1px`,
              }" icon="arrow_right" size="1.2vw" round flat outline color="secondary" class="q-pa-sm"
                @click="incrementCategoryIndex" />
            </div>
          </div>
        </div>
        <!-- suite-provider drop-down -->
        <div class="q-mt-lg q-ml-lg">
          <span class="q-ml-sm">Suite Providers:</span>
          <q-select style="width: 20%" color="secondary" label="All" v-model="selectedServiceProvider"
            :options="serviceProvidersOptions" emit-value map-options outlined rounded dense />
        </div>
        <!-- rooms show area -->
        <div style="width: 88vw; margin-top: 5rem; margin-bottom: 5rem;">
          <!-- Category -->
          <p class="q-mt-md text-center" style="width: 100%;">{{ formattedCategoryComputed }}</p>
          <!-- room-display -->
          <div
            style="width: 100%; display: flex; justify-content: space-evenly; align-items: center; margin-top: 3rem; margin-bottom: 3rem;">
            <!-- arrow-left -->
            <q-btn class="q-pa-sm" :style="{
              border: `${$getColor('secondary')} solid 0.1px`,
            }" icon="arrow_left" size="0.6vw" round flat outline color="secondary" @click="prevRoom" />
            <!-- room -->
            <div style="width: 80%;">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-img class="full-width" style="border-radius: 2rem;"
                    :src="currentSuite?.files[getRandomIndexForNumRange(suitesDetailsPageModel.suites.length - 1)].url" />
                  <div class="flex row justify-between no-wrap items-baseline q-gutter-x-md q-mt-md"
                    style="width: 100%;">
                    <div class="flex row justify-between q-gutter-x-md q-mt-md">

                      <q-chip class="cursor-pointer" color="primary" text-color="white">
                        {{ '\u20A6' }}{{ currentSelectedPriceOption?.price || 0 }}
                        <q-tooltip class="bg-secondary" v-show="currentSelectedPriceOption?.description">
                          {{ currentSelectedPriceOption?.description || '' }}
                        </q-tooltip>
                      </q-chip>
                      <q-select v-model="selectedPriceId" :options="priceSelectOptionsComputed" dense options-dense
                        borderless style="width: 120px" map-options emit-value />
                    </div>
                    <div>
                      <q-btn color="primary" label="Book Now" no-caps rounded @click="openBookingForm" />
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 flex items-center justify-center">
                  <p class="text-body2">{{ suiteDescriptionComputed }}</p>
                </div>
              </div>
            </div>
            <!-- arrow-right -->
            <q-btn class="q-pa-sm" :style="{
              border: `${$getColor('secondary')} solid 0.1px`,
            }" icon="arrow_right" size="0.6vw" round flat outline color="secondary" @click="nextRoom" />
          </div>
          <!-- room-additional-images -->
          <div class="image-grid">
            <q-img v-for="(imageFile, index) of currentSuite?.files" :key="index" class="grid-image"
              :src="imageFile.url" />
          </div>
        </div>
        <!-- features and reviews-->
        <div class="q-mt-xl" style="width: 88vw;">
          <p
            :style="{ width: '100%', textAlign: 'center', fontSize: '1.8rem', borderTop: 'solid .1rem', borderBottom: 'solid .1rem' }">
            Features
            and Amenities
          </p>
          <!-- icon&name 2*2 grid for features and amenities  -->
          <div style="width: 100%; display: flex; place-content: center; padding-left: 12vw">
            <div class="row q-col-gutter-md q-mt-md">
              <div v-for="(feature, featureIndex) in roomFeatures" :key="featureIndex" class="col-6 q-mb-md">
                <div class="flex items-center">
                  <q-icon :name="feature.icon" color="primary" size="2rem" class="q-mr-sm" />
                  <span>{{ feature.name }}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p class="q-mt-xl" style="text-align: center; font-size: 1.2rem;">Users Reviews</p>
            <div v-if="hasReviews">
              <!-- Existing review content goes here -->
            </div>
            <div v-else class="empty-reviews-state">
              <q-img src="/assets/undraw_reviews_lp8w.png" style="width: 200px; height: 200px;" />
              <p class="text-center q-mt-md" style="font-size: 0.8rem !important;">No reviews yet.</p>
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <suite-booking-component :current-suite="currentSuite" :selected-price-id="selectedPriceId"
      :service-provider-name="suitesDetailsPageModel.serviceProviderName" :current-category="formattedCategoryComputed"
      :show-modal="showBookingModal" :currentSelectedPriceOption="currentSelectedPriceOption"
      @update:show-modal="showBookingModal = false"
      @update:selected-price-id="updateSelectedPrice"
      :priceSelectOptions="priceSelectOptionsComputed" /> -->

    <bookings-component :show-modal="showBookingModal" @update:show-modal="showBookingModal = false" v-bind:suite-booking-component-props="{
      currentSuite: currentSuite,
      selectedPriceId: selectedPriceId,
      serviceProviderName: suitesDetailsPageModel.serviceProviderName,
      currentCategory: formattedCategoryComputed,
      currentSelectedPriceOption: currentSelectedPriceOption,
      priceSelectOptions: priceSelectOptionsComputed,
    }" :current-booking-component-name="currentBookingComponentName" @update:selected-price-id="(value: string) => selectedPriceId = value" />
    
  </q-page>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import { toSentenceCase } from 'src/lib/utils';
import SuitesModel from 'src/models/suite.model';
import { SuitesDetailsPageModel } from 'src/models/suitesDetails.model';
import SuitesPageModel from 'src/models/suitesPage.model';
import SuiteDetailsViewModel from 'src/view-models/suiteDetails.view-model';
import SuitesViewModel from 'src/view-models/suites.view-model';
import { computed, onMounted, reactive, watch } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PriceOption from 'src/models/priceVariation.model';
import BookingsComponent, { BookingComponentName } from 'src/components/BookingsComponent.vue';
import { ServiceOfferPriceOption } from 'src/lib/types';


// models
const suitesDetailsViewPageModel = new SuiteDetailsViewModel(reactive(new SuitesDetailsPageModel()));
const suitesDetailsPageModel = suitesDetailsViewPageModel.model;
const suitesViewModel = new SuitesViewModel(reactive(new SuitesPageModel()));
const suitesPageModel = suitesViewModel.model;

// consts
const $q = useQuasar();
const router = useRouter();
const { serviceId } = router.currentRoute.value.params as { serviceId: string };
const { serviceProviderId } = router.currentRoute.value.params as { serviceProviderId: string };
const currentCategoryIndex = ref(0);
const currentSuiteIndex = ref(0);
const currentSuite = ref<SuitesModel>();
const selectedPriceId = ref('');
const currentSelectedPriceOption = ref<NonNullable<PriceOption | ServiceOfferPriceOption >>();
const showBookingModal = ref(false);
const currentBookingComponentName = ref<BookingComponentName>('suiteBooking');


//refs
const selectedServiceProvider = ref('');
const categoriesLength = ref(0);
const selectedCategory = ref('');
const roomFeatures = ref([{
  name: 'Bathroom',
  icon: 'bathroom',
},
{
  name: 'Bathroom',
  icon: 'bathroom',
},
{
  name: 'Bathroom',
  icon: 'bathroom',
},
{
  name: 'Bathroom',
  icon: 'bathroom',
}
]);

// computed
const priceSelectOptionsComputed = computed(() => {
  console.log('this is the price options', currentSuite?.value?.priceOptions);
  const options = currentSuite?.value?.priceOptions?.map((p) => {
    return {
      label: toSentenceCase(p.durationType.split('_').join(' ')),
      value: p.id,
    };
  });
  return options;
});

const suiteDescriptionComputed = computed(() => {
  console.log(currentSuite?.value?.description);
  return currentSuite?.value?.description;
});

const formattedCategoryComputed = computed(() => {
  return currentSuite?.value?.category.split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || ''
})

const hasReviews = computed(() => {
  // return suitesPageModel.usersReviews && suitesPageModel.usersReviews.length > 0;
  return false;
});

const providerNameComputed = computed(() => {
  return (
    suitesPageModel.providers?.find(
      (p) => p.id === selectedServiceProvider.value
    )?.name || ''
  );
});

const categoriesForSlideComputed = computed(() => {
  if (!suitesPageModel.categories?.length) {
    return [];
  }
  const leftSideCategoryIndex =
    currentCategoryIndex.value - 1 < 0
      ? categoriesLength.value
      : currentCategoryIndex.value - 1;
  const rightSideCategoryIndex =
    currentCategoryIndex.value + 1 > categoriesLength.value
      ? 0
      : currentCategoryIndex.value + 1;

  const result = [
    suitesPageModel.categories[leftSideCategoryIndex],
    suitesPageModel.categories[currentCategoryIndex.value],
    suitesPageModel.categories[rightSideCategoryIndex],
  ];

  console.log('this is the result: ', result);
  return result;
});

const serviceProvidersOptions = computed(() => {
  return (
    suitesPageModel.providers?.map((p) => ({
      label: p.name,
      value: p.id,
    })) || []
  );
});

//methods
function updateSelectedPrice(newVal: string) {
  selectedPriceId.value = newVal;
  console.log('updating selected price: ', newVal)
}

function openBookingForm() {
  showBookingModal.value = !showBookingModal.value;
}

function getRandomIndexForNumRange(maxNumValue: number) {
  return Number((Math.random() * maxNumValue).toFixed());
}

function nextRoom() {
  let currValue = currentSuiteIndex.value;
  currValue++;
  if (currValue === suitesDetailsPageModel.suites.length) {
    currValue = 0;
  }
  currentSuite.value = suitesDetailsPageModel.suites[currValue];
  currentSuiteIndex.value = currValue;
}

function prevRoom() {
  let currValue = currentSuiteIndex.value;
  currValue--;
  if (currValue < 0) {
    currValue = suitesDetailsPageModel.suites.length - 1;
  }
  currentSuite.value = suitesDetailsPageModel.suites[currValue];
  currentSuiteIndex.value = currValue;
}

async function getSuitesByCategory(category: string) {
  selectedCategory.value = category;
  await suitesViewModel.getSuites({
    category: category.split(' ').join('_'),
    ...(selectedServiceProvider.value
      ? { serviceProviderId: selectedServiceProvider.value }
      : { serviceId }),
  });
}

function incrementCategoryIndex() {
  let currentValue = currentCategoryIndex.value;
  currentValue += 1;

  if (currentValue > categoriesLength.value) {
    currentValue = 0;
  }
  currentCategoryIndex.value = currentValue;
}

function decrementCategoryIndex() {
  let currentValue = currentCategoryIndex.value;
  currentValue -= 1;

  if (currentValue < 0) {
    currentValue = categoriesLength.value;
  }
  currentCategoryIndex.value = currentValue;
}


//watchers
watch(priceSelectOptionsComputed, (newVal) => {
  if (newVal) {
    selectedPriceId.value = newVal[0].value;
  }
});

watch(selectedPriceId, (newVal) => {
  if (newVal) {
    const targetPriceOption = currentSuite.value?.priceOptions.find((price) => price.id === newVal);
    currentSelectedPriceOption.value = targetPriceOption;
  }
  console.log('newVal: ', newVal);
});

watch(selectedServiceProvider, async (newVal) => {
  if (newVal) {
    console.log('before request: ', suitesPageModel.suites);
    await suitesViewModel.getSuites({ serviceProviderId: newVal });
    console.log('after request: ', suitesPageModel.suites);
  }
});
// hooks
onMounted(async () => {
  //
  await suitesViewModel.populateModelFields(serviceId);
  await suitesDetailsViewPageModel.populateModelFields({ serviceProviderId });

  // subtract 1 to make is a valid last index
  categoriesLength.value = suitesPageModel?.categories.length - 1;
  currentCategoryIndex.value = getRandomIndexForNumRange(suitesDetailsPageModel.suites.length - 1);
  currentSuite.value = suitesDetailsPageModel.suites[currentCategoryIndex.value];
  selectedPriceId.value = currentSuite.value.priceOptions[0].id;
});
</script>
<style lang="scss">
.purple-border {
  border: 4px solid purple;
  width: 99%;
}

.feature-full-width {
  // make width 100% of body
  width: 98.5vw !important;
  margin: 0 0 0 -3.4vw !important;
  padding: 0 0.1rem;
}

.rooms-type-slide {
  & button {
    font-size: medium;
  }
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
  gap: 2vw;
  width: 100%;
}

.grid-image {
  width: 100%;
  border-radius: 0.8rem;
}

@media (min-width: 768px) {
  .image-grid {
    grid-template-columns: repeat(4, 1fr);
    margin-top: 1vw;
  }
}

.empty-reviews-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
</style>
