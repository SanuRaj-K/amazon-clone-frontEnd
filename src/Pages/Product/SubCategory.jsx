import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../../App";
import { Link, useParams } from "react-router-dom";

function SubCategory() {
  const { data } = useContext(myContext);
  const [items, setItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const product = data.filter((item) => item.Category === "Fashion");

    const pro = product.filter((item) => item.Subcategory === id);
    setItems(pro);

    // setItems(pro);
  }, [data, id]);
  console.log(items);
  return (
    <div>
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
                    className="py-[30px] px-[50px] h-[300px] w-[320px] "
                    src={item.Image}
                    alt="mobile"
                  />
                </div>
                <div className="ml-[50px]">
                  <p className="max-w-1xl">
                    <span className="font-bold mr-1">{item.Title}</span>
                    50MP Triple No Shake Cam|6000 mAh Battery|4 Gen OS Upgrade &
                    5 Year Security Update|12GB RAM with...
                  </p>
                  <span>Rating</span>
                  <h4 className="my-[12px]">₹ {item.Price}</h4>
                  <span className="font-semibold">
                    Get it by in: &nbsp;{" "}
                    {/* <span>{futureDate.toLocaleDateString()} </span> <br /> */}
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
  );
}

export default SubCategory;
