import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../../utils/api";

export const populateProfile = createAsyncThunk(
    'profile',
    async (input: {
        user_id: string
    }, { rejectWithValue }) => {
        try {

            const response = await createAPI('profile', {})(input);
            const data = await response.json();

            return response.ok ? data.user[0] : rejectWithValue(data.message);
        }
        catch (error) {

        }
    }
);