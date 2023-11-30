import { createSlice } from "@reduxjs/toolkit";

const addPostSlice = createSlice({
    name : 'addpost',
    initialState : {
        isOpen : false,
    },
    reducers : {
        setAddPost: (state :any)=>{
            state.isOpen = !state.isOpen;
        },
    }
})


export const { setAddPost } = addPostSlice.actions;
export default addPostSlice.reducer;
