import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlogs,
  deleteBlogs,
  editBlog,
  fetchBlogs,
  getBlogsById,
  getBlogsByUser,
  viewBlog,
} from "../state/blogAction";
import { sileo } from "sileo";
import { useNavigate } from "react-router";
import { generateToast } from "../../../utils/toast.util";
import { useEffect } from "react";
import { getCategories } from "../../category/state/categoryAction";

export const useBlog = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchAllBlogs = () => {
    try {
      dispatch(fetchBlogs());
      generateToast("success", "Blogs Fetched");
    } catch (error) {
      generateToast("error", error.message || "Failed to fetch blogs");
      console.log(error);
    }
  };

  const createBlog = async (data) => {
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }

      await dispatch(createBlogs(formData)).unwrap();
      generateToast("success", "Blog Created");
    } catch (error) {
      generateToast("error", error.message || "Failed to create blog");
      console.log(error.response);
    }
  };

  const fetchBlogByUser = () => {
    try {
      dispatch(getBlogsByUser());
      generateToast("success", "Blogs Fetched");
    } catch (error) {
      generateToast("error", error.message || "Failed to fetch your blogs");
      console.log(error.response);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this blog?",
      );
      if (!confirm) return;
      await dispatch(deleteBlogs(id)).unwrap();
      generateToast("success", "Blog Deleted");
    } catch (error) {
      generateToast("error", error.message || "Failed to delete blog");
      console.log(error.response);
    }
  };

  const onEditClick = (id) => {
    try {
      dispatch(getBlogsById(id));
      navigate(`/dashboard/blogs/edit/${id}`);
    } catch (error) {
      generateToast("error", error.message || "Failed to open blog");
      console.log(error);
    }
  };

  const handleEdit = async (id, data) => {
    try {
      await dispatch(editBlog({ id, data })).unwrap();
      navigate("/dashboard/blogs");
      generateToast("success", "Blog Updated");
    } catch (error) {
      generateToast("error", error.message || "Failed to update blog");
      console.log(error);
    }
  };

  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  

  return {
    register,
    handleSubmit,
    watch,
    errors,
    reset,
    setValue,
    createBlog,
    fetchAllBlogs,
    fetchBlogByUser,
    handleDelete,
    navigate,
    onEditClick,
    handleEdit,
    categories,
    dispatch
  };
};
