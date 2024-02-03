import axios from "axios";
import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, Outlet, useParams } from "react-router-dom";
import { myContext } from "../../App";

function Orders() {
  const { id } = useParams();

  const { orderItems, setOrderItems } = useContext(myContext);

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
  }, [id, setOrderItems]);

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
          <span className=" cursor-pointer ml-5">Cancelled Orders</span>
        </div>
        <hr />

        {/* {orderItems.length > 0 ? (
          orderItems.map((prod) => {
            const dateString = prod.orderDate;
            const dateObject = new Date(dateString);
            const formattedDate = dateObject.toLocaleDateString();

            return (
              <div className="border rounded-lg mb-4 " key={prod._id}>
                <div className=" bg-gray-300  flex rounded-t-lg justify-between p-3">
                  <div className="flex justify-between w-[250px] px-3 text-gray-500 font-semibold">
                    <div className=" ">
                      <span>order placed</span> <br />
                      <span>{formattedDate}</span>
                    </div>
                    <span>
                      <span>total</span> <br />
                      <span>₹{prod.totalPrice.toLocaleString()}</span>
                    </span>
                  </div>
                  <div className=" w-[250px] text-gray-500 font-semibold">
                    <div className="text-[#4d5fe8] px-3">
                      <span className=" ml-10 ">
                        <Link to={`/orderspec/${prod.orderId}`}>
                          View order details
                        </Link>
                      </span>
                      <br />
                    </div>
                  </div>
                </div>
                {prod.items.map((prod) => {
                  return (
                    <div className="flex justify-between p-3 " key={prod._id}>
                      <div className="flex ml-5  ">
                        <img
                          src={prod.Image}
                          alt={prod.Title}
                          className="h-[73px] w-[64px]"
                        />
                        <div className=" flex flex-col ml-3 px-2">
                          <Link
                            to={`/product/${prod._id}`}
                            className=" no-underline"
                          >
                            <span className="text-sky-500">{prod.Title}</span>
                          </Link>
                          <span className=" text-[12px] font-semibold">
                            status:
                          </span>
                          <span className=" text-[12px] font-semibold">
                            Lorem, ipsum.
                          </span>
                        </div>
                      </div>

                      <div>
                        <button className=" text-[12px] w-[170px] border px-3 py-1 rounded-md shadow-sm font-semibold mb-1">
                          Content and devices
                        </button>{" "}
                        <br />
                        <button className=" text-[12px] w-[170px] border px-3 py-1 rounded-md shadow-sm font-semibold">
                          write a product review
                        </button>
                      </div>
                    </div>
                  );
                })}

                <hr />
                <div className="h-[30px]">
                  <span className="text-sky-500 px-3 py-2 mb-3">
                    Archive order
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <div className=" h-[50vh]">
              <h1 className="flex justify-center text-[24px]">
                You don't have any Orders...{" "}
                <Link to={"/products"} className="mx-[10px]">
                  Click Here{" "}
                </Link>{" "}
                to Continue Shopping
              </h1>
            </div>
          </div>
        )} */}
        <Outlet />
      </div>
    </div>
  );
}

export default Orders;
