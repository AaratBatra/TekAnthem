import { TekTable } from "@/components/TekTable";
import {
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash, UserPlus } from "lucide-react";
import { z } from "zod";
import { CustomersTable } from "./components/CustomersTable";
import { customerColumns } from "./components/columns";
import { vendorColumns } from "./components/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CanceledError } from "axios";
import RenderChart from "./components/RenderChart";

const customersData = [
	{
		customerName: "Jane Cooper",
		company: "Microsoft",
		phoneNumber: "(225) 555-0118",
		email: "jane@microsoft.com",
		country: "United States",
		q1: "200",
		q2: "300",
		q3: "320",
		q4: "250",
		status: "Active",
		subRows: [
			{
				customerName: "Floyd Miles",
				company: "Yahoo",
				phoneNumber: "(205) 555-0100",
				email: "floyd@yahoo.com",
				country: "Réunion",
				q1: "210",
				q2: "300",
				q3: "310",
				q4: "240",
				status: "Active",
				subRows: [
					{
						customerName: "Alan Turing",
						company: "Tesla",
						phoneNumber: "(205) 123-1234",
						email: "alanturing@tesla.com",
						country: "Kiribati",
						q1: "210",
						q2: "300",
						q3: "310",
						q4: "240",
						status: "Inactive",
					},
					{
						customerName: "Alan Pearson",
						company: "Microsoft",
						phoneNumber: "(205) 555-0111",
						email: "pearson@microsoft.com",
						country: "India",
						q1: "210",
						q2: "300",
						q3: "310",
						q4: "240",
						status: "Inactive",
					},
					{
						customerName: "Karl Painter",
						company: "Google",
						phoneNumber: "(205) 444-0112",
						email: "karl@google.com",
						country: "Japan",
						q1: "210",
						q2: "300",
						q3: "310",
						q4: "240",
						status: "Active",
					},
				],
			},
			{
				customerName: "Alan Pearson",
				company: "Microsoft",
				phoneNumber: "(205) 555-0111",
				email: "floyd@microsoft.com",
				country: "India",
				status: "Inactive",
				q1: "210",
				q2: "300",
				q3: "310",
				q4: "240",
				canExpand: true,
				//expandedContent: <RenderChart row={row} />,
			},
			{
				customerName: "Karl Floyd",
				company: "Google",
				phoneNumber: "(205) 555-0112",
				email: "floyd@google.com",
				country: "Japan",
				q1: "210",
				q2: "300",
				q3: "310",
				q4: "240",
				status: "Active",
			},
		],
	},
	{
		customerName: "Floyd Miles",
		company: "Yahoo",
		phoneNumber: "(205) 555-0100",
		email: "floyd@yahoo.com",
		country: "Kiribati",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Active",
	},
	{
		customerName: "Ronald Richards",
		company: "Adobe",
		phoneNumber: "(302) 555-0107",
		email: "ronald@adobe.com",
		country: "Israel",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Active",
	},
	{
		customerName: "Marvin McKinney",
		company: "Tesla",
		phoneNumber: "(252) 555-0126",
		email: "marvin@tesla.com",
		country: "Iran",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Active",
	},
	{
		customerName: "Jerome Bell",
		company: "Google",
		phoneNumber: "(629) 555-0129",
		email: "jerome@google.com",
		country: "Réunion",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Active",
	},
	{
		customerName: "Kathryn Murphy",
		company: "Microsoft",
		phoneNumber: "(406) 555-0120",
		email: "kathryn@microsoft.com",
		country: "Curaçao",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Inactive",
	},
	{
		customerName: "Jacob Jones",
		company: "Yahoo",
		phoneNumber: "(208) 555-0112",
		email: "jacob@yahoo.com",
		country: "Brazil",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Inactive",
	},
	{
		customerName: "Kristin Watson",
		company: "Facebook",
		phoneNumber: "(704) 555-0127",
		email: "kristin@facebook.com",
		country: "Åland Islands",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Inactive",
	},
	{
		customerName: "Jacob Jones",
		company: "Yahoo",
		phoneNumber: "(208) 555-0112",
		email: "jacob@yahoo.com",
		country: "Brazil",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Active",
	},
	{
		customerName: "Kristin Watson",
		company: "Facebook",
		phoneNumber: "(704) 555-0127",
		email: "kristin@facebook.com",
		country: "Åland Islands",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Inactive",
	},
	{
		customerName: "Jacob Jones",
		company: "Yahoo",
		phoneNumber: "(208) 555-0112",
		email: "jacob@yahoo.com",
		country: "Brazil",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Inactive",
	},
	{
		customerName: "Kristin Watson",
		company: "Facebook",
		phoneNumber: "(704) 555-0127",
		email: "kristin@facebook.com",
		country: "Åland Islands",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Inactive",
	},
	{
		customerName: "Jacob Jones",
		company: "Yahoo",
		phoneNumber: "(208) 555-0112",
		email: "jacob@yahoo.com",
		country: "Brazil",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Active",
	},
	{
		customerName: "Kristin Watson",
		company: "Facebook",
		phoneNumber: "(704) 555-0127",
		email: "kristin@facebook.com",
		country: "Åland Islands",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Active",
	},
	{
		customerName: "Jacob Jones",
		company: "Yahoo",
		phoneNumber: "(208) 555-0112",
		email: "jacob@yahoo.com",
		country: "Brazil",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Active",
	},
	{
		customerName: "Kristin Watson",
		company: "Facebook",
		phoneNumber: "(704) 555-0127",
		email: "kristin@facebook.com",
		country: "Åland Islands",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Inactive",
	},
	{
		customerName: "Jacob Jones",
		company: "Yahoo",
		phoneNumber: "(208) 555-0112",
		email: "jacob@yahoo.com",
		country: "Brazil",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Inactive",
	},
	{
		customerName: "Jerome Bell",
		company: "Google",
		phoneNumber: "(629) 555-0129",
		email: "jerome@google.com",
		country: "Réunion",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Active",
	},
	{
		customerName: "Kathryn Murphy",
		company: "Microsoft",
		phoneNumber: "(406) 555-0120",
		email: "kathryn@microsoft.com",
		country: "Curaçao",
		q1: "210",
		q2: "300",
		q3: "310",
		q4: "240",
		status: "Inactive",
	},
];

