export enum Actions {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  INITIALIZE = "INITIALIZE",
}

const persistAndDispatch = (state: InitialStateProps): InitialStateProps => {
  if (typeof window !== "undefined") {
    localStorage.setItem("app-state", JSON.stringify(state));
  }
  return state;
};

const reducer = (
  state: InitialStateProps,
  action: Action
): InitialStateProps => {
  switch (action.type) {
    case Actions.LOGIN:
      return persistAndDispatch({ ...state, is_logged_in: true });
      break;
    case Actions.LOGOUT:
      return persistAndDispatch({ ...state, is_logged_in: false });
      break;
    case Actions.INITIALIZE:
      if (typeof window !== "undefined") {
        return JSON.parse(
          localStorage.getItem("app-state") || JSON.stringify(state)
        );
      }
      return { ...state };
      break;
    default:
      return state;
      break;
  }
};

export default reducer;
