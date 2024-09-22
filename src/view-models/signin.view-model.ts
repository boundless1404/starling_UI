import useAuthStore from 'src/stores/auth-store';
import { ViewModelBase } from './base.view-model';
import { ViewModelDefaultFunctionArgs } from 'src/lib/types';
import { AuthUrlsEnum } from 'src/lib/enums/urlPaths.enum';
import { AxiosError } from 'axios';
import { SigninModel } from 'src/models/signin.model';

export class SigninViewModel extends ViewModelBase<SigninModel> {
  authStore = useAuthStore();
  async signin({ onSuccess, onError }: ViewModelDefaultFunctionArgs) {
    try {
      await this.invokevalidation(onError);
      delete this.model.errors;

      await this.requestApi(AuthUrlsEnum.SIGNIN, 'post', { body: this.model });
      onSuccess?.();
    } catch (error) {
      debugger;
      onError?.(
        ((error as AxiosError).response?.data as { message: string }).message
      );
    }
  }
}
