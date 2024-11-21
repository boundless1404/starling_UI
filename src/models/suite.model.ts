import { Location, PlatformFile, Provider } from 'src/lib/types';
import PriceOption from './priceVariation.model';

export default class SuitesModel {
  id: string;
  provider: Provider;
  location: Location;
  category: string;
  type: string;
  description: string;
  files: PlatformFile[];
  priceOptions: PriceOption[];
  features: string[];
}
