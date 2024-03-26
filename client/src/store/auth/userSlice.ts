import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, editProfile, deleteUser } from "./authThunks";

interface UserState {
    isLoggedIn: boolean;
    loading: boolean;
    token: string | null;
    username: string | null;
    email: string | null;
    id: string | null;
    serverError: string | null;
    profileImg: string | null;
    loginError: string | null;
    signupError: string | null;
    editError: string | null;
    deleteError: string | null;
}

const initialState: UserState = {
    isLoggedIn: false,
    loading: false,
    token: null,
    username: null,
    email: null,
    id: null,
    serverError: null,
    profileImg: null,
    loginError: null,
    signupError: null,
    editError: null,
    deleteError: null,
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
            state.loginError = null;
            state.token = null;
        }, 
        resetError: (state) => { 
            state.serverError = null;
        }
    },
    extraReducers: builder => {
        loginUserBuilder(builder);
        signupUserBuilder(builder);
        editProfileBuilder(builder);
        deleteUserBuilder(builder);
    }
});


const loginUserBuilder = (builder: any) => {
    builder.addCase(loginUser.pending, (state: UserState) => {
        state.isLoggedIn = false;
        state.loading = true;
    }).addCase(loginUser.fulfilled, (state: UserState, action: any) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.username = action.payload.user.username;
        state.email = action.payload.user.email;
        state.id = action.payload.user.user_id;
        state.profileImg = action.payload.user.profile_img;
        state.loginError = null;
        state.token = action.payload.token;
    }).addCase(loginUser.rejected, (state: UserState, action: any) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.username = null;
        state.email = null;
        state.id = null;
        state.profileImg = null;
        state.token = null;
        state.serverError = action.payload.message === 'Failed to fetch' ? 'There was an error connecting to the server.': null;
        state.loginError = action.payload as string;
    });
}

const signupUserBuilder = (builder: any) => {
    builder.addCase(signupUser.pending, (state: UserState) => {
        state.loading = true;
    }).addCase(signupUser.rejected, (state: UserState, action: any) => {
        state.serverError = !action.payload ? action.error.message : null;
        state.signupError = action.payload as string;
        state.loading = false;
    });
}

const editProfileBuilder = (builder: any) => {
    builder.addCase(editProfile.pending, (state: UserState) => {
        state.loading = true;
        state.editError = null;
    }).addCase(editProfile.fulfilled, (state: UserState, action: any) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.username = action.payload.username;
        state.id = action.payload.user_id;
        state.email = action.payload.email;
    }).addCase(editProfile.rejected, (state: UserState, action: any) => {
        state.loading = false;
        state.editError = action.payload as string;
    });
}

const deleteUserBuilder = (builder: any) => {
    builder.addCase(deleteUser.fulfilled, (state: UserState) => {
        state.isLoggedIn = false;
        state.email = null;
        state.username = null;
        state.id = null;
    }).addCase(deleteUser.rejected, (state: UserState, action: any) => {
        state.deleteError = action.payload;
    });
}

export const { logoutUser, resetError } = userSlice.actions;
export default userSlice.reducer;