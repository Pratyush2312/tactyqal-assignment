import { createAsyncThunk } from '@reduxjs/toolkit';
import React from 'react'
import { axiosInstance } from '../../../config/axiosInstance';

export const registerUser = createAsyncThunk('/auth/register',
    async (credentials, thunkApi) => { 
        try {
            const response = await axiosInstance.post('/auth/register', credentials);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message); 
        }
    }
)

export const loginUser = createAsyncThunk('auth/login',
    async (credentials, thunkApi) => { 
        try {
            const response = await axiosInstance.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)


export const hydrateUser = createAsyncThunk('auth/hydrate',
    async (_, thunkApi) => {
        try {
            const response = await axiosInstance.post('/auth/me');
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
     }
)

export const logoutUser = createAsyncThunk('auth/logout',
    async (_, thunkApi) => { 
        try {
            const response = await axiosInstance.post('/auth/logout');
            return response.data
        } catch (error) {
            
        }
    }
)