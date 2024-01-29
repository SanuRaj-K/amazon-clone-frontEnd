import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userImg from "../../../Assets/Images/Icons/icons8-user-32.png";
import toast from "react-hot-toast";

function UserSpec() {
  const { id } = useParams();
  const history = useNavigate();
  const [formData, setFormData] = useState("");
  const address = formData.address;

  useEffect(() => {
    axios
      .get(`https://amazon-clone-backend-fz8l.onrender.com/admin/getuser/${id}`)
      .then((res) => {
        const data = res.data;
        setFormData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const removeAccount = (e) => {
    e.preventDefault();
    axios
      .delete(`https://amazon-clone-backend-fz8l.onrender.com/admin/deleteuser/${id}`)
      .then((res) => {
        console.log(res);
        toast.success("User removed");
        history("/admin/users");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="flex justify-center mt-[30px]">
        <form className="w-[500px] mx-auto p-4 border rounded">
          <h3 className="text-2xl text-center font-bold mb-4">User Details</h3>
          <img src={userImg} alt="user" className="mx-auto mb-[8px]" />

          <div className="mb-4">
            <label className=" font-semibold block text-[18px] mb-1">
              Username:
            </label>
            <input
              type="text"
              name="username"
              className="w-full border px-3 py-2"
              readOnly
              defaultValue={formData.username}
            />
          </div>

          <div className="mb-4">
            <label className=" font-semibold block text-[18px] mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              className="w-full border px-3 py-2"
              readOnly
              defaultValue={formData.email}
            />
          </div>

          <div className="mb-4">
            <label className=" font-semibold block text-[18px] mb-1">
              Phone Number:
            </label>
            <input
              type="tel"
              name="phoneNumber"
              className="w-full border px-3 py-2"
              readOnly
              defaultValue={formData.phone}
            />
          </div>

          {address ? (
            <>
              <div className="mb-4">
                <label className=" font-semibold block text-[18px] mb-1">
                  Post:
                </label>
                <input
                  type="tel"
                  name="post"
                  className="w-full border px-3 py-2"
                  readOnly
                  defaultValue={address.post || ""}
                />
              </div>

              <div className="mb-4">
                <label className=" font-semibold block text-[18px] mb-1">
                  Place:
                </label>
                <input
                  type="tel"
                  name="place"
                  className="w-full border px-3 py-2"
                  readOnly
                  defaultValue={address.place || ""}
                />
              </div>

              <div className="mb-4">
                <label className=" font-semibold block text-[18px] mb-1">
                  Pin:
                </label>
                <input
                  type="tel"
                  name="pin"
                  className="w-full border px-3 py-2"
                  readOnly
                  defaultValue={address.pin || ""}
                />
              </div>
            </>
          ) : null}

          <button
            className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={removeAccount}
          >
            Remove User
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserSpec;
