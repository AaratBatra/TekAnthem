import * as React from "react";
//import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
//import { addRow, fetchData } from "@/store/slices/COASlice";
// ui imports
import { useToast } from "@/components/ui/use-toast";
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
	Check,
	ChevronDown,
	Edit,
	Eye,
	LinkIcon,
	Loader2,
	Plus,
	Save,
	Trash,
	X,
	Search,
	MoreVertical,
	MoreHorizontal,
	Sheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar"; // Import your Avatar component
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

// custom made components import
import {
	TekTablePopUpEdit,
	TekTablePopUpAdd,
} from "@/components/TekTablePopUp";
import { Skeleton } from "./ui/skeleton";

export function TekTable({ tableConfig }) {
	const { columnsConfig: cols, resolveType } = tableConfig;
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
						onClick={(e) => e.stopPropagation()}
					/>
				),
				enableSorting: false,
				enableHiding: false,
			});
		}
		const restcolumns = cols.map((col) => {
			const { name, displayName, type, filterFn } = col;
			const hasAvatar = avatarCols.has(name);
			const isSortable = sortableCols.has(name);
			const column = {
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
										{row.getValue(name).toString()}
									</span>
								</div>
							</div>
					  )
					: ({ row }) => resolveType(type, name, row),
			};
			if (filterFn) {
				column.filterFn = filterFn;
			}
			return column;
		});
		if (tableConfig.showMenu) {
			const menuCol = {
				id: "actions",
				cell: ({ row }) => {
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="h-6 w-8 p-0 border"
								>
									<span className="sr-only">Open menu</span>
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								{tableConfig.menuActions({ row })}
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
			};
			restcolumns.push(menuCol);
		}
		return [...columns, ...restcolumns];
	},
	[]);

	const [data, setData] = React.useState([]);
	const [sorting, setSorting] = React.useState([]);
	const [columnFilters, setColumnFilters] = React.useState([]);
	const [columnVisibility, setColumnVisibility] = React.useState({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [page, setPage] = React.useState(0); // State for current page
	const [rowsPerPage, setRowsPerPage] = tableConfig.rtkSliceConfig.hasRTK
		? React.useState(
				tableConfig.pagination.hasSizeLimit
					? tableConfig.pagination.defaultRowsPerPage
					: 0
		  )
		: React.useState(0);

	const dispatch = useDispatch();
	const { tableData, isLoading, error } = tableConfig.rtkSliceConfig.hasRTK
		? useSelector((state) => state[tableConfig.rtkSliceConfig.selector])
		: {
				initialData: tableConfig.initialData,
				isLoading: false,
				error: null,
		  };
	const totalPages = tableConfig.pagination?.hasApiPagination
		? useSelector((state) => state.coa).totalPages
		: 0;

	const { toast } = useToast();

	React.useEffect(() => {
		if (tableConfig.initialData) {
			setData(tableConfig.initialData);
		} else {
			setData(tableData);
		}
	}, [tableData, tableConfig.initialData]);

	const debouncedFetchSuggestions = useDebouncedCallback((query) => {
		if (query.length < 1) {
			dispatch(
				tableConfig.rtkSliceConfig.fetchDataThunk({
					page: page,
					rowsPerPage: rowsPerPage,
				})
			);
		} else {
			dispatch(tableConfig.rtkSliceConfig.searchThunk(query));
			//setRowsPerPage(20);
		}
	}, 300);

	React.useEffect(() => {
		//if (rowsPerPage <= 0) return;
		// if (!tableConfig.pagination.hasApiPagination) {
		// 	dispatch(
		// 		tableConfig.rtkSliceConfig.fetchDataThunk({
		// 			page: page,
		// 			rowsPerPage: rowsPerPage,
		// 		})
		// 	);
		// 	return;
		// }
		// if (page === 0) return;
		//setData([])
		//fetchData(page);
		if (!tableConfig.rtkSliceConfig.hasRTK) return;
		dispatch(
			tableConfig.rtkSliceConfig.fetchDataThunk({
				page: page,
				rowsPerPage: rowsPerPage,
			})
		);
	}, [page, rowsPerPage]);

	// React.useEffect(() => {
	// 	if (rowsPerPage <= 0) return;
	// 	if (page === 0) {
	// 		//fetchData(page);
	// 		dispatch(
	// 			tableConfig.rtkSliceConfig.fetchDataThunk({
	// 				page: page,
	// 				rowsPerPage: rowsPerPage,
	// 			})
	// 		);
	// 		return;
	// 	}
	// 	setPage(0);
	// 	//console.log(rowsPerPage)
	// }, [rowsPerPage]);

	React.useEffect(() => {
		if (error) {
			toast({
				variant: "destructive",
				title: "Error fetching data",
				description: <pre>{JSON.stringify(error)}</pre>,
			});
		}
	}, [error]);

	// Call useReactTable once with the combined state
	const tableOptions = {
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
				pageIndex: 0,
				pageSize: tableConfig.pagination.defaultRowsPerPage,
			},
		},
	};

	if (tableConfig.pagination.hasApiPagination) {
		tableOptions.state.pagination = {
			pageIndex: page,
			pageSize: rowsPerPage,
		};
		tableOptions.manualPagination = true;
		tableOptions.pageCount = totalPages; // Set pageCount for API pagination
		tableOptions.initialState = null;
	}

	const table = useReactTable(tableOptions);

	const handleAddNewEntry = async (entry) => {
		let obj = {};
		//obj.id = Date.now().toString();
		cols.forEach((col) => {
			obj[col.name] = entry[col.name];
		});
		//console.log({ ...obj });
		if (tableConfig.rtkSliceConfig.hasRTK) {
			try {
				const result = await dispatch(
					tableConfig.rtkSliceConfig.addRowThunk(obj)
				).unwrap();
				toast({
					variant: "success",
					title: "Success",
					description: "New row added successfully",
				});
				// if (tableConfig.pagination.hasApiPagination) {
				//setRowsPerPage(rowsPerPage);
				dispatch(
					tableConfig.rtkSliceConfig.fetchDataThunk({
						page: page,
						rowsPerPage: rowsPerPage,
					})
				);
				// } else {
				// 	dispatch(
				// 		tableConfig.rtkSliceConfig.fetchDataThunk({
				// 			page: page,
				// 			rowsPerPage: rowsPerPage,
				// 		})
				// 	);
				// }
			} catch (error) {
				console.log(error);
				toast({
					variant: "destructive",
					title: "Error",
					description: error.message || "Failed to add new row",
				});
			}
		} else {
			setData((prevData) => [obj, ...prevData]);
		}
	};
	const handleDeleteEntry = async () => {
		if (tableConfig.rtkSliceConfig.hasRTK) {
			const newData = data.filter((row, index) => {
				if (rowSelection[index] == true) {
					return row;
				}
			});
			const rowsToDelete = newData.map((row) => {
				return row.id;
			});

			try {
				const result = await dispatch(
					tableConfig.rtkSliceConfig.deleteRowThunk(rowsToDelete)
				).unwrap();
				toast({
					variant: "success",
					title: "Success",
					description: "Rows deleted successfully",
				});
				setRowSelection({});
				dispatch(
					tableConfig.rtkSliceConfig.fetchDataThunk({
						page: page,
						rowsPerPage: rowsPerPage,
					})
				);
			} catch (error) {
				console.error(error);
				toast({
					variant: "destructive",
					title: "Error",
					description: error || "Failed to add new row",
				});
			}
		} else {
			const newData = data.filter((row, index) => {
				if (!(rowSelection[index] == true)) {
					return row;
				}
			});
			setData(newData);
			setRowSelection({});
		}

		//setData(newData);
		//setRowSelection({});
	};
	const updateEntry = async (entry) => {
		if (tableConfig.rtkSliceConfig.hasRTK) {
			let obj = {};
			if (!entry.id) throw new Error("No id found in entry");
			obj.id = entry.id;
			cols.forEach((col) => {
				obj[col.name] = entry[col.name];
			});
			try {
				const result = await dispatch(
					tableConfig.rtkSliceConfig.editRowThunk(obj)
				).unwrap();
				toast({
					variant: "success",
					title: "Success",
					description: "Row edited successfully",
				});
				//if (tableConfig.pagination.hasApiPagination) {
				//setRowsPerPage(rowsPerPage);
				dispatch(
					tableConfig.rtkSliceConfig.fetchDataThunk({
						page: page,
						rowsPerPage: rowsPerPage,
					})
				);
				//} else {
				// dispatch(
				// 	tableConfig.rtkSliceConfig.fetchDataThunk({
				// 		page: page,
				// 		rowsPerPage: rowsPerPage,
				// 	})
				// );
				//}
			} catch (error) {
				console.log(error);
				toast({
					variant: "destructive",
					title: "Error",
					description: err.message || "Failed to add new row",
				});
			}
		} else {
			setData((prevData) =>
				prevData.map((item) =>
					item.id === entry.id ? { ...entry } : item
				)
			);
		}
		// setData((prevData) =>
		// 	prevData.map((item) => (item.id === entry.id ? { ...entry } : item))
		// );
	};

	return (
		<>
			<div className="w-full">
				<div className="flex max-lg:flex-col-reverse max-lg:justify-start max-lg:items-start max-lg:gap-3 justify-between w-full items-center py-4 mx-auto">
					<div className="flex items-center w-fit max-lg:w-full gap-2">
						<Dialog>
							<DialogTrigger asChild>
								<Button
									size="icon"
									className="bg-green-500 hover:bg-green-600 border rounded-full text-white"
								>
									<Plus className="h-4 w-4" />
								</Button>
							</DialogTrigger>
							<TekTablePopUpAdd
								colData={tableConfig.addForm.formConfig}
								updateEntry={handleAddNewEntry}
								formSchema={tableConfig.addForm.formSchema}
							/>
						</Dialog>
						<Button
							variant="destructive"
							size="icon"
							className="border rounded-full text-white"
							onClick={handleDeleteEntry}
							disabled={Object.keys(rowSelection).length == 0}
						>
							<Trash className="h-4 w-4" />
						</Button>
						{tableConfig.pagination.hasApiPagination &&
							tableConfig.pagination.hasSizeLimit && (
								<DropdownMenu className="dark:bg-[#5D7285] lg:hidden ms-auto">
									<DropdownMenuTrigger
										asChild
										className="dark:bg-[#5D7285] w-[120px] text-muted-foreground hover:text-muted-foreground dark:text-gray-200 lg:hidden ms-auto"
									>
										<Button
											variant="outline"
											className="text-muted-foreground hover:text-muted-foreground dark:text-gray-200"
										>
											<Eye className="mr-1 h-4 w-4 dark:text-white" />{" "}
											Rows {rowsPerPage}
											<ChevronDown className="ml-1 h-4 w-4 dark:bg-[#5D7285] dark:text-gray-200" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="end"
										className="dark:bg-[#5D7285] z-50"
									>
										<DropdownMenuItem
											className="p-2"
											onClick={() => setRowsPerPage(5)}
										>
											rows: 5
										</DropdownMenuItem>
										<DropdownMenuItem
											className="p-2"
											onClick={() => setRowsPerPage(10)}
										>
											rows: 10
										</DropdownMenuItem>
										<DropdownMenuItem
											className="p-2"
											onClick={() => setRowsPerPage(15)}
										>
											rows: 15
										</DropdownMenuItem>
										<DropdownMenuItem
											className="p-2"
											onClick={() => setRowsPerPage(20)}
										>
											rows: 20
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							)}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									size="icon"
									className="rounded-full text-white hover:bg-gray-500"
								>
									<MoreVertical className="w-4 h-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56" align="start">
								<DropdownMenuLabel>
									More options
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-black cursor-pointer">
										<Sheet className="mr-2 h-5 w-5" />
										<span>Export to Excel</span>
										{/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="flex items-center w-fit max-lg:w-full max-lg:justify-between gap-2">
						<div className="relative">
							<Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground dark:text-white" />
							<Input
								type="search"
								placeholder={
									tableConfig.searchConfig.displayName
								}
								value={
									!tableConfig.searchConfig.hasAPIsearch
										? table
												.getColumn(
													tableConfig.searchConfig
														.filterBy
												)
												?.getFilterValue() ?? ""
										: undefined
								}
								// onChange={(event) => {
								// 	table
								// 		.getColumn(tableConfig.searchConfig.filterBy)
								// 		?.setFilterValue(event.target.value);
								// }}
								onChange={(event) => {
									const searchTerm = event.target.value;

									// If API-based search is enabled, debounce the API call
									if (tableConfig.searchConfig.hasAPIsearch) {
										debouncedFetchSuggestions(searchTerm);
									} else {
										// Otherwise, perform client-side filtering
										table
											.getColumn(
												tableConfig.searchConfig
													.filterBy
											)
											?.setFilterValue(searchTerm);
									}
								}}
								//className="max-w-[200px] dark:bg-[#5D7285] dark:text-white"
								className="w-full appearance-none bg-background pl-8 shadow-none dark:placeholder-white dark:bg-[#5D7285] dark:text-white"
							/>
						</div>
						<div className="flex items-center gap-2">
							<DropdownMenu className="dark:bg-[#5D7285] dark:text-white">
								<DropdownMenuTrigger
									asChild
									className="dark:bg-[#5D7285] dark:text-white"
								>
									<Button
										variant="outline"
										className="text-muted-foreground hover:text-muted-foreground dark:text-gray-200"
									>
										<Eye className="mr-1 h-4 w-4 dark:text-white" />{" "}
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
														column.toggleVisibility(
															!!value
														)
													}
												>
													{cols.find(
														(obj) =>
															obj.name ==
															column.id
													)?.displayName ?? column.id}
												</DropdownMenuCheckboxItem>
											);
										})}
								</DropdownMenuContent>
							</DropdownMenu>
							{tableConfig.pagination.hasApiPagination &&
								tableConfig.pagination.hasSizeLimit && (
									<Select
										className="dark:bg-[#5D7285] max-lg:hidden"
										onValueChange={(e) =>
											setRowsPerPage(parseInt(e))
										}
									>
										<SelectTrigger className="dark:bg-[#5D7285] w-[120px] text-muted-foreground hover:text-muted-foreground dark:text-gray-200 max-lg:hidden">
											<SelectValue placeholder="rows: 5" />
										</SelectTrigger>
										<SelectContent className="dark:bg-[#5D7285]">
											<SelectGroup>
												<SelectLabel>Rows</SelectLabel>
												<SelectItem value="5">
													rows: 5
												</SelectItem>
												<SelectItem value="10">
													rows: 10
												</SelectItem>
												<SelectItem value="15">
													rows: 15
												</SelectItem>
												<SelectItem value="20">
													rows: 20
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								)}
						</div>
					</div>
				</div>
				<div className="max-h-[64vh] rounded-md border overflow-x-scroll overflow-y-auto no-scrollbar dark:border-white shadow-md">
					<Table className="max-h-[64vh] dark:border-white relative table-auto overflow-y-auto dark:bg-sky-950/25">
						<TableHeader className="dark:border-gray-400 sticky top-0">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow
									key={headerGroup.id}
									className="first:px-0 dark:border-white first:text-left text-center"
								>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											className="ps-1 text-center dark:text-white"
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
								<>
									{table.getRowModel().rows.map((row) => (
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
												colData={
													tableConfig.editForm
														.formConfig
												}
												updateEntry={updateEntry}
												formSchema={
													tableConfig.editForm
														.formSchema
												}
											/>
										</Dialog>
									))}
									{isLoading && (
										<>
											<TableRow className="dark:border-gray-400">
												{cols.map((col, index) => (
													<TableCell key={index}>
														{col.avatar ? (
															<Skeleton className="h-12 w-12 rounded-full" />
														) : null}
														<Skeleton className="h-8" />
													</TableCell>
												))}
												<TableCell>
													<Skeleton className="h-8" />
												</TableCell>
											</TableRow>
											<TableRow className="dark:border-white">
												{cols.map((col, index) => (
													<TableCell key={index}>
														{col.avatar ? (
															<Skeleton className="h-12 w-12 rounded-full" />
														) : null}
														<Skeleton className="h-8" />
													</TableCell>
												))}
												<TableCell>
													<Skeleton className="h-8" />
												</TableCell>
											</TableRow>
											<TableRow className="dark:border-white">
												{cols.map((col, index) => (
													<TableCell key={index}>
														{col.avatar ? (
															<Skeleton className="h-12 w-12 rounded-full" />
														) : null}
														<Skeleton className="h-8" />
													</TableCell>
												))}
												<TableCell>
													<Skeleton className="h-8" />
												</TableCell>
											</TableRow>
										</>
									)}
								</>
							) : (
								<>
									{isLoading ? (
										<>
											{Array.from({ length: 5 }).map(
												(_, i) => {
													return (
														<TableRow
															key={i}
															className="dark:border-gray-400"
														>
															{cols.map(
																(
																	col,
																	index
																) => (
																	<TableCell
																		key={
																			index
																		}
																	>
																		{col.avatar ? (
																			<Skeleton className="h-12 w-12 rounded-full" />
																		) : null}
																		<Skeleton className="h-8" />
																	</TableCell>
																)
															)}
															<TableCell>
																<Skeleton className="h-8" />
															</TableCell>
														</TableRow>
													);
												}
											)}
										</>
									) : (
										<TableRow className="dark:border-white">
											<TableCell
												colSpan={cols.length + 1}
												className="h-24 text-center text-foreground"
											>
												{isLoading ? (
													<>
														<Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />{" "}
														Please wait
													</>
												) : (
													<>No results.</>
												)}
											</TableCell>
										</TableRow>
									)}
								</>
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
						<div className="flex gap-2 items-center">
							<Button
								className="dark:bg-[#5D7285] dark:text-white"
								variant="outline"
								size="sm"
								onClick={() => {
									if (
										tableConfig.pagination.hasApiPagination
									) {
										setPage(page - 1);
									} else {
										table.previousPage();
									}
								}}
								disabled={
									tableConfig.pagination.hasApiPagination
										? page === 0 || isLoading
										: !table.getCanPreviousPage() ||
										  isLoading
								}
								// onClick={() => table.previousPage()}
								// disabled={!table.getCanPreviousPage()}
							>
								Previous
							</Button>
							<Button
								className="dark:bg-[#5D7285] dark:text-white"
								variant="outline"
								size="sm"
								// onClick={() => setPage(page + 1)}
								// disabled={page >= totalPages - 1 || isLoading}
								onClick={() => {
									if (
										tableConfig.pagination.hasApiPagination
									) {
										setPage(page + 1);
									} else {
										table.nextPage();
									}
								}}
								disabled={
									tableConfig.pagination.hasApiPagination
										? page >= totalPages - 1 || isLoading
										: !table.getCanNextPage() || isLoading
								}
								//onClick={() => table.nextPage()}
								//disabled={!table.getCanNextPage()}
							>
								Next
							</Button>
							{tableConfig.pagination.hasApiPagination && (
								<span className="text-sm text-muted-foreground">
									Current page: {page + 1}, total:{" "}
									{totalPages}
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

// the initial data is going to be parsed by the table accoring to demoCols and the tableConfig which will be set statically
// demoCols and tableConfig are ought to be defined in development stage only and whatever the initialData comes it will just access those values
// specified in the demoCols[i].name

// todo
/*
	1. Make the entire component completely dynamic by moving prepareData, data prop and zod schemas and more outside this component
	2. Create another copy of TekTable and implement infinite scroll using intersection observer api configured with the div wrapping the table
	3. Implement caching via localstorage if necessary (to ask)
	4. Apply skeleton UI instead of basic loading icon
	5. Add comments to the entire component and nested components to allow next dev to understand the code
	6. Add up/down button based navigation for lookups and rendering the lookups upside or down depending on the position of the input tag
	7. Change the toast messages for better clarity
	8. The idea here is that the dev should not only give the api url to hit but also give how to prepare the data received from it and give that funciton as a prop to whatever component that will deal with the api
	9. If it gets even more complex, try using RTK to handle the data fetching and state mgmt
	10. Add support for different data types to be allowed incl their input components how will they look like. 
	11. ALlow custom component to be passed as a prop for even better feature control.
	12. Test thoroughly!
*/

// try {
// 	let grp_type = null;
// 	if (obj.Type === "Asset") {
// 		grp_type = "A"
// 	} else if (obj.Type === "Liability") {
// 		grp_type = "L"
// 	} else if (obj.Type === "Expense") {
// 		grp_type = "E"
// 	} else if (obj.Type === "Income") {
// 		grp_type = "I"
// 	} else {
// 		grp_type = obj.Type;
// 	}
// 	const payload = {
// 		description: obj.accountDescription,
// 		parentAccountCode: obj.groupCode,
// 		type: obj.subledgerFlag ? "L" : "A",
// 		nature: grp_type,
// 		companyId: localStorage.getItem("companyId"),
// 		createdBy: localStorage.getItem("username")
// 	};
// 	const res = await axios.post('/coa/create', payload);
// 	/*
// 		{
// 			"description": "PATEL & COMPANY3",
// 			"parentAccountCode": "10000015",
// 			"type": "L",
// 			"nature": "A",
// 			"companyId": "257a532d-1890-a639-8ab4-ebbd04ab339f",
// 			"createdBy":"BHAUMIK"
// 		}
// 	*/
// 	//console.log(res.data);
// 	toast({
// 		variant: "success",
// 		title: "New row added",
// 	})
// 	//fetchData(0);
// } catch (error) {
// 	toast({
// 		variant: "destructive",
// 		title: "Error adding new row",
// 	})
// }
//fetchData(0);
/*
			setData((prevData) => [
			obj,
			...prevData,
		]);
		*/
// const handleSave = async () => {
// 	try {
// 		const tabledata = await JSON.parse(
// 			localStorage.getItem("chartOfAcc")
// 		);
// 		//console.log(tabledata)
// 		const res = await axios.post(
// 			"http://localhost:4000/payments/accounts",
// 			{ tableData: tabledata }
// 		);
// 		if (res.status == 200) {
// 			toast({
// 				variant: "success",
// 				title: "Chart of accounts saved successfully",
// 			});
// 		}
// 	} catch (error) {
// 		console.error(error);
// 		toast({
// 			variant: "destructive",
// 			title: "Some error occurred while saving to server",
// 			description: "Please try saving again after some time",
// 		});
// 	}
// };
/*
	{/* <Button
							size="icon"
							className="bg-sky-500 hover:bg-sky-600 border rounded-full text-white"
							onClick={() => handleSave()}
						>
							<Save className="h-4 w-4" />
						</Button> }
						*/

// const prepareData = (fetchedData) => {
// 	const tabledata = fetchedData.map((entry) => {
// 		const {
// 			accountCode: account_code,
// 			id: group_id,
// 			parentAccountCode: group_code,
// 			groupName: group_description,
// 			nature: group_type,
// 			description: account_description,
// 			type: subledger_flag,
// 		} = entry;
// 		//console.log(entry);
// 		let grp_type = null;
// 		if (group_type === "A") {
// 			grp_type = "Asset"
// 		} else if (group_type === "L") {
// 			grp_type = "Liability"
// 		} else if (group_type === "E") {
// 			grp_type = "Expense"
// 		} else if (group_type === "I") {
// 			grp_type = "Income"
// 		} else {
// 			grp_type = group_type;
// 		}
// 		//const {group_id, group_code, group_description, group_type, account_code, account_description, subledger_flag} = entry;
// 		return {
// 			id: group_id,
// 			groupCode: group_code,
// 			group: group_description,
// 			Type: grp_type ? grp_type : "null",
// 			accountCode: account_code,
// 			accountDescription: account_description,
// 			subledgerFlag: subledger_flag === "L",
// 		};
// 	});
// 	return tabledata;
// };
// const fetchData = async (page) => {
// 	try {
// 		setIsLoading(true);
// 		const config = {
// 			page: page,
// 			size: rowsPerPage,
// 			companyId: localStorage.getItem("companyId")
// 		}
// 		const response = await axios.get(url,
// 			{
// 				params: config
// 			},
// 		);
// 		//console.log(response.data.responseData.content);
// 		setIsLoading(false);
// 		//console.log(prepareData(response.data.responseData.content));
// 		setData(prepareData(response.data.responseData.content));
// 		setTotalPages(response.data.responseData.totalPages);
// 	} catch (error) {
// 		console.error("Error fetching data: ", error);
// 		toast({
// 			variant: "destructive",
// 			title: "Error fetching data",
// 			description:
// 				"An error occurred while fetching data from the server.",
// 		});
// 		setIsLoading(false);
// 	}
// };
/*
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

*/
