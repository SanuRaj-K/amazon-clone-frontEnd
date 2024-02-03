import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userIcon from "../../../Assets/Images/Icons/icons8-user-32.png";
import toast from "react-hot-toast";

function OrderUser() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [address, setAddress] = useState({});
  const [status, setStatus] = useState("");
  useEffect(() => {
    const toastId = toast.loading("loading...");
    axios
      .get(`https://amazon-clone-backend-fz8l.onrender.com/admin/getuserorders/${id}`)
      .then((res) => {
        setUserData(res.data);
        setStatus(res.data.status);
        setAddress(res.data.userId.address);
        toast.remove(toastId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const products = userData.items;
  const date = new Date(userData.orderDate && userData.orderDate);

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const updateStatus = () => {
    const toastId = toast.loading("loading...");
    axios
      .put(`https://amazon-clone-backend-fz8l.onrender.com/admin/updatestatus/${id}/${status}`)
      .then((res) => {
        console.log(res);
        toast.success("updated...", { id: toastId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-3">
      <div className="flex justify-between ">
        <div className="    p-[10px]      ">
          <span className=" font-semibold text-[24px]">Order Details</span>
          <div className="flex flex-col">
            <span className="flex items-center font-semibold">
              Order Date: &nbsp;
              <span className="block">{date.toLocaleString()}</span>
            </span>
            <span className="flex items-center  font-semibold">
              Order ID: &nbsp;
              <span className="block">{userData._id && userData._id}</span>
            </span>
          </div>

          {products &&
            products.map((item) => {
              return (
                <div
                  className=" w-[450px] border rounded-lg mt-2 px-[12px] flex"
                  key={item._id}
                >
                  <img
                    src={item.Image}
                    alt=""
                    className=" h-[120px] w-[120px] p-3"
                  />
                  <div className=" mt-3">
                    <span>{item.Title}</span> <br />
                    <span>QTY: {item.quantity}</span>
                  </div>
                </div>
              );
            })}
          <div className="   bg-[#efe1e1] rounded-b-[8px]">
            <div className=" p-3 flex justify-between  w-full">
              <div className=" flex justify-between w-full">
                <div>
                  <label htmlFor="status" className=" font-semibold ">
                    Status:&nbsp;
                  </label>
                  <select
                    name="status"
                    id="status"
                    className="bg-[#efe1e1] cursor-pointer "
                    value={status}
                    onChange={(e) => handleStatus(e)}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped"> Shipped</option>
                    <option value="deliverd">Deliverd</option>
                  </select>{" "}
                  <br />
                  <button
                    onClick={updateStatus}
                    className=" px-[18px] text-[12px] py-[4px]  mt-2 font-semibold hover:bg-white  rounded-lg bg-[#3ab7ca]"
                  >
                    {" "}
                    Update status
                  </button>
                </div>

                <div>
                  <span className=" font-semibold">
                    {" "}
                    Total Price : &nbsp;
                    <span className=" ">
                      {" "}
                      {userData.totalPrice &&
                        userData.totalPrice.toLocaleString()}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full text-center  ">
          <div className="bg-gray-200 p-4 w-[400px] mt-3 mx-auto rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">User Information</h2>
            {userData.userId && (
              <div className=" ">
                <div className="mb-4">
                  <img src={userIcon} alt="" className=" w-[30px] mx-auto" />
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username:
                  </label>
                  <span className="text-gray-800">
                    {userData.userId.username}
                  </span>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                  </label>
                  <span className="text-gray-800">{userData.userId.email}</span>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone:
                  </label>
                  <span className="text-gray-800">{userData.userId.phone}</span>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Shipping Address:
                  </label>
                  {address && (
                    <>
                      <span className="text-gray-800">
                        Place:{" "}
                        <span className=" capitalize">{address.place}</span>
                      </span>{" "}
                      <br />
                      <span className="text-gray-800">
                        {" "}
                        HouseName:{" "}
                        <span className=" capitalize">{address.housename}</span>
                      </span>{" "}
                      <br />
                      <span className="text-gray-800">
                        Pin: <span className=" capitalize">{address.pin}</span>
                      </span>{" "}
                      <br />
                      <span className="text-gray-800">
                        {" "}
                        Post:{" "}
                        <span className=" capitalize">{address.post}</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderUser;
