import "../styles/globals.css";
import type { AppProps } from "next/app";
import Providers from "@/components/providers";
import Nav from "@/components/navigators/Nav";
import BottomNav from "@/components/navigators/BottomNav";

export default function App({
  Component,
  pageProps,
  fallback,
  session,
}: AppProps & { fallback?: any; session?: any }) {
  return (
    <Providers fallback={pageProps?.fallback} session={session}>
      <Nav />
      <Component {...pageProps} />
      <BottomNav />
    </Providers>
  );
}
