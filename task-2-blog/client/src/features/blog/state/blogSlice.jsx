import { createSlice } from "@reduxjs/toolkit";
import {
  createBlogs,
  deleteBlogs,
  editBlog,
  fetchBlogs,
  getBlogsById,
  getBlogsByUser,
  viewBlog,
} from "./blogAction";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    myBlogs: [],
    isLoading: true,
    error: null,
    editingBlog: null,
    viewingBlog: null,
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
      })
      .addCase(getBlogsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editingBlog = action.payload.data;
      })
      .addCase(getBlogsById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedBlog = action.payload.data;
        state.myBlogs = state.myBlogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog,
        );
        state.blogs = state.blogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog,
        );
        state.editingBlog = null;
      })
      .addCase(editBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.data;
      })
      .addCase(viewBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(viewBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.viewingBlog = action.payload.data;
      })
      .addCase(viewBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.data;
      });
  },
});

export default blogSlice.reducer;
