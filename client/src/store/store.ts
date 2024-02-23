import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/userSlice";
import profileReducer from "./profile/profileSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
    },
})

console.log(store.getState());
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch