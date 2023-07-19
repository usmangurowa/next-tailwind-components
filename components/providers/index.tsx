import React from "react";
import ErrorBoundary from "./ErrorBoundry";
import ThemeProvider from "./Theme";
import Swr from "./Swr";
import { StoreProvider } from "./Store";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { ToastProvider } from "../common/Toast";

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
            <ThemeProvider>
              <ToastProvider>{children}</ToastProvider>
            </ThemeProvider>
          </Swr>
        </StoreProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
};

export default Provider;
