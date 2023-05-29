import React from "react";
import ErrorBoundary from "./ErrorBoundry";
import ThemeProvider from "./Theme";
import Swr from "./Swr";

const Provider = ({ children }: CommonProp) => {
  return (
    <ErrorBoundary>
      <Swr>
        <ThemeProvider>{children}</ThemeProvider>
      </Swr>
    </ErrorBoundary>
  );
};

export default Provider;
