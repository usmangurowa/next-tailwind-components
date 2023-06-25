import "../styles/globals.css";
import type { AppProps } from "next/app";
import Providers from "@/components/providers";
import Nav from "@/components/navigators/Nav";
import BottomNav from "@/components/navigators/BottomNav";

export default function App({
  Component,
  pageProps,
  fallback,
}: AppProps & { fallback?: any }) {
  return (
    <Providers fallback={fallback}>
      <Nav />
      <Component {...pageProps} />
      <BottomNav />
    </Providers>
  );
}
