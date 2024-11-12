import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     companyName: null,
//     userID: null,
//     username: null,
//     isAuthenticated: false
// }
const getInitialState = () => {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;
    return {
        companyName: isAuthenticated ? localStorage.getItem('companyName') : null,
        userID: isAuthenticated ? localStorage.getItem('userID') : null,
        username: isAuthenticated ? localStorage.getItem('username') : null,
        companyId: isAuthenticated ? localStorage.getItem('companyId') : null,
        isAuthenticated
    };
};

const initialState = getInitialState();

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        performLogin: (state, action) => {
            const {companyName, userID, username, companyId} = action.payload;
            
            state.companyName = companyName;
            state.userID = userID;
            state.username = username;
            state.isAuthenticated = true;
            state.companyId = companyId;
            localStorage.setItem('companyName', companyName);
            localStorage.setItem('userID', userID);
            localStorage.setItem('username', username);
            localStorage.setItem('companyId', companyId);
            //localStorage.setItem('token', token);
        },
        performLogout: (state) => {
            state.companyName = null;
            state.userID = null;
            state.username = null;
            state.isAuthenticated = false;
            state.companyId = null;
            localStorage.removeItem('companyName');
            localStorage.removeItem('companyId')
            localStorage.removeItem('userID');
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            localStorage.clear();
        }
    }
})

export const {performLogin, performLogout} = authSlice.actions;
export default authSlice.reducer;