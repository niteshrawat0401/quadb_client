import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

// Mock user role; replace with actual state/context
const userRole = "admin";

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar role={userRole} />
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
