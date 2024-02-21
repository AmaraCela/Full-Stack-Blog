import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    'loginUser',
    async (inputs: {
        username: string;
        password: string;
    }, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs)
            });
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data.message);
            }
            return data.user[0];
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
    }, { dispatch }) => {

        const response = await fetch("http://localhost:5000/api/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs)
        });

        if (response.ok) {
            const loginInputs = {
                username: inputs.username,
                password: inputs.password,
            }

            dispatch(loginUser(loginInputs));
        }
    }
);