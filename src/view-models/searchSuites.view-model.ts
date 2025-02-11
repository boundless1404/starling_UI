
import { SearchSuitesModel } from 'src/models/searchSuites.model';
import { ViewModelBase } from './base.view-model';

export class SearchSuitesViewModel extends ViewModelBase<SearchSuitesModel> {
    async getSuites() {
        // Call API to get suites
        // const suites = await this.requestApi()
        return []
    }
}