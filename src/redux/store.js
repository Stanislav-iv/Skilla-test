import { configureStore } from "@reduxjs/toolkit";
import { callApi } from "./callApi";

export const store = configureStore({
    reducer:{
        [callApi.reducerPath]:callApi.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(callApi.middleware),
})