import React, { useContext, useEffect, useState } from "react";
import LogOut from "../../Assets/Images/Icons/icons8-logout-48.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { myContext } from "../../App";
import axios from "axios";
function Account() {
  const { setCartCount, setauthUser } = useContext(myContext);
  const [userData, setUserData] = useState({});

  const history = useNavigate();

  const user = localStorage.getItem("loginuser");
  const localUser = JSON.parse(user);
  const userId = localUser._id;

  useEffect(() => {
    
    axios
      .get(`https://amazon-clone-backend-fz8l.onrender.com/users/getuser/${userId}`)
      .then((res) => {
         
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const handleLogOut = () => {
    localStorage.clear();
    setauthUser("");
    setCartCount(0);
    toast.success("Logout Successfull");
    history("/");
  };
  return (
    <div className="">
      <p className=" ml-[240px] mt-2  mb-6 text-[28px] font-semibold">
        Your Account
      </p>
      <div className="w-[1000px] ml-[240px] mr-[240px] grid grid-cols-3 gap-[20px] ">
        <div className="flex w-[320px] border p-[16px] rounded-r-sm h-[100px]">
          <img
            src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668171/Amazon/Pictures/cy3gtdwpljv7bbzkpvbz.png"
            alt="orders"
            className="mr-[8px]"
          />
          <Link
            to={`/orders/${userData._id}`}
            className="no-underline text-black"
          >
            <div>
              <h4 className="text-[17px]">Your orders</h4>
              <span className="text-[14px]">
                Track, return, or buy things again
              </span>
            </div>
          </Link>
        </div>{" "}
        <div className="flex w-[320px] border p-[16px] rounded-r-sm h-[100px]">
          <img
            src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668170/Amazon/Pictures/dciihb0rs5jknpccfbr1.png"
            alt="lock"
            className="mr-[8px]"
          />
          <div>
            <h4 className="text-[17px]">Login & Security</h4>
            <span className="text-[14px]">
              Edit login, name, and moblie number
            </span>
          </div>
        </div>{" "}
        <div className="flex w-[320px] border p-[16px] rounded-r-sm h-[100px]">
          <img
            src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668168/Amazon/Pictures/aldbztpyz2xlkoldp7og.png"
            alt="orders"
            className="mr-[8px]"
          />
          <div>
            <h4 className="text-[17px]">Prime</h4>
            <span className="text-[14px]">
              View benefits and payment settings
            </span>
          </div>
        </div>{" "}
        <div className="flex w-[320px] border p-[16px] rounded-r-sm h-[100px]">
          <img
            src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668170/Amazon/Pictures/cvrwq1va4usyhxgxump1.png"
            alt="orders"
            className="mr-[8px]"
          />
          <Link to={"/address"} className="no-underline text-black">
            <div className="cursor-pointer">
              <h4 className="text-[17px]">Your Addresses</h4>
              <span className="text-[14px]">
                Edit addresses for oders and gifts
              </span>
            </div>
          </Link>
        </div>{" "}
        <div className="flex w-[320px] border p-[16px] rounded-r-sm h-[100px]">
          <img
            src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668171/Amazon/Pictures/s691sajjj5s5hlgyfqji.png"
            alt="orders"
            className="mr-[8px]"
          />
          <div>
            <h4 className="text-[17px]">Payment Options</h4>
            <span className="text-[14px]">Edit or add payment methods</span>
          </div>
        </div>
        <div className="flex w-[320px] border p-[16px] rounded-r-sm h-[100px]">
          <img
            src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668172/Amazon/Pictures/keynhfwhx4ojfxpk9mym.png"
            alt="orders"
            className="mr-[8px]"
          />
          <div>
            <h4 className="text-[17px]"> Amazon Pay balance</h4>
            <span className="text-[14px]">Add money to your balance</span>
          </div>
        </div>
        <div className="flex w-[320px] border p-[16px] rounded-r-sm h-[100px]">
          <img
            src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668172/Amazon/Pictures/flvlgu0fqjka0kxdcthm.png"
            alt="orders"
            className="mr-[8px]"
          />
          <div>
            <h4 className="text-[17px]">Your Bussiness Account</h4>
            <span className="text-[14px]">
              Sign up to save up to 28% with GST invoice and bulk discounts
            </span>
          </div>
        </div>
        <div
          className="flex w-[320px] border p-[16px] rounded-r-sm h-[100px] cursor-pointer"
          onClick={handleLogOut}
        >
          <img src={LogOut} alt="orders" className="mr-[8px]" />
          <div>
            <h4 className="text-[17px]">LogOut</h4>
            <span className="text-[14px]">Add money to your balance</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
