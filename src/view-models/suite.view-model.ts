import SuiteBookingModel from 'src/models/suiteBooking.model';
import { ViewModelBase } from './base.view-model'
import { HospitalityBookings } from 'src/lib/types';

export default class SuiteBookingViewModel extends ViewModelBase<SuiteBookingModel> {
    getSuiteBooking(suiteBookingModelId: string) {
        const suiteBookingModels = this.stores.bookings?.getBooking('suiteBooking');
        if (suiteBookingModels && suiteBookingModels.length > 0) {
            const suiteBooking = suiteBookingModels?.find((booking) => booking.id === suiteBookingModelId);
            if (suiteBooking) {
                this.model = suiteBooking;
            }
        }
    }
    async addToBooking<T extends keyof Omit<HospitalityBookings, 'currentSubscriberUserId'>>( key: T, bookingsModelFieldValue: HospitalityBookings[T][number]) {
        await this.stores.bookings?.updateBooking(key, bookingsModelFieldValue)
    }
    
}