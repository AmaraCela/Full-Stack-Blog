import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../../utils/api";

export const changePassword = createAsyncThunk(
    'changePassword',
    async (inputs: {
        currentUsername: string,
        currentPassword: string,
        newPassword: string,
    }, { rejectWithValue }) => {
        const response = await createAPI("changePassword", {method:'POST'})(inputs);
        const data = await response.json();

        if (response.status === 200) {
            return data.succesfulMesage;
        }

        return rejectWithValue(data.errorMessage);
    }
)