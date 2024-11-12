import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "./slices/paymentSlice";
import authReducer from "./slices/AuthSlice";
import coaReducer from "./slices/COASlice";
import manageUser from "./slices/ManageUsersSlice";

export const store = configureStore({
    reducer: {
        payment: paymentReducer,
        auth: authReducer,
        coa: coaReducer,
        manageUsers: manageUser
    }
})
