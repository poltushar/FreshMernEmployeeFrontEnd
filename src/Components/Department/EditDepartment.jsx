import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditDepartment = () => {
  const { id } = useParams();

  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleInput = (values) => {
    const { name, value } = values;
    setDepartment((prev) => ({ ...prev, [name]: value }));
  };
  const [depLoading, setDepLoading] = useState(false);

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/department/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        setDepartment(res.data.department);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  //
  const addApiData = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    addApiData();
  };

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
          <h3 className="text-2xl font-bold mb-6"> Edit Department</h3>
          <form onSubmit={handleSubmitForm}>
            <div>
              <label
                htmlFor="dep_name"
                className="text-sm font-medium text-gray-700"
              >
                Department Name
              </label>
              <input
                type="text"
                value={department.dep_name}
                onChange={(e) => handleInput(e.target)}
                name="dep_name"
                placeholder="Enter Dep name"
                className="mt-1 w-full p-2 border-gray-300 rounded-md"
                required
              ></input>
            </div>

            <div className="mt-3">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 "
              >
                Description
              </label>
              <textarea
                value={department.description}
                onChange={(e) => handleInput(e.target)}
                name="description"
                placeholder="Description"
                className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Department
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