const vendorsData = [
	{
		vendorName: "Jane Cooper",
		company: "Microsoft",
		phoneNumber: "(225) 555-0118",
		email: "jane@microsoft.com",
		country: "United States",
		status: "Active",
	},
	{
		vendorName: "Floyd Miles",
		company: "Yahoo",
		phoneNumber: "(205) 555-0100",
		email: "floyd@yahoo.com",
		country: "Kiribati",
		status: "Active",
	},
	{
		vendorName: "Ronald Richards",
		company: "Adobe",
		phoneNumber: "(302) 555-0107",
		email: "ronald@adobe.com",
		country: "Israel",
		status: "Active",
	},
	{
		vendorName: "Marvin McKinney",
		company: "Tesla",
		phoneNumber: "(252) 555-0126",
		email: "marvin@tesla.com",
		country: "Iran",
		status: "Active",
	},
	{
		vendorName: "Jerome Bell",
		company: "Google",
		phoneNumber: "(629) 555-0129",
		email: "jerome@google.com",
		country: "Réunion",
		status: "Active",
	},
	{
		vendorName: "Kathryn Murphy",
		company: "Microsoft",
		phoneNumber: "(406) 555-0120",
		email: "kathryn@microsoft.com",
		country: "Curaçao",
		status: "Active",
	},
	{
		vendorName: "Jacob Jones",
		company: "Yahoo",
		phoneNumber: "(208) 555-0112",
		email: "jacob@yahoo.com",
		country: "Brazil",
		status: "Inactive",
	},
	{
		vendorName: "Kristin Watson",
		company: "Facebook",
		phoneNumber: "(704) 555-0127",
		email: "kristin@facebook.com",
		country: "Åland Islands",
		status: "Inactive",
	},
	{
		vendorName: "Jacob Jones",
		company: "Yahoo",
		phoneNumber: "(208) 555-0112",
		email: "jacob@yahoo.com",
		country: "Brazil",
		status: "Inactive",
	},
	{
		vendorName: "Kristin Watson",
		company: "Facebook",
		phoneNumber: "(704) 555-0127",
		email: "kristin@facebook.com",
		country: "Åland Islands",
		status: "Inactive",
	},
	{
		vendorName: "Jacob Jones",
		company: "Yahoo",
		phoneNumber: "(208) 555-0112",
		email: "jacob@yahoo.com",
		country: "Brazil",
		status: "Inactive",
	},
	{
		vendorName: "Kristin Watson",
		company: "Facebook",
		phoneNumber: "(704) 555-0127",
		email: "kristin@facebook.com",
		country: "Åland Islands",
		status: "Inactive",
	},
	{
		vendorName: "Jacob Jones",
		company: "Yahoo",
		phoneNumber: "(208) 555-0112",
		email: "jacob@yahoo.com",
		country: "Brazil",
		status: "Inactive",
	},
	{
		vendorName: "Kristin Watson",
		company: "Facebook",
		phoneNumber: "(704) 555-0127",
		email: "kristin@facebook.com",
		country: "Åland Islands",
		status: "Active",
	},
	{
		vendorName: "Jerome Bell",
		company: "Google",
		phoneNumber: "(629) 555-0129",
		email: "jerome@google.com",
		country: "Réunion",
		status: "Active",
	},
	{
		vendorName: "Kathryn Murphy",
		company: "Microsoft",
		phoneNumber: "(406) 555-0120",
		email: "kathryn@microsoft.com",
		country: "Curaçao",
		status: "Inactive",
	},
];

