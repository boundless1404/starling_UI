import { defineStore } from 'pinia';
import { forageGetItem, forageSetItem } from 'src/boot/storeforage';
import { HospitalityBookings } from 'src/lib/types';
import { StorageNamesEnum } from '.';

let bookings: HospitalityBookings; 
const useBookingStore = defineStore('hospitality_bookings', {
  state: (): HospitalityBookings => ({
    suiteBooking: [],
    autoBooking: [],
    tourBooking: [],
    visaBooking: [],
    currentSubscriberUserId: ''
  }),
  getters: {
  },
  actions: {
    async initializeStore() {
      if (!bookings) {
        bookings = await forageGetItem<HospitalityBookings>(
          StorageNamesEnum.HOSPITALITY_BOOKINGS
        );
      }
      this.$patch(bookings);
      
    },
    // async handleAuthToken(authUserData: HospitalityBookings) {
    //   this.$patch(() => ({ ...authUserData }));
    //   await forageSetItem(
    //     StorageNamesEnum.AUTH_USER_DATA,
    //     { ...authUserData },
    //     (err) => {
    //       // TODO: handle error
    //     }
    //   );
    // },
     /**
     * Generic action to update any field in the store (excluding `currentSubscribeUserId`).
     */
     async updateBooking<T extends keyof Omit<HospitalityBookings, 'currentSubscriberUserId'>>(
      key: T, 
      value: HospitalityBookings[T][number]
    ) {
      const bookingField = this.$state[key] as typeof value[];
      try {
        if (Array.isArray(bookingField)) {
          const index = bookingField.findIndex((item) => {
            return item.id === value.id;
          });
          if (index !== -1) {
            bookingField[index] = value;
          } else {
            value.id = new Date().getTime().toString();
            bookingField.push(value)
          }
          this.$patch({ [key]: [...bookingField] });
        } else {
          this.$patch({ [key]: value });
        }
      }
      catch(e) {
        console.log(e)
      }
      await forageSetItem(
        StorageNamesEnum.HOSPITALITY_BOOKINGS,
        { ...this.$state },
        (err) => {
          // TODO: handle error
          console.log('An error occurred while trying to update booking store.', err)
        }
      );
    },
    /**
     * Specific action to update `currentSubscribeUserId`.
     */
    updateCurrentSubscribeUserId(userId: string) {
      this.$patch({ currentSubscriberUserId: userId });
    },
    

    getBooking<T extends keyof Omit<HospitalityBookings, 'currentSubscriberUserId'>>(key: T) {
      const value = this.$state[key] as HospitalityBookings[T][number][];
      return value;
    }
  },
});

export default useBookingStore;
