import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, Min } from 'class-validator';
import { BaseModel } from './base.model'

export default class SuiteBookingModel extends BaseModel {

    id: string;
        
    priceOptionId: string;

    suitePropertyId: string;

    @IsNotEmpty({ message: 'First Name is required.' })
    firstName: string;
  
    @IsNotEmpty({ message: 'Last Name is required.' })
    lastName: string;
  
    @IsNotEmpty({ message: 'Email is required.' })
    @IsEmail({}, { message: 'Please, enter a valid email.' })
    email: string;
  
    @IsNotEmpty({ message: 'Phone is required.' })
    phone: string;
  
    @IsNotEmpty({ message: 'Please, select a country phone code.' })
    phoneCodeId: string;
  
    @IsNotEmpty({ message: 'CheckInDate is required.' })
    @IsDateString({}, {message: 'Please, enter a valid date.'})
    checkInDate: string;

    @IsNotEmpty({ message: 'CheckOutDate is required.' })
    @IsDateString({}, {message: 'Please, enter a valid date.'})
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
}