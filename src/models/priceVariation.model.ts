import { PriceDurations } from 'src/lib/enums/enums';
import { BaseModel } from './base.model';

export default class PriceVariation extends BaseModel {
  price: number;
  duration: PriceDurations;
}
