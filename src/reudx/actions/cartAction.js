import axios from "axios";

// Action Types
export const FETCH_CART = "FETCH_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_CART = "UPDATE_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// Base URL
const API_BASE_URL = "http://localhost:8080";

// Action Creators
export const fetchCart = ({userId}) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/cart/${userId}`);
    dispatch({ type: FETCH_CART, payload: response.data });
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
};

export const addToCart = (userId, productId, quantity) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/product/cart/${userId}`, {
      userId,
      productId,
      quantity,
    });
    dispatch({ type: ADD_TO_CART, payload: response.data.cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

export const updateCart = (cartId, productId, quantity) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/product/cart/${cartId}`, {
      productId,
      quantity,
    });
    dispatch({ type: UPDATE_CART, payload: response.data.cart });
  } catch (error) {
    console.error("Error updating cart:", error);
  }
};

export const removeFromCart = (cartId, productId) => async (dispatch) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/product/cart/${cartId}/${productId}`);
    dispatch({ type: REMOVE_FROM_CART, payload: response.data.cart });
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
};
