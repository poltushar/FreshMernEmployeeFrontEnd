import axios from "axios";
import { useEffect, useState } from "react";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState();

  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });

      console.log(query.toString());

      if (dateFilter) {
        query.append("date", dateFilter);
      }

      const res = await axios.get(
        `http://localhost:3000/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        if (skip == 0) {
          setReport(res.data.groupData);
        } else {
          setReport((prevData) => ({ ...prevData, ...res.data.groupData }));
        }
      }

      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter]);

  const handlemore = () => {
    setSkip((prev) => prev + limit);
  };

  console.log(report);

  // const d = Object.entries(report).map(([date, record]) => {
  //   return date, record;
  // });

  // console.log(d);

  return (
    <div className="min-h-screen p-10  bg-white">
      <h2 className="text-center text-2xl font-bold">Attendance Report</h2>

      <div>
        <h2 className="text-xl font-semibold ">Filter by Date:</h2>

        <input
          type="date"
          className="border bg-gray-100 cursor-text"
          onChange={(e) => {
            setDateFilter(e.target.value);
            setSkip();
          }}
        ></input>
      </div>

      {loading ? (
        <div>loading...</div>
      ) : (
        Object.entries(report).map(([date, record]) => (
          <div key={record} className="mt-5 border-b">
            <h2 className="text-xl font-semibold m-2">{date}</h2>

            <table className="" border="1" cellPadding="10">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">S No</th>
                  <th className="py-2 px-4 border">Employee ID</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Department</th>
                  <th className="py-2 px-4 border">Status</th>
                </tr>
              </thead>

              <tbody>
                {record.map((data, i) => (
                  <tr key={data.employeeId}>
                    <td className="py-2 px-4 border">{i + 1}</td>
                    <td className="py-2 px-4 border">{data.employeeId}</td>
                    <td className="py-2 px-4 border">{data.employeeName}</td>
                    <td className="py-2 px-4 border">{data.departmentName}</td>
                    <td className="py-2 px-4 border">{data.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}

      <button
        className="px-4 py-2 m-4 border bg-gray-100 text-lg font-semibold cursor-pointer"
        onClick={handlemore}
      >
        Load More...
      </button>
    </div>
  );
};

export default AttendanceReport;
