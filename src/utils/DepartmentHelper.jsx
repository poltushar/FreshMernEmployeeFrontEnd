/* eslint-disable react/prop-types */
import axios from "axios";
import { useNavigate } from "react-router-dom";

//this is a part 3
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },

  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },

  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do You Want to delete");

    if (confirm) {
      try {
        const res = await axios.delete(
          `http://localhost:3000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.data.success) {
          onDepartmentDelete();
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        className="px-5 py-1 bg-teal-600 text-white rounded-xl "
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-5 py-1 bg-red-600 text-white rounded-xl"
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>
    </div>
  );
};
