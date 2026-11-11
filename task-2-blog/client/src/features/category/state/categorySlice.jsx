import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./categoryAction";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        isLoading: true,
        categories: [],
        error:null
    },
    extraReducers: (builder) => { 
        builder
            .addCase(getCategories.pending, (state) => { 
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => { 
                state.isLoading = false;
                state.categories = action.payload.data;
            })
            .addCase(getCategories.rejected, (state) => { 
                state.isLoading = false;
                state.error = null;
            })
    }
})

export default categorySlice.reducer;