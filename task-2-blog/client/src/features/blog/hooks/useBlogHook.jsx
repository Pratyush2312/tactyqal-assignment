import React from 'react'
import { axiosInstance } from '../../../config/axiosInstance';

export const fetchAllBlogs = async () => { 
    try {
        const response = await axiosInstance.get('/blog')
        console.log(response.data)
    } catch (error) {
      console.log(error)  
    }
}
