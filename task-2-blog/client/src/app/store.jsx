import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import authReducer from "../features/auth/state/authSlice";
import blogReducer from "../features/blog/state/blogSlice";
import categoryReducer from "../features/category/state/categorySlice";
import { injectStore } from "../config/axiosInstance";
const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    category: categoryReducer,
  },
});
injectStore(store);
export default store;
