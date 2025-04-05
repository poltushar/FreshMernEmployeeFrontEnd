import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";

const List = () => {
  const [employees, setEmployees] = useState([]);

  const [empLoading, setEmpLoading] = useState(false);

  const [filterEmployee, setFilterEmployee] = useState([]);

  // const [filterEmployees, setFilterEmployees] = useState([]);

  const fetchEmployees = async () => {
    setEmpLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/employee", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        let sno = 1;
        // const data = await res.data.employees.map((emp) => ({
        //   _id: emp._id,
        //   sno: sno++,
        //   dep_name: emp.department.dep_name,
        //   name: emp.userId.name,
        //   dob: new Date(emp.dob).toDateString(),
        //   // profileImage: emp.userId.profileImage,
        //   action:
        // }));

        let data = await res.data.employees.map((emp) => ({
          _id: emp._id,
          sno: sno++,
          dep_name: emp.department.dep_name,
          name: emp.userId.name,
          dob: new Date(emp.dob).toLocaleDateString(),
          profileImage: (
            <img
              src={`http://localhost:3000/${emp.userId.profileImage}`}
              width={40}
              className="rounded-full"
            ></img>
          ),
          action: <EmployeeButtons _id={emp._id}></EmployeeButtons>,
        }));

        console.log(res.data);
        setEmployees(data);
        setFilterEmployee(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setEmpLoading(false);
    }
  };

  const handleFilter = (e) => {
    const searchData = employees.filter((curElem) =>
      curElem.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilterEmployee(searchData);
  };

  console.log();
  useEffect(() => {
    fetchEmployees();
  }, []);
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>

      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="search By Dep Name"
          className="px-4 py-0.5 border"
          onChange={handleFilter}
        ></input>
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          {" "}
          Add New Employee
        </Link>
      </div>

      <div>
        <DataTable
          columns={columns}
          data={filterEmployee}
          pagination
        ></DataTable>
      </div>
    </div>
  );
};

export default List;
