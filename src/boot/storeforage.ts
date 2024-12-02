import { isJSON } from 'class-validator';
import localforage from 'localforage';
import { boot } from 'quasar/wrappers';
import { StorageNamesEnum } from 'src/stores';
import { storeforage } from 'src/stores';

const forageGetItem = async <T>(
  key: string,
  callback?: (err: unknown) => void
) => {
  try {
    const data = await storeforage.getItem<T>(key);
    return typeof data === 'string' && isJSON(data) ? JSON.parse(data) : data;
  } catch (error) {
    callback?.(error);
  }
};

const forageSetItem = async <T>(
  key: string,
  data: T,
  callback?: (err: unknown) => void
) => {
  try {
    const stringifiedData = JSON.stringify(data);
    await storeforage.setItem(key, stringifiedData);
  } catch (error) {
    console.log('this is the error from storeforage: ', error);
    callback?.(error);
  }
};

// const getStoreState = <T>(piniaStore: Pinia, storeName: string) => {
//   const store = piniaStore.state.value[storeName] as T;
//   return store;
// };

export default boot(async ({ app, redirect, router }) => {
  app.provide('localforage', localforage);

  // initialize localforage
  for await (const storeName of Object.values(StorageNamesEnum)) {
    const store = await forageGetItem(storeName);
    if (!store) {
      console.log(`Initializing ${storeName}: `, store);
      await localforage.setItem(storeName, JSON.stringify({}));
    }
  }
  // const authUserData = await forageGetItem(StorageNamesEnum.AUTH_USER_DATA);
  // if (!authUserData) {
  //   console.log('no authUserData found, initializing authUserData');
  //   await localforage.setItem(StorageNamesEnum.AUTH_USER_DATA, authUserData);
  // }

  // const lgaWardStreet = await forageGetItem(StorageNamesEnum.LGA_WARD_STREET);

  // if (!lgaWardStreet) {
  //   console.log('Initializing lgaWardStreet: ', lgaWardStreet);
  //   await localforage.setItem(StorageNamesEnum.LGA_WARD_STREET, lgaWardStreet);
  // }

  console.log('this is the current route ', router.currentRoute.value.path);

  // // check if user is authenticated
  // router.beforeEach(async (to, from, next) => {
  //   if (!['/auth/signin'].includes(to.path)) {
  //     const authStore = JSON.parse(
  //       (await forageGetItem<AuthUserData>(
  //         StorageNamesEnum.AUTH_USER_DATA
  //       )) as string
  //     ) as AuthUserData;
  //     if (!authStore?.token) {
  //       redirect('/auth/signin');
  //     } else {
  //       next();
  //     }
  //   } else {
  //     next();
  //   }
  // });
  // store.state.value
});

export { forageGetItem, forageSetItem };
