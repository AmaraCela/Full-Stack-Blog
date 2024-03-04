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

    },
    extraReducers: builder => {
        builder.addCase(changePassword.pending, (state) => {
            state.loading = true;
        }).addCase(changePassword.fulfilled, (state, action) => {
            console.log('heyy');
            state.loading = false;
            state.success = action.payload.succesfulMesage;
            state.error = "";
        }).addCase(changePassword.rejected, (state, action) => {
            console.log('rejected');
            console.log(action.payload);
            state.loading = false;
            state.error = action.payload as string;
            state.success = "";
        })
    }
});

export default passwordSlice.reducer;