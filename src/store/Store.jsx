import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducer/userSlice'


export const Store = configureStore({
    reducer:{
        user: userReducer,

    }
})