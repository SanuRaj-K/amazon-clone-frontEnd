import React, { useContext } from "react";
import admin from "../../../Assets/Images/Icons/icons8-admin-96.png";
import hamburge from "../../../Assets/Images/Icons/icons8-menu-50.png";
import closeIcon from "../../../Assets/Images/Icons/icons8-close-32 (1).png";
import { myContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const AdminHeader = () => {
  const history = useNavigate();
  const { toggle, setToggle } = useContext(myContext);
  const handleToggle = () => {
    setToggle(true);
  };
  const closeToggle = () => {
    setToggle(false);
    history("/admin");
  };
  const handleAdmin = () => {
    const confirm = window.confirm("Are you want to logout...?");
    if (confirm) {
     toast.success('Logout Successfull...')
      history('/')
    }
  };
  return (
    <div className="bg-white p-4 shadow-md flex justify-around  ">
      {toggle ? (
        <img
          src={closeIcon}
          alt=""
          onClick={closeToggle}
          className="w-[30px] h-[28px] cursor-pointer"
        />
      ) : (
        <img
          src={hamburge}
          alt=""
          onClick={handleToggle}
          className=" h-[30px] w-[30px] cursor-pointer"
        />
      )}

      <h1 className="text-2xl font-semibold">Welcome, Sanu !</h1>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="seach here..."
        className=" px-3   rounded-3xl border"
      />

      <div
        className="flex justify-center cursor-pointer items-center uppercase font-bold"
        onClick={handleAdmin}
      >
        <img src={admin} alt="admin" className="w-[30px] h-[30px]" />
        <span>Admin</span>
      </div>
    </div>
  );
};

export default AdminHeader;
