import { ValidateNested } from 'class-validator';
import { BaseModel } from './base.model';
import BookingClientModel from './bookingClient.model';
import { Type } from 'class-transformer';
import { DynamicForm } from './dynamicForm';

export default class VisaServiceOfferBooking extends BaseModel {
    id: string;
    serviceClientId: string;
    serviceOfferId: string;
    serviceOfferPriceOptionId: string;
    price: number;
    // dynamic form for visa booking details
    visaBookingDetails: DynamicForm[];

    @ValidateNested()
    @Type(() => BookingClientModel)
    client: BookingClientModel;
}