// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/authContext";

import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../Components/DashBoard/AdminSidebar";
// import AdminSummary from "../Components/DashBoard/AdminSummary";
import Navbar from "../Components/DashBoard/Navbar";

function AdminDashBoard() {
  // const { user } = useAuth();

  return (
    <div>
      <AdminSidebar></AdminSidebar>

      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar></Navbar>
        {/* <AdminSummary></AdminSummary> */}
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default AdminDashBoard;
