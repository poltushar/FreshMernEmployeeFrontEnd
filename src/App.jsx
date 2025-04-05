import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashBoard from "./pages/AdminDashBoard";
import { EmployeeDashBoard } from "./pages/EmployeeDashBoard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoute from "./utils/RoleBaseRoute";
import AdminSummary from "./Components/DashBoard/AdminSummary";
import DepartMentList from "./Components/Department/DepartMentList";
import AddDepartment from "./Components/Department/AddDepartment";
import EditDepartment from "./Components/Department/EditDepartment";
import List from "./Components/employee/List";
import Add from "./Components/employee/Add";
import View from "./Components/employee/View";
import Edit from "./Components/employee/Edit";
import ViewSalary from "./Components/Salary/View";
import AddSalary from "./Components/Salary/Add";
import { EmployeeSummaryCard } from "./Components/EmployeeDashBoard/EmployeeSummaryCard";
import { EmployeeProfile } from "./Components/EmployeeDashBoard/EmployeeProfile";
import LeaveList from "./Components/leave/LeaveList";
import AddLeave from "./Components/leave/AddLeave";
import ChangePassword from "./Components/EmployeeDashBoard/ChangePassword";
import { Table } from "./Components/leave/Table";
import LeaveDetail from "./Components/leave/Detail";
import Attendance from "./Components/Attendance/Attendance";
import AttendanceReport from "./Components/Attendance/AttendanceReport";

function App() {
  return (
    <>
      <BrowserRouter>
        {/*This is a Admin DashBoard routes */}
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/admin-dashboard"></Navigate>}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoute requiredRole={["admin"]}>
                  <AdminDashBoard></AdminDashBoard>
                </RoleBaseRoute>
              </PrivateRoutes>
            }
          >
            <Route index element={<AdminSummary></AdminSummary>}></Route>
            <Route
              path="/admin-dashboard/departments"
              element={<DepartMentList></DepartMentList>}
            ></Route>
            <Route
              path="/admin-dashboard/add-department"
              element={<AddDepartment></AddDepartment>}
            ></Route>
            <Route
              path="/admin-dashboard/add-employee"
              element={<Add></Add>}
            ></Route>
            <Route
              path="/admin-dashboard/employees/:id"
              element={<View></View>}
            ></Route>
            <Route
              path="/admin-dashboard/employee/edit/:id"
              element={<Edit></Edit>}
            ></Route>
            <Route
              path="/admin-dashboard/employees"
              element={<List></List>}
            ></Route>
            <Route
              path="/admin-dashboard/department/:id"
              element={<EditDepartment></EditDepartment>}
            ></Route>
            <Route
              path="/admin-dashboard/employees/salary/:id"
              element={<ViewSalary></ViewSalary>}
            ></Route>
            <Route
              path="/admin-dashboard/salary/add"
              element={<AddSalary></AddSalary>}
            ></Route>
            <Route
              path="/admin-dashboard/leaves"
              element={<Table></Table>}
            ></Route>
            <Route
              path="/admin-dashboard/leaves/:id"
              element={<LeaveDetail></LeaveDetail>}
            ></Route>
            <Route
              path="/admin-dashboard/employees/leaves/:id"
              element={<LeaveList></LeaveList>}
            ></Route>

            <Route
              path="/admin-dashboard/attendance"
              element={<Attendance></Attendance>}
            ></Route>

            <Route
              path="/admin-dashboard/attendance-report"
              element={<AttendanceReport></AttendanceReport>}
            ></Route>

            <Route
              path="/admin-dashboard/changepassword"
              element={<ChangePassword></ChangePassword>}
            ></Route>
          </Route>

          {/*This is a employess DashBoard routes */}

          <Route
            path="/employee-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoute requiredRole={["employee"]}>
                  <EmployeeDashBoard></EmployeeDashBoard>
                </RoleBaseRoute>
              </PrivateRoutes>
            }
          >
            <Route
              index
              element={<EmployeeSummaryCard></EmployeeSummaryCard>}
            ></Route>
            <Route
              path="/employee-dashboard/profile/:id"
              element={<EmployeeProfile></EmployeeProfile>}
            ></Route>
            <Route
              path="/employee-dashboard/leaves/:id"
              element={<LeaveList></LeaveList>}
            ></Route>
            <Route
              path="/employee-dashboard/add-leave"
              element={<AddLeave></AddLeave>}
            ></Route>
            <Route
              path="/employee-dashboard/salary/:id"
              element={<ViewSalary></ViewSalary>}
            ></Route>

            <Route
              path="/employee-dashboard/changepassword"
              element={<ChangePassword></ChangePassword>}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

//video  length 8:14
