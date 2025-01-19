import axios from "axios";
import apiUrl from "../../config";

// Action types
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

const API_BASE_URL = "http://localhost:8080/"; 

// Action creators
export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const response = await axios.get(`${apiUrl}product/products`);
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
};
