import { ViewModelBase } from './base.view-model';
import BookingsModel from 'src/models/bookingsModel.model';

export default class BookingsViewModel extends ViewModelBase<BookingsModel> {
    async initializeBookings()  {
        await this.stores.bookings?.initializeStore();
    }
}