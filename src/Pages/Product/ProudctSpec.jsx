import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { myContext } from "../../App";
import toast from "react-hot-toast";

function ProudctSpec() {
  // const history = useNavigate();
  const { id } = useParams();
  const { authUser, setCartCount, cartCount } = useContext(myContext);
  const userId = authUser.email;
  const [product, setProduct] = useState([]);

  const Mobile = product.Category === "Mobiles";
  const Furniture = product.Category === "Furniture";
  const Home = product.Category === "Home Appliances";
  const fashion = product.Category === "Fashion";
  const Electronics = product.Category === "Electronics";

  useEffect(() => {
    const toastId = toast.loading("loading...");
    axios
      .get(`https://amazon-clone-backend-fz8l.onrender.com/users/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        toast.remove(toastId);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleCart = () => {
    const toastId = toast.loading("loading...");
    if (Object.keys(authUser).length !== 0) {
      if (authUser) {
        axios
          .post(
            "https://amazon-clone-backend-fz8l.onrender.com/users/addtocart",
            { userId, id }
          )
          .then((res) => {
            if (res.data.status === "inCart") {
              toast.error("item already added", { id: toastId });
            } else {
              toast.success("item added", { id: toastId });

              setCartCount(cartCount + 1);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      toast.error("login required", { id: toastId });
    }
  };

  const handleBuy = (prodId) => {
    // axios
    //   .post("https://amazon-clone-backend-fz8l.onrender.com/users/payment", { prodId, userId })
    // .then((res) => {
    //   console.log(res);
    //   history("/payments");
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
    toast.error('Please add to cart first...')
  };

  return (
    <div>
      <div className="w-[90%] mt-5 mx-[20px]  h-[600px] flex   ">
        {Mobile ? (
          <div className=" ">
            <img
              src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668169/Amazon/Pictures/r1xvvqgqlwgbqz1qv0z1.png"
              alt=""
            />
            <img
              src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668169/Amazon/Pictures/zwbi2fr4nb0z9loqjw4h.png"
              alt=""
            />
            <img
              src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668169/Amazon/Pictures/gav2tqokc0mffnaisptx.png"
              alt=""
            />
            <img
              src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668170/Amazon/Pictures/nzsinh8jhcfs7d5au9oi.png"
              alt=""
            />
          </div>
        ) : null}

        <div className="">
          <img
            src={product.Image}
            alt=""
            className="px-[50px] py-[10px] max-h-[420px] max-w-[420px]"
          />
        </div>
        <div>
          <div className="border p-[40px]  rounded-3xl">
            <p className="text-[24px]  font-semibold">
              {product.Title}

              {Mobile ? (
                <span>
                  {" "}
                  Stardust Black, 4GB RAM, 128GB Storage | 90Hz Display | 50MP
                  AI Triple Camera
                </span>
              ) : null}

              {Home ? (
                <span>
                  {" "}
                  Frost Free Triple-Door Refrigerator (FP 263D PROTTON ROY
                  ARCTIC STEEL(N)
                </span>
              ) : null}
            </p>
            <h4>₹ {product.Price}</h4>
            <img
              src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668208/Amazon/Icons/yyjvtcstxpo8nnnder5y.svg"
              alt=""
            />
            <span className="text-[14px]">
              Inclusive of all taxes <br />
              EMI starts at ₹436. No Cost EMI available EMI options
            </span>
            <div className="my-[10px] text-[12px] font-medium">
              <button
                className="bg-[#FFD814] mr-4 py-1 px-3 rounded-xl"
                onClick={handleCart}
              >
                Add to Cart
              </button>
              <button
                className="bg-[#FFA41C] mr-4 py-1 px-3 rounded-xl"
                onClick={() => handleBuy(product._id)}
              >
                Buy Now
              </button>
            </div>
            <hr />
            <ul className="flex text-center content-center items-center text-[10px] w-[100%]  ">
              <li className="mr-[15px] w-[70px] h-[70px] flex flex-col items-center">
                <img
                  className=" mb-1"
                  src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668206/Amazon/Icons/mb35uzhsxgtebhlsiseu.png"
                  alt=""
                  height={"40px"}
                  width={"40px"}
                />
                <span>Amazon Delivered</span>
              </li>
              <li className="mr-[15px] w-[70px] h-[70px] flex flex-col items-center">
                <img
                  className=" mb-1"
                  src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668206/Amazon/Icons/dzc9jko3elkty3kgkbcc.png"
                  alt=""
                  height={"40px"}
                  width={"40px"}
                />
                <span>7 days service centre</span>
              </li>
              <li className="mr-[15px] w-[70px] h-[70px] flex flex-col items-center">
                <img
                  className=" mb-1"
                  src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668206/Amazon/Icons/y18azmsblgddahsfotuf.png"
                  alt=""
                  height={"40px"}
                  width={"40px"}
                />
                <span>Pay on Delivery</span>
              </li>
              <li className="mr-[15px] w-[70px] h-[70px] flex flex-col items-center">
                <img
                  className=" mb-1"
                  src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668206/Amazon/Icons/cdzsrel1eobwwtmpkbsm.png"
                  alt=""
                  height={"40px"}
                  width={"40px"}
                />
                <span> 1 year warrenty care</span>
              </li>
              <li className="mr-[15px] w-[70px] h-[70px] flex flex-col items-center">
                <img
                  className=" mb-1"
                  src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668205/Amazon/Icons/vaqiejufyxm0zsjsbif1.png"
                  alt=""
                  height={"40px"}
                  width={"40px"}
                />
                <span>Top brand</span>
              </li>
              <li className="mr-[15px] w-[70px] h-[70px] flex flex-col items-center">
                <img
                  className=" mb-1"
                  src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668206/Amazon/Icons/djb5tcxoiwxgp1nsg1sv.png"
                  alt=""
                  height={"40px"}
                  width={"40px"}
                />
                <span>Free delivery</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="font-semibold">
        {Mobile || Electronics ? (
          <div>
            <h1 className="text-center">About this Item</h1>
            <ul className="list-disc">
              <li>PROCESSOR: {product.Description.Processor}</li>
              <li>DISPLAY: {product.Description.Display}</li>
              <li>COLOR: {product.Description.Color}</li>
              <li>RAM: {product.Description.RAM}</li>
              <li>ROM: {product.Description.ROM}</li>
            </ul>
          </div>
        ) : null}
        {Furniture ? (
          <div>
            <h1 className="text-center">About this Item</h1>
            <ul className="list-disc">
              <li>COLOR: {product.Description.Color}</li>
              <li>MATERIAL: {product.Description.Material}</li>
              <li>DIMENTIONS: {product.Description.Dimensions}</li>
              <li>STYLE: {product.Description.Style}</li>
            </ul>
          </div>
        ) : null}
        {Home ? (
          <div>
            <h1 className="text-center">About this Item</h1>
            <ul className="list-disc">
              <li>COLOR: {product.Description.Color}</li>
              <li>FEATURES: {product.Description.Features}</li>

              {product.Description.Capacity ? (
                <li> CAPACITY: {product.Description.Capacity}</li>
              ) : null}
              {product.Description.Dimensions ? (
                <li>DIMENTIONS: {product.Description.Dimensions}</li>
              ) : null}
              {product.Description.Style ? (
                <li>STYLE: {product.Description.Style}</li>
              ) : null}

              {product.Description.Type ? (
                <li> TYPE: {product.Description.Type}</li>
              ) : null}
            </ul>
          </div>
        ) : null}
        {fashion ? (
          <div>
            <h1 className="text-center">About this Item</h1>
            <ul className="list-disc">
              <li>COLOR: {product.Description.Color}</li>
              <li>BRAND: {product.Description.Brand}</li>
              <li>SIZE: {product.Description.Size}</li>
              <li>MATERIAL: {product.Description.Material}</li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProudctSpec;
