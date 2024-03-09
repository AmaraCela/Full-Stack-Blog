import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../../utils/api";

export const createBlog = createAsyncThunk(
    'createBlog',
    async (blogInfo: FormData,
        { rejectWithValue }) => {
        try {
            // const response = createAPI('post', { method: 'POST' })(blogInfo);
            const response = await fetch("http://localhost:5000/api/post", {
                method: 'POST',
                body: blogInfo
            });
        }
        catch (error) {
            console.log(error);
        }
    }
);