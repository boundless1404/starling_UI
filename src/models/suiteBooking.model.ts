import { IsDateString, IsNotEmpty, IsNumber, IsOptional, Min, ValidateNested } from 'class-validator';
import { BaseModel } from './base.model'
import BookingClientModel from './bookingClient.model';
import { Type } from 'class-transformer';
import { IsAfterDate, IsTodayOrLater } from 'src/lib/utils';

export default class SuiteBookingModel extends BaseModel {

    id: string;
        
    serviceOfferPriceOptionId: string;

    suitePropertyId: string;

    price: number;
  
    @IsNotEmpty({ message: 'CheckInDate is required.' })
    @IsDateString({}, {message: 'Please, enter a valid date.'})
    @IsTodayOrLater({message: 'CheckInDate must be today or later.'})
    checkInDate: string;

    @IsNotEmpty({ message: 'CheckOutDate is required.' })
    @IsDateString({}, {message: 'Please, enter a valid date.'})
    @IsAfterDate({message: 'CheckOutDate must be after CheckInDate.'})
    checkOutDate: string;

    @IsNotEmpty({ message: 'NoOfAdults is required.' })
    @IsNumber()
    @Min(1, {message: 'Mininum number of adults is 1'})
    noOfAdults = 1;

    @IsOptional()
    @IsNumber()
    @Min(0, {message: 'Non zero number is not allowed.'})
    noOfChhildren = 0;

    @IsNumber()
    @Min(1, {message: 'Mininum number of rooms is 1'})
    roomsCount = 1;

    @ValidateNested()
    @Type(() => BookingClientModel)
    client: BookingClientModel = new BookingClientModel();
}