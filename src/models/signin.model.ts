import { IsEmail, IsNotEmpty } from 'class-validator';
import { BaseModel } from './base.model';

export class SigninModel extends BaseModel {
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Please, enter a valid email.' })
  email: string;

  @IsNotEmpty({ message: 'Please, enter your password.' })
  password: string;
}
