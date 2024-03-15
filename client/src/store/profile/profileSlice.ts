import { createSlice } from "@reduxjs/toolkit";
import { populateProfile } from './profileThunks';
import { Tag } from "../tag/tagSlice";
import { Post } from "../../types/blogTypes";

interface User {
    user_id: string;
    username: string;
    email: string;
}

interface ProfileState {
    user: User | null;
    posts: Post[];
    loading: boolean;
    error: string;
}

const initialState: ProfileState = {
    user: null,
    posts: [],
    loading: false,
    error: ''
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(populateProfile.pending, (state) => {
            state.user = null;
            state.posts = [];
            state.loading = true;
            state.error = '';
        }).addCase(populateProfile.fulfilled, (state, action) => {
            const posts = action.payload.posts;
            const userInformation = { user_id: posts[0].user_id, username: posts[0].username, email: posts[0].email };
            state.user = userInformation;
            state.posts = posts;
            state.loading = false;
        }).addCase(populateProfile.rejected, (state, action) => {
            state.error = action.payload as string;
        })

    }
});

export default profileSlice.reducer;