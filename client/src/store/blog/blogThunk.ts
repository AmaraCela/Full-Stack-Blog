import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../../utils/api";

export const createBlog = createAsyncThunk(
    'createBlog',
    async (blogInfo: FormData,
        { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/api/post", {
                method: 'POST',
                body: blogInfo
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
                console.log(data);
                return response.ok ? data.result : data.errorMessage;
            }
            catch (error) {
                console.log(error);
            }
        }
)