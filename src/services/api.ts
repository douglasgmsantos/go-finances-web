import axios, { AxiosError, AxiosResponse } from 'axios'
import { parseCookies, setCookie } from 'nookies'

import { signOut } from '../hooks/auth';
import { AuthTokenError } from '../errors/AuthTokenError';



let isRefreshing = false;
let failedRequestKill: any[] = [];

export function setupApiClient(ctx: any = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      Authorization: `Bearer ${cookies['@GOFINANCEDGMOTA:token']}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  });


  api.interceptors.response.use(response => response, (error: AxiosError) => {
    if (error ?.response.status == 401) {
      if (String(error ?.response.data.status).toUpperCase() == "TOKEN_EXPIRED") {
        //Renovar token

        cookies = parseCookies(ctx);
        const { "@GOFINANCEDGMOTA:refresh_token": refresh_token } = cookies;
        const originalConfig = error.config;


        if (!isRefreshing) {
          isRefreshing = true;

          api.post("/sessions/refresh-token", { refresh_token })
            .then(response => {
              const { token } = response.data;

              setCookie(ctx, '@GOFINANCEDGMOTA:token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30dias,
                path: "/"
              });
              setCookie(ctx, '@GOFINANCEDGMOTA:refresh_token', response.data.refresh_token, {
                maxAge: 60 * 60 * 24 * 30, // 30dias,
                path: "/"
              });

              api.defaults.headers['Authorization'] = `Bearer ${token}`;

              failedRequestKill.forEach(request => request.onSucess(token));
              failedRequestKill = [];
            }).catch(error => {
              failedRequestKill.forEach(request => request.onFailure(error));
              failedRequestKill = [];

              if (process.browser) {
                signOut();
              } else {
                return Promise.reject(new AuthTokenError());
              }
            }).finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestKill.push({
            onSucess: (token: string) => {
              originalConfig.headers["Authorization"] = `Bearer ${token}`;
              resolve(api(originalConfig))
            },
            onFailure: (error: AxiosError) => { reject(error) }
          })
        })

      } else {
        //Deslogar usuário
        if (process.browser) {
          signOut();
        }
      }
    }

    return Promise.reject(error);
  })

  return api
} 