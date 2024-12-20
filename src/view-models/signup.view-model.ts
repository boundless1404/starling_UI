import { SignupModel } from 'src/models/signup.model';
import useAuthStore from 'src/stores/auth-store';
import { ViewModelBase } from './base.view-model';
import { requestSignup } from 'src/lib/requests.ts/auth.request';
import { ViewModelDefaultFunctionArgs } from 'src/lib/types';
import { AuthUrlsEnum } from 'src/lib/enums/urlPaths.enum';
import { AxiosError } from 'axios';

export class SignupViewModel extends ViewModelBase<SignupModel> {
  authStore = useAuthStore();
  async signup({ onSuccess, onError }: ViewModelDefaultFunctionArgs) {
    try {
      await this.invokevalidation(onError);
      delete this.model.errors;

      await requestSignup(this.model);
      onSuccess?.();
    } catch (error) {
      onError?.(
        ((error as AxiosError).response?.data as { message: string }).message
      );
    }
  }

  async resendToken({ onError, onSuccess }: ViewModelDefaultFunctionArgs = {}) {
    try {
      await this.requestApi(AuthUrlsEnum.RESEND_TOKEN, 'post', {
        body: { email: this.model.email },
      });
      onSuccess?.();
    } catch (e) {
      onError?.((e as Error).message);
    }
  }
}
