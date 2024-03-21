import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../types/blogTypes"
import { searchBlog } from "./blogSearchThunks";

type SearchBlogType = {
    blogsByUser: Post[];
    blogsByTitle: Post[];
    blogsByDescription: Post[];
    blogsByTag: Post[];
}

const initialState: SearchBlogType = {
    blogsByUser: [],
    blogsByDescription: [],
    blogsByTitle: [],
    blogsByTag: [],
}

const blogSearchSlice = createSlice({
    name: 'blogSearch',
    initialState, 
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(searchBlog.fulfilled, (state: SearchBlogType, action: any) => {
            state.blogsByUser = action.payload.blogsByUser;
            state.blogsByTitle = action.payload.blogsByTitle;
            state.blogsByDescription = action.payload.blogsByDescription;
            state.blogsByTag = action.payload.blogsByTag;
        }).addCase(searchBlog.rejected, (state: SearchBlogType) => {
            state.blogsByUser = [];
            state.blogsByTitle = [];
            state.blogsByDescription = [];
            state.blogsByTag = [];
        })
    }

});

export default blogSearchSlice.reducer;