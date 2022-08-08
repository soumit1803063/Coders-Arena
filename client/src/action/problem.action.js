import axios from "axios";
import { toast } from "react-toastify";
import { CREATE_PROBLEM, GET_PROBLEM_ALL } from "../constant/types";
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
  (name, link, description, image, tags, id) => async (dispatch) => {
    const data = new FormData();
    data.append("link", link);
    data.append("name", name);
    if (description) data.append("description", description);
    if (image) data.append("problemImage", image);
    data.append("group_id", id);

    console.log(tags);

    for (let i = 0; i < tags.length; i++) {
      data.append(`tag[${i}]`, tags[i]);
    }

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      console.log(data[0]);
      const res = await axios.post(`${baseUrl}/api/problem`, data, config);
      dispatch({
        type: CREATE_PROBLEM,
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
