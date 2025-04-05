import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const [changePassword, setChangePassword] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleInput = (values) => {
    const { name, value } = values;

    setChangePassword((prev) => ({ ...prev, [name]: value }));
  };

  console.log(changePassword);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (changePassword.newPassword !== changePassword.confirmPassword) {
      setError("Password not matched");
    } else {
      try {
        const res = await axios.put(
          `http://localhost:3000/api/dashboard/change-password`,
          changePassword,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.data.success) {
          navigate("/admin-dashboard/employees");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
        <h3 className="text-2xl font-bold mb-6"> Change Password</h3>
        <p className="text-red-500">{error}</p>
        <form onSubmit={handleSubmitForm}>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              onChange={(e) => handleInput(e.target)}
              name="oldPassword"
              placeholder="Change Password"
              className="mt-1 w-full p-2 border-gray-300 rounded-md"
              required
            ></input>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              onChange={(e) => handleInput(e.target)}
              name="newPassword"
              placeholder="New Password"
              className="mt-1 w-full p-2 border-gray-300 rounded-md"
              required
            ></input>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              onChange={(e) => handleInput(e.target)}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="mt-1 w-full p-2 border-gray-300 rounded-md"
              required
            ></input>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
