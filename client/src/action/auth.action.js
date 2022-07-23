import axios from "axios";
import { toast } from "react-toastify";
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  AUTH_USER_LOAD,
  LOGOUT_SUCCESS,
} from "../constant/types";
import { baseUrl } from "../constant/url";

//registerAction starts
export const registerAction = (name, email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `${baseUrl}/api/user`,
      JSON.stringify({ name, email, password }),
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
    });
    toast.success("Registration Successful!");
  } catch (error) {
    error.response.data.errors.map(({ msg }) => toast.error(msg));
    console.log(error);
  }
};
//registerAction ends

//loginAction starts
export const loginAction = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `${baseUrl}/api/auth`,
      JSON.stringify({ email, password }),
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    });
    toast.success("Log in Successful!");
    dispatch(getAuthUserAction());

    return true;
  } catch (error) {
    error.response.data?.errors.map(({ msg }) => toast.error(msg));
    console.log(error);
    return false;
  }
};
//loginAction ends

//getAuthUserAction starts
export const getAuthUserAction = () => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/api/auth`);
    dispatch({
      type: AUTH_USER_LOAD,
      payload: res.data,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
//getAuthUserAction ends

export const logoutAction = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};
