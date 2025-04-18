import axios from "axios";
import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const LeaveList = () => {
  const [LeaveList, SetLeaveList] = useState([]);

  const [FilteredLeaveList, setFilteredLeaveList] = useState([]);

  const { id } = useParams();

  const { user } = useAuth();

  const filteredLeave = (q) => {
    const filteredRecords = LeaveList.filter((leave) => {
      leave.leaveType.toLowerCase().includes(q.target.value.toLowerCase());
    });

    setFilteredLeaveList(filteredRecords);
  };

  const fetchLeaveList = async () => {
    try {
      const res = await axios.get(
        `https://employeebackend-1-x2mb.onrender.com/api/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      if (res.data.success) {
        SetLeaveList(res.data.leaves);
        setFilteredLeaveList(res.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaveList();
  }, []);

  console.log(FilteredLeaveList);

  if (!LeaveList) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>

      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="search By Status"
          className="px-4 py-0.5 border"
          onChange={filteredLeave}
        ></input>

        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-4 py-1 bg-teal-600 rounded text-white"
          >
            Add New Leaves
          </Link>
        )}
      </div>
      <table className="w-full text-sm text-left text-gray-500 mt-6">
        <thead className="text-xs  text-gray-700 uppercase bg-gray-50 border border-gray-200">
          <tr>
            <th className="px-6 py-3">Sno</th>
            <th className="px-6 py-3">Leave Type</th>

            <th className="px-6 py-3">From</th>

            <th className="px-6 py-3">To</th>

            <th className="px-6 py-3">Description</th>

            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {FilteredLeaveList.map((leave) => {
            let sno = 1;
            return (
              <tr
                key={leave._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-3">{sno++}</td>
                <td className="px-6 py-3">{leave.leaveType}</td>

                <td className="px-6 py-3">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>

                <td className="px-6 py-3">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>

                <td className="px-6 py-3">{leave.reason}</td>

                <td className="px-6 py-3">{leave.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveList;
