import { defineStore } from 'pinia';
import { forageGetItem, forageSetItem } from 'src/boot/storeforage';
import { HospitalityBookings } from 'src/lib/types';
import { StorageNamesEnum } from '.';

let bookings: HospitalityBookings | null;
const useBookingStore = defineStore('hospitality_bookings', {
  state: (): HospitalityBookings => ({
    suiteBooking: [],
    autoBooking: [],
    tourBooking: [],
    visaBooking: [],
    currentSubscriberUserId: '',
  }),
  getters: {},
  actions: {
    async initializeStore() {
      console.log('initializing booking store', bookings);
      if (!bookings) {
        bookings = await forageGetItem<HospitalityBookings>(
          StorageNamesEnum.HOSPITALITY_BOOKINGS
        );
        console.log('initializing booking store 2', bookings);
      }
      this.$patch(bookings as HospitalityBookings);
      return bookings;
    },
    /**
     * Generic action to update any field in the store (excluding `currentSubscribeUserId`).
     */
    async updateBooking<
      T extends keyof Omit<HospitalityBookings, 'currentSubscriberUserId'>
    >(key: T, value: HospitalityBookings[T][number]) {
      const bookingField = this.$state[key] as (typeof value)[];
      try {
        if (Array.isArray(bookingField)) {
          const index = bookingField.findIndex((item) => {
            return item.id === value.id;
          });
          if (index !== -1) {
            bookingField[index] = value;
          } else {
            value.id = new Date().getTime().toString();
            bookingField.push(value);
          }
          this.$patch({ [key]: [...bookingField] });
        } else {
          this.$patch({ [key]: value });
        }
      } catch (e) {
        console.log(e);
      }
      await forageSetItem(
        StorageNamesEnum.HOSPITALITY_BOOKINGS,
        { ...this.$state },
        (err) => {
          // TODO: handle error
          console.log(
            'An error occurred while trying to update booking store.',
            err
          );
        }
      );
    },
    /**
     * Specific action to update `currentSubscribeUserId`.
     */
    updateCurrentSubscribeUserId(userId: string) {
      this.$patch({ currentSubscriberUserId: userId });
    },

    getBooking<
      T extends keyof Omit<HospitalityBookings, 'currentSubscriberUserId'>
    >(key: T) {
      const value = this.$state[key] as HospitalityBookings[T][number][];
      return value;
    },

    // remove bookingg from store
    async removeBooking<
      T extends keyof Omit<HospitalityBookings, 'currentSubscriberUserId'>
    >(key: T, bookingFieldId: string) {
      const bookingField = this.$state[key] as HospitalityBookings[T][number][];
      const index = bookingField.findIndex((item) => {
        return item.id === bookingFieldId;
      });
      if (index !== -1) {
        bookingField.splice(index, 1);

        this.$patch({ [key]: [...bookingField] });
        await forageSetItem(
          StorageNamesEnum.HOSPITALITY_BOOKINGS,
          { ...this.$state },
          (err) => {
            // TODO: handle error
            console.log(
              'An error occurred while trying to update booking store.',
              err
            );
          }
        );
      }
    },

    async clearBookingStore() {
      this.$reset();
      bookings = null;
      await forageSetItem(
        StorageNamesEnum.HOSPITALITY_BOOKINGS,
        { ...this.$state },
        (err) => {
          console.log('An error occurred while trying to clear booking store.', err);
        })
      }
  },
});

export default useBookingStore;
