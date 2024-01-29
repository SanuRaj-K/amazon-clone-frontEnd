import React, {   useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
 
function Form() {
  const history = useNavigate();
  const data = localStorage.getItem("login");
  const res = jwtDecode(data);
   const initialValues = {
    username: res.name,
    password: "",
    email: res.email,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState("");
  const [m, setM] = useState("");
  const validate = () => {
    const errors = {};
    if (formValues.password.length < 6) {
      errors.password = "password must be 6 characters";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(validate(formValues));

    if (Object.keys(errors).length === 0) {
      //    const toastId = toast.loading("loading");
      axios
        .post("http://localhost:3005/users/emailregister", formValues, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          if (response.data.status === "success") {
            toast.success("Account created! login to continue");
             
            history("/auth/login");
          }
        })
        .catch((err) => {
          toast.error(err.response.data);
          const mssg = "Login";
          setM(mssg);
        });
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <form
        action=""
        className="border  p-10 font-arial  w-[30%] rounded-md text-center "
      >
        <h2 className="">Create Account</h2>
        <label htmlFor="name" className="font-bold">
          Your Name
        </label>{" "}
        <br />
        <input
          type="text"
          name="username"
          id="name"
          placeholder="First and last name"
          className="border  rounded-r-md"
          onChange={handleChange}
          defaultValue={res.name}
        />{" "}
        <br />
        <br />
        <label htmlFor="mail" className="font-bold">
          Email
        </label>{" "}
        <br />
        <input
          className="border  rounded-r-md"
          type="text"
          name="email"
          id="mail"
          placeholder="example@gmail.com"
          onChange={handleChange}
          value={res.email}
        />{" "}
        <br />
        <br />
        <label htmlFor="password" className="font-bold">
          Password
        </label>
        <br />
        <input
          className="border  rounded-r-md"
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />{" "}
        <p className="text-[red]">{formErrors.password}</p>
        <br />
        <br /> <br />
        <div className="w-full flex justify-center">
          <button
            className="border rounded-md p-[8px]  bg-[#ffd814]"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </div>{" "}
        <br />
        {m ? (
          <button className="border px-9 py-2 rounded-sm bg-[#ffd814]">
            <Link to={"/auth/login"} className="text-[#000] no-underline">
              {m}
            </Link>{" "}
          </button>
        ) : null}
        <br />
      </form>
    </div>
  );
}

export default Form;
