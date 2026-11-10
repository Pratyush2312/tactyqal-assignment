import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlogs,
  deleteBlogs,
  fetchBlogs,
  getBlogsByUser,
} from "../state/blogAction";
import { sileo } from "sileo";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchAllBlogs = () => {
    try {
      dispatch(fetchBlogs());
      sileo.success({ title: "Blogs Fetched", duration: 3000 });
    } catch (error) {
      console.log(error);
    }
  };

  const createBlog = (data) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      dispatch(createBlogs(formData));
      sileo.success({ title: "Blog Created", duration: 3000 });
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchBlogByUser = () => {
    try {
      dispatch(getBlogsByUser());
      sileo.success({ title: "Blogs Fetched", duration: 3000 });
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDelete = (id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this blog?",
      );
      if (!confirm) return;
      dispatch(deleteBlogs(id));
      sileo.success({ title: "Blog Deleted", duration: 3000 });
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
    fetchBlogByUser,
    handleDelete,
    navigate,
  };
};
