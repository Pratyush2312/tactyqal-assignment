import React from 'react'
import { useDispatch } from 'react-redux';
import { getCategories } from '../state/categoryAction';

const useCategory = () => {
    const dispatch = useDispatch();
    const fetchCategories = () => { 
        try {
            dispatch(getCategories());
        } catch (error) {
            console.log(error);
        }
    }
    return {
        fetchCategories,
    }
}

export default useCategory
