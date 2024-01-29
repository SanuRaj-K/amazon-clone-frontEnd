import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../../App";
import { Link, useParams } from "react-router-dom";

function Category() {
  const { data } = useContext(myContext);
  const [items, setItems] = useState([]);
  const [todayDate, setTodayDate] = useState(new Date());
  const [futureDate, setFutureDate] = useState(null);
  const { id } = useParams();
  const Fashion = "Fashion";
  const Mobiles = "Mobiles";
  const Furniture = "Furniture";
  const Home_Appliances = "Home Appliances";
  const Electronics='Electronics'
  const mens = "Men";
  const Kids = "Kids";
  const Women = "Women";


  useEffect(() => {
    if (id !== Fashion) {
      const products = data.filter((item) => item.Category === id);
      setItems(products);
    } else {
      const prod = data.filter((item) => item.Category === Fashion);
      setItems(prod);
      // if (id !== prod.Category) {
      //   const products = prod.filter((item) => item.Subcategory === id);
      //   setItems(products);
      // }
    }

    setTodayDate(new Date());
    const futureDate = new Date();
    futureDate.setDate(todayDate.getDate() + 3);
    setFutureDate(futureDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data]);

  return (
    <div>
      <nav className="  h-[35px]    flex justify-between items-center  shadow-md mb-4 p-4">
        <span>
          Total <b>{items.length}</b> result items of <b> "{id}"</b>
        </span>
        <div className="flex bg-[#F0F2F2] mr-2 w-[120px]  justify-center rounded-[17px] h-[24px]     ">
          <div>sort by</div>
          <img
            src="https://res.cloudinary.com/dgoermgtp/image/upload/v1703668207/Amazon/Icons/magqlukopaj59vya0y6k.svg"
            alt="arrow"
            height={"15px"}
            width={"15px"}
          />
        </div>
      </nav>

      <div className="flex justify-between w-full">
        {id === Fashion ? (
          <div className="ml-[12px] w-[250px]">
            <div className="mb-[12px] font-bold text-[24px]">SubCategory</div>
            <div className="mb-[8px] font-semibold">
              {" "}
              <Link
                className="no-underline text-black"
                to={`/category/sub/${mens}`}
              >
                Mens
              </Link>{" "}
            </div>
            <div className="mb-[8px] font-semibold">
              {" "}
              <Link
                className="no-underline text-black"
                to={`/Category/sub/${Women}`}
              >
                Womens
              </Link>{" "}
            </div>
            <div className="mb-[8px] font-semibold">
              {" "}
              <Link
                className="no-underline text-black"
                to={`/category/sub/${Kids}`}
              >
                Kids
              </Link>{" "}
            </div>
          </div>
        ) : (
          <div className="ml-[12px] w-[250px]">
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
              {" "}
              <Link
                className="no-underline text-black"
                to={`/category/${Electronics}`}
              >
                Electronics
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
        )}

        <div className="ml-[25px]">
          <div>
            <h2>Results</h2>
            <p>Check each product page for other buying options</p>
          </div>

          {items.map((item) => {
            return (
              <div key={item._id}>
                <div className="border flex justify h-[300px] mb-[10px]">
                  <div className="bg-[#F7F7F7] w-[300px] ">
                    <img
                      className="py-[30px] px-[50px] h-[300px]  max-w-[300px] "
                      src={item.Image}
                      alt="mobile"
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
                    <span className="font-semibold">
                      Get it by in: &nbsp;{" "}
                      <span>{futureDate.toLocaleDateString()} </span> <br />
                      FREE Delivery by Amazon
                    </span>
                    <br />
                    {/* <button className="bg-[#FFD814] text-#000 font-bold py-2 px-4 mt-3 rounded-[4px]">
                    Add to cart
                  </button> */}
                    <br />
                    <Link
                      to={`/product/${item._id}`}
                      className="no-underline text-black"
                    >
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

export default Category;
