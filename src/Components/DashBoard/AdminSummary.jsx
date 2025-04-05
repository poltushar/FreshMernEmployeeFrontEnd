import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import { SummaryCard } from "./SummaryCard";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  const fetchSummary = async () => {
    try {
      const summary = await axios.get(
        `http://localhost:3000/api/dashboard/summary`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSummary(summary.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      }

      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  console.log(summary);

  if (!summary) {
    return <div> Loading...</div>;
  }

  return (
    <div className="p-6 ">
      <h3 className="text-2xl font-bold">DashBoard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers></FaUsers>}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-teal-600"
        ></SummaryCard>

        <SummaryCard
          icon={<FaBuilding></FaBuilding>}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-yellow-600"
        ></SummaryCard>

        <SummaryCard
          icon={<FaMoneyBillWave></FaMoneyBillWave>}
          text="Monthly Salary"
          number={summary.totalSalary}
          color="bg-red-600"
        ></SummaryCard>
      </div>
      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>
        <div className="grid grid-cols md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt></FaFileAlt>}
            text="Leave Applied"
            number={summary.leaveSummary.apppliedFor}
            color="bg-teal-600"
          ></SummaryCard>

          <SummaryCard
            icon={<FaCheckCircle></FaCheckCircle>}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            color="bg-green-600"
          ></SummaryCard>

          <SummaryCard
            icon={<FaHourglassHalf></FaHourglassHalf>}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            color="bg-yellow-600"
          ></SummaryCard>

          <SummaryCard
            icon={<FaTimesCircle></FaTimesCircle>}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            color="bg-red-600"
          ></SummaryCard>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
