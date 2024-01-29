import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [newProd, setNewProd] = useState("");
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3005/admin/getproducts")
      .then((res) => {
        const data = res.data;
        setProducts(data);
        setInitial(true);
      })
      .catch((err) => {
        console.log(err);
      });
    setNewProd("");
  }, [initial]);

  useEffect(() => {
    axios
      .get(`http://localhost:3005/admin/getproducts/${newProd}`)
      .then((res) => {
        const data = res.data;
        setProducts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [newProd]);

  return (
    <div>
      <div className="flex">
        <div
          className="ml-[12px] font-semibold text-[24px] text-[#146eb4] cursor-pointer"
          onClick={() => setInitial(false)}
        >
          AllProducts |
        </div>
        <div
          className="ml-[12px] font-semibold text-[24px] text-[#146eb4] cursor-pointer"
          onClick={() => setNewProd("Furniture")}
        >
          Furninture |
        </div>
        <div
          className="ml-[12px] font-semibold text-[24px] text-[#146eb4] cursor-pointer"
          onClick={() => setNewProd("Mobiles")}
        >
          Mobiles |
        </div>
        <div
          className="ml-[12px] font-semibold text-[24px] text-[#146eb4] cursor-pointer"
          onClick={() => setNewProd("Electronics")}
        >
          Electronics |
        </div>
        <div
          className="ml-[12px] font-semibold text-[24px] text-[#146eb4] cursor-pointer"
          onClick={() => setNewProd("Home Appliances")}
        >
          Home-Appliances |
        </div>
        <div
          className="ml-[12px] font-semibold text-[24px] text-[#146eb4] cursor-pointer"
          onClick={() => setNewProd("Fashion")}
        >
          Fashion
        </div>
      </div>

      <div className="border">
        {newProd ? (
          <>
            <div className=" text-center font-bold text-[24px] mt-2">
              {newProd.toUpperCase()}
            </div>
          </>
        ) : (
          <div className=" text-center font-bold text-[24px] mt-2">
            ALL PRODUCTS
          </div>
        )}

        <div className="mx-auto  p-4">
          <div className="flex flex-wrap justify-center space-x-7">
            {products.map((product) => (
              <div
                key={product._id}
                className="w-[240px] transition-transform transform-gpu hover:scale-110 hover:rounded-lg hover:shadow-md cursor-pointer h-[260px] flex flex-col items-center border mb-[20px]"
              >
                <img
                  src={product.Image}
                  alt="product"
                  className="h-[120px] w-[120px] mb-2 p-[20px]"
                />
                <h5 className="text-center px-2">{product.Title}</h5>
                <button className="mt-auto px-[12px] py-[8px] rounded-md bg-[#ff9900] w-[100px] mb-[8px] font-bold">
                  <Link
                    to={`/admin/products/${product._id}`}
                    className="no-underline text-black"
                  >
                    View
                  </Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
