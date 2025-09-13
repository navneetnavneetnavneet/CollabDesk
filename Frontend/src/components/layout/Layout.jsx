import React from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopSidebar from "./DesktopSidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="relative w-full h-screen flex flex-col sm:flex-row">
      <MobileNavbar />

      <DesktopSidebar />

      <Outlet />
    </div>
  );
};

export default Layout;
