import { defineStore } from 'pinia';
import { AuthUserData, StorageNamesEnum } from '.';
import { forageGetItem, forageSetItem } from 'src/boot/storeforage';

let authUserData: AuthUserData | null = null;
const useAuthStore = defineStore('auth', {
  state: (): AuthUserData => ({
    token: undefined,
    userData: undefined,
    profile: undefined,
  }),
  getters: {
    getToken(): string {
      return this.token as string;
    },

    getField(): (
      field: keyof AuthUserData
    ) => AuthUserData[keyof AuthUserData] {
      return (field: keyof AuthUserData) => {
        return this[field];
      };
    },


  },
  actions: {
    async initializeStore() {
      if (!authUserData) {
        authUserData = await forageGetItem<AuthUserData>(
          StorageNamesEnum.AUTH_USER_DATA
        );
      }
      this.$patch(authUserData as AuthUserData);
    },
    async handleAuthToken(authUserData: AuthUserData) {
      this.$patch(() => ({ ...authUserData }));
      await forageSetItem(
        StorageNamesEnum.AUTH_USER_DATA,
        { ...authUserData },
        (err) => {
          // TODO: handle error
        }
      );
    },
    userIsAuthenticated() {
      return !!this.token;
    },
    async logout() {
      this.$patch({
        token: undefined,
        userData: undefined,
        profile: undefined,
      });
      await forageSetItem(StorageNamesEnum.AUTH_USER_DATA, null, (err) => {
        // TODO: handle error
      });
    },
  },
});

export default useAuthStore;
