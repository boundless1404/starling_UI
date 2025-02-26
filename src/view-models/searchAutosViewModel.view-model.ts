import { SearchAutosModel } from 'src/models/searchAutos.model';
import { ViewModelBase } from './base.view-model';
import { ServiceUrlEnum } from 'src/lib/enums/urlPaths.enum';
import { getQueryString, removeUnwantedModelFields } from 'src/lib/utils';
import { formatISO } from 'date-fns';

export class SearchAutosViewModel extends ViewModelBase<SearchAutosModel> {
  async getAutos() {
    //
          const modelFields = {
            ...removeUnwantedModelFields(this.model),
          } as SearchAutosModel;
          modelFields.startDate = formatISO(
            modelFields.startDate?.replaceAll('-', '/') as string
          );
          modelFields.endDate = formatISO(
            modelFields.endDate?.replaceAll('-', '/') as string,
          );
    const autos = await this.requestApi(
      `${ServiceUrlEnum.SEARCH_AUTOS}?${getQueryString(
        modelFields
      )}`,
      'get'
    );

    return autos;
  }
}
