import React from "react";
import axios from "@/apis/index";
import { AxiosHeaders, AxiosRequestHeaders } from "axios";
import { useSWRConfig } from "swr";

interface ConfigProps {
  method: "post" | "put" | "patch";
  headers?: AxiosRequestHeaders;
  onError?: (error: Error) => void;
  onSuccess?: (data?: any) => void;
}

interface StateProps {
  error: Error | null;
  result: any;
  loading: boolean;
}

const useMutation = <T,>(
  key: string,
  { method = "post", headers, onSuccess, onError }: ConfigProps
) => {
  const { mutate } = useSWRConfig();
  const [state, setState] = React.useState<StateProps>({
    error: null,
    result: null,
    loading: false,
  });

  const handleError = React.useCallback(
    (error: Error) => {
      setState({ ...state, error });
      onError && onError(error);
    },
    [state, onError]
  );
  const handleSuccess = React.useCallback(
    (result: any) => {
      setState({ ...state, result });
      onSuccess && onSuccess(result);
      mutate(key, null, true);
    },
    [state, onSuccess]
  );

  const mutation = React.useCallback(
    (body: T) => {
      setState({ ...state, loading: true });
      axios[method](key, body, { ...(headers && { headers }) })
        .then(handleSuccess)
        .catch(handleError)
        .finally(() => setState({ ...state, loading: false }));
    },
    [key, method, state]
  );

  return { mutation, state };
};

export default useMutation;
