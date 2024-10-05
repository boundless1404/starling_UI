import useAuthStore from 'src/stores/auth-store';
import { ViewModelBase } from './base.view-model';
import { ViewModelDefaultFunctionArgs } from 'src/lib/types';
import { AuthUrlsEnum } from 'src/lib/enums/urlPaths.enum';
import { AxiosError } from 'axios';
import { SigninModel } from 'src/models/signin.model';
import { AuthUserData } from 'src/stores';

export class SigninViewModel extends ViewModelBase<SigninModel> {
  authStore = useAuthStore();
  async signin({ onSuccess, onError }: ViewModelDefaultFunctionArgs) {
    try {
      await this.invokevalidation(onError);
      delete this.model.errors;

      const tokenResponse = (await this.requestApi(
        AuthUrlsEnum.SIGNIN,
        'post',
        { body: this.model }
      )) as { token: string };
      // fetch user data
      const userData = (await this.requestApi(AuthUrlsEnum.USER, 'get', {
        headers: {
          Authorization: `Bearer ${tokenResponse.token}`,
        },
      })) as AuthUserData;
      await this.authStore.handleAuthToken({
        ...userData,
        token: tokenResponse.token,
      });
      onSuccess?.();
    } catch (error) {
      debugger;
      onError?.(
        ((error as AxiosError).response?.data as { message: string }).message
      );
    }
  }
}
