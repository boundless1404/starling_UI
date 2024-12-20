import { PriceDurations } from 'src/lib/enums/enums';
import { BaseModel } from './base.model';

export default class PriceOption extends BaseModel {
  id: string;
  price: number | string;
  durationType: PriceDurations;
  description: string;
  currency: {
    name: string;
    symbol: string;
  };
}
