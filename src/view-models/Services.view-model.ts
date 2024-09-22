import ServicesPageModel from 'src/models/servicesPage.mode';
import { ViewModelBase } from './base.view-model';
import { ServiceUrlEnum } from 'src/lib/enums/urlPaths.enum';

export default class ServicesViewModel extends ViewModelBase<ServicesPageModel> {
  //

  async getServices() {
    this.model = await this.requestApi(ServiceUrlEnum.GET_SERVICES);
  }
}
