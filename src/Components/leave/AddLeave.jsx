import { useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLeave = () => {
  const { user } = useAuth();
  const [leave, setLeave] = useState({
    userId: user._id,
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const navigate = useNavigate();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    console.log(leave);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/leave/add",
        leave,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        console.log(res.data.success);
        navigate(`/employee-dashboard/leaves/${user._id}`);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error);
        // alert(error.response.data.error);
      }
    }
  };
  return (
    <div>
      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md ">
        <h3 className="text-2xl font-bold mb-6">Request for Leave</h3>
        <form onSubmit={handleSubmitForm}>
          <div className="flex flex-col space-y-4">
            {/*Name*/}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Leave Type
              </label>
              <select
                onChange={handleInput}
                name="leaveType"
                className="mt-1 w-full p-2 block border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Leave Type</option>

                <option value="Sick Leave">Sick Leave</option>

                <option value="Casual Leave">Casual Leave</option>

                <option value="Annual Leave">Annual Leave</option>
              </select>
            </div>

            {/*from Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  From Date
                </label>
                <input
                  onChange={handleInput}
                  type="date"
                  name="startDate"
                  placeholder="Insert Email"
                  className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                  required
                ></input>
              </div>

              {/*to date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  To Date
                </label>
                <input
                  // value={department.description}
                  // onChange={(e) => handleInput(e.target)}

                  onChange={handleInput}
                  type="date"
                  name="endDate"
                  className="mt-1 p-2 block w-full boarder boarder-gray-300 rounded-md"
                  required
                ></input>
              </div>
            </div>

            {/*description*/}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                // value={department.description}
                // onChange={(e) => handleInput(e.target)}

                onChange={handleInput}
                type="date"
                name="reason"
                placeholder="Reason"
                className="w-full boarder boarder-gray-300 "
                required
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Leave
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLeave;
