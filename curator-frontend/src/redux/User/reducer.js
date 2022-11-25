import setToken from "utils/SetToken";
import { actions } from "./action";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  const token = localStorage.getItem("TOKEN");
  if (token) {
    setToken(token);
  }
  switch (action.type) {
    case actions.USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case actions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case actions.USER_DETAIL_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case actions.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default userReducer;
