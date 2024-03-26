import { createSlice } from "@reduxjs/toolkit";
import { createBlog, deleteBlog, getBlogs, getIndividualBlog, numberOfBlogs, updateBlog } from "./blogThunk";
import { Post } from "../../types/blogTypes";

type BlogState = {
    loading: boolean;
    successful: boolean;
    error: string | null;
    deleteSuccessful: string | null;
    deleteError: string | null;
    editSuccessful: string | null;
    editError: string | null;
    nrBlogs: number | null;
    blog: Post[];
}

const initialState: BlogState = {
    loading: false,
    successful: false,
    error: null,
    deleteSuccessful: null,
    deleteError: null,
    editSuccessful: null,
    editError: null,
    nrBlogs: null,
    blog: [{
        post_id: "",
        user_id: "",
        username: "",
        email: "",
        profile_img: "",
        title: "",
        description: "",
        date_posted: "",
        tags: [],
        images: []
    }]
}

const createBlogSlice = createSlice({
    name: 'createBlog',
    initialState,
    reducers: {
        resetState(state) {
            state.deleteSuccessful = null;
            state.deleteError = null;
            state.successful = false;
        }
    },
    extraReducers: builder => {
        createBlogBuilder(builder);
        getIndividualBlogBuilder(builder);
        deleteBlogBuilder(builder);
        updateBlogBuilder(builder);
        nrBlogsBuilder(builder);
        getBlogsBuilder(builder);
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
        console.log(action.payload);
        state.blog = action.payload;
    }).addCase(getIndividualBlog.rejected, (state: BlogState) => {
        state.blog = [{
            post_id: "",
            user_id: "",
            username: "",
            email: "",
            profile_img: "",
            title: "",
            description: "",
            date_posted: "",
            tags: [],
            images: []
        }]
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

const updateBlogBuilder = (builder: any) => {
    builder.addCase(updateBlog.fulfilled, (state: BlogState, action: any) => {
        state.editSuccessful = action;
        state.editError = null;
    }).addCase(updateBlog.rejected, (state: BlogState, action: any) => {
        state.editError = action;
        state.editSuccessful = null;
    })
}

const nrBlogsBuilder = (builder: any) => {
    builder.addCase(numberOfBlogs.fulfilled, (state: BlogState, action: any) => {
        state.nrBlogs = action.payload;
    }).addCase(numberOfBlogs.rejected, (state: BlogState) => {
        state.nrBlogs = null;
    })
}

const getBlogsBuilder = (builder: any) => {
    builder.addCase(getBlogs.fulfilled, (state: BlogState, action: any) => {
        state.blog = action.payload;
    })
}

export default createBlogSlice.reducer;
export const { resetState } = createBlogSlice.actions;