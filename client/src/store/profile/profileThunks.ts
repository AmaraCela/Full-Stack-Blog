import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../../utils/api";

export const populateProfile = createAsyncThunk(
    'profile',
    async (user_id: string,
        { rejectWithValue }) => {
        try {
            const response = await createAPI(`profile?user_id=${user_id}`, {})(null);
            const data = await response.json();
            return response.ok ? data : rejectWithValue(data.message);
        }
        catch (error) {
            console.log(error);
        }
    }
);