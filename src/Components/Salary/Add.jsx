import { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    department: null,
    payDate: "",
    deductions: "",
  });

  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);

  console.log(employees);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setSalary((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);

    setEmployees(emps);
  };

  const getDepartment = async () => {
    const department = await fetchDepartments();

    setDepartments(department);
  };

  const POStEmployee = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/salary/add`,
        salary,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(res);

      if (res.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error);
        alert(error.response.data.error);
      }
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    POStEmployee();
  };

  useEffect(() => {
    getDepartment();
  }, []);
  return (
    <div>
      {departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md ">
          <h3 className="text-2xl font-bold mb-6"> Add Salary </h3>
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/*Department */}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  onChange={handleDepartment}
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
              {/*employee*/}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee
                </label>
                <select
                  onChange={handleInput}
                  name="employeeId"
                  className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                  required
                >
                  <option value=""> Select Employee </option>

                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              {/* Basic Salary
               */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Basic Salary
                </label>
                <input
                  // value={department.description}
                  // onChange={(e) => handleInput(e.target)}
                  onChange={handleInput}
                  type="number"
                  name="basicSalary"
                  placeholder="basic salary"
                  className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                  required
                ></input>
              </div>

              {/*Allowances */}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allowances
                </label>
                <input
                  onChange={handleInput}
                  // value={salary.Salary}
                  type="number"
                  name="allowances"
                  placeholder="allowances"
                  className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                  required
                ></input>
              </div>
              {/* Deductions */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deductions
                </label>
                <input
                  onChange={handleInput}
                  // value={salary.Salary}
                  type="number"
                  name="deductions"
                  placeholder="deductions"
                  className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                  required
                ></input>
              </div>
              {/* Pay Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pay Date
                </label>
                <input
                  onChange={handleInput}
                  // value={salary.Salary}
                  type="date"
                  name="payDate"
                  className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                  required
                ></input>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Salary
            </button>
          </form>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
};

export default Add;
