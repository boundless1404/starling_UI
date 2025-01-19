import {
  requestApi,
  RequestApiParamsType,
} from 'src/lib/requests.ts/default.request';
import { BaseModel } from 'src/models/base.model';
import { AuthUserData } from 'src/stores';
import useAuthStore from 'src/stores/auth-store';
import useBookingsStore from 'src/stores/booking-store';
import useCurrentValsStore from 'src/stores/currentVals.store';
import useServiceOffer from 'src/stores/service-offers-store';

export class ViewModelBase<T extends BaseModel> {
  model: T;
  stores: {
    auth?: ReturnType<typeof useAuthStore>;
    bookings?: ReturnType<typeof useBookingsStore>;
    serviceWithOffer?: ReturnType<typeof useServiceOffer>;
    currentVals?: ReturnType<typeof useCurrentValsStore>;
  } = {};

  currentUser: AuthUserData;

  constructor(model: T) {
    this.model = model;
    this.stores.auth = useAuthStore();
    this.stores.bookings = useBookingsStore();
    this.stores.serviceWithOffer = useServiceOffer();
    this.stores.currentVals = useCurrentValsStore();

    this.currentUser = {
      userData: this.stores.auth.userData,
      profile: this.stores.auth.profile,
    };
  }

  async requestApi(...args: RequestApiParamsType) {
    return requestApi(...args);
  }

  async validateModel() {
    await this.model.validate?.();
  }

  async invokevalidation(onError?: (message?: string) => void) {
    await this.validateModel();

    if (this.model.errors && this.model.errors.length > 0) {
      // Handle validation errors
      onError?.(this.model.errors[0].toString());
      return;
    }
  }
}
