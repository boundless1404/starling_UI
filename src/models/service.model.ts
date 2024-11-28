import { HospitalityServiceType } from 'src/lib/enums/enums';
import { BaseModel } from './base.model';
import { PlatformFile, ServiceOffer, ServiceProvider } from 'src/lib/types';

export default class ServiceModel extends BaseModel {
  id: string;
  name: string;
  description?: string;
  type?: HospitalityServiceType;
  files?: PlatformFile[]; // Array of image URLs
  provider?: ServiceProvider;
  offers?: ServiceOffer[];
}
