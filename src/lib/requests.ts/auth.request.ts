import { api } from 'src/boot/axios';
import { UrlPathsEnum } from '../enums/urlPaths.enum';
import { requestApi } from './default.request';
// export async function requestSignin(signinModel: SigninModel) {
//   const serverResponse = await api.post(UrlPathsEnum.SIGNIN, signinModel, {
//     headers: {
//       Authorization: undefined,
//     },
//   });
//   if ([200, 201].includes(serverResponse.status)) {
//     const responseBody = serverResponse.data as { token: string };
//     return responseBody.token;
//   } else {
//     throw new Error('Signin failed', {
//       cause: serverResponse.data,
//     });
//   }
// }

export async function requestSignup(signupModel: unknown) {
  const serverResponse = await api.post(UrlPathsEnum.AUTH_SIGNUP, signupModel, {
    headers: {
      Authorization: undefined,
    },
  });
  if ([200, 201].includes(serverResponse.status)) {
    const responseBody = serverResponse.data as { token: string };
    // return responseBody.token;
    return responseBody;
  } else {
    throw new Error('Signin failed', {
      cause: serverResponse.data,
    });
  }
}

export async function requestVerify(verificationToken: string, email: string) {
  return requestApi(UrlPathsEnum.AUTH_VERIFY, 'post', {
    body: { token: verificationToken, email, tokenPurpose: 'sign_up' },
  });
}
