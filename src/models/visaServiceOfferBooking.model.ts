import { ValidateNested } from 'class-validator';
import { BaseModel } from './base.model';
import BookingClientModel from './bookingClient.model';
import { Type } from 'class-transformer';

export default class VisaServiceOfferBooking extends BaseModel {
    id: string;
    serviceClientId: string;
    serviceOfferId: string;
    serviceOfferPriceOptionId: string;
    // dynamic form for visa booking details
    visBookingDetails: [];

    @ValidateNested()
    @Type(() => BookingClientModel)
    bookingClient: BookingClientModel;
}