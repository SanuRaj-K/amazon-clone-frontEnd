import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { myContext } from "../../App";
import { isEqual } from "lodash";
import toast from "react-hot-toast";

function Cart() {
  const { id } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const { cartCount, setCartCount } = useContext(myContext);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    axios
      .get(
        `https://amazon-clone-backend-fz8l.onrender.com/users/viewcart/${id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (!isEqual(cartItems, res.data)) {
          setCartItems(res.data);
        }
        const p = res.data.reduce(
          (total, item) => total + item.Price * item.quantity,
          0
        );
        setTotalPrice(p.toFixed(2));
      })
      .catch((err) => console.log(err));
  }, [id, cartCount, setCartItems, cartItems]);

  const handleCartRemove = (prodId) => {
    const toastId = toast.loading("removing...");
    axios
      .delete(
        `https://amazon-clone-backend-fz8l.onrender.com/users/removecart/${id}/${prodId}`
      )
      .then((res) => {
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item._id !== prodId)
        );
        setCartCount(cartCount - 1);
        toast.success("product removed", { id: toastId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleonChange = (e, prodId) => {
    const toastId = toast.loading("loading");
    const quantity = e.target.value;
    axios
      .put(
        `https://amazon-clone-backend-fz8l.onrender.com/users/handleqty/${id}/${prodId}`,
        {
          quantity: quantity,
        }
      )
      .then((res) => {
        console.log(res);
        setCartItems(res.data);
        toast.success("Quantity changed", { id: toastId });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleBuy = () => {
    if (!cartCount) {
      toast.error("please add items to cart");
    }
  };
  return (
    <div>
      <div className="flex  pt-[20px] px-[15px] bg-[#F0F2F2] min-h-[100vh]  ">
        <div className="bg-[#fff] p-[15px] w-[80vw]  ">
          <div className="text-[28px] font-semibold ">Shopping Cart</div>
          <div className="flex justify-end">Price</div>
          <hr />

          {cartItems.length === 0 ? (
            <div>
              <h1 className="flex justify-center text-[24px]">
                Your Cart Is Empty{" "}
                <Link to={"/products"} className="mx-[10px]">
                  Click Here{" "}
                </Link>{" "}
                to Continue Shopping
              </h1>
            </div>
          ) : (
            <div>
              {cartItems.map((item) => {
                return (
                  <div key={item._id}>
                    <div className=" flex ">
                      <div>
                        <img
                          src={item.Image}
                          height={"150px"}
                          width={"150px"}
                          alt="samsung"
                        />
                      </div>
                      <div className="ml-[15px]   w-full">
                        <div className="flex justify-between   ">
                          <p>
                            <Link
                              to={`/product/${item._id}`}
                              className="no-underline text-black"
                            >
                              <span className="font-semibold">
                                {item.Title}
                              </span>{" "}
                              50MP Triple Cam|Segment's Only 6000mAh 5G SP|5nm{" "}
                              <br /> Processor|2 Gen. OS Upgrade & 4 Year
                              Security Update|12G…
                            </Link>
                          </p>

                          <span className="font-bold">{item.Price}</span>
                        </div>
                        <img
                          src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668208/Amazon/Icons/yyjvtcstxpo8nnnder5y.svg"
                          alt="amazon"
                        />
                        <p>Eligible for FREE Shipping</p>
                        <div>
                          <span className=" px-[8px] py-[2px] rounded-[8px] ">
                            Qty:{" "}
                            <select
                              name="Qty"
                              id="Qty"
                              className="bg-[#F0F2F2]"
                              value={item.quantity}
                              onChange={(e) => handleonChange(e, item._id)}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                            </select>
                          </span>
                          <div className="text-[red] mt-1 cursor-pointer">
                            <span onClick={() => handleCartRemove(item._id)}>
                              Delete |{" "}
                            </span>
                            <span>Save for Later | </span>
                            <span>See more Like this | </span>
                            <span>Share</span>
                          </div>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className=" bg-[#fff] h-[40vh] ml-2 text-center p-4 border ">
          <span>
            Subtotal ({cartItems.length}): {totalPrice}
          </span>{" "}
          <br /> <br />
          {cartCount ? (
            <Link to={`/payment/${id}`} className="no-underline text-black">
              <button className="bg-[#FFD814] px-[12px] py-1 rounded-[12px]">
                Proceed to Buy
              </button>
            </Link>
          ) : (
            <button
              className="bg-[#FFD814] px-[12px] py-1 rounded-[12px]"
              onClick={handleBuy}
            >
              Proceed to Buy
            </button>
          )}
          <br />
          <br />
          <button className="bg-[#fff] px-[12px] py-1  border-1 border-[#D5D9D9]">
            EMI Available ▼
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
