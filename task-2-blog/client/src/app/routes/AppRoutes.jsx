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
import { sileo, Toaster } from "sileo";
import MyBlogs from "../../features/blog/ui/MyBlogs";
import EditBlog from "./../../features/blog/ui/EditBlog";
import Category from "../../features/category/ui/Category";
import PublicRoute from "./PublicRoute";
import ViewBlog from "../../features/blog/ui/ViewBlog";
const AppRoutes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hydrateUser());
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
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
            {
              path: "my-blogs",
              element: <MyBlogs />,
            },
            {
              path: "blogs/edit/:id",
              element: <EditBlog />,
            },
            {
              path: "categories",
              element: <Category />,
            },
            {
              path: "blogs/:slug",
              element:<ViewBlog/>
            }
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />;
    </>
  );
};

export default AppRoutes;
