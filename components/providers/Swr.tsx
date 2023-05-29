import axios from "@/apis/index";
import React from "react";
import { SWRConfig } from "swr";

const Swr = ({ children }: CommonProp) => {
  return (
    <SWRConfig value={{ provider: localStorageProvider, fetcher: fetcher }}>
      {children}
    </SWRConfig>
  );
};

export default Swr;

function localStorageProvider(): any {
  // Check if `localStorage` is available
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    // When initializing, we restore the data from `localStorage` into a map.
    const map = new Map(JSON.parse(localStorage.getItem("app-cache") || "[]"));

    // Before unloading the app, we write back all the data into `localStorage`.
    window.addEventListener("beforeunload", () => {
      const appCache = JSON.stringify(Array.from(map.entries()));
      localStorage.setItem("app-cache", appCache);
    });

    // We still use the map for write & read for performance.
    return map;
  } else {
    // If `localStorage` is not available (e.g., during server-side rendering), return an empty map
    return new Map();
  }
}

const fetcher = async (url: string) => {
  const res = await axios.get(url);

  if (res.statusText !== "OK") {
    const error = new Error("An error occurred while fetching the data.");
    // @ts-ignore
    error.info = res.data;
    // @ts-ignore
    error.status = res.status;
    error.message = res.data.message;
    throw error;
  }

  return res.data;
};
