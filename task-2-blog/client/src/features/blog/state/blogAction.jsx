import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

export const createBlogs = createAsyncThunk('blog/create',
    async (data, thunkApi) => { 
        try {
            const response = await axiosInstance.post('/blog/create', data);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

export const fetchBlogs = createAsyncThunk('blog/fetch',
    async (_, thunkApi) => { 
        try {
            const response = await axiosInstance.get("/blog");
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)