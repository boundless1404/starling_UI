import AutoServiceOfferBooking from 'src/models/autoServiceOfferBooking.model';
import SuiteBookingModel from 'src/models/suiteBooking.model';
import TourServiceOfferBooking from 'src/models/tourServiceOfferBooking.model';
import VisaServiceOfferBooking from 'src/models/visaServiceOfferBooking.model';
import { HospitalityServiceType, PriceDurations } from './enums/enums';

export type ViewModelDefaultFunctionArgs = {
  onSuccess?: (arg?: Record<string, unknown>) => Promise<void>;
  onError?: (message?: string) => Promise<void>;
};

export type NotifierTypes = 'positive' | 'negative' | 'warning' | 'info';

export type ServiceWithProviderDetail = {
  id: string;
  name: string;
  description: string;
  type: HospitalityServiceType;
  provider: ServiceProvider;
  files: Array<PlatformFile>;
};

export type ServiceProvider = {
  id: string;
  name: string;
};

export type PlatformFile = {
  id: string;
  url: string;
  filename: string;
  dataUrl?: string;
};

export type Provider = {
  name: string;
  id: string;
};

export type State = {
  id: string;
  name: string;
  postalCode: string;
  createdAt: string;
  updatedAt: string;
  countryId: string;
};

export type Location = {
  city: string;
  state: State;
  country: string;
  landmark: string;
};

export interface ServiceOfferPriceOption {
  id: string;
  price: string | number;
  durationType: PriceDurations;
  description: string;
  currency: {
    name: string;
    symbol: string;
  };
}

export interface ServiceOfferFeature {
  id: string;
  name: string;
  description?: string;
  icon: string;
}

export interface ServiceOfferTourGuide {
  id: string;
  name: string;
  description: string;
  files: PlatformFile[];
}

export interface ServiceOffer {
  id: string;
  name: string;
  description: string;
  type?: string;
  price?: string;
  priceOptions?: ServiceOfferPriceOption[];
  features?: ServiceOfferFeature[];
  tourGuides?: ServiceOfferTourGuide[];
  files?: PlatformFile[];
}


export type ServiceWithOffers = {
  id: string;
  name: string;
  description?: string;
  offers?: ServiceOffer[]
}

export type HospitalityBookings = {
  suiteBooking: SuiteBookingModel[];
  autoBooking: AutoServiceOfferBooking[];
  tourBooking: TourServiceOfferBooking[];
  visaBooking: VisaServiceOfferBooking[];
  currentSubscriberUserId?: string;
}

export type FetchedServiceOffers = {
  [key: string]: ServiceOffer
}
