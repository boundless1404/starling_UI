import { SearchSuitesModel } from 'src/models/searchSuites.model';
import { ViewModelBase } from './base.view-model';
import { ServiceUrlEnum } from 'src/lib/enums/urlPaths.enum';
import SuitesModel from 'src/models/suite.model';
import { getQueryString, removeUnwantedModelFields } from 'src/lib/utils';
import { formatISO } from 'date-fns';

export class SearchSuitesViewModel extends ViewModelBase<SearchSuitesModel> {
  async getSuites({
    random,
    firstTen,
  }: { random?: boolean; firstTen?: boolean } = {}) {
    let suites: SuitesModel[] = [];
    if (random) {
      suites = await this.requestApi(
        `${ServiceUrlEnum.SEARCH_SUITES}?random=true`,
        'get'
      );
    } else if (firstTen) {
      suites = await this.requestApi(
        `${ServiceUrlEnum.SEARCH_SUITES}?firstTen=true`,
        'get'
      );
    } else {
      // Call API to get suites
      const modelFields = {
        ...removeUnwantedModelFields(this.model),
      } as SearchSuitesModel;
      modelFields.checkInDate = formatISO(
        modelFields.checkInDate?.replaceAll('-', '/') as string
      );
      modelFields.checkOutDate = formatISO(
        modelFields.checkOutDate?.replaceAll('-', '/') as string,
      );
      suites = await this.requestApi(
        `${ServiceUrlEnum.SEARCH_SUITES}?${getQueryString(modelFields)}`,
        'get'
      );
    }
    return suites as SuitesModel[];
  }

  async getCategories() {
    //
    return await this.requestApi(ServiceUrlEnum.GET_CATEGORIES, 'get');
  }
}
