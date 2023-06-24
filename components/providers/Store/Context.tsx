import React from "react";
import reducer from "./reducer";

const initialState: InitialStateProps = {
  is_logged_in: false,
};

export const Store = React.createContext<{
  state: InitialStateProps;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = React.useMemo(() => ({ state, dispatch }), [state]);

  React.useEffect(() => {
    dispatch({ type: "INITIALIZE" });
  }, []);

  return <Store.Provider value={value}>{children}</Store.Provider>;
};
