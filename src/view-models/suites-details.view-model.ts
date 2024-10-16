import { SuitesDetailsPageModel } from 'src/models/suitesDetails.model';
import { ViewModelBase } from './base.view-model';
import { ServiceUrlEnum } from 'src/lib/enums/urlPaths.enum';
import { getQueryString } from 'src/lib/utils';

export default class SuiteDetailsViewModel extends ViewModelBase<SuitesDetailsPageModel> {
  async populateModelFields(options: {serviceProviderId: string}) {
    //
    this.model.suites = await this.requestApi(`${ServiceUrlEnum.Get_SUITES}?${getQueryString(options)}`);

    console.log('These are the suites:', this.model.suites);

    this.model.category = this.model.suites?.[0].category || '';
    this.model.serviceProviderName = this.model.suites?.[0].provider.name || '';
    // TODO: update the serviceType
    this.model.serviceType = 'Suites';
  }
}
