import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cart from "../../Assets/Images/Icons/icons8-cart-32 (1).png";
import { myContext } from "../../App";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import { isEqual } from "lodash";
function Header() {
  const history = useNavigate();
  const {
    data,
    setauthUser,
    cartCount,
    setCartCount,
    loginUser,
    authUser,
    address,
  } = useContext(myContext);
  const [userData, setUserData] = useState({});
  const [place, setPlace] = useState("");
  const [search, setSearch] = useState("");
  const Fashion = "Fashion";
  const Mobiles = "Mobiles";
  const Furniture = "Furniture";
  const Home_Appliances = "Home Appliances";
  const Electronics = "Electronics";
  const loginToken = localStorage.getItem("loginToken");

  useEffect(() => {
    if (loginToken) {
      const user = jwtDecode(loginToken);
      setUserData(user);
      // setauthUser(user);
    } else {
      setPlace("");
    }
  }, [authUser, loginToken, setauthUser, setPlace]);

  useEffect(() => {
    if (loginToken) {
      const user = jwtDecode(loginToken);

      axios
        .get(`https://amazon-clone-backend-fz8l.onrender.com/users/cartcount/${user.email}`)
        .then((res) => {
          if (!isEqual(place, res.data.address)) {
            setPlace(res.data.address);
          }
          const count = res.data.cart.length;
          setCartCount(count);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [cartCount, loginToken, loginUser, place, setCartCount, address]);

  const handleAccount = () => {
    if (loginToken) {
      // axios
      //   .post("https://amazon-clone-backend-fz8l.onrender.com/users/getuser", userData)
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));
      history("/account");
    } else {
      history("/auth/login");
    }
  };

  const handleClick = (val) => {
    setSearch("");
  };
  const handleCart = () => {
    toast.error("Login Required");
  };

  return (
    <div className=" ">
      <div className=" w-full  ">
        <div>
          <nav className=" bg-[#131921]  text-white text-[12px] px-3 h-16 w-full flex justify-between items-center content-center">
            <div className="flex justify-between items-center  ">
              <Link to={"/"}>
                <img
                  src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668202/Amazon/Logo/m8zmfr24ttisqyu0ouw1.png"
                  alt="logo"
                />
              </Link>

              <div className="flex justify-between  ml-[20px]">
                <img
                  src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668205/Amazon/Icons/uqrch72rkmss6rys5l79.png"
                  alt="location"
                  className="h-[25px] w-[18px]"
                />
                &nbsp;&nbsp;
                <span className=" cursor-pointer ">
                  {!place ? (
                    <p onClick={handleCart}>
                      Hello <br />
                      Select your location
                    </p>
                  ) : (
                    <p>
                      Deliver to <br />
                      <b className="text-[13px]">{place.place}</b>
                    </p>
                  )}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center w-[600px]  h-[60px]  ">
              <div className=" text-[12px] flex px-1 rounded-l-md  bg-[#E6E6E6] h-[40px]  items-center justify-center   ">
                <span className=" text-[#555555]">All </span>
                <img
                  src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668207/Amazon/Icons/magqlukopaj59vya0y6k.svg"
                  alt="arrow"
                  className=" h-[15px] w-[15px]"
                />
              </div>
              <input
                className="text-[#000] w-full h-[40px] focus:outline-none"
                type="text"
                name="search"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search on Amazon.in"
              />
              <div className=" flex items-center bg-[#FEBD69] rounded-r-md  w-[45px] h-[40px] ">
                <img
                  src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668206/Amazon/Icons/uqpokcytmbcsua4edrtp.png"
                  alt="search"
                  className="  mx-auto"
                />
              </div>
            </div>
            <div className="">
              <ul className="flex justify-between text-center items-center mt-2 ">
                <li className="mr-[30px]">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668171/Amazon/Pictures/cysqfup3xrsclamko9ie.png"
                      alt="indian flag"
                      className=" mr-1"
                    />
                    <span className=" font-semibold">EN</span>
                    <img
                      src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668207/Amazon/Icons/magqlukopaj59vya0y6k.svg"
                      alt="downArrow"
                      className=" "
                    />
                  </div>
                </li>
                <li
                  className="cursor-pointer mr-[30px]"
                  onClick={handleAccount}
                >
                  <span>
                    {" "}
                    Hello,{" "}
                    {loginToken ? (
                      <span>{userData.id}</span>
                    ) : (
                      <span>Signin</span>
                    )}
                  </span>{" "}
                  <br />
                  <span className="font-semibold">Account & Lists</span>
                </li>

                {!loginToken ? (
                  <>
                    <li
                      className="w-[30px] mb-3 mr-[20px] cursor-pointer"
                      onClick={handleCart}
                    >
                      <span className="relative left-1 top-2 text-[#F07916]">
                        {cartCount ? cartCount : null}
                      </span>
                      <img src={cart} alt="CartButton" className="cart" />
                    </li>
                    <li className=" cursor-pointer" onClick={handleCart}>
                      <span>Returns</span> <br />
                      <span className="font-semibold">& Orders</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="   ">
                      <Link
                        to={`/orders/${authUser._id}`}
                        className="text-[#fff] no-underline"
                      >
                        <span>Returns</span> <br />
                        <span className="font-semibold">& Orders</span>
                      </Link>
                    </li>
                    <li className="w-[30px] mb-3 ml-3   ">
                      <Link
                        to={`/cart/${authUser._id}`}
                        className="text-[#fff] no-underline"
                      >
                        <span className="relative left-1 top-2 text-[#F07916]">
                          {cartCount}
                        </span>
                        <img src={cart} alt="CartButton" className="cart" />
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>

        <div className=" w-full">
          <div className="flex px-3 justify-between   h-[40px]   text-[14px]  text-white bg-[#232F3E]">
            <ul className=" p-0  flex mt-2 items-center cursor-pointer">
              <Link
                to={"/products"}
                className="mr-[14px] no-underline text-white"
              >
                <li className=" flex hover:border border-white px-2 py-1 justify-center  ">
                  <img
                    className="w-[20px] h-[20px]"
                    src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668206/Amazon/Icons/pqwekkflbh1vfgwbfufd.png"
                    alt="hamburg"
                    cl
                  />
                  <span className="  ">All</span>
                </li>
              </Link>
              <Link
                to={`/category/${Fashion}`}
                className=" text-white no-underline"
              >
                <li className="mr-4 hover:border border-white px-2 py-1">Fashion</li>
              </Link>
              <Link
                to={`/category/${Mobiles}`}
                className=" text-white no-underline "
              >
                <li className="mr-4 hover:border border-white px-2 py-1">Mobiles</li>
              </Link>
              <Link
                to={`/category/${Furniture}`}
                className=" text-white no-underline "
              >
                <li className="mr-4 hover:border border-white px-2 py-1">Furniture</li>
              </Link>
              <Link
                to={`/category/${Home_Appliances}`}
                className=" text-white no-underline "
              >
                <li className="mr-4 hover:border border-white px-2 py-1">Home Appliances</li>
              </Link>

              <Link
                to={`/category/${Electronics}`}
                className=" text-white no-underline"
              >
                <li className="mr-4 hover:border border-white px-2 py-1">Electronics</li>
              </Link>
              <li className="mr-4 hover:border border-white px-2 py-1" >Today's Deals</li>
              <li className="mr-4 hover:border border-white px-2 py-1">Coupons</li>
              <li className="mr-4 hover:border border-white px-2 py-1">Health, Household & Personal Care</li>
              <li className="mr-4 hover:border border-white px-2 py-1">New Releases</li>
              <li className="mr-4 hover:border border-white px-2 py-1">Gift Ideas</li>
            </ul>
            <div>
              <ul className="flex mt-[6px]  ">
                <li className="mr-[10px]">New Launches</li>
                <li>Shop Now</li>
              </ul>
            </div>
          </div>
          {search ? (
            <div className=" z-50 max-h-[200px] absolute bg-white overflow-hidden overflow-y-auto   w-[700px] border text-center  ml-[350px]    ">
              <div className="px-[4] py-1">
                {data
                  .filter((item) => {
                    if (search === "") {
                      return null;
                    } else if (
                      item.Title.toLowerCase().includes(
                        search.toLocaleLowerCase()
                      )
                    ) {
                      return item;
                    }
                    return null;
                  })
                  .map((val) => {
                    return (
                      <>
                        <div key={val._id}> </div>
                        <Link
                          className=" text-[black] no-underline"
                          to={`/product/${val._id}`}
                        >
                          <span
                            onClick={() => handleClick(val)}
                            className=" cursor-pointer hover:bg-gray-300 p-1  w-full block "
                          >
                            {val.Title}
                          </span>
                        </Link>
                      </>
                    );
                  })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Header;
