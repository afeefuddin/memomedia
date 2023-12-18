import { createSlice, PayloadAction } from '@reduxjs/toolkit';
 

interface ThemeState {
    currentTheme: string;
  }
  
  const initialState: ThemeState = {
    currentTheme: localStorage.getItem('theme')||"dark",
  };
const themeSlice = createSlice({
    name : "theme",
    initialState,
    reducers : {
        setTheme: (state, action: PayloadAction<string>) => {
            state.currentTheme = action.payload;
          },
    }
})
export const {setTheme} = themeSlice.actions;
export default themeSlice.reducer;