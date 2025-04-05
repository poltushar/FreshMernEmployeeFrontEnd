import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LeaveDetail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);

  const navigate = useNavigate();

  const fetchLeave = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/leave/detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        setLeave(res.data.leave);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeave();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      console.log(status);
      const res = await axios.put(
        `http://localhost:3000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  console.log(leave);

  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-full">
          <h3 className="text-2xl font-bold mb-8 text-center">Leave Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`http://localhost:3000/${leave.employeeId.userId.profileImage}`}
                className="rounded-full border w-92 h-100"
              ></img>
            </div>

            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{leave.employeeId.userId.name}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                {" "}
                <p className="text-lg font-bold">Employee Id:</p>
                <p className="font-medium">{leave.employeeId.employeeId}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                {" "}
                <p className="text-lg font-bold">leaveType:</p>
                <p className="font-medium">{leave.leaveType}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                {" "}
                <p className="text-lg font-bold">Reason:</p>
                <p className="font-medium">{leave.reason}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                {" "}
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">
                  {leave.employeeId.department.dep_name}
                </p>
              </div>

              <div className="flex space-x-3 mb-5">
                {" "}
                <p className="text-lg font-bold">Start Date:</p>
                <p className="font-medium">
                  {new Date(leave.startDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex space-x-3 mb-5">
                {" "}
                <p className="text-lg font-bold">End Date:</p>
                <p className="font-medium">
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex space-x-3 mb-5">
                {" "}
                <p className="text-lg font-bold">
                  {leave.status === "Pending" ? "Action" : "Status"}
                </p>
                {leave.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <button
                      className="px-5 py-1 bg-violet-600 text-white rounded-xl  cursor-pointer"
                      onClick={() => changeStatus(leave._id, "Approved")}
                    >
                      Approve
                    </button>

                    <button
                      className="px-5 py-1 bg-red-600 text-white rounded-xl  cursor-pointer"
                      onClick={() => changeStatus(leave._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p className="font-medium"> {leave.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading.........</div>
      )}
    </>
  );
};

export default LeaveDetail;
