import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

function resolveGroupType(group_type) {
	let grp_type = null;
	if (group_type === "A") {
		grp_type = "Asset";
	} else if (group_type === "L") {
		grp_type = "Liability";
	} else if (group_type === "E") {
		grp_type = "Expense";
	} else if (group_type === "I") {
		grp_type = "Income";
	} else {
		grp_type = group_type;
	}
	return grp_type;
}

const prepareData = (fetchedData) => {
	const tabledata = fetchedData.map((entry) => {
		const {
			accountCode: account_code,
			id: group_id,
			parentAccountCode: group_code,
			groupName: group_description,
			nature: group_type,
			description: account_description,
			type: subledger_flag,
		} = entry;
		//console.log(entry);
		const grp_type = resolveGroupType(group_type);
		return {
			id: group_id,
			groupCode: group_code ? group_code : "null",
			group: group_description ? group_description : "null",
			Type: grp_type ? grp_type : "null",
			accountCode: account_code ? account_code : "null",
			accountDescription: account_description ? account_description : "null",
			subledgerFlag: subledger_flag === "L",
		};
	});
	return tabledata;
};

export const fetchData = createAsyncThunk(
	"coa/fetchData",
	async (data, thunkAPI) => {
		//console.log(data);
		//console.log(thunkAPI);
		try {
			// add a slight delay to test loading state and how UI will look while loading
			// await new Promise((r) => setTimeout(r, 5000));
			const config = {
				page: data.page,
				size: data.rowsPerPage || 10,
				companyId: localStorage.getItem("companyId"),
			};
			const response = await axios.get("coa/getByPage", {
				params: config,
			});
			//console.log(response.data.responseData.content);
			console.log(prepareData(response.data.responseData.content));
			
			return {
				data: prepareData(response.data.responseData.content),
				totalPages: response.data.responseData.totalPages,
			};
		} catch (error) {
			console.error("error while fetching COA table data", error);
			thunkAPI.rejectWithValue(error);
		}
	}
);

