import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlogs,
  deleteBlogs,
  editBlog,
  fetchBlogs,
  getBlogsById,
  getBlogsByUser,
} from "../state/blogAction";
import { sileo } from "sileo";
import { useNavigate } from "react-router";
import { generateToast } from "../../../utils/toast.util";

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
      
      generateToast("success", "Blog Created");
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchBlogByUser = () => {
    try {
      dispatch(getBlogsByUser());
      generateToast('success','Blogs Fetched')
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

  const onEditClick = (id) => { 
    try {
      console.log("clicked");
      dispatch(getBlogsById(id));
      navigate(`/dashboard/blogs/edit/${id}`);
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (id,data) => {
    try {
      await dispatch(editBlog({ id, data })).unwrap();
      navigate("/dashboard/blogs");
      generateToast('success', "Blog Updated");
    } catch (error) {
      console.log(error);
    }
  };

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
    handleEdit
  };
};
