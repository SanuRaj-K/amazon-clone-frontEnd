import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminLoginForm = () => {
  const history = useNavigate();
  const initialValues = { username: "", password: "" };

  const [formvalues, setFormvalues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("https://amazon-clone-backend-fz8l.onrender.com/admin/login", formvalues, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data === "ok") {
          toast.success("Login Successfull");
          history("/admin");
        } else {
          toast.error("incorrect username or password");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form
        onSubmit={handleLogin}
        className="w-[20vw] mx-auto mt-[150px] border p-[30px] rounded-md"
      >
        <h1 className="text-center">Admin Login</h1>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;
