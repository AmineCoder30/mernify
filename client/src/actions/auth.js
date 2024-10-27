import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router("/chat");
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: "SET_ERROR", payload: error.response.data.message });
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    // Ensure the response is returned and destructured correctly
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    router("/chat");
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: "SET_ERROR", payload: error.response.data.message });
  }
};
export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();
    dispatch({ type: "GET_ALL_USERS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
