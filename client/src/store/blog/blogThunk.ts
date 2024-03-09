import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBlog = createAsyncThunk(
    'createBlog',
    async (blogInfo: FormData,
        { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/api/post", {
                method: 'POST',
                body: blogInfo
            });
            const data = await response.json();

            return response.ok ? data.successFulMessage : rejectWithValue(data.errorMessage);
        }
        catch (error) {
            console.log(error);
        }
    }
);
