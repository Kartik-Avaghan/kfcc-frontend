import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";


const token = localStorage.getItem("token");


let decodedUser = null;

if (token) {
  try {
    decodedUser = jwtDecode(token);
  } catch (error) {
    console.error("Invalid token, clearing storage");
    localStorage.removeItem("token");
  }
}


const initialState = {
  user: decodedUser
    ? {
        id: decodedUser.userid,                 
        name: decodedUser.username,             
        phone: decodedUser.sub, 
        // roles: Array.isArray(decodedUser.userrole)
        //   ? decodedUser.userrole
        //   : [decodedUser.userrole],                
        roles: Array.isArray(decodedUser.userrole)
          ? decodedUser.userrole[0]
          : decodedUser.userrole,              
      }
    : null,
      
  isAuthenticated: !!decodedUser,
  authReady: true,                              
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.authReady = true;
    },

    userLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.authReady = true;
      localStorage.removeItem("token");
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
