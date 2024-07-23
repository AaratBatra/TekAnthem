import * as React from "react";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	ArrowUpDown,
	ChevronDown,
	Edit,
	Eye,
	MoreHorizontal,
	Plus,
	Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar"; // Import your Avatar component

const initialData = [
	{
		id: "1",
		paidTo: "Aarat Batra",
		avatar: "https://firebasestorage.googleapis.com/v0/b/collabtank-7bd46.appspot.com/o/user_avatars%2Favatar_Aarat_1719956459440?alt=media&token=dc8714b3-e21a-4b3d-9a83-1aabaaca00b3.jpg",
		debit: 10000,
		reference: "https://example.com/doc1",
		comments: "Payment for services",
	},
	{
		id: "2",
		paidTo: "Jane Smith",
		avatar: "/assets/mockPerson.jpeg",
		debit: 5000,
		reference: "https://example.com/doc2",
		comments: "Reimbursement",
	},
	{
		id: "3",
		paidTo: "Jill",
		avatar: "https://firebasestorage.googleapis.com/v0/b/collabtank-7bd46.appspot.com/o/user_avatars%2Favatar_Aarat_1719956459440?alt=media&token=dc8714b3-e21a-4b3d-9a83-1aabaaca00b3.jpg",
		debit: 7000,
		reference: "https://example.com/doc1",
		comments: "Car",
	},
	{
		id: "4",
		paidTo: "Joe Smith",
		avatar: "/assets/mockPerson.jpeg",
		debit: 9000,
		reference: "https://example.com/doc2",
		comments: "Cycle",
	},
	{
		id: "5",
		paidTo: "Manjit",
		avatar: "https://firebasestorage.googleapis.com/v0/b/collabtank-7bd46.appspot.com/o/user_avatars%2Favatar_Aarat_1719956459440?alt=media&token=dc8714b3-e21a-4b3d-9a83-1aabaaca00b3.jpg",
		debit: 2000,
		reference: "https://example.com/doc1",
		comments: "new",
	},
	{
		id: "6",
		paidTo: "J",
		avatar: "/assets/mockPerson.jpeg",
		debit: 16000,
		reference: "https://example.com/doc2",
		comments: "gears",
	},
	// More initial data here...
];

export const columns = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) =>
					table.toggleAllPageRowsSelected(!!value)
				}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "paidTo",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
			>
				Paid To
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="flex items-center">
				<Avatar>
					<AvatarImage
						src={row.original.avatar}
						alt={row.original.paidTo}
					/>
				</Avatar>

				<span className="ml-2">{row.getValue("paidTo")}</span>
			</div>
		),
	},
	{
		accessorKey: "debit",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
			>
				Debit
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => `₹ ${row.getValue("debit").toLocaleString()}`,
	},
	{
		accessorKey: "reference",
		header: "Reference",
		cell: ({ row }) => (
			<a
				href={row.getValue("reference")}
				target="_blank"
				rel="noopener noreferrer"
			>
				Link
			</a>
		),
	},
	{
		accessorKey: "comments",
		header: "Comments",
		cell: ({ row }) => row.getValue("comments"),
	},
];

