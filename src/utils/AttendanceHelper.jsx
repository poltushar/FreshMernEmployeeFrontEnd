import axios from "axios";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },

  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "230px",
  },

  {
    name: "Emp Id",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "230px",
  },

  {
    name: "Department",
    selector: (row) => row.department,
    width: "120px",
  },

  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];
// eslint-disable-next-line react/prop-types
const AttendanceHelper = ({ status, employeeId, statusChange }) => {
  const markEmployee = async (status, employeeId) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/attendance/update/${employeeId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        statusChange();
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <div>
      {status === null ? (
        <div>
          <button
            className="px-4 m-3 py-2 bg-green-500 text-white"
            onClick={() => markEmployee("present", employeeId)}
          >
            Present
          </button>
          <button
            className="px-4   m-3 py-2 bg-violet-500 text-white"
            onClick={() => markEmployee("absent", employeeId)}
          >
            Absent
          </button>
          <button
            className="px-4 py-2  m-3 bg-gray-500 text-white"
            onClick={() => markEmployee("sick", employeeId)}
          >
            Sick
          </button>
          <button
            className="px-4 py-2  m-3 bg-red-500 text-white"
            onClick={() => markEmployee("leave", employeeId)}
          >
            Leave
          </button>
        </div>
      ) : (
        <p>{status}</p>
      )}
    </div>
  );
};

export default AttendanceHelper;

//video length 1:07:00
