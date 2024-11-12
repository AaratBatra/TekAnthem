import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    voucherNo: '',
    voucherDate: '',
    bank: '',
    branch: '',
    comments: '',
  },
  tableData: [],
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    updateFormData(state, action) {
    //   console.log("current form data")
    //   console.log(state.formData)
    //   console.log("new form data")
    //   console.log(action.payload)
      state.formData = action.payload;
    },
    updateTableData(state, action) {
    //   console.log("current table data");
    //   console.log(state.tableData)
    //   console.log("new table data")
    //   console.log(action.payload)
      state.tableData = action.payload;
    },
  },
});

export const { updateFormData, updateTableData } = paymentSlice.actions;

export default paymentSlice.reducer;
