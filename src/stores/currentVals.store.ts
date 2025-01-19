import { defineStore } from 'pinia';
import { forageGetItem, forageSetItem } from 'src/boot/storeforage';
import { StorageNamesEnum } from '.';

let currentVals: { booking: number };
const useCurrentValsStore = defineStore('currentVals', {
  state: (): { booking: number } => ({
    booking: 0,
  }),
  getters: {},
  actions: {
    async initializeStore() {
      if (!currentVals) {
        currentVals = await forageGetItem<{ booking: number }>(
          StorageNamesEnum.CURRENT_VALS
        );
      }

      console.log('initialise current vals', currentVals);
      this.$patch(currentVals);
      return currentVals;
    },
    async updateBooking(value: number) {
      this.$patch({ booking: value });
      console.log('currentVals', this.$state);

      await forageSetItem(
        StorageNamesEnum.CURRENT_VALS,
        { ...this.$state },
        (err) => {
          console.log(
            'An error occurred while trying to update currentVals store.',
            err
          );
        }
      );
    },
  },
});

export default useCurrentValsStore;
