import { Location, PlatformFile, Provider } from 'src/lib/types';
import PriceOption from './priceVariation.model';
import { HospitalityServiceType } from 'src/lib/enums/enums';

export default class SuitesModel {
  id: string;
  provider: Provider;
  location: Location;
  category: string;
  type: HospitalityServiceType;
  description: string;
  files: PlatformFile[];
  priceOptions: PriceOption[];
  features: string[];
}
