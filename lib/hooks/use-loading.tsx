import React from "react";
type LoadingState = boolean | string;

const useLoading = () => {
  const [loading, setLoading] = React.useState<LoadingState>(false);

  const start = React.useCallback(
    (state?: LoadingState) => setLoading(state || true),
    [loading]
  );

  const stop = React.useCallback(
    (state?: LoadingState) => setLoading(state || false),
    [loading]
  );

  return { loading, start, stop };
};

export default useLoading;
