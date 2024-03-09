import { createSlice } from "@reduxjs/toolkit";
import { createBlog } from "./blogThunk";

type BlogState = {
    loading: boolean;
    successful: boolean;
    error: string | null;
}

const initialState: BlogState = {
    loading: false,
    successful: false,
    error: null
}

const createBlogSlice = createSlice({
    name: 'createBlog',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(createBlog.pending, (state) => {
            state.loading = true;
        }).addCase(createBlog.fulfilled, (state, action) => {
            state.successful = true;
            state.error = null;
        }).addCase(createBlog.rejected, (state, action) => {
            state.error = action.payload as string;
            state.successful = false;
        })

    }
})

export default createBlogSlice.reducer;