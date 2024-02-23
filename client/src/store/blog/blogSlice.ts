import { createSlice } from "@reduxjs/toolkit";
import { createBlog } from "./blogThunk";


const initialState = {
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
        })
    }
})

export default createBlogSlice.reducer;