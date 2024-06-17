import { SignupModel } from 'src/models/signup.model';
import useAuthStore from 'src/stores/auth-store';
import { ViewModelBase } from './base.view-model';
import { requestSignup } from 'src/lib/requests.ts/auth.request';
import { ViewModelDefaultFunctionArgs } from 'src/lib/types';

export class SignupViewModel extends ViewModelBase<SignupModel> {
  authStore = useAuthStore();
  async signup({ onSuccess, onError }: ViewModelDefaultFunctionArgs) {
    try {
      await this.invokevalidation(onError);
      delete this.model.errors;

      const authToken = await requestSignup(this.model);
      // await this.authStore.handleAuthToken(authToken);
      onSuccess?.();

      // if (authToken) {
      //   onSuccess?.();
      // } else {
      //   onError?.('Auth token not received.');
      // }
    } catch (error) {
      onError?.((error as Error).message);
    }
  }
}
