import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import { useEffect, useState } from "react";
import axios from "axios";

const DepartMentList = () => {
  //this is a part 3
  //fetch the data in database

  const [departments, setDepartments] = useState([]);

  const [depLoading, setDepLoading] = useState(false);

  const [filterDepartment, setFilteredDepartment] = useState([]);

  // when i used delete click to call fetch function dont need to pass id and also implement filter function
  const onDepartmentDelete = () => {
    fetchDepartments();
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        let sno = 1;
        const data = await res.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons
              _id={dep._id}
              onDepartmentDelete={onDepartmentDelete}
            ></DepartmentButtons>
          ),
        }));

        setDepartments(data);
        setFilteredDepartment(data);
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

  const filterDepartments = (e) => {
    const records = departments.filter((dep) => {
      return dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setFilteredDepartment(records);
  };

  return (
    <>
      {depLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>

          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="search By Dep Name"
              className="px-4 py-0.5 border"
              onChange={filterDepartments}
            ></input>
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              {" "}
              Add New Department
            </Link>
          </div>
          <div className="mt-5">
            <DataTable
              columns={columns}
              data={filterDepartment}
              pagination
            ></DataTable>
          </div>
        </div>
      )}
    </>
  );
};

export default DepartMentList;
