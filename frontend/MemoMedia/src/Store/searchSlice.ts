import { createSlice } from "@reduxjs/toolkit";

export interface SearchState {
    isOpen : boolean
}

const searchSlice = createSlice({
    name : 'search',
    initialState : {
        isOpen : false,
    },
    reducers : {
        setSearch: (state :SearchState)=>{
            state.isOpen = !state.isOpen;
        },
    }
})


export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
