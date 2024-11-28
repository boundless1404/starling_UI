import { ServiceOfferPriceOption, ServiceOfferFeature, ServiceOfferTourGuide, PlatformFile } from 'src/lib/types';
import { BaseModel } from './base.model';

export default class TourServiceOfferModel extends BaseModel {
    id: number;
    name: string;
    description: string;
    type: string;
    priceOptions: ServiceOfferPriceOption[];
    features: ServiceOfferFeature[];
    tourGuides?: ServiceOfferTourGuide[];
    files: PlatformFile[];
  }