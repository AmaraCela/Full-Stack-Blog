import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../../utils/api";
import { RootState } from "../store";

export const createBlog = createAsyncThunk(
    'createBlog',
    async (blogInfo: FormData,
        { getState, rejectWithValue }) => {
        try {
            const state: RootState = getState() as RootState;
            const token = state.user.token ?? '';
            const response = await fetch("http://localhost:5000/api/post", {
                method: 'POST',
                body: blogInfo,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const data = await response.json();

            return response.ok ? data.successFulMessage : rejectWithValue(data.errorMessage);
        }
        catch (error) {
            console.log(error);
        }
    }
);


export const getIndividualBlog = createAsyncThunk(
    'getIndividualBlog',
    async (post_id: string,
        { rejectWithValue }) => {
            try {
                const response = await createAPI(`singlePost/?post_id=${post_id}`, {})(null);
                const data = await response.json();
                return response.ok ? data.result : rejectWithValue(data.errorMessage);
            }
            catch (error) {
                console.log(error);
            }
        }
);

export const deleteBlog = createAsyncThunk(
    'deleteBlog',
    async (post_id: string,
        { getState, rejectWithValue }) => {
            try {
                const state: RootState = getState() as RootState;
                const token = state.user.token ?? '';
                const response = await createAPI('deleteBlog',{method: 'POST', token })({blog_id: post_id});
                const data = await response.json();
            
                return response.ok ? data.successFulMessage : rejectWithValue(data.errorMessage);

            }
            catch (err) {
                console.log(err);
            }
        }
);