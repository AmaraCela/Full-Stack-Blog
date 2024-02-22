import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, editProfile } from "./authThunks";

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
        }).addCase(signupUser.rejected, (state, action) => {
            state.error = action.payload as string;
        }).addCase(editProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(editProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.username = action.payload.username;
            state.id = action.payload.user_id;
            state.email = action.payload.email;
        }).addCase(editProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;