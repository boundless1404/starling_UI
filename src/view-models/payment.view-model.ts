import PaymentModel from 'src/models/paymentModel.model';
import { ViewModelBase } from './base.view-model';
import { BookingsUrlEnum,} from 'src/lib/enums/urlPaths.enum';

export default class PaymentViewModel extends ViewModelBase<PaymentModel> {
  async submitBookings() {
    const bookings = this.stores.bookings?.$state
    const serverResponse = await this.requestApi(
      BookingsUrlEnum.PROCESS_BOOKING,
      'post',
      {
        body: {
          subscriberUserId: this.model.clientSubscriberUserId,
          ...(bookings?.suiteBooking? {
            suiteBooking: bookings?.suiteBooking,
          } : {}),
          ...(bookings?.visaBooking? {
            visaBooking: bookings?.visaBooking,
          } : {}),
          ...(bookings?.autoBooking? {
            autoBooking: bookings?.autoBooking,
          } : {}),
          ...(bookings?.tourBooking? {
            tourBooking: bookings?.tourBooking,
          } : {}),
        },
      }
    ) as { paymentReference : string };

    this.model.reference = serverResponse.paymentReference;
    return serverResponse;
  }

  async getPaymentReference() {
    // get payment reference
    const paymentReference = await this.requestApi(
      BookingsUrlEnum.GET_PAYMENT_REFERENCE
    );
    this.model.reference = paymentReference;
    return paymentReference;
  }

  getCurrentUser() {
    // get current user
    const currentUser = this.stores.auth?.userData;
    return currentUser;
  }
}
