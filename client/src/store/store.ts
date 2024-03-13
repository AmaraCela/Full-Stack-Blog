import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/userSlice";
import profileReducer from "./profile/profileSlice";
import createBlogReducer from "./blog/blogSlice";
import passwordReducer from "./password/passwordSlice";
import tagReducer from "./tag/tagSlice";
import blogReducer from "./blog/blogSlice";
import { useDispatch } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    createBlog: createBlogReducer,
    password: passwordReducer,
    tag: tagReducer,
    blog: blogReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const selectUser = (state: RootState) => state.user;
export const selectProfile = (state: RootState) => state.profile;
export const selectCreateBlog = (state: RootState) => state.createBlog;
export const selectPassword = (state: RootState) => state.password;
export const selectTag = (state: RootState) => state.tag;
export const selectBlog = (state: RootState) => state.blog;
export const persistor = persistStore(store);