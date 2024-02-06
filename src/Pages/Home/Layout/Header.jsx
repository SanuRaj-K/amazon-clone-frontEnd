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
        .get(
          `https://amazon-clone-backend-fz8l.onrender.com/users/cartcount/${user.id}`
        )
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
    <div className="">
      <div className=" ">
        <nav className=" flex justify-between text-white items-center h-[60px] text-[12px] bg-black  cursor-pointer">
          <div className="flex justify-between ml-3 ">
            <Link to={"/"}>
              <img
                src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668202/Amazon/Logo/m8zmfr24ttisqyu0ouw1.png"
                alt="logo"
              />
            </Link>

            <div className="flex justify-between ml-[20px]">
              <img
                src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668205/Amazon/Icons/uqrch72rkmss6rys5l79.png"
                alt="location"
                className="h-[25px] w-[18px]"
              />
              &nbsp;&nbsp;
              <span>
                {!place ? (
                  <p>
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
          <div className="center">
            <div className="pre-div">
              All &nbsp;{" "}
              <img
                src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668207/Amazon/Icons/magqlukopaj59vya0y6k.svg"
                alt="arrow"
              />
            </div>
            <input
              className="text-[#000]"
              type="text"
              name="search"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search on Amazon.in"
            />
            <div className="search">
              <img
                src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668206/Amazon/Icons/uqpokcytmbcsua4edrtp.png"
                alt="search"
              />
            </div>
          </div>
          <div className="">
            <ul className="flex justify-between text-center items-center ">
              <li className="mr-[30px]">
                <div className="flagItems">
                  <img
                    src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668171/Amazon/Pictures/cysqfup3xrsclamko9ie.png"
                    alt="indian flag"
                  />
                  <span>EN</span>
                  <img
                    src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668207/Amazon/Icons/magqlukopaj59vya0y6k.svg"
                    alt="downArrow"
                  />
                </div>
              </li>
              <li className="cursor-pointer mr-[30px]" onClick={handleAccount}>
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
                  <li className="w-[30px] mb-3 mr-[20px] " onClick={handleCart}>
                    <span className="relative left-1 top-2 text-[#F07916]">
                      {cartCount ? cartCount : null}
                    </span>
                    <img src={cart} alt="CartButton" className="cart" />
                  </li>
                  <li className="mr-[30px]">
                    <span>Returns</span> <br />
                    <span className="font-semibold">& Orders</span>
                  </li>
                </>
              ) : (
                <>
                  <li className=" mr-[22px] ">
                    <Link
                      to={`/orders/${userData.id}`}
                      className="text-[#fff] no-underline"
                    >
                      <span>Returns</span> <br />
                      <span className="font-semibold">& Orders</span>
                    </Link>
                  </li>
                  <li className="w-[30px] mb-3 mr-[20px] ">
                    <Link
                      to={`/cart/${userData.id}`}
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

        <div>
          <div className="flex justify-between items-center  text-white bg-[#131921]">
            <ul className="flex text-center items-center cursor-pointer">
              <Link
                to={"/products"}
                className="mr-[14px] no-underline text-white"
              >
                <li className=" flex justify-center items-center">
                  <img
                    className="w-[30px] h-[30px]"
                    src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668206/Amazon/Icons/pqwekkflbh1vfgwbfufd.png"
                    alt="hamburg"
                  />
                  <span>All</span>
                </li>
              </Link>
              <Link
                to={`/category/${Fashion}`}
                className=" text-white no-underline"
              >
                <li className="mr-4">Fashion</li>
              </Link>
              <Link
                to={`/category/${Mobiles}`}
                className=" text-white no-underline"
              >
                <li className="mr-4">Mobiles</li>
              </Link>
              <Link
                to={`/category/${Furniture}`}
                className=" text-white no-underline"
              >
                <li className="mr-4">Furniture</li>
              </Link>
              <Link
                to={`/category/${Home_Appliances}`}
                className=" text-white no-underline"
              >
                <li className="mr-4">Home Appliances</li>
              </Link>

              <li className="mr-4">Buy Again</li>
              <li className="mr-4">Today's Deals</li>
              <li className="mr-4">Coupons</li>
              <li className="mr-4">Health, Household & Personal Care</li>
              <li className="mr-4">New Releases</li>
              <li className="mr-4">Gift Ideas</li>
            </ul>
            <div>
              <ul className="flex mr-9">
                <li className="mr-[10px]">New Launches</li>
                <li>Shop Now</li>
              </ul>
            </div>
          </div>
          {search ? (
            <div className=" z-auto max-h-[200px] absolute bg-white overflow-hidden overflow-y-auto   w-[700px] border text-center  ml-[350px]    ">
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
