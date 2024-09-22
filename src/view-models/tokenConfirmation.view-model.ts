import { SignupConfirmationModel } from 'src/models/signupConfirmationModel.model';
import { ViewModelBase } from './base.view-model';
import { ViewModelDefaultFunctionArgs } from 'src/lib/types';
import { requestVerify } from 'src/lib/requests.ts/auth.request';
import { AuthUrlsEnum } from 'src/lib/enums/urlPaths.enum';
import { AuthUserData } from 'src/stores';
import useAuthStore from 'src/stores/auth-store';
import { AxiosHeaders } from 'axios';

export class TokenConfirmationViewModel extends ViewModelBase<SignupConfirmationModel> {
  authStore = useAuthStore();

  async submitToken(
    email: string,
    { onSuccess, onError }: ViewModelDefaultFunctionArgs
  ) {
    try {
      await this.invokevalidation(onError);
      delete this.model.errors;
      const authToken = (await requestVerify(this.model.code, email)) as {
        token: string;
      };

      debugger;
      const userDetails = (await this.requestApi(AuthUrlsEnum.USER, 'get', {
        headers: { Authorization: `Bearer ${authToken.token}` },
      })) as AuthUserData;
      const authUserData = {
        token: authToken.token,
        ...userDetails,
      };
      await this.authStore.handleAuthToken(authUserData);

      onSuccess?.();
    } catch (error) {
      onError?.((error as Error).message);
      return;
    }
  }
}