const Customer = () => {
	return (
		<main className="flex flex-col gap-4 max-md:p-1 py-2 lg:gap-6">
			<div className="max-md:w-[100vw] mx-auto overflow-hidden w-full bg-muted/40 dark:bg-slate-900 rounded-lg">
				<div className="w-full h-20 bg-white dark:bg-muted/40 rounded-xl shadow-md px-6">
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline">Info for features</Button>
						</DialogTrigger>
						<DialogContent className="w-[90vw]">
							<DialogHeader>
								<DialogTitle>List of all features</DialogTitle>
							</DialogHeader>
							<ul className="grid grid-cols-2 list-disc gap-4 w-full max-md:w-auto px-4">
								<li>
									Column Resizing + reset size of any column
									by double click on its resize handle.
								</li>
								<li>Column Dragging (fast and responsive)</li>
								<li>
									Click on any cell and that cell will be
									editable. The text supports larger text
									input with proper wrapping.
								</li>
								<li>
									Column Pinning- both left and right and you
									can pin any number of columns. Pinning is
									sticky and user cannot drag that pinned
									column.
								</li>
								<li>Custom filter based on status.</li>
								<li>
									Each column has a list of featues- sort
									ascending, sort descending, custom filter,
									pin left or pin right, hide.
								</li>
								<li>
									custom filter opens a div above table for
									user to implement custom filtering on any
									column.
								</li>
								<li>
									Global searching (search anything across the
									table).
								</li>
							</ul>
						</DialogContent>
					</Dialog>
				</div>
				<div className="bg-white dark:bg-muted/40 rounded-xl px-2 py-3 shadow-2xl mt-10 overflow-hidden">
					<Tabs defaultValue="customers" className="max-md:mx-auto">
						<TabsList className="dark:bg-[rgba(255,255,255,0.5)]">
							<TabsTrigger value="customers">
								Customers
							</TabsTrigger>
							<TabsTrigger
								value="vendors"
								className="dark:text-white"
							>
								Vendors
							</TabsTrigger>
						</TabsList>
						<TabsContent value="customers">
							<CustomersTable
								initialData={customersData}
								columns={customerColumns}
								title={"All Customers"}
								name={"Customer"}
								renderSubComponent={RenderChart}
							/>
						</TabsContent>
						<TabsContent value="vendors">
							<CustomersTable
								initialData={vendorsData}
								columns={vendorColumns}
								title={"All Vendors"}
								name={"Vendor"}
								renderSubComponent={RenderChart}
							/>
						</TabsContent>
					</Tabs>

					{/* <TekTable tableConfig={tableConfig} /> */}
				</div>
			</div>
		</main>
	);
};

