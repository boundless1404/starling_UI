import { IsEmail, IsNotEmpty } from 'class-validator';
import { BaseModel } from './base.model';

export class SignupModel extends BaseModel {
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

  @IsNotEmpty({ message: 'Please, select a country phone code id.' })
  phoneCodeId: string;

  @IsNotEmpty({ message: 'Please, enter your password.' })
  password: string;
}
