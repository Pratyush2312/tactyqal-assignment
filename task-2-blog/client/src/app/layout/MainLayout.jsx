import React from "react";
import Sidebar from "../../shared/ui/Sidebar";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="flex">
      <Sidebar isAdmin={user.role === "admin"} />
      <Outlet />
    </div>
  );
};

export default MainLayout;
