import { BaseModel } from './base.model';
import SuitesModel from './suite.model';
import UserReview from './userReview.model';

export class SuitesDetailsPageModel extends BaseModel {
  serviceProviderName: string;
  serviceType: string;
  suites: SuitesModel[];
  category: string;
  usersReviews: UserReview[];
}
