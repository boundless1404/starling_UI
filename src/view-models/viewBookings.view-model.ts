import { ViewModelBase } from './base.view-model';
import BookingsModel from 'src/models/bookingsModel.model';
import { BookingsUrlEnum } from 'src/lib/enums/urlPaths.enum';
import ViewBookingsModel from 'src/models/viewBookings.model';

export default class ViewBookingsViewModel extends ViewModelBase<ViewBookingsModel> {

    async getBookings() {
        this.model.bookings = await this.requestApi(BookingsUrlEnum.GET_BOOKINGS);
      }
}