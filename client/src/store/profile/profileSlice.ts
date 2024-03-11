import { createSlice } from "@reduxjs/toolkit";
import { populateProfile } from './profileThunks';
import { Tag } from "../tag/tagSlice";

interface User {
    user_id: string;
    username: string;
    email: string;
}

interface Post {
    post_id: string;
    title: string;
    description: string;
    date_posted: Date;
    tags: Tag[];
    images: string;
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
            const user = action.payload.user;
            const userInformation = { user_id: user.user_id, username: user.username, email: user.email };
            state.user = userInformation;
            state.posts = user.posts;
            state.loading = false;
        }).addCase(populateProfile.rejected, (state, action) => {
            state.error = action.payload as string;
        })

    }
});

export default profileSlice.reducer;