import { IsDateString, IsNotEmpty, ValidateNested } from 'class-validator';
import { BaseModel } from './base.model';
import BookingClientModel from './bookingClient.model';
import { Type } from 'class-transformer';
import { GetIsRequiredMessage } from 'src/lib/utils';

export default class AutoServiceOfferBooking extends BaseModel {
    id: string;

    @IsNotEmpty({message: GetIsRequiredMessage})
    @IsDateString({}, {message: 'Enter Valid Date'})
    startDate: string;

    @IsNotEmpty({message: GetIsRequiredMessage})
    @IsDateString({}, {message: 'Enter Valid Date'})
    endDate: string;
    
    serviceOfferId: string;
    serviceOfferPriceOptionId: string;

    @ValidateNested()
    @Type(() => BookingClientModel)
    bookingClient: BookingClientModel;
}