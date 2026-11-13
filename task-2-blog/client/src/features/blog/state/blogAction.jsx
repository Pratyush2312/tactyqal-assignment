import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

export const createBlogs = createAsyncThunk(
  "blog/create",
  async (data, thunkApi) => {
    try {
      const response = await axiosInstance.post("/blog/create", data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const fetchBlogs = createAsyncThunk(
  "blog/fetch",
  async (_, thunkApi) => {
    try {
      const response = await axiosInstance.get("/blog");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getBlogsByUser = createAsyncThunk(
  "blogs/user",
  async (_, thunkApi) => {
    try {
      const response = await axiosInstance.get("/blog/me");
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const deleteBlogs = createAsyncThunk(
  "blogs/delete",
  async (id, thunkApi) => {
    try {
      const response = await axiosInstance.delete(`/blog/delete/${id}`);
      return { id, data: response.data };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getBlogsById = createAsyncThunk(
  "blogs/fetchById",
  async (id, thunkApi) => {
    try {
      const response = await axiosInstance.get(`/blog/id/${id}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const editBlog = createAsyncThunk(
  "blogs/edit",
  async ({ id, data }, thunkApi) => {
    try {
      const response = await axiosInstance.put(`/blog/update/${id}`, data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const viewBlog = createAsyncThunk(
  "blogs/view",
  async (slug, thunkApi) => { 
    try {
      const response = await axiosInstance.get(`blog/slug/${slug}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);