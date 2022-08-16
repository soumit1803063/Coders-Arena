import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_GROUP,
  GET_GROUPS_OF_AUTH_USER_FAIL,
  GET_GROUPS_OF_AUTH_USER_SUCCESS,
  GET_SEARCHED_GROUPS,
} from "../constant/types";
import { baseUrl } from "../constant/url";

//getGroups starts
export const getGroupsAction = () => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/api/group`);
    dispatch({
      type: GET_GROUPS_OF_AUTH_USER_SUCCESS,
      payload: res.data,
    });

    return true;
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_GROUPS_OF_AUTH_USER_FAIL,
    });
    return false;
  }
};
//getGroups ends

//createGroup Action starts
export const createGroupAction =
  (name, description, image) => async (dispatch) => {
    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("groupImage", image);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post(`${baseUrl}/api/group`, data, config);
      dispatch({
        type: CREATE_GROUP,
      });

      dispatch(getGroupsAction());
      toast.success("Group Created.");
      return true;
    } catch (error) {
      console.log(error);
      toast.error("Error!");
      return false;
    }
  };

//ShowsearchGroupAction

export const ShowsearchGroupAction = (groupName) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      `${baseUrl}/api/group/search/${groupName}`,
      config
    );
    dispatch({
      type: GET_SEARCHED_GROUPS,
      payload: res.data,
    });

    return true;
  } catch (error) {
    console.log(error);
    toast.error("Error!");
    return false;
  }
};
