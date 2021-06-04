import axios, { AxiosError, AxiosResponse } from 'axios'
import { parseCookies } from 'nookies'

import { signOut } from '../hooks/auth';

export function setupApiClient(ctx: any = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      Authorization: `Bearer ${cookies['@GOFINANCEDGMOTA:token']}`
    }
  });


  api.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response && !response.data.success && ["TOKEN_INVALID", "TOKEN_EXPIRED"].indexOf(response.data.status) !== -1) {
        if (process.browser) {
          signOut();
        }
      }

      return response
    }, (error: AxiosError) => Promise.reject(error))

  return api
} 