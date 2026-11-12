import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";
import { data } from "react-router";

export const getCategories = createAsyncThunk(
  "categories/fetch",
  async (_, thunkApi) => {
    try {
      const response = await axiosInstance.get("/category");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const addCategory = createAsyncThunk(
  "catgories/add",
  async (data, thunkApi) => {
    try {
      const response = await axiosInstance.post("/category/create", data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id, thunkApi) => {
    try {
      const response = await axiosInstance.delete(`/category/delete/${id}`);
      return { id, data: response.data };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
