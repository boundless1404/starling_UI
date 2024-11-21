import { PriceDurations } from 'src/lib/enums/enums';
import { BaseModel } from './base.model';

export default class PriceOption extends BaseModel {
  id: string;
  price: number;
  durationType: PriceDurations;
  description: string;
}