export function DataTableDemo() {
	const [data, setData] = React.useState(initialData);
	const [sorting, setSorting] = React.useState([]);
	const [columnFilters, setColumnFilters] = React.useState([]);
	const [columnVisibility, setColumnVisibility] = React.useState({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [newEntry, setNewEntry] = React.useState({
		id: "",
		paidTo: "",
		avatar: "",
		debit: "",
		reference: "",
		comments: "",
	});
	const [isEditing, setIsEditing] = React.useState(false);

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
		initialState: {
			pagination: {
				pageSize: 5,
			},
		},
	});

	const handleAddNewEntry = () => {
		setData((prevData) => [
			{
				id: Date.now().toString(),
				paidTo: newEntry.paidTo,
				debit: newEntry.debit,
				reference: newEntry.reference,
				comments: newEntry.comments,
			},
			...prevData,
		]);
		setNewEntry({
			id: "",
			paidTo: "",
			avatar: "",
			debit: "",
			reference: "",
			comments: "",
		});
	};
	const handleEdit = (row) => {
		setIsEditing(!isEditing);
		setNewEntry({
			id: row.original.id,
			paidTo: row.original.paidTo,
			avatar: row.original.avatar,
			debit: row.original.debit.toString(),
			reference: row.original.reference,
			comments: row.original.comments,
		});
	};
	const handleDelete = () => {
		console.log(rowSelection);
		const newData = data.filter((row, index) => {
			if (!(rowSelection[index] == true)) {
				return row;
			}
		});
		console.log(newData);
		setData(newData);
		// setData((prevData) => {
		// 	const newData = prevData.filter((row) => !rowSelection[row.id]);
		// 	return newData;
		// });
		setRowSelection({});
	};
	const handleChangeEntry = () => {
		setData((prevData) =>
			prevData.map((item) =>
				item.id === newEntry.id ? { ...newEntry } : item
			)
		);
		setIsEditing(false);
		setNewEntry({
			id: "",
			paidTo: "",
			avatar: "",
			debit: "",
			reference: "",
			comments: "",
		});
	};

	return (
		<>
			<div className="flex max-md:flex-wrap max-md:justify-between w-1/3 max-md:w-48 max-md:mx-auto">
				<Button
					className="flex items-center bg-green-500 text-white hover:bg-green-600 md:mr-2"
					onClick={handleAddNewEntry}
					disabled={isEditing}
				>
					<Plus />
					Add
				</Button>
				<Button
					variant="destructive"
					className="flex items-center text-white md:mr-2"
					onClick={handleDelete}
					disabled={Object.keys(rowSelection).length == 0}
				>
					<Trash />
					Delete
				</Button>
				<button
					className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 flex items-center bg-sky-400 text-white max-md:mx-auto md:mr-2 max-md:mt-2 disabled:flex"
					onClick={handleChangeEntry}
					disabled={!isEditing}
				>
					<Edit />
					{isEditing ? "Save Changes" : "Edit"}
				</button>
			</div>
			<div className="w-full">
				<div className="flex gap-2 w-fit items-center py-4 mx-auto">
					<Input
						placeholder="Filter by Paid To..."
						value={
							table.getColumn("paidTo")?.getFilterValue() ?? ""
						}
						onChange={(event) =>
							table
								.getColumn("paidTo")
								?.setFilterValue(event.target.value)
						}
						className="max-w-[200px] dark:bg-[#5D7285] dark:text-white"
					/>
					<DropdownMenu className="dark:bg-[#5D7285] dark:text-white">
						<DropdownMenuTrigger
							asChild
							className="dark:bg-[#5D7285] dark:text-white"
						>
							<Button variant="outline" className="text-muted-foreground hover:text-muted-foreground">
								<Eye className="mr-1 h-4 w-4 dark:bg-[#5D7285] dark:text-white" />{" "}
								Columns{" "}
								<ChevronDown className="ml-1 h-4 w-4 dark:bg-[#5D7285] dark:text-white" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="dark:bg-[#5D7285] dark:text-white"
						>
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize dark:bg-[#5D7285] dark:text-white"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="rounded-md border overflow-x-scroll md:no-scrollbar dark:border-white">
					<Table className="dark:border-white">
						<TableHeader className="dark:border-white">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow
									key={headerGroup.id}
									className="first:px-0 dark:border-white"
								>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											className="ps-1"
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												  )}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							<TableRow className="dark:border-white">
								<TableCell></TableCell>
								<TableCell>
									<Input
										className="dark:bg-[#5D7285] dark:text-white"
										value={newEntry.paidTo}
										onChange={(e) =>
											setNewEntry((prev) => ({
												...prev,
												paidTo: e.target.value,
											}))
										}
										placeholder="Paid To"
									/>
								</TableCell>
								<TableCell>
									<Input
										className="dark:bg-[#5D7285] dark:text-white"
										type="number"
										value={newEntry.debit}
										onChange={(e) =>
											setNewEntry((prev) => ({
												...prev,
												debit: e.target.value,
											}))
										}
										placeholder="Debit"
									/>
								</TableCell>
								<TableCell>
									<Input
										className="dark:bg-[#5D7285] dark:text-white"
										value={newEntry.reference}
										onChange={(e) =>
											setNewEntry((prev) => ({
												...prev,
												reference: e.target.value,
											}))
										}
										placeholder="Reference"
									/>
								</TableCell>
								<TableCell>
									<Input
										className="dark:bg-[#5D7285] dark:text-white"
										value={newEntry.comments}
										onChange={(e) =>
											setNewEntry((prev) => ({
												...prev,
												comments: e.target.value,
											}))
										}
										placeholder="Comments"
									/>
								</TableCell>
							</TableRow>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={
											row.getIsSelected() && "selected"
										}
										className="relative first:px-0 dark:border-white"
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell
												key={cell.id}
												className="text-center"
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
										<TableCell className="edit absolute z-10 top-1 left-1 md:left-2 h-4" style={{padding: "0 !important"}}>
											<Button
												variant="ghost"
												onClick={() => handleEdit(row)}
												className="p-0 h-4 flex items-start"
											>
												<Edit className="h-4 w-4 text-foreground" />
											</Button>
										</TableCell>
										{/* <Button className="absolute z-10 top-1 left-1 p-0 h-4 flex items-start" variant="ghost" onClick={()=>handleEdit(row)}>
											<Edit className="h-4 w-4 text-foreground" />
										</Button> */}
									</TableRow>
								))
							) : (
								<TableRow className="dark:border-white">
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<div className="w-full py-4">
					<div className="mx-auto w-fit flex items-center">
						<div className="text-sm text-muted-foreground mr-2">
							{table.getFilteredSelectedRowModel().rows.length} of{" "}
							{table.getFilteredRowModel().rows.length} row(s)
							selected.
						</div>
						<div className="flex gap-2">
							<Button
								className="dark:bg-[#5D7285] dark:text-white"
								variant="outline"
								size="sm"
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
							>
								Previous
							</Button>
							<Button
								className="dark:bg-[#5D7285] dark:text-white"
								variant="outline"
								size="sm"
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
							>
								Next
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
