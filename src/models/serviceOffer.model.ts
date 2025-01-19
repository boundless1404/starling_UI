import { PlatformFile, ServiceOfferFeature, ServiceOfferPriceOption, ServiceOfferTourGuide } from '../lib/types';
import { BaseModel } from './base.model';

export default class ServiceOfferModel extends BaseModel {
    id: number;
    name: string;
    description: string;
    type: string;
    priceOptions: ServiceOfferPriceOption[];
    features: ServiceOfferFeature[];
    tourGuides?: ServiceOfferTourGuide[];
    files: PlatformFile[];
  }