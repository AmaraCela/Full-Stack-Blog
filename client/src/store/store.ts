import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/userSlice";
import profileReducer from "./profile/profileSlice";
import createBlogReducer from "./blog/blogSlice";
import passwordReducer from "./password/passwordSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        createBlog: createBlogReducer,
        password: passwordReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const selectUser = (state: RootState) => state.user;
export const selectProfile = (state: RootState) => state.profile;
export const selectCreateBlog = (state: RootState) => state.createBlog;
export const selectPassword = (state: RootState) => state.password;