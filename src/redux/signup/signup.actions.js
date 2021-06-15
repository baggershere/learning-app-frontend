import {
  REQUEST_USER_SIGNUP,
  REQUEST_USER_SIGNUP_SUCCESS,
  REQUEST_USER_SIGNUP_FAIL,
  RESET_STATE,
} from "./signup.types";

import axios from "axios";
export const signupUser = (email, name, password) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_USER_SIGNUP });
    const resp = await axios.post(
      "http://localhost:5000/api/signup",
      {
        email,
        name,
        password,
      },
      { withCredentials: true }
    );
    dispatch({ type: REQUEST_USER_SIGNUP_SUCCESS });
  } catch (error) {
    dispatch({
      type: REQUEST_USER_SIGNUP_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const resetState = () => (dispatch) => {
  dispatch({ type: RESET_STATE });
};
