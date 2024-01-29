import React, { useContext, useEffect, useState } from "react";
import Logo from "../../Assets/Images/Logo/amazonRegi.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { myContext } from "../../App";

function Address() {
  const { setAddress } = useContext(myContext);
  const [, setLoginUser] = useState({});
  const history = useNavigate();
  const user = localStorage.getItem("loginuser");
  const localUser = JSON.parse(user);
  const userId = localUser._id;

  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState({
    username: "",
    place: "",
    housename: "",
    phone: "",
    post: "",
    pin: "",
  });

  useEffect(() => {
    axios
      .get(
        `https://amazon-clone-backend-fz8l.onrender.com/users/getuser/${userId}`
      )
      .then((res) => {
        const data = res.data;
        setLoginUser(data);
        setFormValues({
          username: data.username || "",
          place: data.address.place || "",
          housename: data.address.housename || "",
          phone: data.phone || "",
          post: data.address.post || "",
          pin: data.address.pin || "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const validate = (values) => {
    const errors = {};

    if (!values.username.trim()) {
      errors.username = "Username is required";
    }
    if (!values.place.trim()) {
      errors.place = "Place is required";
    }
    if (!values.phone.trim()) {
      errors.phone = "Enter your phone number";
    }
    if (!values.pin.trim()) {
      errors.pin = "Pin is required";
    }
    if (!values.pin.trim()) {
      errors.pin = "pin is required";
    }
    if (!values.post.trim()) {
      errors.post = "post is required";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleUpdate = (e) => {
    const toastId = toast.loading("loading...");
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(validate(formValues));
    if (Object.keys(errors).length === 0) {
      axios
        .post(
          "https://amazon-clone-backend-fz8l.onrender.com/users/updateuser",
          { formValues, userId }
        )
        .then((res) => {
          if (res.status === 200) {
            setAddress(res.data);
            console.log(res.data);
            toast.success("updated", { id: toastId });
            history("/account");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  console.log(localUser);

  return (
    <div>
      <h1 className="text-center">Edit your address</h1>
      <div className="h-[110vh] flex justify-center mt-[20px]">
        <div>
          <form
            action=""
            className="border flex flex-col items-center w-[30vw]"
          >
            <section className="flex justify-center items-center my-8">
              <img src={Logo} alt="logo" className="w-21 h-16" />
              <div className="ml-2">.in</div>
            </section>
            <div className="p-8 w-full max-w-md">
              <div className="mb-4">
                <label htmlFor="username" className="mr-2">
                  Username:
                </label>
                <input
                  className="border px-2 py-1 w-full"
                  type="text"
                  name="username"
                  value={formValues.username || localUser.username}
                  onChange={handleChange}
                  id="username"
                />
                <p className="text-sm mt-2 text-red-500">
                  {formErrors.username}
                </p>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="mr-2">
                  Phone:
                </label>
                <input
                  className="border px-2 py-1 w-full"
                  type="number"
                  name="phone"
                  value={formValues.phone || localUser.phone}
                  onChange={handleChange}
                  id="phone"
                />
                <p className="text-sm mt-2 text-red-500">{formErrors.phone}</p>
              </div>
              <div className="mb-4">
                <label htmlFor="place" className="mr-2">
                  Place:
                </label>
                <input
                  className="border px-2 py-1 w-full"
                  type="text"
                  value={formValues.place}
                  onChange={handleChange}
                  name="place"
                  id="place"
                />
                <p className="text-sm mt-2 text-red-500">{formErrors.place}</p>
              </div>
              <div className="mb-4">
                <label htmlFor="housename" className="mr-2">
                  Housename:
                </label>
                <input
                  className="border px-2 py-1 w-full"
                  type="text"
                  name="housename"
                  value={formValues.housename}
                  onChange={handleChange}
                  id="housename"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="post" className="mr-2">
                  Post:
                </label>
                <input
                  className="border px-2 py-1 w-full"
                  type="text"
                  name="post"
                  value={formValues.post}
                  onChange={handleChange}
                  id="post"
                />
                <p className="text-sm mt-2 text-red-500">{formErrors.post}</p>
              </div>
              <div className="mb-4">
                <label htmlFor="pin" className="mr-2">
                  Pin:
                </label>
                <input
                  className="border px-2 py-1 w-full"
                  type="number"
                  name="pin"
                  value={formValues.pin}
                  onChange={handleChange}
                  id="pin"
                />
                <p className="text-sm mt-2 text-red-500">{formErrors.pin}</p>
              </div>
            </div>
            <button
              onClick={handleUpdate}
              className="bg-yellow-300 px-4 py-2 rounded-md mb-4"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Address;
