import axios from "axios";
import { useEffect, useState } from "react";
import { LeaveButtons } from "../../utils/LeaveHelpher";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/LeaveHelpher";

export const Table = () => {
  const [leaves, setLeaves] = useState(null);

  const [filteredLeave, setFilteredLeave] = useState(null);

  console.log(columns);
  const fetchLeaves = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/leave`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        console.log(res.data.leaves);
        let sno = 1;
        let data = await res.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons _id={leave._id}></LeaveButtons>,
        }));

        setLeaves(data);
        setFilteredLeave(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  //search by string
  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredLeave(data);
  };

  //search by button
  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );

    setFilteredLeave(data);
  };

  console.log(leaves);
  useEffect(() => {
    fetchLeaves();
  }, []);
  return (
    <div>
      {filteredLeave ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>

          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="search By Emp Id"
              className="px-4 py-0.5 border"
              onChange={filterByInput}
            ></input>
            <div className="space-x-5 p-5">
              <button
                className="px-5 py-2 bg-teal-600 text-white hover:bg-teal-700  rounded-xl cursor-pointer"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-5 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-xl cursor-pointer"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button
                className="px-5 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-xl cursor-pointer"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredLeave}
            pagination
          ></DataTable>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
