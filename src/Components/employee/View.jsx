import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setEmployee(res.data.employee);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  console.log(employee);

  return (
    <>
      {employee ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Manage Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`http://localhost:3000/${employee.userId.profileImage}`}
                className="rounded-full border w-72"
              ></img>
            </div>

            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{employee.userId.name}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                {" "}
                <p className="text-lg font-bold">Employee Id:</p>
                <p className="font-medium">{employee.employeeId}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                {" "}
                <p className="text-lg font-bold">Date of Birth:</p>
                <p className="font-medium">
                  {new Date(employee.dob).toLocaleDateString()}
                </p>
              </div>

              <div className="flex space-x-3 mb-5">
                {" "}
                <p className="text-lg font-bold">Gender:</p>
                <p className="font-medium">{employee.gender}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                {" "}
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">{employee.department.dep_name}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                {" "}
                <p className="text-lg font-bold">Marital Status:</p>
                <p className="font-medium">{employee.maritalStatus}</p>
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

export default View;
