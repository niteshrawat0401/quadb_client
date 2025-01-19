import axios from "axios";
import apiUrl from "../../config";

const API_BASE_URL = "http://localhost:8080/";

export const authRequest = () => ({ type: "AUTH_REQUEST" });
export const authSuccess = (user) => ({ type: "AUTH_SUCCESS", payload: user });
export const authFailure = (error) => ({ type: "AUTH_FAILURE", payload: error });
export const logOutUser = () => ({ type: "LOG_OUT_USER" });

export const signUpUser = (formData) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const response = await axios.post(`${apiUrl}auth/signup`, formData);
    dispatch(authSuccess(response.data));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(response.data));
  } catch (error) {
    dispatch(authFailure(error.response?.data?.message || "Sign-up failed"));
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const response = await axios.post(`${apiUrl}auth/login`, credentials);
    dispatch(authSuccess(response.data));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(response.data));
  } catch (error) {
    dispatch(authFailure(error.response?.data?.message || "Login failed"));
  }
};

export const logout = () => (dispatch) => {
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.removeItem("currentUser");
  dispatch(logOutUser());
};
