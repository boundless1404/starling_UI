import AutoServiceOfferBooking from 'src/models/autoServiceOfferBooking.model';
import SuiteBookingModel from 'src/models/suiteBooking.model';
import TourServiceOfferBooking from 'src/models/tourServiceOfferBooking.model';
import VisaServiceOfferBooking from 'src/models/visaServiceOfferBooking.model';
import { BaseModel } from './base.model';

export default class BookingsModel extends BaseModel {
    suiteBooking: SuiteBookingModel[] = [];
    autoBooking: AutoServiceOfferBooking[] = [];
    tourBooking: TourServiceOfferBooking[] = [];
    visaServiceBooking: VisaServiceOfferBooking[] = [];
    currentSubscribeUserId: string;
}