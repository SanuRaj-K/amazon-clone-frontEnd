import React, { useContext } from "react";
import { myContext } from "../../App";
import { Link } from "react-router-dom";

function Products() {
  const { data } = useContext(myContext);

  // const handleCart=()=>{
  //   // axios.post("https://amazon-clone-backend-fz8l.onrender.com/users/addtocart",)
  // }
  const Fashion = "Fashion";
  const Mobiles = "Mobiles";
  const Furniture = "Furniture";
  const Home_Appliances = "Home Appliances";
  return (
    <div>
      <nav className="  h-[35px]    flex justify-between items-center  shadow-md mb-4 p-4">
        <span>
          Total <b>{data.length}</b> result items of <b> "All Products"</b>
        </span>
        {/* <div className="flex bg-[#F0F2F2] mr-2 w-[120px]  justify-center rounded-[17px] h-[24px]     ">
          <div>sort by</div>
          <img
            src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668207/Amazon/Icons/magqlukopaj59vya0y6k.svg"
            alt="arrow"
            height={"15px"}
            width={"15px"}
          />
        </div> */}
      </nav>
      <div className="flex justify-between w-full">
        <div className="ml-[12px] w-[15vw]">
          <div className="mb-[12px] font-bold text-[24px]"> Category</div>
          <div className="mb-[8px] font-semibold">
            {" "}
            <Link
              className="no-underline text-black"
              to={`/category/${Mobiles}`}
            >
              Mobiles
            </Link>{" "}
          </div>
          <div className="mb-[8px] font-semibold">
            <Link
              className="no-underline text-black"
              to={`/category/${Home_Appliances}`}
            >
              Home And Kitchen Appliances
            </Link>{" "}
          </div>
          <div className="mb-[8px] font-semibold">
            {" "}
            <Link
              className="no-underline text-black"
              to={`/category/${Furniture}`}
            >
              Furniture
            </Link>{" "}
          </div>
          <div className="mb-[8px] font-semibold">
            <Link
              className="no-underline text-black"
              to={`/category/${Fashion}`}
            >
              Fashion
            </Link>{" "}
          </div>
        </div>

        <div className="ml-[25px]">
          <div>
            <h2>Results</h2>
            <p>Check each product page for other buying options</p>
          </div>

          {data.map((item) => {
            return (
              <div key={item._id}>
                <div className="border flex   h-[300px] mb-[10px]">
                  <div className="bg-[#F7F7F7] w-[300px] ">
                    <img
                      className="py-[30px] px-[50px]"
                      src={item.Image}
                      alt="mobile"
                      height={"200px"}
                      width={"300px"}
                    />
                  </div>
                  <div className="ml-[50px]">
                    <p className="max-w-1xl">
                      <span className="font-bold mr-1">{item.Title}</span>
                      50MP Triple No Shake Cam|6000 mAh Battery|4 Gen OS Upgrade
                      & 5 Year Security Update|12GB RAM with...
                    </p>
                    <span>Rating</span>
                    <h4 className="my-[12px]">₹ {item.Price}</h4>
                    <span>
                      Get it by delivery date <br />
                      FREE Delivery by Amazon
                    </span>
                    <br />
                    {/* <button className="bg-[#FFD814] text-#000 font-bold py-2 px-4 mt-3 rounded-[4px]" onClick={handleCart}>
                    Add to cart
                  </button> */}
                    <br />
                    <Link to={`/product/${item._id}`}>
                      <button className="bg-[#FFD814] text-#000 font-bold py-2 w-[130px] px-4 mt-3 rounded-[4px]">
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
