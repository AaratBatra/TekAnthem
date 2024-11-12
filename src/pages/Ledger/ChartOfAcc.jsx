import { TekTable } from "@/components/TekTable";
import {
	fetchData,
	addRow,
	editRow,
	deleteRows,
	searchCOA,
} from "@/store/slices/COASlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import InfiniteScrollCOA from "@/components/InfiniteScrollCOA";
import { Link } from "react-router-dom";
import { Check, LinkIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const demoCols = [
	{
		name: "accountDescription",
		displayName: "Account Name",
		type: "text",
	},
	{
		name: "accountCode",
		displayName: "Account Code",
		type: "number",
		filterFn: (row, columnId, filterValue) => {
			const cellValue = row.getValue(columnId);

			// Convert filterValue to a string for comparison
			const stringFilterValue = filterValue.toString();

			// If cellValue is a number, convert it to a string
			if (typeof cellValue === "number") {
				return cellValue.toString().includes(stringFilterValue);
			}

			// If cellValue is already a string, perform a string comparison
			return cellValue.includes(stringFilterValue);
		},
	},
	{
		name: "group",
		displayName: "Group",
		type: "text",
		autoComplete: true,
		urlPath: "/lookup/",
		peers: ["groupCode", "Type"],
	},
	{
		name: "groupCode",
		displayName: "Group Code",
		type: "number",
		disabled: true,
	},
	{
		name: "Type",
		displayName: "Type",
		type: "text",
		disabled: true,
	},
	{
		name: "subledgerFlag",
		displayName: "Subledger Flag",
		type: "boolean",
	},
];
function resolveType(type, name, row) {
	// row is what you get after destructuring row
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
	} else {
		return row.getValue(name).toString();
	}
}
const editFormConfig = [
	{
		name: "accountDescription",
		displayName: "Account Name",
		type: "text",
	},
	{
		name: "accountCode",
		displayName: "Account Code",
		type: "number",
		disabled: true,
		hideInAdd: true,
	},
	{
		name: "subledgerFlag",
		displayName: "Subledger Flag",
		type: "boolean",
	},
	{
		name: "group",
		displayName: "Group",
		type: "text",
		disabled: true,
		autoComplete: false,
		//urlPath: "/lookup/",
		//peers: ["groupCode", "Type"],
	},
	{
		name: "groupCode",
		displayName: "Group Code",
		type: "number",
		disabled: true,
	},
	{
		name: "Type",
		displayName: "Type",
		type: "text",
		disabled: true,
	},
];

const addFormConfig = [
	{
		name: "accountDescription",
		displayName: "Account Name",
		type: "text",
	},
	{
		name: "accountCode",
		displayName: "Account Code",
		type: "number",
		hideInAdd: true,
	},
	{
		name: "subledgerFlag",
		displayName: "Subledger Flag",
		type: "boolean",
	},
	{
		name: "group",
		displayName: "Group",
		type: "text",
		autoComplete: true,
		urlPath: "/lookup/",
		peers: ["groupCode", "Type"],
	},
	{
		name: "groupCode",
		displayName: "Group Code",
		type: "number",
		disabled: true,
	},
	{
		name: "Type",
		displayName: "Type",
		type: "text",
		disabled: true,
	},
];

const formSchema = z.object({
	accountCode: z.union([
		z.string().min(1, "Account code is required"),
		z.number(),
	]),
	accountDescription: z.string().min(1, "Account name is required"),
	group: z.string().min(3, "Group description is too short"),
	groupCode: z.union([
		z.string().min(1, "Group code is required"),
		z.number(),
	]),
	Type: z.string().min(1, "Group type is required"),
	subledgerFlag: z.boolean(),
});

const addformSchema = z.object({
	accountDescription: z.string().min(1, "Account name is required"),
	group: z.string().min(3, "Group description is too short"),
	groupCode: z.union([
		z.string().min(1, "Group code is required"),
		z.number(),
	]),
	Type: z.string().min(1, "Group type is required"),
	subledgerFlag: z.boolean(),
});
// idea- instead of giving cols, popUpConfig, formSchema, addFormSchema separately, put everything inside tableConfig
// The tableConfig is the only thing that will act as source for all configs to be given to the TekTable
const tableConfig = {
	initialData: null,
	columnsConfig: demoCols,
	resolveType: resolveType,
	showMenu: false,
	menuActions: null,
	avatarColumns: [], // columns where you want to show an avatar
	sortableColumns: ["accountCode", "groupCode", "group"], // columns where you want to enable sorting
	rowLimit: 5, // how many rows per page
	showSelect: true, // make the table show a selectable checkbox or not for each row
	searchConfig: {
		hasAPIsearch: true,
		filterBy: "accountDescription",
		displayName: "Account Name",
	},
	//filterBy: 'accountDescription',
	pagination: {
		hasApiPagination: true, // if false then use tanstack ui pagination
		type: "infinite", // "infinite" OR "normal"
		hasSizeLimit: true,
		defaultRowsPerPage: 5,
	},
	addForm: {
		formSchema: addformSchema,
		formConfig: addFormConfig,
	},
	editForm: {
		formSchema: formSchema,
		formConfig: editFormConfig,
	},
	rtkSliceConfig: {
		hasRTK: true,
		selector: "coa",
		fetchDataThunk: fetchData,
		addRowThunk: addRow,
		editRowThunk: editRow,
		deleteRowThunk: deleteRows,
		searchThunk: searchCOA,
	},
};

const ChartOfAcc = () => {
	return (
		<main className="flex flex-1 flex-col gap-4 p-4 max-md:p-1 lg:gap-6 lg:p-2">
			<div
				style={{
					borderRadius: "6px",
					border: "1px solid #E5E7EB",
					boxShadow: "0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
				}}
				className="max-md:w-[95vw] mx-auto overflow-hidden w-full py-3 md:px-3 max-md:px-2 bg-white dark:bg-slate-900 rounded-lg"
			>
				<h1 className="text-4xl font-bold text-[#305fe1] mb-3 max-md:mb-8">
					Chart of Accounts
				</h1>
				{/* The parent will decide based on tableConfig whether to render InfiniteScrollCOA or TekTable */}
				{/* The TekTable will check for hasAPIPagination and if false will then use basic pagination of tanstack */}
				<InfiniteScrollCOA tableConfig={tableConfig} />
				{/* cols={demoCols} formSchema={formSchema} addformSchema={addformSchema} popUpConfig={popUpConfig} */}
				{/* <TekTable tableConfig={tableConfig} /> */}
			</div>
		</main>
	);
};

export default ChartOfAcc;

//
//{/* <InfiniteScrollCOA cols={demoCols} tableConfig={tableConfig} url={"coa/getByPage"}/> */}
//{/* bg-white dark:bg-[#1e1b47] */}
// {/* dark:bg-[#1e1b47] dark:bg-slate-900*/}

/*
  // const formSchema = z.object({
// 	accountCode: z.union([
//     z.number(),
//     z.string(),
//   ]).min(1, "Account code is required"),
//   accountDescription: z.string().min(1, "Account description is required"),
// 	group: z.string()
//     .min(10, "Group description is too short")
//     .min(1, "Group description is required"),
//   groupCode: z.union([
//     z.number(),
//     z.string(),
//   ]).min(1, "Group code is required"),
//   Type: z.string().min(1, "Group type is required"),
//   subledgerFlag: z.boolean(),
// });
*/
