import axios from "axios";
import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, Outlet, useParams } from "react-router-dom";
import { myContext } from "../../App";

function Orders() {
  const { id } = useParams();

  const { setOrderItems } = useContext(myContext);

  useEffect(() => {
    const toastId = toast.loading("loading...");
    axios
      .get(
        `https://amazon-clone-backend-fz8l.onrender.com/users/getorders/${id}`
      )
      .then((res) => {
        setOrderItems(res.data);
        toast.remove(toastId);
      })
      .catch((err) => {
        console.log(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <div className="px-[50px] mt-3">
        <div className="flex justify-between">
          <div>
            <span className=" font-semibold text-[24px]"> Your Orders</span>
          </div>
          <div>
            <input
              type="search"
              name="order"
              id="order"
              placeholder="Search all Orders"
              className="border-[2px] border-gray-300 mr-[10px] rounded-sm w-[240px] px-[8px] py-[4px]"
            />
            <button className=" font-semibold rounded-[50px] bg-black text-white px-[16px] py-1">
              Search Orders
            </button>
          </div>
        </div>
        <div className=" font-semibold text-sky-500  mt-3 ml-2">
          <span className=" cursor-pointer ml-5">
            {" "}
            <Link to={`/orders/${id}`} className=" no-underline text-sky-500">
              Orders
            </Link>
          </span>
          <span className=" cursor-pointer ml-5">
            {" "}
            <Link to={"/products"} className=" no-underline text-sky-500">
              Buy Again
            </Link>{" "}
          </span>
          <span className=" cursor-pointer ml-5">
            {" "}
            <Link
              to={`/orders/${id}/Pending`}
              className=" no-underline text-sky-500"
            >
              Not Yet Shipped{" "}
            </Link>
          </span>
          <span className=" cursor-pointer ml-5">Delivered Orders</span>
        </div>
        <hr />

        <Outlet />
      </div>
    </div>
  );
}

export default Orders;
