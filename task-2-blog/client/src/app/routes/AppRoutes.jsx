import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "../../features/auth/ui/Login";
import Register from "../../features/auth/ui/Register";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../../features/dashboard/ui/Dashboard";
import MainLayout from "../layout/MainLayout";
import Blogs from "../../features/blog/ui/Blog";
import CreateBlog from "../../features/blog/ui/CreateBlog";
import { useDispatch } from "react-redux";
import { hydrateUser } from "../../features/auth/state/authAction";

const AppRoutes = () => {

    const dispatch = useDispatch();
    useEffect(() => { 
        dispatch(hydrateUser());
    },[])
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "blogs",
              element: <Blogs />,
            },
            {
              path: "blogs/create",
              element: <CreateBlog />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
