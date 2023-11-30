import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../theme/themeSlice";
import authSlice from "../auth/authSlice";
import tabSlice from "./tabSlice";
import profileSlice from "./profileSlice";
import addPostSlice from './addPostSlice'

const store = configureStore({
    reducer : {
        auth : authSlice,
        theme : themeSlice,
        curtab : tabSlice,
        profile : profileSlice,
        addpost : addPostSlice,
        
    }
})
export type AppDispatch = typeof store.dispatch;

export default store;