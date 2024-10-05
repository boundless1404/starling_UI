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
}
