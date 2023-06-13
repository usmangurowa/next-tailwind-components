enum Actions {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

const reducer = (
  state: InitialStateProps,
  action: Action
): InitialStateProps => {
  switch (action.type) {
    case Actions.LOGIN:
      return { ...state, is_logged_in: true };
      break;
    case Actions.LOGOUT:
      return { ...state, is_logged_in: false };
      break;
    default:
      return state;
      break;
  }
};

export default reducer;
