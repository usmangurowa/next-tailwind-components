import { ThemeProvider as Provider } from "next-themes";

import React from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider defaultTheme="system" attribute="class">
      {children}
    </Provider>
  );
};

export default ThemeProvider;
