import { ViewModelBase } from './base.view-model';
import { AuthUserData } from 'src/stores';
import { toSentenceCase } from 'src/lib/utils';
import { ServiceUrlEnum } from 'src/lib/enums/urlPaths.enum';
import SuitesPageModel from 'src/models/suitesPage.model';
import { Provider } from 'src/lib/types';

export default class SuitesViewModel extends ViewModelBase<SuitesPageModel> {
  authStore = this.stores.auth;

  async populateModelFields(serviceId: string) {
    await this.getSuites({ serviceId });

    const userData = this.authStore.getField(
      'userData'
    ) as AuthUserData['userData'];

    this.model.message = toSentenceCase(
      `Suite yourself ${userData?.firstName || userData?.lastName || ''}!`
    );
    this.model.submessage = 'Here are some services for you to pick from.';

    this.model.providers = this.model.suites.reduce((prev, curr) => {
      const isNew =
        prev.find((v) => v.name === curr.provider.name) === undefined;
      if (isNew) {
        prev.push({ id: curr.provider.id, name: curr.provider.name });
      }

      return prev;
    }, [] as Provider[]);

    this.model.categories = await this.requestApi(
      ServiceUrlEnum.GET_CATEGORIES
    );

    console.log('These are the categories:', this.model.categories);
  }

  async getSuites(options: {
    serviceProviderId?: string;
    category?: string;
    serviceId?: string;
  }) {
    //
    this.model.suites = await this.requestApi(
      `${ServiceUrlEnum.Get_SUITES}?${this.getQueryString(options)}`
    );
  }

  getQueryString(options: Record<string, any>) {
    let queryString = '';
    if (!options || options === null || Object.keys(options).length === 0) {
      return '';
    }

    queryString = Object.entries(options).reduce((prev, [key, val]) => {
      if (prev !== '') {
        prev += '&';
      }
      prev += `${key}=${val}`;
      return prev;
    }, '');

    console.log('This is the query string: ', queryString);
    return queryString;
  }
}
