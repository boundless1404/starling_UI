import { IsNumberString, IsString } from 'class-validator';
import { BaseModel } from './base.model';
import { IsAfterDate, IsTodayOrLater } from 'src/lib/utils';

export class SearchAutosModel extends BaseModel{
    @IsString({message: 'Please enter a valid an auto type'})
    type: string;

    @IsNumberString({}, {message: 'Please enter a valid price'})
    price: string;

    @IsTodayOrLater({ message: 'Start date must be today or later.' })
    startDate: string;

    @IsAfterDate({ message: 'End date must be at least one day after che date' })
    endDate: string;
}