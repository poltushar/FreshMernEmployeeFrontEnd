import { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const handleInput = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getDepartment = async () => {
    const department = await fetchDepartments();

    setDepartments(department);
  };

  // const addApiData = async () => {};

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const res = await axios.post(
        "http://localhost:3000/api/employee/add",
        formDataObj,
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

  console.log(formData);

  useEffect(() => {
    getDepartment();
  }, []);
  return (
    <div>
      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md ">
        <h3 className="text-2xl font-bold mb-6"> Add New Employee</h3>
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
                name="name"
                placeholder="Insert Name"
                className="mt-1 w-full p-2 block border border-gray-300 rounded-md"
                required
              ></input>
            </div>
            {/*Email */}
            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                onChange={handleInput}
                type="email"
                name="email"
                placeholder="Insert Email"
                className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                required
              ></input>
            </div>
            {/*Employee Id */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee
              </label>
              <input
                // value={department.description}
                // onChange={(e) => handleInput(e.target)}

                onChange={handleInput}
                type="text"
                name="employeeId"
                placeholder="Employee ID"
                className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                required
              ></input>
            </div>
            {/*Date of Birth*/}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                // value={department.description}
                // onChange={(e) => handleInput(e.target)}

                onChange={handleInput}
                type="date"
                name="dob"
                placeholder="DOB"
                className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                required
              ></input>
            </div>
            {/*Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                onChange={handleInput}
                name="gender"
                className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                required
              >
                <option value=""> Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">other</option>
              </select>
            </div>
            {/*Marital Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Marital Status
              </label>
              <select
                onChange={handleInput}
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
                type="text"
                name="designation"
                placeholder="Designation"
                className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                required
              ></input>
            </div>
            {/*Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                onChange={handleInput}
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
            {/*Salary */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salary
              </label>
              <input
                onChange={handleInput}
                type="number"
                name="Salary"
                className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                required
              ></input>
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                // value={department.description}
                // onChange={(e) => handleInput(e.target)}

                onChange={handleInput}
                type="password"
                name="password"
                placeholder="*******"
                className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                required
              ></input>
            </div>

            {/*Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                onChange={handleInput}
                name="role"
                className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                required
              >
                <option value="">Select Role</option>

                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            {/*Image Upload */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleInput}
                placeholder="Upload Image"
                accept="image/*"
                className="mt-1 p-2 block w-full  border border-gray-300 rounded-md"
              ></input>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
