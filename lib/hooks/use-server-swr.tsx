import React from "react";
import useSWR, { SWRConfiguration, useSWRConfig } from "swr";

const useServerSWR = (
  endpoint: string,
  options?: SWRConfiguration & {
    key?: string;
    initialData?: any;
    fallback?: any;
  }
) => {
  const { fallback } = useSWRConfig();
  const { data, error, isLoading, isValidating, mutate } = useSWR(endpoint, {
    fallbackData: fallback ? fallback[endpoint] : [],
    ...options,
  });

  return {
    data: data || fallback[endpoint],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useServerSWR;
