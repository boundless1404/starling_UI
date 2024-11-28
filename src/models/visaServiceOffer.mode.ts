import { ServiceOfferPriceOption, ServiceOfferFeature, PlatformFile } from 'src/lib/types';
import { BaseModel } from './base.model';

export default class VisaServiceOfferModel extends BaseModel {
    id: number;
    name: string;
    description: string;
    type: string;
    priceOptions: ServiceOfferPriceOption[];
    features: ServiceOfferFeature[];
    files: PlatformFile[];
  }