import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function ProductSpec() {
  const { id } = useParams();
  const history = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);

  const [product, setProduct] = useState({});
  useEffect(() => {
    axios
      .get(`https://amazon-clone-backend-fz8l.onrender.com/admin/getproduct/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditMode(true);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const toastId = toast.loading("updating product...");
    axios
      .put("https://amazon-clone-backend-fz8l.onrender.com/admin/updateproduct", product)
      .then((res) => {
        if (res.status === 200) {
          history("/admin/products");
          toast.success("product updated", { id: toastId });
        } else {
          toast.error("something went wrong", { id: toastId });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong", { id: toastId });
      });
  };

  const handleDelete = (e, product) => {
    e.preventDefault();
    axios
      .delete(`https://amazon-clone-backend-fz8l.onrender.com/admin/deleteproduct/${product._id}`)
      .then((res) => {
        if(res.data==='ok'){
          history("/admin/products");
          toast.success('product deleted ')
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form className="max-w-md mx-auto p-[40px] bg-white shadow-md rounded mb-5 ">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title:
          </label>
          <input
            type="text"
            id="Title"
            value={product.Title || ""}
            disabled={!isEditMode}
            name="Title"
            onChange={handleOnChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-600"
          >
            Category:
          </label>
          <select
            name="Category"
            value={product.Category || ""}
            disabled={!isEditMode}
            onChange={handleOnChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Furniture">Furniture</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Home-Appliances">Home-Appliances</option>
            <option value="Fashion">Fashion</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-600"
          >
            Quantity:
          </label>
          <input
            type="number"
            id="Quantity"
            name="Quantity"
            value={product.quantity || ""}
            disabled={!isEditMode}
            onChange={handleOnChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Price:
          </label>
          <input
            type="text"
            id="Price"
            name="Price"
            value={product.Price || ""}
            disabled={!isEditMode}
            onChange={handleOnChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="ImageUrl"
            className="block text-sm font-medium text-gray-600"
          >
            ImageUrl:
          </label>
          <input
            type="text"
            id="Image"
            name="Image"
            disabled={!isEditMode}
            value={product.Image || ""}
            onChange={handleOnChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Image:
          </label>
          <img
            src={product.Image}
            alt="product pic"
            style={{ maxWidth: "100px" }}
            className="mt-1"
          />
        </div>
        <div className="flex justify-evenly font-semibold mt-5">
          {!isEditMode ? (
            <>
              <button
                className="px-[10px] py-[6px] border rounded-md w-[120px] bg-[#7aed7a]"
                onClick={(e) => handleEdit(e)}
              >
                Edit
              </button>
            </>
          ) : (
            <>
              <button
                className="px-[10px] py-[6px] border rounded-md w-[120px] bg-[#7aed7a]"
                onClick={(e) => handleUpdate(e)}
              >
                update
              </button>
            </>
          )}

          <button
            className="px-[10px] py-[6px] border rounded-md w-[120px] bg-red-600"
            onClick={(e) => handleDelete(e, product)}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductSpec;
