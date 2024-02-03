import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
function PendingOrders() {
  const { id } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  useEffect(() => {
    const toastId = toast.loading("loading...");
    axios
      .get(`https://amazon-clone-backend-fz8l.onrender.com/users/pendingOrder/${id}`)
      .then((res) => {
        console.log(res);
        setOrderItems(res.data);
        toast.success("successfully fetched order details", { id: toastId });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div>
      {orderItems.length > 0 ? (
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
                          Fast Delivery
                        </span>
                        <span className=" text-[12px] font-semibold">
                          Lorem, ipsum.
                        </span>
                      </div>
                    </div>

                    <div
                      onClick={() => toast.error("This feature will available soon")}
                    >
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
              You don't have any Pending Orders...{" "}
              <Link to={"/products"} className="mx-[10px]">
                Click Here{" "}
              </Link>{" "}
              to Continue Shopping
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingOrders;
