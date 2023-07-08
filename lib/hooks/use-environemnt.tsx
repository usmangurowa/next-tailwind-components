import React from "react";

const useEnvironment = () => {
  const [isClient, setClient] = React.useState(false);

  React.useEffect(() => {
    setClient(typeof window !== "undefined");
  }, []);

  return { isClient, isServer: !isClient };
};

export default useEnvironment;
