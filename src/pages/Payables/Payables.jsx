//import SandeepTable from "@/components/UserMgmtTable";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TekTable } from "@/components/TekTable";
import {addRow, fetchData} from "@/store/slices/ManageUsersSlice";
import {z} from "zod"
function resolveType(type, name, row) {
	if (type === "number") {
		return `${row.getValue(name)}`;
	} else if (type === "cash") {
		return `₹ ${row.getValue(name).toLocaleString()}`;
	} else if (type === "link") {
		return (
			<Link
				to={row.getValue(name)}
				target="_blank"
				className="flex items-center justify-center"
			>
				<div className="flex items-center">
					<LinkIcon className="w-4 h-4 mr-1" />
					Link
				</div>
			</Link>
		);
	} else if (type === "comment") {
		if (row.getValue(name).length > 0) {
			const arr = row.getValue(name).split(" ");
			if (arr.length > 3) {
				return `${arr[0]}...${arr[arr.length - 1]}`;
			} else {
				return row.getValue(name);
			}
		} else {
			return row.getValue(name);
		}
	} else if (type == "boolean") {
		const x = row.getValue(name);
		return (
			<Button variant="ghost" size="icon" asChild>
				{x ? (
					<Check className="text-green-500 w-4 h-4" />
				) : (
					<X className="text-red-500 w-4 h-4" />
				)}
			</Button>
		);
	} else if (type == "status") {
		const x = row.getValue(name);

		return (
			<>
				<div
					className="rounded-xl text-black dark:text-white px-[7px] py-[5px]"
					style={{ backgroundColor: "#5CB85C" }}
				>
					{x}
				</div>
			</>
		);
	} else if (type === "password") {
		return "******"; // Mask the password with ***
		// return null  // skip data in table cell
	} else if (type === "roleId") {
		const role_id = row.getValue(name);
		const shortenedRoleId = role_id.substring(0, 5) + "...";
		return shortenedRoleId;
	} else {
		return row.getValue(name).toString();
	}
}
const demoCols = [
	{
		name: "userId",
		displayName: "User ID",
		type: "text",
	},
	{
		name: "userName",
		displayName: "User Name",
		type: "text",
	},
	{
		name: "password",
		displayName: "Password",
		type: "password",
		// disabled:true,
	},
	// {
	//     name: 'companyId',
	//     displayName: 'Company ID',
	//     type: 'text',
	//     disabled: true
	// },
	{
		name: "createdBy",
		displayName: "Created By",
		type: "text",
	},
	{
		name: "status",
		displayName: "Status",
		type: "status",
	},
	{
		name: "roleId",
		displayName: "Role ID",
		type: "roleId",
	},
];

const formSchema = z.object({
    userId: z.string().min(1, { message: "User ID is required" }), // Ensure userId is not empty
    userName: z.string().min(1, { message: "User Name is required" }), // Ensure userName is not empty
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }), // Ensure password has a minimum length
    // companyId: z.string().min(1, { message: "Company ID is required" }), // Ensure companyId is not empty
    createdBy: z.string().min(1, { message: "Created By is required" }), // Ensure createdBy is not empty
    roleId: z.string().min(1, { message: "Role ID is required" }) // Ensure roleId is not empty
});
const tableConfig = {
	initialData: null,
	columnsConfig: demoCols,
	resolveType: resolveType,
	avatarColumns: [], // columns where you want to show an avatar
	sortableColumns: ["userId", "userName", "roleId"], // columns where you want to enable sorting
	rowLimit: 5, // how many rows per page
	showSelect: true, // make the table show a selectable checkbox or not for each row
	searchConfig: {
		hasAPIsearch: false,
		filterBy: "userName",
		displayName: "User Name",
	},
	//filterBy: 'accountDescription',
	pagination: {
		hasApiPagination: false, // if false then use tanstack ui pagination
		type: "infinite", // "infinite" OR "normal"
		hasSizeLimit: false,
		defaultRowsPerPage: 20,
	},
	addForm: {
		formSchema: formSchema,
		formConfig: demoCols,
	},
	editForm: {
		formSchema: formSchema,
		formConfig: demoCols,
	},
	rtkSliceConfig: {
		hasRTK: true,
		selector: "manageUsers",
		fetchDataThunk: fetchData,
		addRowThunk: addRow,
		//editRowThunk: editRow,
		//deleteRowThunk: deleteRow || undefined,
		//searchThunk: searchCOA,
	},
};
const Payables = () => {
	return (
		<div>
			<main className="flex flex-1 flex-col gap-4 p-4 max-md:p-1 lg:gap-6 lg:p-2">
				<div
					style={{
						borderRadius: "6px",
						border: "1px solid #E5E7EB",
						boxShadow: "0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
					}}
					className="max-md:w-[95vw] mx-auto overflow-hidden w-full py-3 md:px-3 max-md:px-2 bg-white dark:bg-slate-900 rounded-lg"
				>
					<h1 className="text-4xl font-bold text-[#305fe1] mb-3 max-md:mb-8">Payables</h1>
					<TekTable tableConfig={tableConfig}/>
				</div>
			</main>
		</div>
	);
};

export default Payables;
