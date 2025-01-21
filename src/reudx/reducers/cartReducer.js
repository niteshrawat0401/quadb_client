import {
    FETCH_CART,
    ADD_TO_CART,
    UPDATE_CART,
    REMOVE_FROM_CART,
  } from "../actions/cartAction";
  
  const initialState = {
    cartItems: null,
    totalQuantity: 0,
    totalPrice: 0,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CART:
      case ADD_TO_CART:
      case UPDATE_CART:
      case REMOVE_FROM_CART:
        return {
          ...state,
          cartItems: action.payload,
          totalQuantity: action.payload.products.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: action.payload.products.reduce(
            (sum, item) => sum + item.productId.price * item.quantity,
            0
          ),
        };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  