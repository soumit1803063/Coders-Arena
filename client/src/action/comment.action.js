import axios from "axios";
import { toast } from "react-toastify";
import { CREATE_COMMENT, GET_COMMENTS } from "../constant/types";
import { baseUrl } from "../constant/url";
//get all comments of a problem

export const getCommentsAction = (problem_id) => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/api/comment/${problem_id}`);
    dispatch({
      type: GET_COMMENTS,
      payload: res.data,
    });

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

//createComment Action
export const createCommentAction =
  (commentText, commentImage, problem_id) => async (dispatch) => {
    const data = new FormData();
    data.append("commentText", commentText);
    if (commentImage) data.append("commentImage", commentImage);
    data.append("problem_id", problem_id);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post(`${baseUrl}/api/comment`, data, config);
      dispatch({
        type: CREATE_COMMENT,
      });

      dispatch(getCommentsAction(problem_id));
      return true;
    } catch (error) {
      console.log(error);
      toast.error("Error! Can't Post the comment.");
      return false;
    }
  };
