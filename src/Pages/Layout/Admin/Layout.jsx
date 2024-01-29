import React from "react";

import { Outlet } from "react-router-dom";

import AdminHeader from "./Header";
import AdminFooter from "./Footer";

function Layout() {
  return (
    <div>
      <AdminHeader />
      <div className=" min-h-[90vh]">
        <Outlet />
      </div>

      <AdminFooter />
    </div>
  );
}

export default Layout;
