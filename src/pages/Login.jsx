import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, SetUser] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleInput = (values) => {
    const { name, value } = values;
    SetUser((prev) => ({ ...prev, [name]: value }));
  };

  const getApidData = async () => {
    const { email, password } = user;
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        // alert("Successfully login");

        console.log(res.data);
        login(res.data.user);

        localStorage.setItem("token", res.data.token);

        if (res.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      console.log(error.data);
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    getApidData();
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
      <h2 className="font-pacific text-3xl text-white">
        {" "}
        Employee Management System
      </h2>
      <div className="boarder shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error ? error : ""}</p>}
        <form onSubmit={handleSubmitForm}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter a Email"
              className="w-full px-3 py-2 border"
              name="email"
              value={user.email}
              onChange={(e) => handleInput(e.target)}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 ">
              password
            </label>
            <input
              type="password"
              placeholder="************"
              className="w-full px-3 py-2 border"
              name="password"
              value={user.password}
              onChange={(e) => handleInput(e.target)}
            ></input>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center ">
              <input type="checkbox" className="form-checkbox"></input>
              <span className="ml-2 text-gray-700 ">Remember me</span>
            </label>
            <a href="#" className="text-teal-600">
              Forget password?
            </a>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

//login video length 23:11
