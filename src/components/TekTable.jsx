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
	LinkIcon,
	Plus,
	Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
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
import { Link } from "react-router-dom";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TekTablePopUpEdit, TekTablePopUpAdd } from "@/components/TekTablePopUp";

// the initial data is going to be parsed by the table accoring to demoCols and the tableConfig which will be set statically
// demoCols and tableConfig are ought to be defined in development stage only and whatever the initialData comes it will just access those values
// specified in the demoCols[i].name

function resolveType(type, name, row) {
	// row is what you get after destructuring row
	if (type === "number") {
		return row.getValue(name);
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
	} else if (type === 'comment') {
        if (row.getValue(name).length > 0) {
            const arr = row.getValue(name).split(' ');
            if (arr.length > 3) {
                return `${arr[0]}...${arr[arr.length-1]}`;
            } else {
                return row.getValue(name);
            }
        } else {
            return row.getValue(name);
        }
    } else {
		return row.getValue(name);
	}
}

export function TekTable({ cols, tableData, tableConfig }) {
	const colPrep = React.useCallback(function prepareColumns(
		tableConfig,
		cols
	) {
		// this function will prepare the columns and return it
		let columns = [];
		const avatarCols = new Set(tableConfig.avatarColumns);
		const sortableCols = new Set(tableConfig.sortableColumns);
		if (tableConfig.showSelect) {
			columns.push({
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() &&
								"indeterminate")
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
                        onClick={(e)=>e.stopPropagation()}
					/>
				),
				enableSorting: false,
				enableHiding: false,
			});
		}
		const restcolumns = cols.map((col, index) => {
			const { name, displayName, type } = col;
			const hasAvatar = avatarCols.has(name);
			const isSortable = sortableCols.has(name);
			return {
				accessorKey: name,
				header: isSortable
					? ({ column }) => (
							<Button
								variant="ghost"
								onClick={() =>
									column.toggleSorting(
										column.getIsSorted() === "asc"
									)
								}
							>
								{displayName}
								<ArrowUpDown className="ml-2 h-4 w-4" />
							</Button>
					  )
					: displayName,
				cell: hasAvatar
					? ({ row }) => (
							<div className="flex items-center justify-center">
								<div className="w-1/2 max-md:w-full flex items-center justify-start">
									<Avatar>
										<AvatarImage
											src={row.original.avatar}
											alt={row.original._name}
										/>
									</Avatar>

									<span className="ml-2">
										{row.getValue(name)}
									</span>
								</div>
							</div>
					  )
					: ({ row }) => resolveType(type, name, row),
			};
		});
		return [...columns, ...restcolumns];
	},
	[]);
	const [data, setData] = React.useState(tableData);
	const [sorting, setSorting] = React.useState([]);
	const [columnFilters, setColumnFilters] = React.useState([]);
	const [columnVisibility, setColumnVisibility] = React.useState({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns: colPrep(tableConfig, cols),
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
				pageSize: tableConfig.rowLimit,
			},
		},
	});

	const handleAddNewEntry = (entry) => {
        let obj = {};
        obj.id = Date.now().toString();
        cols.forEach((col)=>{
            obj[col.name] = entry[col.name]
        })
        console.log({...obj})
		setData((prevData) => [
			obj,
			...prevData,
		]);
	};
	const handleDeleteEntry = () => {
		const newData = data.filter((row, index) => {
			if (!(rowSelection[index] == true)) {
				return row;
			}
		});
		setData(newData);
		setRowSelection({});
	};
	const updateEntry = (entry) => {
        console.log({...entry})
		setData((prevData) =>
			prevData.map((item) =>
				item.id === entry.id ? { ...entry } : item
			)
		);
	};
	return (
		<>
			<div className="flex max-md:flex-wrap max-md:justify-between w-1/3 max-md:w-48 max-md:mx-auto">
				<Dialog>
					<DialogTrigger asChild>
						<Button
							className="flex items-center bg-green-500 text-white hover:bg-green-600 md:mr-2"
						>
							<Plus />
							Add
						</Button>
					</DialogTrigger>
                    <TekTablePopUpAdd colData={cols} updateEntry={handleAddNewEntry}/>
				</Dialog>

				<Button
					variant="destructive"
					className="flex items-center text-white md:mr-2"
					onClick={handleDeleteEntry}
					disabled={Object.keys(rowSelection).length == 0}
				>
					<Trash />
					Delete
				</Button>
			</div>
			<div className="w-full">
				<div className="flex gap-2 w-fit items-center py-4 mx-auto">
					<Input
						placeholder={`Search by ${cols.find((val)=>val.name==tableConfig.filterBy)?.displayName}`}
						value={
							table.getColumn(tableConfig.filterBy)?.getFilterValue() ?? ""
						}
						onChange={(event) =>
							table
								.getColumn(tableConfig.filterBy)
								?.setFilterValue(event.target.value)
						}
						className="max-w-[200px] dark:bg-[#5D7285] dark:text-white"
					/>
					<DropdownMenu className="dark:bg-[#5D7285] dark:text-white">
						<DropdownMenuTrigger
							asChild
							className="dark:bg-[#5D7285] dark:text-white"
						>
							<Button
								variant="outline"
								className="text-muted-foreground hover:text-muted-foreground dark:text-gray-200"
							>
								<Eye className="mr-1 h-4 w-4 dark:bg-[#5D7285] dark:text-gray-200 dark:text-muted-foreground" />{" "}
								Columns{" "}
								<ChevronDown className="ml-1 h-4 w-4 dark:bg-[#5D7285] dark:text-gray-200" />
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
									className="first:px-0 dark:border-white first:text-left text-center"
								>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											className="ps-1 text-center"
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
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<Dialog key={row.id}>
										<DialogTrigger asChild>
											<TableRow
												data-state={
													row.getIsSelected() &&
													"selected"
												}
												className="relative first:px-0 dark:border-white"
											>
												{row
													.getVisibleCells()
													.map((cell) => (
														<TableCell
															key={cell.id}
															className="text-center"
														>
															{flexRender(
																cell.column
																	.columnDef
																	.cell,
																cell.getContext()
															)}
														</TableCell>
													))}
											</TableRow>
										</DialogTrigger>
										<TekTablePopUpEdit
											row={row}
											colData={cols}
                                            updateEntry={updateEntry}
										/>
									</Dialog>
								))
							) : (
								<TableRow className="dark:border-white">
									<TableCell
										colSpan={cols.length+1}
										className="h-24 text-center text-foreground"
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
