import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Iuser {
    username : string;
    email : string;
    post : any;
    follower : any;
    following : any;
    accountCreated : number;
    profilePic : string;

}

interface AuthState {
  isAuthenticated: boolean;
  userData : Iuser;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userData : {
    username : "",
    email : "",
    post : [],
    follower : [],
    following : [],
    accountCreated : 0,
    profilePic : "",
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.userData = action.payload.userData;
    },
    logout  : (state) =>{
        state.isAuthenticated = false;
        state.userData =  {
            username : "",
            email : "",
            post : [],
            follower : [],
            following : [],
            accountCreated : 0,
            profilePic : "",
          }
    }
    // other authentication-related reducers
  },
});

export const { login,logout } = authSlice.actions;
export default authSlice.reducer;
