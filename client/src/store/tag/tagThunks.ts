import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../../utils/api";
import { RootState } from "../store";

export const retriveTags = createAsyncThunk(
    'retriveTags',
    async (_, { getState, rejectWithValue }) => {
        const state: RootState = getState() as RootState;
        const token = state.user.token ?? '';

        const response = await createAPI('getTags', { token: token })();
        const data = await response.json();

        return response.ok ? data.tags : rejectWithValue(data.message);
    }
);