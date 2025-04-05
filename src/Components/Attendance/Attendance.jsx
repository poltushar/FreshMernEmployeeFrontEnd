import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns } from "../../utils/AttendanceHelper";
import DataTable from "react-data-table-component";
import AttendanceHelper from "../../utils/AttendanceHelper";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);

  const statusChange = () => {
    fetchAttendance();
  };

  const [loading, setLoading] = useState(false);

  const [filterAttendance, setFilterAttendance] = useState(null);

  // const [filterEmployees, setFilterEmployees] = useState([]);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/attendance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        console.log(res.data);

        let sno = 1;
        let data = await res.data.attendance.map((att) => ({
          employeeId: att.employeeId.employeeId,
          sno: sno++,
          department: att.employeeId.department.dep_name,
          name: att.employeeId.userId.name,
          action: (
            <AttendanceHelper
              status={att.status}
              employeeId={att.employeeId.employeeId}
              statusChange={statusChange}
            ></AttendanceHelper>
          ),
        }));

        console.log(data);
        setAttendance(data);
        setFilterAttendance(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const searchData = attendance.filter((curElem) =>
      curElem.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilterAttendance(searchData);
  };

  if (!filterAttendance) {
    return <h1>loading...</h1>;
  }

  console.log(filterAttendance);

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Attendance</h3>
      </div>

      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="search By Emp Id"
          className="px-4 py-0.5 border"
          onChange={handleFilter}
        ></input>

        <p className="text-2xl">
          Mark Employees for{" "}
          <span className="font-bold underline">
            {new Date().toISOString().split("T")[0]}
          </span>{" "}
        </p>
        <Link
          to="/admin-dashboard/attendance-report"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Attendance Report
        </Link>
      </div>

      <div className="p-3">
        <DataTable
          columns={columns}
          data={filterAttendance}
          pagination
        ></DataTable>
      </div>
    </div>
  );
};

export default Attendance;
