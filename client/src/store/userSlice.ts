import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";

interface UserState {
    isLoggedIn: boolean;
    loading: boolean;
    token: string | null;
    username: string | null;
    email: string | null;
    id: string | null;
    error: string | null;
}

const initialState: UserState = {
    isLoggedIn: false,
    loading: false,
    token: null,
    username: null,
    email: null,
    id: null,
    error: null,
}

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
)

export const signupUser = createAsyncThunk(
    'signupUser',
    async (inputs: {
        username: string;
        email: string;
        password: string;
    }) => {
        const dispatch = useDispatch();
        const response = await fetch("http://localhost:5000/api/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs)
        })
        if (response.ok) {
            const loginInputs = {
                username: inputs.username,
                password: inputs.password,
            }

            await dispatch(loginUser(loginInputs) as any)
            return useSelector((state: RootState) => state.user)
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.id = null;
            state.username = null;
            state.email = null;
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoggedIn = false;
            state.loading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.loading = false;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.id = action.payload.user_id;
            state.error = null;
        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoggedIn = false;
            state.loading = false;
            state.username = null;
            state.email = null;
            state.id = null;
            state.error = action.payload as string;
        }).addCase(signupUser.pending, (state) => {
            state.isLoggedIn = false;
            state.loading = true;
        }).addCase(signupUser.fulfilled, (state, action: any) => {
            state.isLoggedIn = true;
            state.loading = false;
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
        }).addCase(signupUser.rejected, (state) => {
            state.isLoggedIn = false;
            state.loading = false;
            state.username = null;
            state.email = null;
            state.id = null;
        })
    }
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;