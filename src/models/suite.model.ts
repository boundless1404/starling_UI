import { Location, PlatformFile, Provider, ServiceOfferFeature } from 'src/lib/types';
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
  features: ServiceOfferFeature[];
}

/*
      id: suite.publicId,
      provider: {
        id: suite.serviceProvider.id,
        name: suite.serviceProvider.name,
      },
      location: {
        city: suite.suitePropertyLocation.city,
        state: suite.suitePropertyLocation.countryState,
        country: suite.suitePropertyLocation.country.fullname,
        landmark: suite.suitePropertyLocation.landmark,
      },
      category: suite.category,
      type: suite.type,
      description: suite.description,
      files: suite.files.map((file) => ({
        id: file.id,
        url: file.url,
        filename: file.filename,
      })),
      priceOptions: suite.suitePropertyPriceOptions.map((priceOption) => ({
        id: priceOption.id,
        price: priceOption.price,
        description: priceOption.description,
        durationType: priceOption.durationType,
      })),
      features: suite.suitePropertyFeatures.map((feature) => ({
        id: feature.suiteFeature.id,
        name: feature.suiteFeature.name,
        description: feature.suiteFeature.description,
        icon: feature.suiteFeature.icon,
      })),
*/
