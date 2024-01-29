import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Products from "../../Assets/Images/Icons/icons8-product-96.png";
import Plus from "../../Assets/Images/Icons/icons8-plus-32.png";
import Users from "../../Assets/Images/Icons/icons8-users-48.png";
import order from "../../Assets/Images/Icons/icons8-order-48.png";
import chart from '../../Assets/Images/Icons/icons8-chart-32.png'
import { myContext } from "../../App";
import axios from "axios";

const AdminHomePage = () => {
  const [data, setData] = useState({});
  const { toggle } = useContext(myContext);
  useEffect(() => {
    axios
      .get("https://amazon-clone-backend-fz8l.onrender.com/admin/stats")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="flex justify-between ">
        {toggle ? (
          <div className="w-[20vw]  ">
            <h4 className=" text-center uppercase font-bold">DashBoard</h4>
            <div className="flex justify-center items-center content-center border shadow-md p-[20px]">
              <img src={Users} alt="products" className="h-[50px] w-[50px]" />
              <Link
                to={"/admin/users"}
                className="no-underline text-black font-semibold text-[30px] ml-[5px]"
              >
                Users
              </Link>
            </div>
            <div className="flex justify-center items-center content-center border shadow-md p-[20px]">
              <img
                src={Products}
                alt="products"
                className="h-[50px] w-[50px]"
              />
              <Link
                to={"/admin/products"}
                className="no-underline text-black font-semibold text-[30px] ml-[5px] "
              >
                Products
              </Link>
            </div>
            <div className="flex justify-center items-center content-center border shadow-md p-[20px]">
              <img src={Plus} alt="Plus" className="h-[30px] w-[30px]" />
              <Link
                to={"/admin/addproduct"}
                className="no-underline text-black font-semibold text-[26px] ml-[5px] "
              >
                Add Products
              </Link>
            </div>
            <div className="flex justify-center items-center content-center border shadow-md p-[20px]">
              <img src={order} alt="Plus" className="h-[30px] w-[30px]" />
              <Link
                to={"/admin/orders"}
                className="no-underline text-black font-semibold text-[26px] ml-[5px] "
              >
                Orders
              </Link>
            </div>
            <div className="flex justify-center items-center content-center border shadow-md p-[20px]">
              <img src={chart} alt="Plus" className="h-[30px] w-[30px]" />
              <Link
                to={"/admin/chart"}
                className="no-underline text-black font-semibold text-[26px] ml-[5px] "
              >
                Chart
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full bg-black">
              <div className="flex flex-col justify-center items-center h-[100vh] pt-4 uppercase">
                <div className="min-w-[375px] md:min-w-[700px] xl:min-w-[800px]  grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                  <div className="relative flex flex-grow rounded-2xl  items-center  border-[1px] border-gray-200  bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                      <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="h-7 w-7"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                      <p className="font-dm text-sm font-medium text-gray-600">
                        Users
                      </p>
                      <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                        {data.userlength}
                      </h4>
                    </div>
                  </div>
                  <div className="relative flex flex-grow rounded-2xl items-center  border-[1px] border-gray-200  bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                      <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            viewBox="0 0 512 512"
                            className="h-6 w-6"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M298.39 248a4 4 0 002.86-6.8l-78.4-79.72a4 4 0 00-6.85 2.81V236a12 12 0 0012 12z"></path>
                            <path d="M197 267a43.67 43.67 0 01-13-31v-92h-72a64.19 64.19 0 00-64 64v224a64 64 0 0064 64h144a64 64 0 0064-64V280h-92a43.61 43.61 0 01-31-13zm175-147h70.39a4 4 0 002.86-6.8l-78.4-79.72a4 4 0 00-6.85 2.81V108a12 12 0 0012 12z"></path>
                            <path d="M372 152a44.34 44.34 0 01-44-44V16H220a60.07 60.07 0 00-60 60v36h42.12A40.81 40.81 0 01231 124.14l109.16 111a41.11 41.11 0 0111.83 29V400h53.05c32.51 0 58.95-26.92 58.95-60V152z"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                      <p className="font-dm text-sm font-medium text-gray-600">
                        Products
                      </p>
                      <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                        {data.prodLength}
                      </h4>
                    </div>
                  </div>
                  <div className="relative flex flex-grow rounded-2xl items-center  border-[1px] border-gray-200 bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                      <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="h-7 w-7"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                      <p className="font-dm text-sm font-medium text-gray-600">
                        Sales
                      </p>
                      <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                        ₹ {data.totalRev}
                      </h4>
                    </div>
                  </div>
                  <div className="relative flex flex-grow rounded-2xl items-center  border-[1px] border-gray-200 bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                      <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                      <p className="font-dm text-sm font-medium text-gray-600">
                        Category
                      </p>
                      <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                        {data.categoriesLength}
                      </h4>
                    </div>
                  </div>
                  <div className="relative flex flex-grow rounded-2xl items-center  border-[1px] border-gray-200 bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                      <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="h-7 w-7"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                      <p className="font-dm text-sm font-medium text-gray-600">
                        New Tasks
                      </p>
                      <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                        145
                      </h4>
                    </div>
                  </div>
                  <div className="relative flex flex-grow rounded-2xl items-center  border-[1px] border-gray-200 bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                      <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            viewBox="0 0 512 512"
                            className="h-6 w-6"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M208 448V320h96v128h97.6V256H464L256 64 48 256h62.4v192z"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                      <p className="font-dm text-sm font-medium text-gray-600">
                        Total Projects
                      </p>
                      <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                        $2433
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className={`${toggle ? " w-[75vw]" : "hidden"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