export default Customer;

/*
const tableConfig = {
	initialData: initialData,
	columnsConfig: demoCols,
	resolveType: resolveType,
	showMenu: true,
	menuActions: (row) => {
		console.log(row);
		return (
			<>
				<DropdownMenuGroup>
					<DropdownMenuItem className="hover:bg-sky-400 dark:text-white">
						<Edit className="h-4 w-4 mr-2" />
						<span>Edit</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="hover:bg-red-500 hover:text-white dark:text-white">
						<Trash className="h-4 w-4 mr-2" />
						<span>Delete</span>
					</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<UserPlus className="mr-2 h-4 w-4" />
							<span>Change Status</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem>
									<div className="inline-block rounded-full h-4 w-4 bg-green-500 mr-2"></div>
									<span>Active</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<div className="inline-block rounded-full h-4 w-4 bg-red-500 mr-2"></div>
									<span>Inactive</span>
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>
			</>
		);
	},
	avatarColumns: [], // columns where you want to show an avatar
	sortableColumns: ["customerName", "country"], // columns where you want to enable sorting
	rowLimit: 10, // how many rows per page
	showSelect: false, // make the table show a selectable checkbox or not for each row
	searchConfig: {
		hasAPIsearch: false,
		filterBy: "customerName",
		displayName: "Customer Name",
	},
	//filterBy: 'accountDescription',
	pagination: {
		hasApiPagination: false, // if false then use tanstack ui pagination
		type: "infinite", // "infinite" OR "normal"
		hasSizeLimit: false,
		defaultRowsPerPage: 10,
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
		hasRTK: false,
		//selector: "coa",
		//   fetchDataThunk: fetchData,
		//   addRowThunk: addRow,
		//   editRowThunk: editRow,
		//   deleteRowThunk: deleteRows,
		//   searchThunk: searchCOA,
	},
};
const demoCols = [
	{
		name: "customerName",
		displayName: "Customer Name",
		type: "text",
	},
	{
		name: "company",
		displayName: "Company",
		type: "text",
	},
	{
		name: "phoneNumber",
		displayName: "Phone Number",
		type: "number",
	},
	{
		name: "email",
		displayName: "Email",
		type: "email",
	},
	{
		name: "country",
		displayName: "Country",
		type: "text",
	},
	{
		name: "status",
		displayName: "Status",
		type: "dropdown",
		options: ["Active", "Inactive"],
	},
];

function resolveType(type, name, row) {
	switch (type) {
		case "text":
			return `${row.getValue(name)}`;
		case "number":
			return `${row.getValue(name)}`;
		case "email":
			return `${row.getValue(name)}`;
		case "dropdown":
			const x = row.getValue(name);
			if (x == "Active") {
				return (
					<span className="w-fit mx-auto flex items-center justify-center bg-[#16C09861] border border-[#00B087] text-green-500 rounded-sm py-2 px-3">
						{x}
					</span>
				);
			} else {
				return (
					<span className="w-fit mx-auto flex items-center justify-center bg-[#FFC5C5] border border-[#DF0404] text-red-500 rounded-sm py-2 px-3">
						{x}
					</span>
				);
			}

		default:
			return row.getValue(name).toString();
	}
}

const formSchema = z.object({
	customerName: z.string().min(1, "customer name is required"),
	company: z.string().min(1, "company is required"),
	phoneNumber: z.string().min(1, "phone number is required"),
	email: z.string().email({ required_error: "email is required" }),
	country: z.string().min(1, "country is required"),
	status: z.string(),
});
*/
