import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
 
// Define the initial state for the user data
// const initialState = {
//     users: [], // To store the user data from the API
//     loading: false, // To track loading state
//     error: null, // To store any errors
// };
 
 
 
const prepareData = (fetchedData) => { // this is mapper
    const tabledata = fetchedData.map((entry) => {
        const {
            userId: userId,
            userName: userName,
            password: password,
            createdBy: createdBy,
            roleId: roleId,
            status:status
        } = entry;
        return {
            userId,
            userName,
            password,
            createdBy,
            roleId,
            status
        };
    });
    return tabledata;
};
// Async thunk to fetch user data
export const fetchData = createAsyncThunk(
   
    'users/fetchData',
    async () => {
        try {
            const companyId = localStorage.getItem("companyId");
            const response = await axios.get(`admin/user/getByPage`, {
                params: {
                    companyId: companyId
                }
            });
            return prepareData(response.data.responseData);
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw error;
        }
    }
);
 
// Async thunk to create a user
export const addRow = createAsyncThunk(
    'users/addRow',
    async (data, thunkAPI) => {
        //const token = localStorage.getItem("token");
        try {
            //const payload = {...data, localStorage.getItem("companyId")}
            const payload = {
                ...data,
                companyId: localStorage.getItem("companyId")
            }
            const response = await axios.post("admin/user/create", payload);
            return response.data;
        } catch (error) {
            // Handle any errors
            // todo: handle duplicate row 406 error
            if (error.response.status === 406) return thunkAPI.rejectWithValue("Record already exists please try again");
            console.error("Error sending data to API:", error);
            return thunkAPI.rejectWithValue(error.message)// Rethrow to handle in your component
        }
    }
);
 
// Create the slice
const getManagePayableUser = createSlice({
    name: 'getManageUsers',
    initialState: {
        tableData: [],
        totalPages: 0,
        isLoading: false,
        error: null,
    },
    reducers: {
        setUserData: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearUserData: (state) => {
            return { ...initialState };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                //state.loading = true;
                state.isLoading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                // state.loading = false;
                // state.users = action.payload;
                state.isLoading = false;
                state.tableData = action.payload;
                console.log("returned from users/fetchData: ",action.payload)
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchData.rejected, (state, action) => {
                //state.loading = false;
                //state.error = action.error.message;
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addRow.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addRow.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tableData = [];
                //state.users.push(action.payload);
            })
            .addCase(addRow.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});
 
// Export the actions
export const {} = getManagePayableUser.actions; //setUserData, clearUserData
 
// Export the reducer
export default getManagePayableUser.reducer;