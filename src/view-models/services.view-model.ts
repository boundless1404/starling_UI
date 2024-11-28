import ServicesPageModel from 'src/models/servicesPage.model';
import { ViewModelBase } from './base.view-model';
import { ServiceUrlEnum } from 'src/lib/enums/urlPaths.enum';
import useAuthStore from 'src/stores/auth-store';
import { AuthUserData } from 'src/stores';
import { toSentenceCase } from 'src/lib/utils';

export default class ServicesViewModel extends ViewModelBase<ServicesPageModel> {
  //
  authStore = useAuthStore();
  // authStore.

  async getServices() {
    this.model.servicesWithProviders = await this.requestApi(
      ServiceUrlEnum.GET_SERVICES
    );

    const userData = this.authStore.getField(
      'userData'
    ) as AuthUserData['userData'];

    this.model.message = toSentenceCase(
      `Hi ${userData?.firstName || userData?.lastName || ''},`
    );
    this.model.submessage = 'Here are some services for you to pick from.';
  }

  async getServiceOffers(serviceId: string) {
    //
    const service =  this.getServiceById(serviceId);
    if (!service) {
      alert('A fatal error occurred. Kindly refresh the page or log out and log back in.');
      return;
    }

    let serviceOffers = service.offers;
    if (!serviceOffers) {
    serviceOffers = await this.requestApi(
      `${ServiceUrlEnum.GET_OFFERS}?serviceId=${serviceId}`
    );

    service.offers = serviceOffers;
  }

  this.model.selectedService = service;
  }

  getServiceById(serviceId: string) {
    return this.model.servicesWithProviders.find((service) => service.id === serviceId);
  }
}
