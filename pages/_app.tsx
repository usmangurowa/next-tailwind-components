import "../styles/globals.css";
import type { AppProps } from "next/app";
import Providers from "@/components/providers";
import Nav from "@/components/navigators/Nav";
import BottomNav from "@/components/navigators/BottomNav";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session?: any;
};

export default function App({
  Component,
  pageProps,
  session,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Providers fallback={pageProps?.fallback} session={session}>
      {getLayout(<Component {...pageProps} />)}
    </Providers>
  );
}
