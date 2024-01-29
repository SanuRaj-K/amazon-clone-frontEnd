import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { myContext } from "../../App";

function PaymentFailed() {
  const { authUser } = useContext(myContext);
  const id = authUser.email;
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-semibold mb-6 text-red-500">
            Payment Failed
          </h1>
          <p className="text-gray-700 mb-6">
            We're sorry, but your payment has failed. Please check your payment
            details and try again.
          </p>
          <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none">
            <Link to={`/payment/${id}`} className=" text-white no-underline">Payment Page</Link> 
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentFailed;
