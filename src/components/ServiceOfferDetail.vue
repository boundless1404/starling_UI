<template>
  <q-card class="service-offer-detail q-pa-md">
    <div class="row justify-center items-center q-mb-md">
      <q-chip class="q-ma-none text-h5 secondarytwo">{{ service?.name }} - {{ offer?.name }}</q-chip>
    </div>

    <div class="section q-mb-md">
      <q-chip class="text-subtitle1 q-mb-sm secondarytwo">Description</q-chip>
      <p>{{ offer?.description }}</p>
    </div>

    <q-card-section class="section">
      <q-chip class="text-subtitle1 q-mb-sm secondarytwo" label="Features" />
      <div class="row q-col-gutter-sm more-margin-left">
        <div v-for="(feature, index) in visibleFeatures" :key="index" class="col-12 col-sm-6 col-md-3">
          <div v-if="index < visibleFeatures.length - 1" class="feature-item row items-center">
            <q-icon :name="feature.icon" size="sm" color="primary" class="q-mr-xs" />
            <span>{{ feature.name }}</span>
          </div>
          <div v-else class="feature-item row items-center">
            <q-btn v-if="hasMoreFeatures" flat color="primary" @click="showAllFeatures">
              + {{ hiddenFeaturesCount + 1 }} more
            </q-btn>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-section class="section">
      <q-chip class="text-subtitle1 q-mb-sm secondarytwo" label="Price" />
      <div class="price-section">
        <div class="row items-center justify-between">
          <q-chip class="text-subtitle1 q-mr-sm secondarytwo">
            {{ '\u20A6' }}{{ offer?.price }}
          </q-chip>
          <q-btn flat color="black"  class="secondarytwo" rounded outlined @click="showBookingModal = true" label="Select" />


        </div>
      </div>
    </q-card-section>

    <!-- Features Dialog -->
    <q-dialog v-model="showFeatureDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">All Features</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row q-col-gutter-md">
            <div v-for="feature in offer?.features" :key="feature.id" class="col-12 col-sm-6">
              <div class="feature-item row items-center">
                <q-icon :name="feature.icon" size="sm" class="q-mr-sm" />
                <span>{{ feature.name }}</span>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <bookings-component :show-modal="showBookingModal" :current-booking-component-name="currentBookingComponentName"
    v-bind:auto-booking-component-props="{
      serviceOfferId,
      serviceOfferPriceOptionId,
      currentSelectedPriceOption,
      serviceOfferProviderName,
      priceSelectOptions,
      serviceOfferPrice
    }"

    @update:show-modal="(value) => showBookingModal = value"
    />
  </q-card>
</template>

<script setup lang="ts">
import ServiceModel from 'src/models/service.model';
import { ref, computed, onMounted } from 'vue';
import BookingsComponent, { BookingComponentName } from 'src/components/BookingsComponent.vue';
import PriceOption from 'src/models/priceVariation.model';

const props = defineProps({
  service: ServiceModel,
  offer: Object,
});


const currentSelectedPriceOption = ref<PriceOption>(props.offer?.priceOptions?.[0] || {});
const showBookingModal = ref(false);
const currentBookingComponentName = ref<BookingComponentName>('autoBookingComponent');
const serviceOfferId = ref(props.offer?.id);
const serviceOfferPriceOptionId = ref(currentSelectedPriceOption.value?.id);
const serviceOfferProviderName = ref(props.service?.provider?.name || '');
const serviceOfferPrice = ref(props.offer?.price || 0);

const showFeatureDialog = ref(false);
const VISIBLE_FEATURES_COUNT = 12; // 4 features x 3 rows

const priceSelectOptions = computed(() => {
  return props.offer?.priceOptions?.map((option: PriceOption) => ({
    label: option.price,
    value: option.id,
  }));
});

const visibleFeatures = computed(() => {
  return props.offer?.features?.slice(0, VISIBLE_FEATURES_COUNT);
});

const hasMoreFeatures = computed(() => {
  return props.offer?.features.length > VISIBLE_FEATURES_COUNT;
});

const hiddenFeaturesCount = computed(() => {
  return props.offer?.features.length - VISIBLE_FEATURES_COUNT;
});

const showAllFeatures = () => {
  showFeatureDialog.value = true;
};

onMounted(() => {
  console.log(props.offer);
  });
</script>

<style lang="scss" scoped>
.service-offer-detail {
  width: 100%;
  background-color: #1F8AB3;
}

.feature-item {
  padding: 2px;
  border-radius: 4px;
  background: hsla(0, 0%, 0%, 0.03);
}

.section {
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  border-radius: 1rem !important;
  border: 1px solid hsl(197, 71%, 31%, 80%) !important;
  padding: 1.2rem;
  background-color: hsl(197, 70%, 41%, 70%);
  margin-bottom: .5rem;

  &>div:nth-child(1) {
    background-color: white;
    padding: 0.8rem;
    border-radius: 0.8rem;
  }

  &>div:nth-child(2), p {
    margin-top: 1rem;
    background-color: white;
    padding: 0.8rem;
      border-radius: 1rem !important;
  }
  &>div:nth-child(2).more-margin-left{
    margin-left: 0.3rem;
  }
}

.secondarytwo {
  background-color: #dfe2ff !important;
}
</style>
