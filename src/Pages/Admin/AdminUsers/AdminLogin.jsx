import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminLoginForm = () => {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (username === "admin" && password === "sanuadmin") {
      toast.success("Login successful!");
      history("/admin");
    } else {
      toast.error("Invalid username or password. Please try again.");
    }
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
            className="mt-1 p-2 w-full border rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            className="mt-1 p-2 w-full border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
