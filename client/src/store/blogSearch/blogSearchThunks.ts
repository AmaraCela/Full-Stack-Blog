import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../../utils/api";

export const searchBlog = createAsyncThunk(
    'searchBlog',
    async (keyword: {
        keyword: string;
    }, { rejectWithValue }) => {
        try {
            const response = await createAPI('search', {method: 'POST'})(keyword);
            const data = await response.json();
            return response.ok ? data : rejectWithValue(data.errorMessage);
        }
        catch (error) {
            rejectWithValue(error);
        }
    }
)