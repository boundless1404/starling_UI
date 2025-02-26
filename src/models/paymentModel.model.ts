import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { BaseModel } from './base.model';

export default class PaymentModel extends BaseModel {
    id: string;

    @IsNotEmpty()
    @IsEnum(['USD', 'NGN'])
    currency = 'NGN' as 'USD' | 'NGN';

    @IsNotEmpty()
    @IsEmail()
    email: string;

    // @IsNotEmpty()
    // cardNumber: string;

    // @IsNotEmpty()
    // @IsString()
    // cardHolderName: string; 

    // @IsNotEmpty()
    // @IsNumberString()
    // @IsEnum(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'])
    // expiryMonth: string;
    
    // @IsNotEmpty()
    // @IsNumberString()
    // expiryYear: string;

    // @IsNotEmpty()
    // @IsNumberString()
    // cvv: string;
    
    // expiryDate: string;
    reference: string;
    description: string;
    paymentMethod: string;
    status: string;
    clientSubscriberUserId: string;

    amountProcessingFactor = 100;
    private _amount?: number;
    get amount(): number {
        return (this._amount || 0) * this.amountProcessingFactor;
    }
    set amount(value: number) {
        this._amount = value;
    }
}                                                                           