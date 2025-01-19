import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const userRole = "admin"; // Replace with actual state/context

const MainLayout = () => {
  return (
    <div className="flex">
      {userRole === "admin" && <Sidebar role={userRole} />}
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
