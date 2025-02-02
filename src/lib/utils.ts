import { Loading } from 'quasar';
import { BaseModel } from '../models/base.model';
import { Ref } from 'vue';
import { ValidationArguments, ValidationError } from 'class-validator';

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
