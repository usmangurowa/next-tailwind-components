import React from "react";
import useSWR, { SWRConfiguration, useSWRConfig } from "swr";

const useServerSWR = (
  key: string,
  options?: SWRConfiguration & {
    key?: string;
    initialData?: any;
    fallback?: any;
  }
) => {
  const { fallback, cache } = useSWRConfig();
  const { data, error, isLoading, isValidating, mutate } = useSWR(key, {
    fallbackData: fallback ? fallback?.[key] : null,
    ...options,
  });
  const [loading, setLoading] = React.useState(isLoading);

  const fallbackData = fallback?.[key] || cache.get(key)?.data || null;

  React.useEffect(() => {
    if (fallbackData || data) {
      setLoading(false);
    }
  }, [fallbackData, data]);

  return {
    data: data || fallbackData,
    error,
    isLoading: fallbackData ? false : isLoading,
    isValidating,
    loading,
    mutate,
  };
};

export default useServerSWR;
