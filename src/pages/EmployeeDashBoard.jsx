// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/authContext";

import { Outlet } from "react-router-dom";

// import AdminSummary from "../Components/DashBoard/AdminSummary";
import Navbar from "../Components/DashBoard/Navbar";
import { EmployeeSidebar } from "../Components/EmployeeDashBoard/EmployeeSidebar";

function EmployeeDashBoard() {
  // const { user } = useAuth();

  return (
    <div>
      <EmployeeSidebar></EmployeeSidebar>
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar></Navbar>
        {/* <AdminSummary></AdminSummary> */}
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export { EmployeeDashBoard };
