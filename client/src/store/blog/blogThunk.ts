import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../../utils/api";

export const createBlog = createAsyncThunk(
    'createBlog',
    async (blogInfo,
        { rejectWithValue }) => {
        try {
            const response = createAPI('/post', { method: 'POST' })(blogInfo);
        }
        catch(error){
            console.log(error);
        }
    }
);