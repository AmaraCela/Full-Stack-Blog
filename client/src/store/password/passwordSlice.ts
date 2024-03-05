import { createSlice } from "@reduxjs/toolkit";
import { changePassword } from "./passwordThunks";

interface PasswordState {
    loading: boolean;
    error: string;
    success: string;
}

const initialState: PasswordState = {
    loading: false,
    error: "",
    success: "",
}

const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {
        resetPasswordState: (state) => {
            state.loading = false;
            state.error = '';
            state.success = '';
        }
    },
    extraReducers: builder => {
        builder.addCase(changePassword.pending, (state) => {
            state.loading = true;
        }).addCase(changePassword.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload;
            state.error = "";
        }).addCase(changePassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.success = "";
        })
    }
});

export const { resetPasswordState } = passwordSlice.actions;
export default passwordSlice.reducer;