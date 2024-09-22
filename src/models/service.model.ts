import { BaseModel } from './base.model';

export default class ServiceModel extends BaseModel {
  id: string;
  name: string;
  description: string;
  images: string[]; // Array of image URLs
}
