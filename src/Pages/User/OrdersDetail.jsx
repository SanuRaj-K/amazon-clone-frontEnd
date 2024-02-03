import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function OrdersDetail() {
  const [data, setData] = useState({});
  const [address, setAddress] = useState({});
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios
      .get(`https://amazon-clone-backend-fz8l.onrender.com/users/orderspec/${id}`)
      .then((res) => {
        setData(res.data);
        setAddress(res.data.userId.address);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const products = data.items;
  const formattedDate = new Date(data.orderDate).toLocaleDateString();

  return (
    <div className="flex  space-x-40">
      <div className="w-[50vw]  ml-3 shadow-md mt-6 p-4">
        {data && (
          <div className=" flex justify-between">
            <div>
              <span className=" font-semibold uppercase mb-1">
                Order Details
              </span>{" "}
              <br /> <hr />
              <span>
                ID: &nbsp;{data.orderId} <br />{" "}
                <span>Order Date: &nbsp;{formattedDate}</span>
              </span>
            </div>
            <div>
              <Link className=" no-underline">Invoice</Link>
            </div>
          </div>
        )}

        <hr />
        {products &&
          products.map((prod) => {
            return (
              <div className="flex mb-2   border rounded-lg">
                <img
                  src={prod.Image}
                  alt={prod.Title}
                  className="h-[150px] p-4 w-[160px]"
                />
                <div className=" ml-2 mt-3 font-semibold">
                  <span>{prod.Title}</span> <br />
                  <span>&#8377; {prod.Price}</span> <br />
                  <span>QTY:{prod.quantity}</span>
                </div>
              </div>
            );
          })}
      </div>

      <div>
        <div>
          <div className="  w-[30vw] mt-3  border rounded-lg">
            <div className=" capitalize  text-center p-3 ">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                shipping Address Details
                <hr />
              </h2>

              <div className="mb-4">
                <p className="text-gray-700 ">Place:&nbsp;{address.place}</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 ">
                  House Name:&nbsp;{address.housename}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 ">PIN:&nbsp;{address.pin}</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 ">Post:&nbsp;{address.post}</p>
              </div>
            </div>
          </div>
          <div className="mt-5 border rounded-md h-[20vh]">
            <div className="px-3 py-2">
              <div>
                <span className="font-semibold flex justify-center w-full">
                  Delivery Status
                </span>
              </div>

              <div className="flex justify-center mt-3 items-center">
                <p className="h-[10px] w-[10px] rounded-full bg-[green]"></p>

                <p
                  className={`${
                    data.status === "pending" ||
                    data.status === "deliverd" ||
                    data.status === "shipped"
                      ? "bg-[green]     slow-transition "
                      : "bg-[#c9c3c3]"
                  } w-[130px] h-[5px]`}
                ></p>

                <p className="h-[10px] w-[10px] rounded-full bg-[green]"></p>
                <p
                  className={`${
                    data.status === "shipped" || data.status === "deliverd"
                      ? "bg-[green]     slow-transition"
                      : "bg-[#c9c3c3]"
                  } w-[130px] h-[5px]`}
                ></p>

                <p className="h-[10px] w-[10px] rounded-full bg-[green]"></p>
                <p
                  className={`${
                    data.status === "deliverd"
                      ? "bg-[green]     slow-transition" 
                      : "bg-[#c9c3c3]"
                  } w-[130px] h-[5px]`}
                ></p>

                <p className="h-[10px] w-[10px] rounded-full bg-[green]"></p>
              </div>

              <div
                className={`text-[10px] ${
                  data.status === "deliverd" && "text-[#288628] font-semibold"
                }`}
              >
                <span className="relative left-[0px]">Ordered</span>
                <span className="relative left-[90px]">Pending</span>
                <span className="relative left-[190px]">Shipped</span>
                <span className="relative left-[290px]">Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersDetail;
