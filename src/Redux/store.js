import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/Reducer";

export const store = configureStore({
    reducer:{
        user : userReducer
    }
})