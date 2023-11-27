import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Iuser {
    userId :  string
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
const getTokenFromLocalStorage = (): boolean  => {
    if( localStorage.getItem('jwt_token_id')===null){
      return false

    }
    return true
  
};
const getDataFromLocalStorage= (): any =>{
   if( localStorage.getItem('user')===null){
    return {
      userId : "",
      username : "",
      email : "",
      post : [],
      follower : [],
      following : [],
      accountCreated : 0,
      profilePic : "",
  }

  }
  const userJsonString = localStorage.getItem('user');
  const user = userJsonString ? JSON.parse(userJsonString) : null;

  
    return user;
    
}
const initialState: AuthState = {
    isAuthenticated: getTokenFromLocalStorage() ,
    userData : getDataFromLocalStorage()
  
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
            userId : "",
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
