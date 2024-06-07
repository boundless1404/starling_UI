import { BaseModel } from 'src/models/base.model';

export class ViewModelBase<T extends BaseModel> {
  model: T;

  constructor(model: T) {
    this.model = model;
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
