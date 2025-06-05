import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice"
import loanReducer from "./redux/loanSlice"
import usersReducer from "./redux/usersSlice"
import messageReducer from "./redux/messageSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        loan: loanReducer,
        users: usersReducer,
        message: messageReducer,
    },
})