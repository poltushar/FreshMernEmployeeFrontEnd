import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },

  {
    name: "EmpID",
    selector: (row) => row.employeeId,
    width: "100px",
  },

  {
    name: "Name",
    selector: (row) => row.name,
    width: "200px",
  },

  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "120px",
  },

  {
    name: "Department",
    selector: (row) => row.department,
    width: "150px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "130px",
  },

  {
    name: "Status",
    selector: (row) => row.status,
    width: "200px",
  },

  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
    width: "200px",
  },
];

export const LeaveButtons = ({ _id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };

  return (
    <button
      className="px-5 py-1 bg-teal-600 text-white rounded-xl cursor-pointer"
      onClick={() => handleView(_id)}
    >
      View
    </button>
  );
};
