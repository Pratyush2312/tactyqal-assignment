import { createSlice } from "@reduxjs/toolkit";
import { createBlogs, fetchBlogs } from "./blogAction";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
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
      });
  },
});

export default blogSlice.reducer;
