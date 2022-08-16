import axios from "axios";
import { toast } from "react-toastify";
import {
  ACCEPT_REQUEST,
  GET_MEMBERS,
  GET_MEMBER_REQUESTS,
  SEND_REQUEST,
} from "../constant/types";
import { baseUrl } from "../constant/url";
//sendRequestAction
export const sendRequestAction = (group_id) => async (dispatch) => {
  console.log("group id:", group_id);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `${baseUrl}/api/member/request`,
      JSON.stringify({ group_id }),
      config
    );
    dispatch({
      type: SEND_REQUEST,
      payload: res.data,
    });
    toast.success("success");

    return true;
  } catch (error) {
    error.response.data?.errors.map(({ msg }) => toast.error(msg));
    console.log(error);
    return false;
  }
};
//getMember action
export const ShowMemberAction = (group_id) => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/api/member/${group_id}`);
    dispatch({
      type: GET_MEMBERS,
      payload: res.data,
    });

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

//getMemberRequest action
export const ShowMemberRequestAction = (group_id) => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/api/member/request/${group_id}`);
    dispatch({
      type: GET_MEMBER_REQUESTS,
      payload: res.data,
    });

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

//acceptMemberRequest action
export const acceptMemberRequest = (group_id, user_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `${baseUrl}/api/member/request/accept`,
      JSON.stringify({ group_id, user_id }),
      config
    );
    dispatch({
      type: ACCEPT_REQUEST,
    });
    dispatch(ShowMemberAction(group_id));
    dispatch(ShowMemberRequestAction(group_id));

    return true;
  } catch (error) {
    error.response.data?.errors.map(({ msg }) => toast.error(msg));
    console.log(error);
    return false;
  }
};
