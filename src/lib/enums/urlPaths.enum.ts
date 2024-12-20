const authPath = '/auth';
export enum AuthUrlsEnum {
  SIGNUP = authPath + '/signup',
  SIGNIN = authPath + '/signin',
  VERIFY = authPath + '/verify',
  RESEND_TOKEN = `${authPath}/resend-token`,
  USER = `${authPath}/user`,
}

export enum ServiceUrlEnum {
  GET_SERVICES = '/services',
  Get_SUITES = '/services/suites',
  GET_SUITE_DETAILS = '/services/suites/:suiteId',
  GET_CATEGORIES = '/services/suites/categories',
  GET_OFFERS = '/services/offers',
}

export enum ProfileTypes {
  SERVICE_PROVIDER_USER = 'service_provider_user',
  SERVICE_SUBSCRIBER_USER = 'service_subscriber_user',
}

export enum BookingsUrlEnum {
  PROCESS_BOOKING = '/service-bookings/process',
  GET_PAYMENT_REFERENCE = '/service-bookings/payment-reference',
}
