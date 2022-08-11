import { GET_COMMENTS } from "../constant/types";

const initialState = {
  comments: null,
};

const commentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: payload,
      };
    default:
      return state;
  }
};

export default commentReducer;
