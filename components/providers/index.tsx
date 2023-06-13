import React from "react";
import ErrorBoundary from "./ErrorBoundry";
import ThemeProvider from "./Theme";
import Swr from "./Swr";
import { StoreProvider } from "./Store";

const Provider = ({ children, fallback }: CommonProp & { fallback?: any }) => {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <Swr value={{ fallback }}>
          <ThemeProvider>{children}</ThemeProvider>
        </Swr>
      </StoreProvider>
    </ErrorBoundary>
  );
};

export default Provider;
