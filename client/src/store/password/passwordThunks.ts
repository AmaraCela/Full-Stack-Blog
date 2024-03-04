import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../../utils/api";

export const checkPassword = createAsyncThunk(
    'checkPassword',
    async (inputs: {
        currentId: string,
        currentPassword: string,
    }, { rejectWithValue }) => {
        
    }
)