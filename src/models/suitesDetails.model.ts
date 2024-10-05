import { BaseModel } from './base.model';
import SuitesModel from './suite.model';
import UserReview from './userReview.model';

export class SuitesDetailsPageModel extends BaseModel {
  serviceType: string;
  suite: SuitesModel;
  category: string;
  usersReviews: UserReview[];
}
