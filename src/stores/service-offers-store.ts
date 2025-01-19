import { defineStore } from 'pinia';
import { forageGetItem, forageSetItem } from 'src/boot/storeforage';
import { ServiceOffer, ServiceWithOffers } from 'src/lib/types';
import { StorageNamesEnum } from '.';

let servicesWithOffers: ServiceWithOffers[] = [];
const useServiceOffer = defineStore('service_with_offers', {
  state: (): ServiceWithOffers[] => servicesWithOffers,
  getters: {},
  actions: {
    async initializeStore() {
      if (servicesWithOffers.length === 0) {
        servicesWithOffers = await forageGetItem<ServiceWithOffers[]>(
          StorageNamesEnum.SERVICE_WITH_OFFERS
        );
      }

      this.$state = servicesWithOffers;
    },
    getItem(serviceId: string) {
      const serviceWithOffers = this.$state.find((s) => s.id === serviceId);
      return serviceWithOffers;
    },
    async insertServices(services: ServiceWithOffers[]) {
      // check that service is not alredy present
      if (!this.$state || this.$state.length === 0) {
        this.$state = services;
      }
      else {
      for (const service of this.$state) {
        const existingService = services.find((s) => s.id === service.id)
        if (existingService) {
          services = services.filter((s) => s.id !== existingService.id);
        }
      }

      if (services.length > 0) {
        this.$state.concat(services);
      }
    }
      await forageSetItem(
        StorageNamesEnum.SERVICE_WITH_OFFERS,
        { ...this.$state },
        (err) => {
          // TODO: handle error
          console.log('An error occurred while trying to insert into service_with_offer store.', err)
        }
      );
    },
    async insertServiceOfferIntoService(serviceId: string, serviceOffers: ServiceOffer[]) {
      console.log('service offers to insert: ', serviceOffers)
      const referencedService = this.$state.find((s) => s.id === serviceId);

      if (referencedService) {
        if (!referencedService.offers || referencedService.offers.length === 0 ) {
          referencedService.offers = serviceOffers;
          console.log('service offer inserted: ', referencedService.offers)
        }
        else {
          
            for (const serviceOffer of referencedService.offers) {
              const serviceOfferInStore = serviceOffers.find((so) => so.id === serviceOffer.id);
              if (serviceOfferInStore) {
                serviceOffers = serviceOffers.filter((so) => so.id !== serviceOfferInStore.id)
              }
            }

            if (serviceOffers.length > 0) {
            referencedService.offers.concat(serviceOffers);
            }
        }
      }

      await forageSetItem(
        StorageNamesEnum.SERVICE_WITH_OFFERS,
        { ...this.$state },
        (err) => {
          // TODO: handle error
          console.log('An error occurred while trying to insert into service_with_offer store.', err)
        }
      );
    },
    async getServiceOffer(serviceOfferId: string) {
      const serviceOffers = this.$state.flatMap((s) => s.offers) as ServiceOffer[];
      const serviceOffer = serviceOffers.find((so) => so.id === serviceOfferId);
      return serviceOffer;
    },
    async getAllServiceOffers() {
      let serviceOffers = this.$state.flatMap((s) => s.offers) as ServiceOffer[];
      console.log('from the servie offers present in state: ', serviceOffers);
      serviceOffers = serviceOffers.filter((so) => so !== undefined)
      return serviceOffers;
    }
  },
});

export default useServiceOffer;
