import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../theme/themeSlice";
import authSlice from "../auth/authSlice";

const store = configureStore({
    reducer : {
        auth : authSlice,
        theme : themeSlice,
    }
})
export type AppDispatch = typeof store.dispatch;

export default store;