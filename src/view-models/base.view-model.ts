import {
  requestApi,
  RequestApiParamsType,
} from 'src/lib/requests.ts/default.request';
import { BaseModel } from 'src/models/base.model';
import useAuthStore from 'src/stores/auth-store';

export class ViewModelBase<T extends BaseModel> {
  model: T;
  stores = {
    auth: useAuthStore(),
  };

  constructor(model: T) {
    this.model = model;
  }

  async requestApi(...args: RequestApiParamsType) {
    return requestApi(...args);
  }

  async validateModel() {
    await this.model.validate();
  }

  async invokevalidation(onError?: (message?: string) => void) {
    await this.validateModel();

    if (this.model.errors && this.model.errors.length > 0) {
      // Handle validation errors
      onError?.(this.model.errors[0].toString());
      return;
    }
  }
}
