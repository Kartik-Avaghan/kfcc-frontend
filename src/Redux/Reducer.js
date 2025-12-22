import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        userLogin:(state, action)=>{
             const payload = action.payload;

      state.user = {
        id: payload.id,
        name: payload.name,
        phone: payload.phone,
        roles: Array.isArray(payload.roles)
          ? payload.roles
          : [payload.roles], // ✅ enforce array
      };
            state.isAuthenticated = true;
        },
        userLogout:(state)=>{
            state.user = null;
            state.isAuthenticated = false;
        }
},
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;