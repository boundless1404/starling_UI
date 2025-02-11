import { IsNotEmpty } from 'class-validator';
import { BaseModel } from './base.model';
import { IsAfterCheckInDate, IsTodayOrLater } from 'src/lib/utils';

export class SearchSuitesModel extends BaseModel {

    
  @IsNotEmpty({message: 'Please, enter a valid location.'})
  location: string;

  @IsNotEmpty({message: 'Please, select an apartment type'})
  apartmentType: string;

  // In your model file
  @IsTodayOrLater({ message: 'Check-in date must be today or later.' })
  checkInDate?: string;

  @IsAfterCheckInDate()
  checkOutDate?: string;
}
