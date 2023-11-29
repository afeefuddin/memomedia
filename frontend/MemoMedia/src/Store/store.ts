import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../theme/themeSlice";
import authSlice from "../auth/authSlice";
import tabSlice from "./tabSlice";
import profileSlice from "./profileSlice";

const store = configureStore({
    reducer : {
        auth : authSlice,
        theme : themeSlice,
        curtab : tabSlice,
        profile : profileSlice,
        
    }
})
export type AppDispatch = typeof store.dispatch;

export default store;