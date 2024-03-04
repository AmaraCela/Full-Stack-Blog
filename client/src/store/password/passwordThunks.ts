import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../../utils/api";

export const changePassword = createAsyncThunk(
    'changePassword',
    async (inputs: {
        currentUsername: string,
        currentPassword: string,
        newPassword: string,
    }, { rejectWithValue }) => {
        console.log('hereeeeeeeeeeeee');
        const response = await createAPI("changePassword", {method:'POST'})(inputs);
        console.log('object');
        console.log(response);
        const data = await response.json();

        console.log(data);
        if (response.status === 200) {
            return data.succesfulMesage;
        }

        return rejectWithValue(data.errorMessage);

    }
)