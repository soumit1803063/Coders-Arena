import {
  AUTH_USER_LOAD,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from "../constant/types";
import setAuthToken from "../Utils/setToken";

const initialState = {
  user: null,
  token: localStorage.getItem("ca-token")
    ? localStorage.getItem("ca-token")
    : null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("ca-token", payload);
      setAuthToken(payload);
      return {
        ...state,
        isAuthenticated: true,
        token: payload,
      };
    case AUTH_USER_LOAD:
      return {
        ...state,
        isAuthenticated: true,

        user: payload,
      };

    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
      localStorage.removeItem("ca-token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default authReducer;
