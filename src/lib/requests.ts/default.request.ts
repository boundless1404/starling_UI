import { api } from 'src/boot/axios';
import { AuthUrlsEnum } from '../enums/urlPaths.enum';
import { AxiosHeaders } from 'axios';

export async function requestApi(
  url: AuthUrlsEnum | string,
  method: 'get' | 'post' | 'put' = 'get',
  payload: {
    body?: Record<string, unknown> | any;
    params?: Record<string, unknown>;
    headers?: Record<string, unknown>;
  } = {}
) {
  const serverResponse = await api({
    url,
    method,
    ...(payload.body ? { data: payload.body } : {}),
    ...(payload.headers
      ? { headers: payload.headers as unknown as AxiosHeaders }
      : {}),
  });

  const status = serverResponse.status;

  if (![200, 201, 204].includes(status)) {
    throw new Error('Request failed', {
      cause: serverResponse.data,
    });
  }

  const responseBody = serverResponse.data;
  return responseBody;
}

export type RequestApiParamsType = Parameters<typeof requestApi>;
