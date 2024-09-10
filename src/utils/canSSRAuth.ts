import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "@/service/errors/AuthTokenError";

// Restringir P a um objeto
export function canSSRAuth<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['@pizzaria.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, '@pizzaria.token');
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
      // Lidar com outros erros se necessário
      return {
        notFound: true,
      };
    }
  };
}
