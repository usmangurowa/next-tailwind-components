interface CommonProp {
  children?: React.ReactNode;
}

interface DefaultComponentProps extends CommonProp {
  className?: string;
  style?: React.CSSProperties;
}

interface InitialStateProps {
  is_logged_in?: boolean;
}

type ReducerType = (
  state: InitialStateProps,
  action: Action
) => InitialStateProps;

interface Action {
  type: keyof typeof Actions;
  payload?: any;
}

type ContextHook = () => {
  state: InitialStateProps;
  dispatch: (action: Action) => void;
};
enum Actions {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  INITIALIZE = "INITIALIZE",
}
