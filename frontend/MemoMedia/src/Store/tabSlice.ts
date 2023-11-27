import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
    name : 'curtab',
    initialState : {
        activetab :1,
    },
    reducers : {
        setTab: (state,action :any)=>{
            state.activetab = action.payload.tab;
        },
    }
})

export const { setTab } = tabSlice.actions;
export default tabSlice.reducer;
