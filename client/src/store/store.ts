import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/userSlice";
import profileReducer from "./profile/profileSlice";
import createBlogReducer from "./blog/blogSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        createBlog: createBlogReducer,
    },
})

console.log(store.getState());
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch