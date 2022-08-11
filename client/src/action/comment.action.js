import axios from "axios";
import { toast } from "react-toastify";
import { CREATE_COMMENT } from "../constant/types";
import { baseUrl } from "../constant/url";

//createComment Action
export const createCommentAction =
  (commentText, commentImage, problem_id) => async (dispatch) => {
    const data = new FormData();
    data.append("commentText", commentText);
    if (commentImage) data.append("commentImage", commentImage);
    data.append("problem_id", problem_id);
    console.log("data--->", problem_id);
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

      dispatch(createCommentAction());

      return true;
    } catch (error) {
      console.log(error);
      toast.error("Error! Can't Post the comment.");
      return false;
    }
  };
