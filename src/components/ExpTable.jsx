import * as React from "react";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus, Trash } from "lucide-react";

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
		paidTo: "",
		avatar: "",
		debit: "",
		reference: "",
		comments: "",
	});

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
	});

	const handleAddNewEntry = () => {
		setData((prevData) => [
			...prevData,
			{ id: Date.now().toString(), ...newEntry },
		]);
		setNewEntry({
			paidTo: "",
			avatar: "",
			debit: "",
			reference: "",
			comments: "",
		});
	};

    const handleDelete = () => {
        setData((prevData) =>
          prevData.filter((row) => !rowSelection[row.id])
        );
        setRowSelection({});
        
      };
      

	return (
		<>
			<div className="flex justify-between w-48 max-md:mx-auto">
				<Button className="flex items-center bg-green-500 text-white hover:bg-green-600"
                onClick={handleAddNewEntry}>
					<Plus />
					Add
				</Button>
				<Button
					variant="destructive"
					className="flex items-cente text-white"
                    onClick={handleDelete}
                    disabled={Object.keys(rowSelection).length == 0}
				>
					<Trash />
					Delete
				</Button>
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
						<DropdownMenuTrigger asChild className="dark:bg-[#5D7285] dark:text-white">
							<Button variant="outline">
								Columns <ChevronDown className="ml-2 h-4 w-4 dark:bg-[#5D7285] dark:text-white" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="dark:bg-[#5D7285] dark:text-white">
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
										className="first:px-0 dark:border-white"
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id} className="text-center">
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
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
