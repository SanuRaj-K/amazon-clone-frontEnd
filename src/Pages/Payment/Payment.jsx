import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Link, useNavigate, useParams } from "react-router-dom";

function Payment() {
  const history = useNavigate();
  const { id } = useParams();
  const [paymentUser, setPaymentUser] = useState([]);
  const [userData, setUserData] = useState({});
  const [username, setUserName] = useState("");
  const [todayDate, setTodayDate] = useState(new Date());
  const [futureDate, setFutureDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const [div, setDiv] = useState(false);
  var [formattedTotalPricee, setFormattedTotalPrice] = useState(0);
  const [coupon, setCoupon] = useState("Available");

  useEffect(() => {
    axios
      .get(`http://localhost:3005/users/payment/${id}`)
      .then((res) => {
        setUserName(res.data.username);
        setPaymentUser(res.data.cart);
        setUserData(res.data.address);
        setTodayDate(new Date());
        const futureDate = new Date();
        futureDate.setDate(todayDate.getDate() + 3);
        setFutureDate(futureDate);

        const cart = res.data.cart;
        const subtotal = cart.reduce(
          (total, item) => total + item.Price * item.quantity,
          0
        );
        setTotalPrice(subtotal.toFixed(2));
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const totalPriceNumber =
    typeof totalPrice === "number" ? totalPrice : parseFloat(totalPrice);
  var formattedTotalPrice = (totalPriceNumber + 40).toFixed(2);
  var finalPrice = formattedTotalPricee.toFixed(2);

  const handleCoupon = () => {
    const finalPrice = formattedTotalPrice - (formattedTotalPrice * 20) / 100;
    setFormattedTotalPrice(finalPrice);
    setCoupon("20% applied");
    toast.success("Coupon Applied");
  };

  const orderItems = paymentUser.map((item) => item);

  const generateOrderId = () => {
    const timestamp = Date.now();
    return `${timestamp}`;
  };
  const orderId = generateOrderId();
  const date = new Date(todayDate.toLocaleString());

  const handleCOD = () => {
    if (paymentMethod === "cardPayment") {
      toast.error("enter card details");
    } else {
      setDiv(true);
    }
  };
  const handlePayment = () => {
    if (paymentMethod === "cardPayment") {
      toast.error("enter card details");
    } else {
      const order = {
        cart: orderItems,
        orderId: orderId,
        orderDate: date,
        status: "pending",
        totalPrice: finalPrice === "0.00" ? formattedTotalPrice : finalPrice,
        userId: id,
        
      };
      axios
        .post("http://localhost:3005/users/cod", { order, id })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      toast.success("Order Placed");
      history(`/orders/${id}`);
    }
  };

  const handleCard = async (e) => {
    e.preventDefault();
    const stripe = await loadStripe(process.env.STRIPE_KEY);

    axios
      .post("http://localhost:3005/users/createpayment", { paymentUser, id })
      .then((res) => {
        console.log(res);
        stripe.redirectToCheckout({
          sessionId: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const canclePayment = () => {
    toast.error("Order not Placed");
    setDiv(false);
  };
  return (
    <div>
      {div ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border bg-white rounded-xl shadow-md w-[400px] text-center p-8">
          <span>Did you want to confirm this order...?</span>
          <div className="mt-4">
            <button
              onClick={handlePayment}
              className="border px-4 py-2 bg-[#ff9900] font-semibold rounded-md hover:bg-green-500"
            >
              Confirm
            </button>
            <button
              onClick={canclePayment}
              className="border px-4 py-2 bg-[#e44a4a] font-semibold rounded-md ml-4 hover:bg-slate-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex  justify-around h-[80px] items-center content-center  border-[1px] border-[#DDDDDD] bg-[#F6F6F6] mx-4">
        <div className="flex">
          <img
            src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668202/Amazon/Logo/xoqkvjmz7ohtyp3xovhe.svg"
            alt="logo"
            className=" w-[100px] h-[32px]"
          />
          <div>.in</div>
        </div>
        <div className="text-[24px] font-medium">Checkout</div>
        <div>
          <img
            src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668207/Amazon/Icons/kff4jzbzgswn08aeqwlc.png"
            alt="lock"
          />
        </div>
      </div>
      <div className="flex">
        <div className="ml-[150px] mt-3  ">
          <div className="flex justify-between w-[60vw] border-b-2 border-[#DDDDDD]">
            <h3>1 &nbsp; Delivery Address</h3>
            <div className="font-semibold capitalize">
              <span>{username}</span> <br />
              <span>{userData.housename}</span>
              <br />
              <span>{userData.place}</span>
              <br />
              {userData.pin}
              <span></span>
            </div>
            <div>
              <Link to={"/address"} className="no-underline">
                <span className="text-blue-500 cursor-pointer">Change</span>
              </Link>
            </div>
          </div>
          <div className="mt-[20px]">
            <h3>2 &nbsp; Payment Method</h3>
            <div className="font-semibold py-[12px]">
              <input
                type="radio"
                id="cashOnDelivery"
                name="paymentMethod"
                value="cashOnDelivery"
                checked={paymentMethod === "cashOnDelivery"}
                onChange={() => setPaymentMethod("cashOnDelivery")}
              />{" "}
              &nbsp;
              <label htmlFor="cashOnDelivery">Cash on Delivery</label>
              <div>
                {" "}
                <br />
                <input
                  type="radio"
                  id="cardPayment"
                  name="paymentMethod"
                  value="cardPayment"
                  checked={paymentMethod === "cardPayment"}
                  onChange={() => setPaymentMethod("cardPayment")}
                />
                &nbsp; &nbsp;
                <label htmlFor="cardPayment">Card Payment</label>
              </div>
            </div>
            {paymentMethod === "cardPayment" && (
              <div>
                <div className="w-[60vw]">
                  <span className="font-bold">Credit or Debit Card</span> <br />{" "}
                  <br />
                  <img
                    src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668207/Amazon/Icons/mpw52yifmziyscu5rkxd.png"
                    alt="payment"
                  />{" "}
                  <br />
                  <form
                    action=""
                    className="text-center border rounded-r-sm  p-[30px] w-[500px]"
                  >
                    <button
                      onClick={handleCard}
                      className="ml-[20px] font-semibold bg-[#FFD814] px-3 py-1 rounded-[8px] text-center"
                    >
                      Enter Card Details
                    </button>
                  </form>
                  <hr />
                </div>
              </div>
            )}
          </div>
          <div className="mt-[20px] flex w-[60vw] justify-between border-b-[2px] pb-2">
            <h3>3 &nbsp; Items and Delivery</h3>
            <div>
              <p>
                <span className="font-semibold">
                  <span className="">
                    Deliver in: &nbsp;
                    {futureDate && (
                      <span>
                        {futureDate.toLocaleDateString()} &nbsp; before evening
                      </span>
                    )}
                  </span>
                </span>
              </p>

              {paymentUser.map((item) => {
                return (
                  <div key={item._id}>
                    <div className="flex justify-between mb-3"></div>
                    <div className="flex w-[40vw]">
                      <img
                        src={item.Image}
                        alt="itemPic"
                        className="h-[75px] w-[75px]"
                      />
                      <p className="text-center ml-[15px]">
                        <span className="font-bold">{item.Title}</span>{" "}
                        <span className="font-semibold">
                          website to complete your payment. Your
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <div className="border  px-5 py-3 rounded-[8px] ml-[40px] mt-8">
            <h4>Order Summary</h4>
            <div>
              <div className="flex justify-between">
                <span>Items: </span>
                <span className="font-semibold">{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className="font-semibold">40</span>
              </div>
              <div className="flex justify-between">
                <span>Coupon: </span>
                <span className="font-semibold">{coupon}</span>
              </div>
              <hr />
              <div className="flex justify-between text-[#B12704] font-medium text-[20p]">
                <span>Order Total: </span>
                <span>
                  {finalPrice === "0.00" ? formattedTotalPrice : finalPrice}
                </span>
              </div>
              <button
                className="ml-[20px] mt-2 bg-[#FFD814] px-3 py-1 rounded-[8px] text-center font-semibold"
                onClick={handleCOD}
              >
                Place Your Order
              </button>
            </div>
          </div>
          <div className=" mt-2 ml-10 border rounded-md flex justify-center">
            <div className=" flex flex-col p-4">
              <span className=" font-semibold ">Coupon Available</span> <br />
              {formattedTotalPricee ? (
                <button
                  disabled
                  className=" px-3 py-2  bg-[#7bf57b] cursor-not-allowed  font-semibold rounded-lg border"
                >
                  Applied
                </button>
              ) : (
                <button
                  onClick={handleCoupon}
                  className=" px-3 py-2   bg-[#FFD814] font-semibold rounded-lg border"
                >
                  Apply
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-[20px] ml-[150px]   w-[60vw] text-[12px]  ">
          <p>
            Need help? Check our <Link>help pages</Link> or{" "}
            <Link>contact us</Link>{" "}
          </p>{" "}
          <br />
          <p>
            When your order is placed, we'll send you an e-mail message
            acknowledging receipt of your order. If you choose to pay using an
            electronic payment method (credit card, debit card or net banking),
            you will be directed to your bank's website to complete your
            payment. Your contract to purchase an item will not be complete
            until we receive your electronic payment and dispatch your item. If
            you choose to pay using Pay on Delivery (POD), you can pay using
            cash/card/net banking when you receive your item.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Payment;
