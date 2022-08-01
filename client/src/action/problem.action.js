import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_GROUP,
  GET_GROUPS_OF_AUTH_USER_FAIL,
  GET_GROUPS_OF_AUTH_USER_SUCCESS,
  GET_PROBLEM_ALL,
} from "../constant/types";
import { baseUrl } from "../constant/url";

//getProblemAllAction starts
export const getProblemsAllAction = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/api/problem/all/${id}`);
    dispatch({
      type: GET_PROBLEM_ALL,
      payload: res.data,
    });

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};
//getpROBLEMallAction ends

//createProblem Action starts
export const createProblemAction =
  (link, description, image, group_id, tags, name) => async (dispatch) => {
    const data = new FormData();
    data.append("link", link);
    data.append("name", name);
    if (description) data.append("description", description);
    if (image) data.append("problemImage", image);
    data.append("group_id", group_id);

    tags.split(",");
    tags.forEach((e) => {
      data.append("tag[]", e);
    });
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

      dispatch(createProblemAction());
      toast.success("Problem Posted.");
      return true;
    } catch (error) {
      console.log(error);
      toast.error("Error! Can't Post the problem.");
      return false;
    }
  };
