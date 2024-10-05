<template>
  <q-page>
    <div>
      <div>
        <h4>{{ suitesPageModel.message }}</h4>
      </div>
      <p class="q-ml-xl q-pl-sm">
        {{ suitesPageModel.submessage }}
      </p>
      <div class="q-px-lg">
        <!-- rooms-icon area -->
        <div class="flex flex-center">
          <div
            class="border-rounded-sm q-mx-lg"
            :style="{
              width: '98%',
              height: '12vh',
              border: `solid ${$getColor('secondary')} 0.1rem`,
            }"
          >
            <div class="flex row flex-center q-py-xs">
              <q-btn
                class="q-pa-md"
                :style="{
                  border: `${$getColor('secondary')} solid 0.1px`,
                }"
                icon="arrow_left"
                size="1.6vw"
                round
                flat
                outline
                color="secondary"
                @click="decrementCategoryIndex"
              />
              <div
                class="flex row flex-center rooms-type-slide"
                style="height: 100%; width: 70%"
              >
                <q-btn
                  v-for="(category, index) of categoriesForSlideComputed"
                  :key="index"
                  icon="apartment"
                  :label="
                    ($q.screen.lt.lg ? category.slice(0, 14) : category)
                      .split('_')
                      .join(' ')
                  "
                  flat
                  size="1.4vw"
                  outline
                  :color="
                    selectedCategory === category ? 'accent' : 'secondary'
                  "
                  stack
                  no-caps
                  @click="getSuitesByCategory(category)"
                />
              </div>
              <q-btn
                :style="{
                  border: `${$getColor('secondary')} solid 0.1px`,
                }"
                icon="arrow_right"
                size="1.6vw"
                round
                flat
                outline
                color="secondary"
                class="q-pa-md"
                @click="incrementCategoryIndex"
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
            v-model="selectedServiceProvider"
            :options="serviceProvidersOptions"
            emit-value
            map-options
            outlined
            rounded
            dense
          />
        </div>
        <!-- rooms show area -->
      </div>
      <!-- features -->
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import SuitesPageModel from 'src/models/suitesPage.model';
import SuitesViewModel from 'src/view-models/suites.view-model';
import { computed, onMounted, reactive, watch } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// consts
const $q = useQuasar();
const router = useRouter();
const { serviceId } = router.currentRoute.value.params as { serviceId: string };
const suitesViewModel = new SuitesViewModel(reactive(new SuitesPageModel()));
const suitesPageModel = suitesViewModel.model;
const currentCategoryIndex = ref(0);

//refs
const controlType = ref<'outline' | 'regular' | 'flat' | 'unelevated' | 'push'>(
  'outline'
);
const suitePanel = ref('SuitePanel');
const autoPlay = ref(true);
const selectedServiceProvider = ref('');
const categoriesLength = ref(0);
const selectedCategory = ref('');

// computed
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

const carouselWidthHeight = computed(() => {
  return $q.screen.lt.lg ? '40vw' : '28vw';
});

//methods
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
  // subtract 1 to make is a valid last index
  categoriesLength.value = suitesPageModel.categories.length - 1;
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
</style>
