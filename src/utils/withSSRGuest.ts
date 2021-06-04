import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export function withSSRGuest<P>(fn: GetServerSideProps<P>): GetServerSideProps {
  return async (ctx: GetServerSidePropsContext) => {
    const cookies = parseCookies(ctx);

    if (cookies['@GOFINANCEDGMOTA:token']) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false
        }
      }
    }

    return await fn(ctx);
  }
}