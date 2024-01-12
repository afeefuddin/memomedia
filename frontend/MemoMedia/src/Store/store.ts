import { configureStore } from "@reduxjs/toolkit";
import themeSlice, { ThemeState } from "../theme/themeSlice";
import authSlice,{ AuthState } from "../auth/authSlice";
// import tabSlice from "./tabSlice";
import profileSlice, { ProfileState } from "./profileSlice";
import addPostSlice, { AddPostState } from './addPostSlice'
import searchSlice, { SearchState } from "./searchSlice";

export interface StateType {
    auth : AuthState
    theme : ThemeState,
    profile :  ProfileState,
    addpost : AddPostState,
    search : SearchState,
}

const store = configureStore({
    reducer : {
        auth : authSlice,
        theme : themeSlice,
        profile : profileSlice,
        addpost : addPostSlice,
        search : searchSlice,
        
    }
})
export type AppDispatch = typeof store.dispatch;

export default store;