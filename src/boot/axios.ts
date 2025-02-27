import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { forageGetItem } from './storeforage';
import { AuthUserData, StorageNamesEnum } from 'src/stores';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const api = axios.create({ baseURL: 'http://localhost:5100' });

const authUserData = (await forageGetItem(
  StorageNamesEnum.AUTH_USER_DATA
)) as AuthUserData;

const api = axios.create({
  baseURL: (process.env.DEV
    ? 'http://localhost:5100/'
    : process.env.API_BASE_URL) + 'v1',
  headers: {
    'Content-Type': 'application/json',
    ...(authUserData?.token
      ? { Authorization: `Bearer ${authUserData?.token}` }
      : {}),
  },
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
