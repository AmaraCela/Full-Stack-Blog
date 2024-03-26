import { createSlice } from "@reduxjs/toolkit";
import { addProfilePicture, populateProfile } from './profileThunks';
import { Post } from "../../types/blogTypes";

interface User {
    user_id: string;
    username: string;
    email: string;
    profile_img: string | null;
    bio: string | null;
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
            console.log(action.payload);
            const posts = action.payload.posts;
            const userInformation = { user_id: posts[0].user_id, username: posts[0].username, email: posts[0].email, profile_img: posts[0].profile_img, bio: posts[0].bio };
            state.user = userInformation;
            state.posts = posts;
            state.loading = false;
        }).addCase(populateProfile.rejected, (state, action) => {
            state.error = action.payload as string;
        }).addCase(addProfilePicture.fulfilled, (state, action) => {
            if (state.user) {
                state.user.profile_img = action.payload ?? '';
            }
        })
        

    }
});

export default profileSlice.reducer;