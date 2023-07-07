import React from "react";
import ErrorBoundary from "./ErrorBoundry";
import ThemeProvider from "./Theme";
import Swr from "./Swr";
import { StoreProvider } from "./Store";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

const Provider = ({
  children,
  fallback,
  session,
}: CommonProp & { fallback?: any; session?: any }) => {
  return (
    <ErrorBoundary>
      <SessionProvider session={session}>
        <StoreProvider>
          <Swr value={{ fallback }}>
            <ThemeProvider>{children}</ThemeProvider>
          </Swr>
        </StoreProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
};

export default Provider;
