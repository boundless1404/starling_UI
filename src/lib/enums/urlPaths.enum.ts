const authPath = '/auth';
export enum AuthUrlsEnum {
  SIGNUP = authPath + '/signup',
  SIGNIN = authPath + '/signin',
  VERIFY = authPath + '/verify',
  RESEND_TOKEN = `${authPath}/resend-token`,
  USER = `${authPath}/user`,
}
const servicesPath = '/services';
const suitesPath = `${servicesPath}/suites`;

export enum ServiceUrlEnum {
  GET_SERVICES = servicesPath,
  GET_SUITES = suitesPath,
  GET_SUITE_DETAILS = `${suitesPath}/:suiteId`,
  GET_CATEGORIES = `${suitesPath}/categories`,
  GET_OFFERS = `${servicesPath}/offers`,
  GET_PHONE_CODE = `${servicesPath}/phone-codes`,
  SEARCH_SUITES = `${servicesPath}/search/suites`,
  SEARCH_AUTOS = `${servicesPath}/search/autos`,
  SEARCH_TOURS =  `${servicesPath}/search/tours`,
  SEARCH_VISAS = `${servicesPath}/search/visas`,
}

export enum ProfileTypes {
  SERVICE_PROVIDER_USER = 'service_provider_user',
  SERVICE_SUBSCRIBER_USER = 'service_subscriber_user',
}

const serviceBookingsPath = '/service-bookings';

export enum BookingsUrlEnum {
  PROCESS_BOOKING = `${serviceBookingsPath}/process`,
  GET_PAYMENT_REFERENCE = `${serviceBookingsPath}/payment-reference`,
  GET_BOOKINGS = serviceBookingsPath,
  GET_PAYSTACK_PUBLIC_KEY = `${serviceBookingsPath}/paystack-public-key`,
  GET_DOLLAR_RATE = `${serviceBookingsPath}/dollar-rate`,
}
