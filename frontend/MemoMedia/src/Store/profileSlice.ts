import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name : 'profile',
    initialState : {
        isOpen : false,
    },
    reducers : {
        setOpen: (state,action :any)=>{
            state.isOpen = !state.isOpen;
        },
    }
})

export const { setOpen } = profileSlice.actions;
export default profileSlice.reducer;
