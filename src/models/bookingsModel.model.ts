import { BaseModel } from './base.model';
import { HospitalityBookings } from 'src/lib/types';

export default class BookingsModel extends BaseModel {
  bookings: HospitalityBookings;
}
