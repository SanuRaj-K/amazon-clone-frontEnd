import React, { useState } from "react";
import Logo from "../../Assets/Images/Logo/amazonRegi.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import Google from "./Google";
function Registration() {
  const history = useNavigate();
  const initialValues = { username: "", password: "", email: "", phone: "" };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const [showOTP, setShowOTP] = useState(false);
  const [otpnum, setOtpnum] = useState("");

  const validate = (values) => {
    const errors = {};

    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!regex.test(values.email)) {
      errors.email = "Email  is required";
    } else if (!values.username) {
      errors.username = "Username is required";
    } else if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must  contain atleast 6 charaacters";
    } else if (!values.phone) {
      errors.phone = "enter your phone number";
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
      const toastId = toast.loading("loading");
      axios
        .post("https://amazon-clone-backend-fz8l.onrender.com/users/register", formValues)
        .then((response) => {
          if (response.data === "success") {
            setShowOTP(true);
            toast.success("OTP send Successfully  !", { id: toastId });
          
          }
        })
        .catch((err) => {
          toast.error(err.response.data, { id: toastId });
        });
    }
  };

  const handleOTP = (e) => {
    const toastId = toast.loading("Verifying OTP");

    e.preventDefault();
    axios
      .post("https://amazon-clone-backend-fz8l.onrender.com/users/verify", { otpnum, formValues })
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          toast.success("successfully verified...Please login to Continue", { id: toastId });
          localStorage.setItem("login", response.data.token);
          history("/auth/login");
        } else {
          toast.error("incorrect OTP", { id: toastId });
        }
      })
      .catch((err) => console.log(err));
  };
  const otp = (e) => {
    setOtpnum(e.target.value);
  };

  return (
    <div>
      {!showOTP ? (
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
                  value={formValues.username}
                />{" "}
                <br />
                <p className="text-sm mt-1 text-[red]">{formErrors.username}</p>
                <br />
                <label htmlFor="mobile" className="font-bold">
                  Mobile Number
                </label>{" "}
                <br />
                <select className="border" name="mobile" id="mobile">
                  <option value="mobile">+91 IN</option>
                  <option value="mobile">+93 AF</option>
                  <option value="mobile">+60 MY</option>
                </select>
                &nbsp;&nbsp;
                <input
                  className="border  rounded-r-md"
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Mobile Number"
                  onChange={handleChange}
                  value={formValues.phone}
                />
                <br />
                <span className="text-sm mt-1 text-[red]">
                  {formErrors.phone}
                </span>
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
                  value={formValues.email}
                />{" "}
                <br />
                <span className="text-sm mt-1 text-[red]">
                  {formErrors.email}
                </span>
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
                  value={formValues.password}
                />{" "}
                <br />
                <p className="text-sm mt-1 text-[red]">{formErrors.password}</p>
                <br /> <br />
                <div className="w-full flex justify-center">
                  <button
                    className="border rounded-md p-[8px]  bg-[#ffd814]"
                    onClick={handleSubmit}
                  >
                    Verify Mobile Number
                  </button>
                </div>{" "}
                <br />
                <span>
                  <div className="flex justify-center mb-3">
                    <Google />
                  </div>
                  Already have an Account? &nbsp;{" "}
                  <Link to={"/auth/login"}>Sign in</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center mt-8  items-center ">
          <section className="  flex justify-center mb-[20px]">
            <img src={Logo} alt="logo" className=" w-[100px] h-[32px]" />
            <div>.in</div>
          </section>
          <div className="grid w-[25vw] justify-center text-center border p-8 rounded-md ">
            <h4>Authentication Required</h4>
            <p className="text-[14px]">
              We've sent a OTP to the mobile number. Please enter it to complete
              Verification
            </p>
            <label htmlFor="otp">Enter OTP:</label> <br />
            <input
              type="text"
              name="otp"
              onChange={otp}
              id="otp"
              className="border"
            />{" "}
            <br />
            <button
              onClick={handleOTP}
              className=" bg-[orange] ml-2 text-center rounded-xl px-[10px] py-2"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Registration;
