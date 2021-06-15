import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILED,
  SET_USER_STATE,
  FETCH_INITIAL_STATE,
  FETCH_INITIAL_STATE_SUCCESS,
  FETCH_INITIAL_STATE_FAIL,
  RESET_USER_STATE,
  RESET_SELECTED_CHILD,
  SET_SELECTED_CHILD,
} from "./user.types";
import axios from "axios";
import { useDispatch } from "react-redux";
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LOGIN });
    const resp = await axios.post(
      "http://localhost:5000/api/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    const user = resp.data.user;
    dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: user });
  } catch (e) {
    dispatch({ type: REQUEST_LOGIN_FAILED, payload: e.response.data.message });
  }
};

export const setUserState = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_INITIAL_STATE });
    const resp = await axios.post("http://localhost:5000/api/fetchuserinfo", {
      withCredentials: true,
    });
    console.log(resp)
    dispatch({ type: FETCH_INITIAL_STATE_SUCCESS, payload: resp.data });
  } catch (error) {
    dispatch({ type: FETCH_INITIAL_STATE_FAIL, payload: error.response });
  }
};

export const resetUserState = () => (dispatch) => {
  dispatch({ type: RESET_USER_STATE });
};

export const resetSelectedChild = () => (dispatch, getState) => {
  const children = getState().profile.children;
  console.log('ran action')
  dispatch({
    type: RESET_SELECTED_CHILD,
    payload: children.length > 0 ? children[0] : "",
  });
};


