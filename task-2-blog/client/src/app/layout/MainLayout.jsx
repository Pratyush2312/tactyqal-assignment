import React from "react";
import Sidebar from "../../shared/ui/Sidebar";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar isAdmin={user.role==='admin'} />

      <main className="px-5 py-4 flex-1 min-w-0 bg-[#f8f8f6]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
