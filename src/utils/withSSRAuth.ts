import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../errors/AuthTokenError";
import decode from 'jwt-decode';


interface WithSSRAuthOptions {
  permissions: string[];
  roles: string[];
}


export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions): GetServerSideProps {
  return async (ctx: GetServerSidePropsContext) => {
    const cookies = parseCookies(ctx);
    const token = cookies['@GOFINANCEDGMOTA:token'];

    try {
      if (!token)
        throw new AuthTokenError();

      if (options) {
        const user = decode(token);

        if (!user) {
          return {
            redirect: {
              destination: "/dashboard",
              permanent: false
            }
          }
        }

      }

      return await fn(ctx);
    }
    catch (err) {

      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, '@GOFINANCEDGMOTA:token');

        return {
          redirect: {
            destination: "/",
            permanent: false
          }
        }
      }
    }
    return {
      props: {}
    }
  }
}