import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
  
    return isAuthenticated ? children : <Navigate to="/auth" />;
  };

  export default UserRoute