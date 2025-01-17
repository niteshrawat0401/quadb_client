import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const location = useLocation();
  
    // Allow access if the route includes "/admin"
    if (location.pathname.startsWith("/admin")) {
      return children;
    }
  
    // Redirect any other attempt to a fallback page
    return <Navigate to="/dashboard" />;
  };

  export default AdminRoute
  