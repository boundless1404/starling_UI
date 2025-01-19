import VisaServiceOfferBooking from 'src/models/visaServiceOfferBooking.model';
import { ViewModelBase } from './base.view-model';
import { HospitalityBookings } from 'src/lib/types';

export default class VisaServiceOfferBookingViewModel extends ViewModelBase<VisaServiceOfferBooking>  {
    async addToBooking<T extends keyof Omit<HospitalityBookings, 'currentSubscriberUserId'>>( key: T, bookingsModelFieldValue: HospitalityBookings[T][number]) {
        await this.stores.bookings?.updateBooking(key, bookingsModelFieldValue)
    }
}