import { defineStore } from 'pinia';
import { AuthUserData, StorageNamesEnum } from '.';
import { forageGetItem, forageSetItem } from 'src/boot/storeforage';

const authUserData =
  (forageGetItem<AuthUserData>(
    StorageNamesEnum.AUTH_USER_DATA
  ) as AuthUserData) || {};
// authUserData.token = 'this is the token'
const useAuthStore = defineStore('auth', {
  state: (): AuthUserData => {
    return {
      token: authUserData.token,
      userData: authUserData.userData,
      profile: authUserData.profile,
    };
  },
  getters: {
    getToken(): string {
      return this.token as string;
    },
  },
  actions: {
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
  },
});

export default useAuthStore;
