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
        'flex',
        $q.screen.lt.lg ? 'column items-center' : 'row',
        'justify-evenly q-gutter-sm',
      ]">
        <div v-for="(service, index) of servicesPageModel.servicesWithProviders" :key="index" class="flex column"
          style="width: min-content">
          <q-card class="q-pb-none rounded-borders cursor-pointer" :style="{
            width: carouselWidthHeight,
            height: carouselWidthHeight,
            borderRadius: '2rem',
          }
            " bordered v-ripple>
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
            <q-card-section>
              <div class="q-mt-md" :style="{ color: `${$getColor('blue-grey-10')}` }">
                <p class="suite-service-description">
                  {{ service.description }}
                </p>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <service-dialogue :is-open="serviceDialogueIsOpen" 
    :selected-service="selectedService" @update:is-open="serviceDialogueIsOpen = $event" />
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
import { HospitalityServiceType } from 'src/lib/enums/enums';

// consts
const $router = useRouter();
const $q = useQuasar();
// refs
const controlType = ref<'outline' | 'regular' | 'flat' | 'unelevated' | 'push'>(
  'outline'
);
const suitePanel = ref('SuitePanel');
const autoPlay = ref(true);
const serviceDialogueIsOpen = ref(false);

const selectedService = ref<ServiceWithOffers>({
  id: 'car-hire-001',
  name: 'Car Hire',
  offers: [
    {
      id: 'ch-001',
      name: 'Matrix Car',
      price: '25000',
      description: 'Experience luxury and comfort with our premium Matrix Car. Perfect for business trips and special occasions. Includes professional driver and fuel.',
      features: [
        { id: '1', name: 'Air Conditioning', icon: 'ac_unit' },
        { id: '2', name: 'Leather Seats', icon: 'airline_seat_recline_extra' },
        { id: '3', name: 'Bluetooth Audio', icon: 'bluetooth_audio' },
        { id: '4', name: 'GPS Navigation', icon: 'navigation' },
        { id: '5', name: '24/7 Support', icon: 'support_agent' },
        { id: '6', name: 'Free WiFi', icon: 'wifi' },
        { id: '7', name: 'Child Seat Available', icon: 'child_care' },
        { id: '8', name: 'Insurance Included', icon: 'security' },
        { id: '9', name: 'Unlimited Mileage', icon: 'speed' },
        { id: '10', name: 'Professional Driver', icon: 'person' },
        { id: '11', name: 'Fuel Included', icon: 'local_gas_station' },
        { id: '12', name: 'Airport Pickup', icon: 'flight' },
        { id: '13', name: 'Roadside Assistance', icon: 'build' },
        { id: '14', name: 'Multiple Payment Options', icon: 'payment' },
        { id: '15', name: 'Free Cancellation', icon: 'cancel' }
      ]
    },
    {
      id: 'ch-002',
      name: 'Luxury Sedan',
      price: '30000',
      description: 'Enjoy a smooth, comfortable ride in our Luxury Sedan, designed for style and performance. Ideal for corporate events or high-end leisure.',
      features: [
        { id: '1', name: 'Leather Seats', icon: 'airline_seat_recline_extra' },
        { id: '2', name: 'Bluetooth Connectivity', icon: 'bluetooth_audio' },
        { id: '3', name: 'GPS Navigation', icon: 'navigation' },
        { id: '4', name: 'Sunroof', icon: 'wb_sunny' },
        { id: '5', name: 'Heated Seats', icon: 'ac_unit' },
        { id: '6', name: 'Premium Audio System', icon: 'speaker' },
        { id: '7', name: 'Satellite Radio', icon: 'radio' },
        { id: '8', name: 'Remote Start', icon: 'play_arrow' },
        { id: '9', name: 'Parking Assistance', icon: 'directions_car' },
        { id: '10', name: 'Luxury Interior', icon: 'king_bed' }
      ]
    },
    {
      id: 'ch-003',
      name: 'Matrix Car',
      price: '25000',
      description: 'Experience luxury and comfort with our premium Matrix Car. Perfect for business trips and special occasions. Includes professional driver and fuel.',
      features: [
        { id: '1', name: 'Air Conditioning', icon: 'ac_unit' },
        { id: '2', name: 'Leather Seats', icon: 'airline_seat_recline_extra' },
        { id: '3', name: 'Bluetooth Audio', icon: 'bluetooth_audio' },
        { id: '4', name: 'GPS Navigation', icon: 'navigation' },
        { id: '5', name: '24/7 Support', icon: 'support_agent' },
        { id: '6', name: 'Free WiFi', icon: 'wifi' },
        { id: '7', name: 'Child Seat Available', icon: 'child_care' },
        { id: '8', name: 'Insurance Included', icon: 'security' },
        { id: '9', name: 'Unlimited Mileage', icon: 'speed' },
        { id: '10', name: 'Professional Driver', icon: 'person' },
        { id: '11', name: 'Fuel Included', icon: 'local_gas_station' },
        { id: '12', name: 'Airport Pickup', icon: 'flight' },
        { id: '13', name: 'Roadside Assistance', icon: 'build' },
        { id: '14', name: 'Multiple Payment Options', icon: 'payment' },
        { id: '15', name: 'Free Cancellation', icon: 'cancel' }
      ]
    },
    {
      id: 'ch-004',
      name: 'Sporty SUV',
      price: '35000',
      description: 'The Sporty SUV offers the perfect blend of rugged durability and modern luxury. Ideal for outdoor adventures or family trips.',
      features: [
        { id: '1', name: 'All-Wheel Drive', icon: 'directions_car' },
        { id: '2', name: 'GPS Navigation', icon: 'navigation' },
        { id: '3', name: 'Bluetooth Connectivity', icon: 'bluetooth_audio' },
        { id: '4', name: 'Sport Mode', icon: 'sports_score' },
        { id: '5', name: 'Leather Upholstery', icon: 'airline_seat_recline_extra' },
        { id: '6', name: 'Backup Camera', icon: 'camera_alt' },
        { id: '7', name: 'Roof Rack', icon: 'roofing' },
        { id: '8', name: 'Towing Capacity', icon: 'tow' },
        { id: '9', name: 'Panoramic Sunroof', icon: 'wb_sunny' },
        { id: '10', name: 'Heated Steering Wheel', icon: 'ac_unit' },
        { id: '11', name: 'Free Roadside Assistance', icon: 'build' },
        { id: '12', name: 'Advanced Safety Features', icon: 'security' }
      ]
    },
    {
      id: 'ch-005',
      name: 'Matrix Car',
      price: '25000',
      description: 'Experience luxury and comfort with our premium Matrix Car. Perfect for business trips and special occasions. Includes professional driver and fuel.',
      features: [
        { id: '1', name: 'Air Conditioning', icon: 'ac_unit' },
        { id: '2', name: 'Leather Seats', icon: 'airline_seat_recline_extra' },
        { id: '3', name: 'Bluetooth Audio', icon: 'bluetooth_audio' },
        { id: '4', name: 'GPS Navigation', icon: 'navigation' },
        { id: '5', name: '24/7 Support', icon: 'support_agent' },
        { id: '6', name: 'Free WiFi', icon: 'wifi' },
        { id: '7', name: 'Child Seat Available', icon: 'child_care' },
        { id: '8', name: 'Insurance Included', icon: 'security' },
        { id: '9', name: 'Unlimited Mileage', icon: 'speed' },
        { id: '10', name: 'Professional Driver', icon: 'person' },
        { id: '11', name: 'Fuel Included', icon: 'local_gas_station' },
        { id: '12', name: 'Airport Pickup', icon: 'flight' },
        { id: '13', name: 'Roadside Assistance', icon: 'build' },
        { id: '14', name: 'Multiple Payment Options', icon: 'payment' },
        { id: '15', name: 'Free Cancellation', icon: 'cancel' }
      ]
    },
    {
      id: 'ch-006',
      name: 'Electric Car',
      price: '40000',
      description: 'Go green with our Electric Car, offering both sustainability and efficiency. Ideal for eco-conscious drivers who want a modern, smooth driving experience.',
      features: [
        { id: '1', name: 'Zero Emissions', icon: 'cloud' },
        { id: '2', name: 'Fast Charging', icon: 'battery_charging_full' },
        { id: '3', name: 'Bluetooth Audio', icon: 'bluetooth_audio' },
        { id: '4', name: 'Regenerative Braking', icon: 'battery_full' },
        { id: '5', name: 'GPS Navigation', icon: 'navigation' },
        { id: '6', name: 'Heated Seats', icon: 'ac_unit' },
        { id: '7', name: 'Autopilot Mode', icon: 'drive_eta' },
        { id: '8', name: 'Remote Climate Control', icon: 'ac_unit' },
        { id: '9', name: 'Lane Assist', icon: 'directions' },
        { id: '10', name: 'Eco Mode', icon: 'eco' }
      ]
    },
    {
      id: 'ch-007',
      name: 'Matrix Car',
      price: '25000',
      description: 'Experience luxury and comfort with our premium Matrix Car. Perfect for business trips and special occasions. Includes professional driver and fuel.',
      features: [
        { id: '1', name: 'Air Conditioning', icon: 'ac_unit' },
        { id: '2', name: 'Leather Seats', icon: 'airline_seat_recline_extra' },
        { id: '3', name: 'Bluetooth Audio', icon: 'bluetooth_audio' },
        { id: '4', name: 'GPS Navigation', icon: 'navigation' },
        { id: '5', name: '24/7 Support', icon: 'support_agent' },
        { id: '6', name: 'Free WiFi', icon: 'wifi' },
        { id: '7', name: 'Child Seat Available', icon: 'child_care' },
        { id: '8', name: 'Insurance Included', icon: 'security' },
        { id: '9', name: 'Unlimited Mileage', icon: 'speed' },
        { id: '10', name: 'Professional Driver', icon: 'person' },
        { id: '11', name: 'Fuel Included', icon: 'local_gas_station' },
        { id: '12', name: 'Airport Pickup', icon: 'flight' },
        { id: '13', name: 'Roadside Assistance', icon: 'build' },
        { id: '14', name: 'Multiple Payment Options', icon: 'payment' },
        { id: '15', name: 'Free Cancellation', icon: 'cancel' }
      ]
    },
    {
      id: 'ch-008',
      name: 'Convertible Roadster',
      price: '55000',
      description: 'Feel the wind in your hair with our Convertible Roadster. Perfect for scenic drives and those who love the open road.',
      features: [
        { id: '1', name: 'Convertible Top', icon: 'sunny' },
        { id: '2', name: 'Bluetooth Audio', icon: 'bluetooth_audio' },
        { id: '3', name: 'Leather Seats', icon: 'airline_seat_recline_extra' },
        { id: '4', name: 'Sport Suspension', icon: 'sports_score' },
        { id: '5', name: 'Advanced Audio System', icon: 'speaker' },
        { id: '6', name: 'GPS Navigation', icon: 'navigation' },
        { id: '7', name: 'Rearview Camera', icon: 'camera_alt' },
        { id: '8', name: 'Premium Wheels', icon: 'luggage' },
        { id: '9', name: 'Push-Button Start', icon: 'power_settings_new' },
        { id: '10', name: 'Heated Seats', icon: 'ac_unit' }
      ]
    }
  ]
}
);


// const selectedService = ref<ServiceModel>({} as ServiceModel);
const carouselWidthHeight = computed(() => {
  return $q.screen.lt.lg ? '40vw' : '28vw';
});

const serviceViewModel = new ServicesViewModel(
  reactive(new ServicesPageModel())
);
const servicesPageModel = serviceViewModel.model;

// methods
async function gotoServicePage(serviceId: string, serviceName: string) {
  const service = serviceViewModel.getServiceById(serviceId);
  if (service?.type === HospitalityServiceType.AUTO_SERVICE || serviceName.toLowerCase().indexOf('suite') > -1) {
    $router.push(`${$router.currentRoute.value.path}/${serviceId}/suites`);
  }
  else {
    // serviceViewModel.getServiceOffers(serviceId);
    serviceDialogueIsOpen.value = true;
    // selectedService.value = servicesPageModel.selectedService as unknown as ServiceWithOffers
  }
}

onMounted(async () => {
  await serviceViewModel.getServices();
});
</script>
