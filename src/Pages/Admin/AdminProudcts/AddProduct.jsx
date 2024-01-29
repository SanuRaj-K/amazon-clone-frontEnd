import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const history = useNavigate();
  const [productData, setProductData] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3005/admin/addproduct", productData)
      .then((res) => {
        console.log(res.data.data);
        toast.success("Product added successfully");
        history("/admin/products");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <img
          src={productData.Image}
          alt="product"
          className="h-[100px] w-[100px] mx-auto"
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            name="Title"
            value={productData.Title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            name="Description"
            value={productData.Description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category:
          </label>
          <select
            name="Category"
            value={productData.Category}
            onChange={handleInputChange}
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image URL:
          </label>
          <input
            type="text"
            name="Image"
            value={productData.Image}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price:
          </label>
          <input
            type="number"
            name="Price"
            value={productData.Price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
