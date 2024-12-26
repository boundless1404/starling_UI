import { GetBookingsType } from 'src/lib/types';
import { BaseModel } from './base.model';

export default class ViewBookingsModel extends BaseModel {
  bookings: GetBookingsType[];
}