import { BaseModel } from './base.model';

export default class UserReview extends BaseModel {
  id: string;
  name: string;
  avatar: string;
  review: string;
  rating: number;
}
