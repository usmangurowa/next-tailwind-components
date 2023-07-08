import React from "react";
import useSWR, { SWRConfiguration, useSWRConfig } from "swr";
import useEnvironment from "./use-environemnt";

const useServerSWR = <T,>(key: string, options?: SWRConfiguration) => {
  const { fallback, cache } = useSWRConfig();
  const { data, error, isLoading, isValidating, mutate } = useSWR<T>(key, {
    fallbackData: fallback ? fallback?.[key] : null,
    ...options,
  });

  const { isClient } = useEnvironment();

  const fallbackData = React.useMemo(
    () =>
      fallback?.[key] || options?.fallbackData || cache?.get(key)?.data || null,
    [key, options?.fallbackData, cache]
  );

  return {
    data: (data as T) || (fallbackData as T),
    error,
    isLoading: isClient ? isLoading : false,
    isValidating: isClient ? isValidating : false,
    mutate,
  };
};

export default useServerSWR;
