import {
    combineReducers,
    applyMiddleware,
    legacy_createStore as createStore,
    compose,
  } from "redux";
  
  import {thunk} from "redux-thunk";
  import authReducer from "../reudx/reducers/authReducer";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
  
  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;
  
  const enhancer = composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
  );


const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer
  // Add other reducers here
});



export const store = createStore(rootReducer, enhancer);