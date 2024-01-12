import { createSlice } from "@reduxjs/toolkit";

export interface AddPostState {
    isOpen : boolean
}

const addPostSlice = createSlice({
    name : 'addpost',
    initialState : {
        isOpen : false,
    },
    reducers : {
        setAddPost: (state :AddPostState)=>{
            state.isOpen = !state.isOpen;
        },
    }
})


export const { setAddPost } = addPostSlice.actions;
export default addPostSlice.reducer;
