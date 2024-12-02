import AutoServiceOfferBooking from 'src/models/autoServiceOfferBooking.model';
import { ViewModelBase } from './base.view-model';
import { HospitalityBookings } from 'src/lib/types';

export default class AutoServiceOfferBookingViewModel extends ViewModelBase<AutoServiceOfferBooking> {
    async addToBooking<T extends keyof Omit<HospitalityBookings, 'currentSubscriberUserId'>>( key: T, bookingsModelFieldValue: HospitalityBookings[T][number]) {
        await this.stores.bookings?.updateBooking(key, bookingsModelFieldValue)
    }
}