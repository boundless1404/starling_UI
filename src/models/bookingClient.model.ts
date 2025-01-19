import { IsNotEmpty, IsEmail } from 'class-validator';

export default class BookingClientModel {
    id: string;
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
}