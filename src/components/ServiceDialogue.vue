<template>
  <q-dialog :model-value="isOpen" @update:model-value="updateModelValue" persistent
    class="service-dialogue">
    <q-card class="dialogue-card">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ selectedService.name }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="service-offers q-pa-md">
        <div class="row q-col-gutter-md">
          <!-- Outer iteration for groups of 4 -->
          <div v-for="(offerGroup, groupIndex) in groupedOffers" 
               :key="groupIndex"
               class="col-12">
            <div class="row q-col-gutter-md">
              <!-- Inner iteration for each offer within the group -->
              <div v-for="offer in offerGroup" 
                   :key="offer.id" 
                   class="col-12 col-sm-6 col-md-3">
                <q-card 
                  class="offer-tile cursor-pointer"
                  @click="selectOffer(offer as unknown as ServiceOffer); currentRow = groupIndex"
                  :class="{ 'selected': selectedOffer?.id === offer.id }">
                  <q-card-section>
                    <div class="price-tag">₦{{ offer.price || offer.priceOptions?.[0]?.price }}</div>
                  </q-card-section>
                  <div class="offer-image-container">
                    <q-img
                      :src="offer.files?.[0]?.url || 'https://pixabay.com/vectors/car-porsche-sports-car-luxury-1300629'"
                      spinner-color="primary"
                      class="offer-image"
                    />
                  </div>
                  <q-card-section>
                    <div class="offer-name">{{ offer.name }}</div>
                  </q-card-section>
                </q-card>
              </div>
              <!-- Service Offer Detail Component -->
              <div v-if="selectedOffer && groupIndex === currentRow" class="col-12 q-mt-md">
                <!-- Show inline on small screens -->
                <div v-if="$q.screen.gt.md">
                  <service-offer-detail 
                    :service="selectedService" 
                    :offer="selectedOffer"
                    @update:show-modal="closeselectedOffer"
                  />
                </div>
                
                <!-- Show in modal on medium screens and down -->
                <q-dialog v-else v-model="showDetailModal">
                  <q-card class="detail-modal">
                    <q-card-section class="row items-center">
                      <div class="text-h6">{{ selectedOffer.name }}</div>
                      <q-space />
                      <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>
                    
                    <q-card-section>
                      <service-offer-detail 
                        :service="selectedService" 
                        :offer="selectedOffer"
                        @update:show-modal="closeselectedOffer"
                      />
                    </q-card-section>
                  </q-card>
                </q-dialog>
              </div>
            </div>
          </div>
        </div>

      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, computed, onMounted, watch } from 'vue';
import ServiceOfferDetail from './ServiceOfferDetail.vue';
import ServiceModel from 'src/models/service.model';
import { ServiceOffer } from 'src/lib/types';

// export interface ServiceFeature {
//   id: number;
//   name: string;
//   icon: string;
// }

// export interface ServiceOffer {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   image?: string;
//   features: ServiceFeature[];
// }

// export interface SelectedService {
//   id: string;
//   name: string;
//   offers: ServiceOffer[];
// }

const props = defineProps<{
  isOpen: boolean;
  selectedService: ServiceModel;
}>();

// define emits
const emit = defineEmits(['update:isOpen']);

const selectedOffer = ref<ServiceOffer>();
const serviceOffers = ref(props.selectedService.offers || []);
const currentRow = ref(0);

const groupedOffers = computed(() => {
  const groups = [];
  for (let i = 0; i < serviceOffers.value.length; i += 4) {
    groups.push(serviceOffers.value.slice(i, i + 4));
  }
  return groups;
}
);
const showDetailModal = ref(false);

const selectOffer = (offer: ServiceOffer) => {
  selectedOffer.value = selectedOffer.value?.id === offer.id ? {} as ServiceOffer : offer;
  if (selectedOffer.value.id) {
    showDetailModal.value = true;
  }
}; 

function updateModelValue(value: boolean) {
  emit('update:isOpen', value); 
  closeselectedOffer()
}

function closeselectedOffer() {
  selectedOffer.value = undefined;
}

watch(() => props.selectedService, (newService) => {
  serviceOffers.value = newService.offers || [];
});

onMounted(() => {
  console.log('Modal is open: ', props.isOpen)
  console.log('The selected service is: ', props.selectedService);
  console.log('ServiceDialogue mounted', props.selectedService.offers);
});
</script>

<style lang="scss" scoped>
.dialogue-card {
  width: 90vw;
  max-width: 1200px;
}

.offer-tile {
  position: relative;
  transition: all 0.3s ease;
  border-radius: 1rem;

  .offer-image-container {
    height: 180px;
    width: 100%;
    overflow: hidden;

    @media (max-width: 599px) {
      height: 150px;
    }

    .offer-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &.selected {
    border: 2px solid $primary;
  }
}

.price-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  font-weight: bold;
  color: $primary;
}

.offer-name {
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-weight: 500;
}
</style>

<!-- .detail-modal {
  width: 90vw;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
} -->