export const addRow = createAsyncThunk("coa/addRow", async (data, thunkAPI) => {
	try {
		let obj = data;
		console.log("trying to add row: ", obj);
		if (!obj) throw new Error("No row data provided");
		let grp_type = null;
		if (obj.Type === "Asset" || obj.Type === "asset") {
			grp_type = "A";
		} else if (obj.Type === "Liability" || obj.Type === "liability") {
			grp_type = "L";
		} else if (obj.Type === "Expense" || obj.Type === "expense") {
			grp_type = "E";
		} else if (obj.Type === "Income" || obj.Type === "income") {
			grp_type = "I";
		} else {
			grp_type = obj.Type;
		}
		const payload = {
			description: obj.accountDescription,
			parentAccountCode: obj.groupCode,
			type: "L",//obj.subledgerFlag ? "L" : "A", // L means liability and A means asset
			groupName: obj.group,
			nature: grp_type,
			companyId: localStorage.getItem("companyId"),
			createdBy: localStorage.getItem("username"),
		};
		console.log("payload: ", payload);
		const res = await axios.post("/coa/create", payload);
		console.log("response from coa/create api: ", res.data);
		//if (!res.data.status === "Success") throw new Error("Failed to add new row to COA");
		const arr = new Array(res.data.responseData);
		return prepareData(arr);
	} catch (error) {
		console.error("error while adding new row to COA", error);
		if (error.response?.status === 406) {
			return thunkAPI.rejectWithValue(
				"Account already exists please try again"
			);
		}
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const searchCOA = createAsyncThunk(
	"coa/search",
	async (data, thunkAPI) => {
		try {
			const payload = {
				companyId: localStorage.getItem("companyId"),
				description: data,
			};

			const response = await axios.post("coa/search", payload);
			// console.log(
			// 	"api response from search: ",
			// 	prepareData(response.data.responseData.content)
			// );
			//return prepareData(result.data.responseData.content);
			return {
				data: prepareData(response.data.responseData.content),
				totalPages: response.data.responseData.totalPages,
			};
		} catch (error) {
			console.error("Error while searching in COA", error);
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const editRow = createAsyncThunk(
	"coa/editRow",
	async (data, thunkAPI) => {
		try {
			let obj = data;
			console.log("trying to add row: ", obj);
			if (!obj) throw new Error("No row data provided");
			let grp_type = null;
			if (obj.Type === "Asset" || obj.Type === "asset") {
				grp_type = "A";
			} else if (obj.Type === "Liability" || obj.Type === "liability") {
				grp_type = "L";
			} else if (obj.Type === "Expense" || obj.Type === "expense") {
				grp_type = "E";
			} else if (obj.Type === "Income" || obj.Type === "income") {
				grp_type = "I";
			} else {
				grp_type = obj.Type;
			}
			const payload = {
				id: obj.id,
				description: obj.accountDescription,
				parentAccountCode: obj.groupCode,
				type: "L",//obj.subledgerFlag ? "L" : "A", // L means liability and A means asset
				groupName: obj.group,
				nature: grp_type,
				createdBy: localStorage.getItem("username"),
			};
			/*
				{
    				"description": "PATEL1",
    				"parentAccountCode": "040000012",
    				"type": "L",
    				"groupName": "Indirect Expense",
    				"nature": "A",
    				"createdBy": "BHAUMIK",
    				"id": "f5950992-6115-4ecc-9a7a-81745d8bdc80"
				}
			*/
			console.log("payload: ", payload);
			const res = await axios.post("/coa/update", payload);
			console.log("response from coa/update api: ", res.data);
			//if (!res.data.status === "Success") throw new Error("Failed to add new row to COA");
			const arr = new Array(res.data.responseData);
			return prepareData(arr);
		} catch (error) {
			console.error("error while editing a row in COA", error);
			// if (error.response?.status === 406) {
			// 	return thunkAPI.rejectWithValue(
			// 		"Account already exists please try again"
			// 	);
			// }
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);
export const deleteRows = createAsyncThunk(
	"coa/deleteRows",
	async (data, thunkAPI) => {
		try {
			if (!data || data.length == 0)
				throw new Error("no rows provided to delete");
			const payload = {
				companyId: localStorage.getItem("companyId"),
				createdBy: localStorage.getItem("username"),
				recordIds: data,
			};
			const result = await axios.put("/coa/delete", payload);
			return result.data;
		} catch (error) {
			console.error("error while deleting rows in COA", error);
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);
const coaSlice = createSlice({
	name: "coa",
	initialState: {
		tableData: [],
		totalPages: 0,
		isLoading: false,
		error: null,
	},
	reducers: {
		mockReducer: (state, action) => {
			console.log(state);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchData.fulfilled, (state, action) => {
				state.isLoading = false;
				/*For api paginated COA we update the tableData as action.payload.data only*/
				/*For infinite scroll COA we update the tableData as [...state.tableData, ...action.payload.data]*/
				/*For no pagination either do ...action.payload.data OR [...state.tableData, ...action.payload.data] depends on use case*/
				//state.tableData = [...state.tableData, ...action.payload.data]; // before for paginated coa- action.payload.data
				state.tableData =
					action.meta.arg.page === 0 || action.meta.arg.rowsPerPage
						? action.payload.data
						: [...state.tableData, ...action.payload.data];
				state.totalPages = action.payload.totalPages;
			})
			.addCase(fetchData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			})
			.addCase(addRow.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addRow.fulfilled, (state, action) => {
				console.log("fullfilled payload: ", action.payload);
				console.log("fullfilled error: ", action.error);

				state.isLoading = false;
				state.error = null;
				state.tableData = [];
				//state.tableData = [...state.tableData, ...action.payload];
				state.totalPages = 0;
			})
			.addCase(addRow.rejected, (state, action) => {
				console.log("addRow rejected payload: ", action.payload);
				console.log("addRow rejected error: ", action.error);
				state.isLoading = false;
				state.error = action.payload;
				// state.tableData = [];
				// state.totalPages = 0;
			})
			.addCase(editRow.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editRow.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.tableData = [];
				//state.tableData = [...state.tableData, ...action.payload];
				state.totalPages = 0;
			})
			.addCase(editRow.rejected, (state, action) => {
				console.log("editRow rejected payload: ", action.payload);
				console.log("editRow rejected error: ", action.error);
				state.isLoading = false;
				state.error = action.payload;
				// state.tableData = [];
				// state.totalPages = 0;
			})
			.addCase(deleteRows.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(deleteRows.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.tableData = [];
				/*
					tableData = tableData.filter((row)=> row.id !== action.payload.rowsTodelete)
				*/
				state.totalPages = 0;
			})
			.addCase(deleteRows.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(searchCOA.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(searchCOA.fulfilled, (state, action) => {
				state.isLoading = false;
				//state.tableData = action.payload.data;
				if (action.payload.data.length > 0) {
					state.tableData = action.payload.data;
				}
				state.totalPages = 1;
			})
			.addCase(searchCOA.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default coaSlice.reducer;
export const {} = coaSlice.actions;
