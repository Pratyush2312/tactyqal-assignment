import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCategory,
  deleteCategory,
  getCategories,
} from "../state/categoryAction";
import { useForm } from "react-hook-form";
import { generateToast } from "../../../utils/toast.util";

const useCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const fetchCategories = async () => {
    try {
      await dispatch(getCategories()).unwrap();
    } catch (error) {
      generateToast(
        "error",
        error.message || error || "Failed to fetch categories",
      );
      console.log(error);
    }
  };

  const handleCreateCategory = async (data) => {
    try {
      await dispatch(addCategory(data)).unwrap();
      generateToast("success", "Category Created");
      setIsModalOpen(false);
    } catch (error) {
      generateToast(
        "error",
        error.message || error || "Failed to create category",
      );
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCategory(id)).unwrap();
      setDeleteId(null);
      generateToast("success", "Category Deleted");
    } catch (error) {
      generateToast(
        "error",
        error.message || error || "Failed to delete category",
      );
      console.log(error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    fetchCategories,
    handleCreateCategory,
    isModalOpen,
    setIsModalOpen,
    handleDelete,
    deleteId,
    setDeleteId,
  };
};

export default useCategory;
