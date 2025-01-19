import { HospitalityBookings } from 'src/lib/types';
import { ViewModelBase } from './base.view-model';
import BookingsModel from 'src/models/bookingsModel.model';

export default class BookingsViewModel extends ViewModelBase<BookingsModel> {
  async removeBooking<
    T extends keyof Omit<HospitalityBookings, 'currentSubscriberUserId'>
  >(type: T, offerBookingId: string) {
    //
    await this.stores.bookings?.removeBooking(type, offerBookingId);
  }

  async clearBookingStore() {
    await this.stores.bookings?.clearBookingStore();
  }

  async initializeBookings() {
    await this.stores.bookings?.initializeStore();
  }
}
