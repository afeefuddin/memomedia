import { createSlice } from "@reduxjs/toolkit";

export interface ProfileState {
    isOpen : boolean
}

const profileSlice = createSlice({
    name : 'profile',
    initialState : {
        isOpen : false,
    },
    reducers : {
        setOpen: (state :ProfileState)=>{
            state.isOpen = true
        },
        setClose : (state : ProfileState) =>{
            state.isOpen = false
        }
    }
})


export const { setOpen,setClose } = profileSlice.actions;
export default profileSlice.reducer;
