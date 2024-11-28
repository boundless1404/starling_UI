import { BaseModel } from './base.model';
import ServiceModel from './service.model';

export default class ServicesPageModel extends BaseModel {
  message: string;
  submessage: string;
  servicesWithProviders: ServiceModel[];
  selectedService: ServiceModel;
}
