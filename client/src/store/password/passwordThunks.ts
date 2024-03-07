import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../../utils/api";
import { RootState } from "../store";

export const changePassword = createAsyncThunk(
    'changePassword',
    async (inputs: {
        currentUsername: string,
        currentPassword: string,
        newPassword: string,
    }, { getState, rejectWithValue }) => {
        const state: RootState = getState() as RootState;
        const token = state.user.token ?? '';
        const response = await createAPI("changePassword", {method:'POST', token: token})(inputs);
        const data = await response.json();

        if (response.status === 200) {
            return data.succesfulMesage;
        }

        return rejectWithValue(data.errorMessage);
    }
)