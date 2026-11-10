import React from "react";
import { axiosInstance } from "../../../config/axiosInstance";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createBlogs, fetchBlogs } from "../state/blogAction";

export const useBlog = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      status: "draft",
      featuredImage: null,
    },
  });

  const dispatch = useDispatch();

  const fetchAllBlogs = async () => {
    try {
      dispatch(fetchBlogs());
    } catch (error) {
      console.log(error);
    }
  };
    
  const createBlog = async (data) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        console.log(key, value);
        formData.append(key, value);
      }
      dispatch(createBlogs(formData));
    } catch (error) {
      console.log(error.response);
    }
  };

  return {
    register,
    handleSubmit,
    watch,
    errors,
    setValue,
    createBlog,
    fetchAllBlogs,
  };
};
