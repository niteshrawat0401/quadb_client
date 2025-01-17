const initialState = {
    userList: [],
    currentUser: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  };
  
  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case "AUTH_REQUEST":
        return { ...state, isLoading: true, error: null };
  
      case "AUTH_SUCCESS":
        return {
          ...state,
          isLoading: false,
          isLoggedIn: true,
          currentUser: action.payload,
        };
  
      case "AUTH_FAILURE":
        return { ...state, isLoading: false, error: action.payload };
  
      case "LOG_OUT_USER":
        return { ...state, isLoggedIn: false, currentUser: null };
  
      case "ADD_USER":
        return { ...state, userList: [...state.userList, action.payload] };
  
      default:
        return state;
    }
  };
  
  export default loginReducer;
  