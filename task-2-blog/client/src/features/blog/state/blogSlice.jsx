import { createSlice } from "@reduxjs/toolkit";
import {
  createBlogs,
  deleteBlogs,
  fetchBlogs,
  getBlogsByUser,
} from "./blogAction";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    myBlogs: [],
    isLoading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs.unshift(action.payload.data);
      })
      .addCase(createBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload.data;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getBlogsByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myBlogs = action.payload.data;
      })
      .addCase(getBlogsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myBlogs = state.myBlogs.filter(
          (blog) => blog._id !== action.payload.id,
        );
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.payload.id,
        );
      });
  },
});

export default blogSlice.reducer;
