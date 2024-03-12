import { createSlice } from "@reduxjs/toolkit";
import { createBlog, deleteBlog, getIndividualBlog } from "./blogThunk";
import { BlogType } from "../../types/blogTypes";

type BlogState = {
    loading: boolean;
    successful: boolean;
    error: string | null;
    deleteSuccessful: string | null;
    deleteError: string | null;
    blog: BlogType;
}

const initialState: BlogState = {
    loading: false,
    successful: false,
    error: null,
    deleteSuccessful: null,
    deleteError: null,
    blog: {
        user_id: "",
        username: "",
        email: "",
        profile_pic: "",
        posts: [{
            post_id: "",
            title: "",
            description: "",
            date_posted: "",
            tags: [],
            images: []
        }]
    }
}

const createBlogSlice = createSlice({
    name: 'createBlog',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
       createBlogBuilder(builder);
       getIndividualBlogBuilder(builder);
       deleteBlogBuilder(builder);
    }
});

const createBlogBuilder = (builder: any) => {
    builder.addCase(createBlog.pending, (state: BlogState) => {
        state.loading = true;
    }).addCase(createBlog.fulfilled, (state: BlogState, action: any) => {
        state.successful = true;
        state.error = null;
        state.loading = false;
    }).addCase(createBlog.rejected, (state: BlogState, action: any) => {
        state.error = action.payload as string;
        state.successful = false;
        state.loading = false;
    })
}

const getIndividualBlogBuilder = (builder: any) => {
    builder.addCase(getIndividualBlog.fulfilled, (state: BlogState, action: any) => {
        state.blog = action.payload;
    }).addCase(getIndividualBlog.rejected, (state: BlogState) => {
        state.blog = {
            user_id: "",
            username: "",
            email: "",
            profile_pic: "",
            posts: [{
                post_id: "",
                title: "",
                description: "",
                date_posted: "",
                tags: [],
                images: []
            }]
        }
    })
}

const deleteBlogBuilder = (builder: any) => {
    builder.addCase(deleteBlog.fulfilled, (state: BlogState, action: any) => {
        state.deleteSuccessful = action;
        state.deleteError = null;
    }).addCase(deleteBlog.rejected, (state: BlogState, action: any) => {
        state.deleteError = action;
        state.deleteSuccessful = null;
    })
}

export default createBlogSlice.reducer;