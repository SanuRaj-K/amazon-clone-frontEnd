import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assets/Images/Logo/amazonRegi.svg";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const history = useNavigate();
  const initialValues = { email: "", password: "" };

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3005/users/login", formValues, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === "success") {
          const user = response.data.user;
          const loginUser = JSON.stringify(user);
          localStorage.setItem("loginuser", loginUser);

          toast.success("login successful");
          const token = response.data.token;
          localStorage.setItem("loginToken", token);
          history("/");
        } else {
          toast.error(response.data);
        }
      })
      .catch((err) => {
        toast.error(err.data);
      });
  };
  return (
    <div className="w-[100%]  items-center   flex justify-center mt-[5%] ">
      <div id="registration" className="   ">
        <section className="  flex justify-center mb-[20px]">
          <img src={Logo} alt="logo" className=" w-[100px] h-[32px]" />
          <div>.in</div>
        </section>
        <div>
          <form
            action=""
            className="border p-10 font-arial  w-[100%] rounded-md "
          >
            <h2 className="">Sign in</h2>
            <label htmlFor="name" className="font-bold">
              Email
            </label>{" "}
            <br />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="First and last name"
              className="border  rounded-r-md w-[100%] p-[2px]"
              onChange={handleChange}
            />{" "}
            <br /> <br />
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <br />
            <input
              className="border  rounded-r-md w-[100%] p-[2px]"
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
            />
            <br /> <br />
            <span className="text-[12px] pb-[10px]">
              By continuing, you agree to Amazon's{" "}
              <Link>
                Conditions of <br /> Use{" "}
              </Link>{" "}
              and <Link>Privacy Notice. </Link>{" "}
            </span>
            <div className="w-full flex justify-center">
              <button
                className="border rounded-md p-[8px]  w-[100%] bg-[#ffd814]"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>{" "}
            <br />
            <hr />
            <span className="flex justify-center text-[12px] mb-[10px]">
              New to Amazon? &nbsp;{" "}
            </span>
            <button className="  border w-[100%]  py-2 px-4 rounded-[8px]">
              <Link className="no-underline text-[#000]" to={"/auth"}>
                Create your Amazon account
              </Link>{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
