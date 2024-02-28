import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../../utils/api";

export const loginUser = createAsyncThunk(
    'loginUser',
    async (inputs: {
        username: string;
        password: string;
    }, { rejectWithValue }) => {
        try {
            const response = await createAPI('login', { method: 'POST' })(inputs);
            const data = await response.json();
            return !response.ok ? rejectWithValue(data.message) : data.user;
        }
        catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const signupUser = createAsyncThunk(
    'signupUser',
    async (inputs: {
        username: string;
        email: string;
        password: string;
    }, { dispatch, rejectWithValue }) => {

        const response = await createAPI('signup', { method: 'POST' })(inputs);

        if (response.ok) {
            const loginInputs = {
                username: inputs.username,
                password: inputs.password,
            }

            dispatch(loginUser(loginInputs));
        } else {
            const message = await response.json();
            return rejectWithValue(message.message);
        }
    }
);


export const editProfile = createAsyncThunk(
    'editProfile',
    async (inputs: {
        user_id: string;
        username: string;
        email: string;

    }, { rejectWithValue }) => {

        const response = await createAPI('edit', { method: 'POST' })(inputs);
        const data = await response.json();
        return !response.ok ? rejectWithValue(data.message) : data.user;
    }
);