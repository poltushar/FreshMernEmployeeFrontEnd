import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

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
    name: "Image",
    selector: (row) => row.profileImage,
    width: "120px",
  },

  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px",
  },

  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "150px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const res = await axios.get("http://localhost:3000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.data.success) {
      departments = res.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

//employees for salary form

export const getEmployees = async (id) => {
  let employees;
  try {
    const res = await axios.get(
      `http://localhost:3000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(res.data);

    if (res.data.success) {
      employees = res.data.employee;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-10">
      <button
        className="px-5 py-1 bg-teal-600 text-white rounded-xl cursor-pointer"
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
      >
        View
      </button>
      <button
        className="px-5 py-1 bg-green-600 text-white rounded-xl  cursor-pointer"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
      >
        Edit
      </button>

      <button
        className="px-5 py-1 bg-violet-600 text-white rounded-xl  cursor-pointer "
        onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
      >
        Salary
      </button>

      <button
        className="px-5 py-1 bg-red-600 text-white rounded-xl  cursor-pointer "
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${_id}`)}
      >
        Leave
      </button>
    </div>
  );
};
