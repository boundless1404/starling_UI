import AutoServiceOfferBooking from 'src/models/autoServiceOfferBooking.model';
import SuiteBookingModel from 'src/models/suiteBooking.model';
import TourServiceOfferBooking from 'src/models/tourServiceOfferBooking.model';
import VisaServiceOfferBooking from 'src/models/visaServiceOfferBooking.model';
import { HospitalityServiceType, PriceDurations } from './enums/enums';

export type ViewModelDefaultFunctionArgs = {
  onSuccess?: (arg?: Record<string, unknown>) => Promise<void> | void;
  onError?: (message?: string) => Promise<void> | void;
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

export interface PhoneCode {
  id: string,
  name: string,
  countryId: string;
  flageUrl: string;
}

type File = {
  id: string;
  forEntity: string | null;
  forEntityId: string | null;
  filename: string;
  mimetype: string;
  size: string;
  url: string;
  key: string;
  filePurpose: string | null;
  metadata: string | null;
  fileServerStatus: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  serviceId: string | null;
  suitePropertyId: string | null;
  serviceOfferId: string | null;
  tourGuideId: string | null;
};

type SuiteProperty = {
  id: string;
  publicId: string;
  type: string;
  name: string | null;
  category: string;
  description: string;
  availableQuantity: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  serviceProviderId: string;
  serviceId: string;
  suitePropertyFeatures: any[];
  files: File[];
};

// type ServiceOfferFeature = {
//   id: number;
//   name: string;
//   description: string;
//   icon: string | null;
//   createdAt: string;
//   updatedAt: string;
//   serviceOfferId: number;
// };

// type ServiceOffer = {
//   id: number;
//   publicId: string;
//   name: string;
//   description: string;
//   type: string;
//   createdAt: string;
//   updatedAt: string;
//   serviceId: string;
//   serviceOfferFeatures: ServiceOfferFeature[];
//   files: File[];
// };

// type ServiceOfferPriceOption = {
//   id: number;
//   price: string;
//   description: string;
//   durationType: string;
//   discount: number;
//   minimumDurationCountForDiscount: number;
//   createdAt: string;
//   updatedAt: string;
//   currencyId: string;
//   serviceOfferId: number;
// };

type SuiteBookingDetail = {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfAdults: number;
  numberOfChildren: number;
  roomsCount: number;
  createdAt: string;
  updatedAt: string;
  serviceBookingId: string;
  suitePropertyId: string;
  serviceClientId: string;
  serviceId: string | null;
  serviceOfferPriceOptionId: number;
  suiteProperty: SuiteProperty;
  serviceOfferPriceOptions: ServiceOfferPriceOption;
};

type AutoBookingDetail = {
  id: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  serviceClientId: string;
  serviceOfferId: number;
  serviceOfferPriceOptionId: number;
  serviceBookingId: string;
  serviceOffer: ServiceOffer;
  serviceOfferPriceOption: ServiceOfferPriceOption;
};

type TourBookingDetail = {
  id: number;
  date: string;
  time: string | null;
  createdAt: string;
  updatedAt: string;
  serviceClientId: string;
  serviceOfferId: number;
  serviceOfferPriceOptionId: number | null;
  serviceBookingId: string;
  serviceOffer: ServiceOffer;
  serviceOfferPriceOption: ServiceOfferPriceOption | null;
};

type VisaBookingDetail = {
  id: number;
  createdAt: string;
  updateDateColumn: string;
  serviceBookingId: string;
  dynamicFormId: string | null;
  serviceClientId: string;
  serviceOfferId: number;
  serviceOfferPriceOptionId: number;
  serviceOffer: ServiceOffer;
  serviceOfferPriceOption: ServiceOfferPriceOption;
};

type GetBookingsType = {
  id: string;
  paymentReference: string;
  status: string;
  paymentData: string | null;
  createdAt: string;
  updatedAt: string;
  subscriberUserId: string;
  suiteBookingDetails: SuiteBookingDetail[];
  autoBookingDetails: AutoBookingDetail[];
  tourBookingDetails: TourBookingDetail[];
  visaBookingDetails: VisaBookingDetail[];
};

export type { File, SuiteProperty, SuiteBookingDetail, AutoBookingDetail, TourBookingDetail, VisaBookingDetail, GetBookingsType };
