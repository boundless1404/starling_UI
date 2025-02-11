import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { BaseModel } from './base.model';

export class SearchAutosModel extends BaseModel{
    @IsString({message: 'Please enter a valid an auto type'})
    type: string;

    @IsNotEmpty()
    @IsNumberString({}, {message: 'Please enter a valid price'})
    price: string;
}