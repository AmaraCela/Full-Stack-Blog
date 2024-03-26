import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../../utils/api";
import { RootState } from "../store";

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
            return rejectWithValue(error);
        }
    }
);

export const addProfilePicture = createAsyncThunk(
    'addProfilePicture',
    async (info: FormData,
        { getState, rejectWithValue }) => {
        try {
            console.log(info);
            const state: RootState = getState() as RootState;
            const token = state.user.token ?? '';
            const response = await fetch("http://localhost:5000/api/profileImg", {
                method: 'POST',
                body: info,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            
            const data = await response.json();
            console.log(data);
        
            //to do
            return response.ok ? data.path : rejectWithValue(data.errorMessage);
        }
        catch (error) {
            console.log(error);
        }
    }
)