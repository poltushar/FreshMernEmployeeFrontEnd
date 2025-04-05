import { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    department: "",
    Salary: "",
  });

  const [departments, setDepartments] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setEmployee((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setEmployee((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getDepartment = async () => {
    const department = await fetchDepartments();

    setDepartments(department);
  };

  const getEmployee = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/employee/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(res);

      if (res.data.success) {
        console.log(res.data);

        const employee = res.data.employee;

        setEmployee((prev) => ({
          ...prev,
          name: employee.userId.name,
          maritalStatus: employee.maritalStatus,
          designation: employee.designation,
          Salary: employee.Salary,
          department: employee.department,
        }));
        // navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error);
        // alert(error.response.data.error);
      }
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:3000/api/employee/${id}`,
        employee,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        console.log(res.data.success);
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error);
        // alert(error.response.data.error);
      }
    }
  };

  console.log(employee);

  useEffect(() => {
    getDepartment();
    getEmployee();
  }, []);
  return (
    <div>
      {departments && employee ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md ">
          <h3 className="text-2xl font-bold mb-6"> Update Employee</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/*Name*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  onChange={handleInput}
                  value={employee.name}
                  name="name"
                  placeholder="Insert Name"
                  className="mt-1 w-full p-2 block border border-gray-300 rounded-md"
                  required
                ></input>
              </div>

              {/*Marital Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Marital Status
                </label>
                <select
                  onChange={handleInput}
                  value={employee.maritalStatus}
                  name="maritalStatus"
                  placeholder="Marital Status"
                  className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                  required
                >
                  <option value=""> Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </div>
              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  // value={department.description}
                  // onChange={(e) => handleInput(e.target)}
                  onChange={handleInput}
                  value={employee.designation}
                  type="text"
                  name="designation"
                  placeholder="Designation"
                  className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                  required
                ></input>
              </div>

              {/*Salary */}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Salary
                </label>
                <input
                  onChange={handleInput}
                  value={employee.Salary}
                  type="number"
                  name="Salary"
                  className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                  required
                ></input>
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                onChange={handleInput}
                value={employee.department}
                name="department"
                className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                required
              >
                <option value=""> Select Department </option>

                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Employee
            </button>
          </form>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
};

export default Edit;
