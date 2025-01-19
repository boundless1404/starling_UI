import { IsDateString, IsNotEmpty, ValidateNested } from 'class-validator';
import { BaseModel } from './base.model';
import { GetIsRequiredMessage } from 'src/lib/utils';
import BookingClientModel from './bookingClient.model';
import { Type } from 'class-transformer';

export default class TourServiceOfferBooking extends BaseModel {
    id: string;

    @IsNotEmpty({message: GetIsRequiredMessage})
    @IsDateString({}, {message: 'Enter Valid Date'})
    date: string;
    price: number;

    time?: string;
    serviceClientId: string;
    serviceOfferId: string;
    serviceOfferPriceOptionId: string;

    @ValidateNested()
    @Type(() => BookingClientModel)
    client: BookingClientModel = new BookingClientModel();
}