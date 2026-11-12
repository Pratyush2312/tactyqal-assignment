import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const { isAuthenticated, isLoading, accessToken } = useSelector(
    (state) => state.auth,
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isAuthenticated || accessToken) {
    return <Navigate to={"/dashboard"} replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
