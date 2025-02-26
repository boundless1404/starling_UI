import { Loading } from 'quasar';
import { BaseModel } from '../models/base.model';
import { Ref } from 'vue';
import { registerDecorator, ValidationArguments, ValidationError, ValidationOptions } from 'class-validator';

export function IsAfterDate(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsAfterCheckInDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const checkInDate = (args.object as any).checkInDate;
          if (!checkInDate || !value) return true; // Skip validation if either date is missing

          const checkIn = new Date(checkInDate);
          const checkOut = new Date(value);

          checkIn.setHours(0, 0, 0, 0);
          checkOut.setHours(0, 0, 0, 0);

          return checkOut.getTime() > checkIn.getTime(); // Ensure checkOut is at least a day after checkIn
        },
      },
    });
  };
}

export function IsTodayOrLater(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isTodayOrLater',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) return true; // skip validation if no value is provided
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const dateValue = new Date(value);
          return dateValue >= today;
        },
        defaultMessage(args: ValidationArguments) {
          return 'Check-in date must be today or later.';
        },
      },
    });
  };
}

export function getFieldError(model: BaseModel, field: string) {
  const fieldError = model.errors?.find((error) => error.property === field);
  const error = fieldError?.constraints?.[Object.keys(fieldError.constraints)[0]] || '';
  console.log('error occured in field: ', field, `error: ${error}` )
  return error;
}

export function validateField(model: BaseModel, name: string) {
  // check if name is separated by dot
  const nameParts = name.split('.');
  if (nameParts.length > 1) {
    const propertyName = nameParts[0];
    let vError: ValidationError | undefined;
     for (const error of model.errors || []) {
      const hasError = error.property === propertyName
      if (hasError) {
        vError = error.children?.find((child) => child.property === nameParts[1]);
        if (vError) {
          break;
        }
      }
    
  };
    const errorMessages = Object.values(vError?.constraints || {})?.pop() || '';
    return errorMessages === '' ? true : errorMessages;
  }
  const error = model.errors?.find((error) => error.property === name);
  const errorMessages = Object.values(error?.constraints || {})?.pop() || '';
  return errorMessages === '' ? true : errorMessages;
}

export function getHighestZIndex() {
  let highestZIndex = 0;
  if (document && window) {
    const elements = document.getElementsByTagName('*');

    for (let i = 0; i < elements.length; i++) {
      const zIndex = parseInt(window.getComputedStyle(elements[i]).zIndex);
      if (zIndex && zIndex > highestZIndex) {
        highestZIndex = zIndex;
      }
    }
  }
  // console.log('current heighest z-index: ', highestZIndex);
  return highestZIndex;
}

export function clearUIEffects({
  loader,
  timer,
  requestProcessingRef,
}: {
  loader?: Loading;
  timer?: NodeJS.Timeout;
  requestProcessingRef?: Ref<boolean>;
} = {}) {
  loader && loader.hide();
  timer && clearTimeout(timer);
  requestProcessingRef && (requestProcessingRef.value = false);
}

export function isModelValid(model: BaseModel) {
  return !model.errors?.length;
}

export function toSentenceCase(str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getQueryString(options: Record<string, any>) {
  let queryString = '';
  if (!options || options === null || Object.keys(options).length === 0) {
    return '';
  }

  queryString = Object.entries(options).reduce((prev, [key, val]) => {
    if (prev !== '') {
      prev += '&';
    }
    prev += `${key}=${val}`;
    return prev;
  }, '');

  return queryString;
}

export function GetIsRequiredMessage(validationArgs: ValidationArguments) {
  return `${validationArgs.property} is required.`
}

export function removeUnwantedModelFields(model: BaseModel, fields: Array<keyof BaseModel> = ['clearValues', 'validate', 'errors']) {
  fields.forEach((field) => {
    delete model[field];
  });
  return model;
}
