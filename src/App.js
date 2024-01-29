import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Registration from "./Pages/Register/Registration";
import HomeLayout from "./Pages/Layout/AuthLay";
import RegisterLayout from "./Pages/Layout/RegisterLayout";
import Login from "./Pages/Register/Login";
import Account from "./Pages/Account/Account";
import Products from "./Pages/Product/Products";
import ProudctSpec from "./Pages/Product/ProudctSpec";
import Cart from "./Pages/User/Cart";
import Verification from "./Pages/Register/Verification";
import Google from "./Pages/Register/Google";
import { createContext, useEffect, useState } from "react";
import Form from "./Pages/Register/Form";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Category from "./Pages/Product/Category";
import Address from "./Pages/User/Address";
import "bootstrap/dist/css/bootstrap.min.css";
import Payment from "./Pages/Payment/Payment";
import SubCategory from "./Pages/Product/SubCategory";
import Orders from "./Pages/User/Orders";
import PaymentSuccess from "./Pages/Payment/PaymentSuccess";
import PaymentFailed from "./Pages/Payment/PaymentFailed";
import Layout from "../src/Pages/Layout/Admin/Layout";
import AdminHomePage from "./Pages/Admin/Home";
import AdminProducts from "./Pages/Admin/AdminProudcts/AdminProducts";
import Users from "./Pages/Admin/AdminUsers/Users";
import UserSpec from "./Pages/Admin/AdminUsers/UserSpec";
import AddProduct from "./Pages/Admin/AdminProudcts/AddProduct";
import AdminLoginForm from "./Pages/Admin/AdminUsers/AdminLogin";
import ProductSpec from "./Pages/Admin/AdminProudcts/ProductSpec";
import OrderDetails from "./Pages/Admin/AdminProudcts/OrderDetails";
import OrderUser from "./Pages/Admin/AdminProudcts/OrderUser";
import OrdersDetail from "./Pages/User/OrdersDetail";

import "./App.css";
import AdminChart from "./Pages/Admin/Chart/Chart";
export const myContext = createContext();
function App() {
  const [data, setData] = useState([]);
  const [authUser, setauthUser] = useState({});
  const [address, setAddress] = useState({});
  const [loginUser, setLoginUser] = useState("");
  const userToken = localStorage.getItem("loginToken");
  const [cartCount, setCartCount] = useState(0);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    axios
      .get("https://amazon-clone-backend-fz8l.onrender.com/users/products", { withCredentials: true })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (userToken) {
      setLoginUser(userToken);
      const user = localStorage.getItem("loginuser");
      const loginUser = JSON.parse(user);
      setauthUser(loginUser);
    }
  }, [userToken, setauthUser]);

  return (
    <div>
      <Toaster />
      <myContext.Provider
        value={{
          data,
          setData,
          authUser,
          setauthUser,
          loginUser,
          setLoginUser,
          cartCount,
          setCartCount,
          address,
          setAddress,
          toggle,
          setToggle,
        }}
      >
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/Product/:id" element={<ProudctSpec />} />
            <Route path="/cart/:id" element={<Cart />} />
            <Route path="/orders/:id" element={<Orders />} />
            <Route path="/orderspec/:id" element={<OrdersDetail />} />
            <Route path="/Category/:id" element={<Category />} />
            <Route path="/Category/sub/:id" element={<SubCategory />} />
            <Route path="/address" element={<Address />} />
          </Route>
          <Route path="/auth" element={<RegisterLayout />}>
            <Route index element={<Registration />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/verify" element={<Verification />} />
            <Route path="/auth/googleauth" element={<Google />} />
            <Route path="/auth/form" element={<Form />} />
          </Route>
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/failed" element={<PaymentFailed />} />
          <Route path="/admin/login" element={<AdminLoginForm />} />
          <Route path="/admin" element={<Layout />}>
            <Route path="/admin" element={<AdminHomePage />}>
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/users/:id" element={<UserSpec />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/products/:id" element={<ProductSpec />} />
              <Route path="/admin/orders" element={<OrderDetails />} />
              <Route path="/admin/orders/:id" element={<OrderUser />} />
              <Route path="/admin/chart/" element={<AdminChart />} />
              <Route path="/admin/addproduct" element={<AddProduct />} />
            </Route>
          </Route>
        </Routes>
      </myContext.Provider>
    </div>
  );
}

export default App;
