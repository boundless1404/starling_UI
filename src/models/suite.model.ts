import { Location, PlatformFile, Provider } from 'src/lib/types';
import PriceVariation from './priceVariation.model';

export default class SuitesModel {
  provider: Provider;
  location: Location;
  category: string;
  type: string;
  description: string;
  files: PlatformFile[];
  priceVariations: PriceVariation[];
  features: string[];
}
