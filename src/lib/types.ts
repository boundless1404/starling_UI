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
