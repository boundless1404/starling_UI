import { HospitalityServiceType } from 'src/lib/enums/enums';
import { BaseModel } from './base.model';
import SuitesModel from './suite.model';
import UserReview from './userReview.model';

export class SuitesDetailsPageModel extends BaseModel {
  serviceProviderName: string;
  serviceType: HospitalityServiceType;
  suites: SuitesModel[];
  category: string;
  usersReviews: UserReview[];
}
