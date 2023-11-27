import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../theme/themeSlice";
import authSlice from "../auth/authSlice";
import tabSlice from "./tabSlice";

const store = configureStore({
    reducer : {
        auth : authSlice,
        theme : themeSlice,
        curtab : tabSlice,
        
    }
})
export type AppDispatch = typeof store.dispatch;

export default store;