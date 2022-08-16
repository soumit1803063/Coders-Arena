import axios from "axios";
import { toast } from "react-toastify";
import { SEND_REQUEST } from "../constant/types";
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
