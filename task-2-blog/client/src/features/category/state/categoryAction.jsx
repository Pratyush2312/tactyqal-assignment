import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

export const getCategories = createAsyncThunk('categories/fetch',
    async (_,thunkApi) => { 
        try {
            const response = await axiosInstance.get('/category');
            return response.data;
            console.log(response.data);
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)