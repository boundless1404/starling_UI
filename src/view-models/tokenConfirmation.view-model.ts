import { SignupConfirmationModel } from 'src/models/signupConfirmationModel.model';
import { ViewModelBase } from './base.view-model';
import { ViewModelDefaultFunctionArgs } from 'src/lib/types';
import { requestVerify } from 'src/lib/requests.ts/auth.request';

export class TokenConfirmationViewModel extends ViewModelBase<SignupConfirmationModel> {
  async submitToken(
    email: string,
    { onSuccess, onError }: ViewModelDefaultFunctionArgs
  ) {
    try {
      await this.invokevalidation(onError);
      delete this.model.errors;
      await requestVerify(this.model.code, email);
      onSuccess?.();
    } catch (error) {
      onError?.((error as Error).message);
    }
  }
}
