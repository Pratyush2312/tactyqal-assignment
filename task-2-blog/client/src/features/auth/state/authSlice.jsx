import { createSlice } from "@reduxjs/toolkit";
import { hydrateUser, loginUser, logoutUser } from "./authAction";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    accessToken: null,
    error: null,
  },

  reducers: {
    removeUser: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(hydrateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(hydrateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(hydrateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.accessToken = null;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state,action) => {
        state.isLoading = false;
        state.error=action.payload
      });
  },
});

export const { removeUser } = authSlice.actions;

export default authSlice.reducer;
