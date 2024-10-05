import { Provider } from 'src/lib/types';
import { BaseModel } from './base.model';
import SuitesModel from './suite.model';

export default class SuitesPageModel extends BaseModel {
  message: string;
  submessage: string;
  suites: SuitesModel[];
  providers: Provider[];
  categories: string[];
}
