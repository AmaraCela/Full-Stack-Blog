import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: buildGetDefaultMiddleware =>
        buildGetDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
