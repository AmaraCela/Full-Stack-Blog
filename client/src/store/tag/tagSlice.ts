import { createSlice } from "@reduxjs/toolkit";
import { retriveTags } from "./tagThunks";

interface Tag {
    tag_id: string;
    tag_name: string;
}

interface TagState {
    tags: Tag[];
}

const initialState: TagState = {
    tags: [],
}

const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(retriveTags.fulfilled, (state: TagState, action) => {
            state.tags = action.payload;
        })
    },


});

export default tagSlice.reducer;