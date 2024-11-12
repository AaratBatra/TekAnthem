import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
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
	Sheet,
	EllipsisVertical,
	MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
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
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
	TekTablePopUpEdit,
	TekTablePopUpAdd,
} from "@/components/TekTablePopUp";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Skeleton } from "./ui/skeleton";

//import { addRow, fetchData } from "@/store/slices/COASlice";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const InfiniteScrollCOA = ({ tableConfig }) => {
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

		return [...columns, ...restcolumns];
	},
	[]);

	const [data, setData] = React.useState([]);
	const [sorting, setSorting] = React.useState([]);
	const [columnFilters, setColumnFilters] = React.useState([]);
	const [columnVisibility, setColumnVisibility] = React.useState({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [page, setPage] = React.useState(0); // State for current page

	const dispatch = useDispatch();
	const { tableData, isLoading, error } = useSelector(
		(state) => state[tableConfig.rtkSliceConfig.selector]
	);
	const totalPages = tableConfig.pagination?.hasApiPagination
		? useSelector((state) => state.coa).totalPages
		: 0;
	const { toast } = useToast();

	//const navigate = useNavigate();
	// infinte scroll
	const observer = React.useRef();
	const lastPostElementRef = React.useCallback(
		(node) => {
			if (isLoading) return;
			if (page >= totalPages - 1) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					setPage((prevPage) => prevPage + 1); // trigger loading of new posts by chaging page no
				}
			});

			if (node) observer.current.observe(node);
		},
		[isLoading]
	);

	React.useEffect(() => {
		setData(tableData);
	}, [tableData]);

	React.useEffect(() => {
		dispatch(tableConfig.rtkSliceConfig.fetchDataThunk({ page: page }));
	}, [page]);

	const debouncedFetchSuggestions = useDebouncedCallback((query) => {
		if (query.length < 1) {
			dispatch(tableConfig.rtkSliceConfig.fetchDataThunk({ page: 0 }));
		} else {
			dispatch(tableConfig.rtkSliceConfig.searchThunk(query));
		}
	}, 300);

	React.useEffect(() => {
		if (error) {
			toast({
				variant: "destructive",
				title: "Error fetching data",
				description: <pre>{JSON.stringify(error)}</pre>,
			});
		}
	}, [error]);

	const table = useReactTable({
		data,
		columns: colPrep(tableConfig, tableConfig.columnsConfig),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		//getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			//pagination: { pageIndex: page, pageSize: tableConfig.rowLimit },
		},
		//manualPagination: true,
		//pageCount: totalPages,
		// initialState: {
		// 	pagination: {
		// 		pageSize: tableConfig.rowLimit,
		// 	},
		// },
	});

	const handleAddNewEntry = async (entry) => {
		let obj = {};
		//obj.id = Date.now().toString();
		cols.forEach((col) => {
			obj[col.name] = entry[col.name];
		});
		try {
			const result = await dispatch(
				tableConfig.rtkSliceConfig.addRowThunk(obj)
			).unwrap();
			toast({
				variant: "success",
				title: "Success",
				description: "New row added successfully",
			});
			setPage(0);
		} catch (error) {
			console.error(error);
			toast({
				variant: "destructive",
				title: "Error",
				description: error || "Failed to add new row",
			});
		}
	};
	const handleDeleteEntry = async () => {
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
			setPage(0);
		} catch (error) {
			console.error(error);
			toast({
				variant: "destructive",
				title: "Error",
				description: error || "Failed to add new row",
			});
		}
		//setData(newData);
		//setRowSelection({});
	};
	const updateEntry = async (entry) => {
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
			setPage(0);
			// dispatch(
			// 	tableConfig.rtkSliceConfig.fetchDataThunk({
			// 		page: page,
			// 		rowsPerPage: rowsPerPage,
			// 	})
			// );
			//} else {
			// dispatch(
			// 	tableConfig.rtkSliceConfig.fetchDataThunk({
			// 		page: page,
			// 		rowsPerPage: rowsPerPage,
			// 	})
			// );
			//}
		} catch (error) {
			console.error(error);
			toast({
				variant: "destructive",
				title: "Error",
				description: err.message || "Failed to add new row",
			});
		}
		// setData((prevData) =>
		// 	prevData.map((item) => (item.id === entry.id ? { ...entry } : item))
		// );
		//console.log({...entry})
		// setData((prevData) =>
		// 	prevData.map((item) => (item.id === entry.id ? { ...entry } : item))
		// );
	};
	return (
		<>
			<div className="w-full relative">
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
						</div>
					</div>
				</div>
				<ScrollArea className="h-[60vh] w-full border dark:border-white rounded-md shadow-md">
					<ScrollBar orientation="horizontal" />
					{/* <div className="h-full rounded-md border overflow-x-scroll overflow-y-auto no-scrollbar dark:border-white shadow-md relative"> */}
						<Table className="dark:border-white relative table-auto overflow-y-auto dark:bg-sky-950/25">
							<TableHeader className="dark:border-gray-400 bg-secondary z-20">
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow
										key={headerGroup.id}
										className="first:px-0 dark:border-gray-400  first:text-left text-center"
									>
										{headerGroup.headers.map((header) => (
											<TableHead
												key={header.id}
												className="ps-1 text-center dark:text-white"
											>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column
																.columnDef
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
										{table
											.getRowModel()
											.rows.map((row, index) => (
												<Dialog key={row.id}>
													<DialogTrigger asChild>
														<TableRow
															data-state={
																row.getIsSelected() &&
																"selected"
															}
															ref={
																table.getRowModel()
																	.rows
																	.length ===
																index + 1
																	? lastPostElementRef // Infinite scrolling or pagination logic
																	: null
															}
															className="relative first:px-0 dark:border-gray-400 "
														>
															{row
																.getVisibleCells()
																.map((cell) => (
																	<TableCell
																		key={
																			cell.id
																		}
																		className="text-center"
																	>
																		{flexRender(
																			cell
																				.column
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
														updateEntry={
															updateEntry
														}
														formSchema={
															tableConfig.editForm
																.formSchema
														}
													/>
												</Dialog>
											))}
										{isLoading && (
											<TableRow className="dark:border-gray-400">
												<TableCell
													colSpan={cols.length + 1}
													className="h-24 text-center text-foreground"
												>
													<Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />{" "}
													Fetching more data...
												</TableCell>
											</TableRow>
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
					{/* </div> */}
				</ScrollArea>
				<div className="w-full py-4">
					<div className="mx-auto w-fit flex items-center">
						<div className="text-sm text-muted-foreground mr-2">
							{table.getFilteredSelectedRowModel().rows.length} of{" "}
							{table.getFilteredRowModel().rows.length} row(s)
							selected.
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default InfiniteScrollCOA;

/*
	// const table = useReactTable({
	// 	data,
	// 	columns: colPrep(tableConfig, cols),
	// 	onSortingChange: setSorting,
	// 	onColumnFiltersChange: setColumnFilters,
	// 	getCoreRowModel: getCoreRowModel(),
	// 	//getPaginationRowModel: getPaginationRowModel(),
	// 	getSortedRowModel: getSortedRowModel(),
	// 	getFilteredRowModel: getFilteredRowModel(),
	// 	onColumnVisibilityChange: setColumnVisibility,
	// 	onRowSelectionChange: setRowSelection,
	// 	state: {
	// 		sorting,
	// 		columnFilters,
	// 		columnVisibility,
	// 		rowSelection,
	// 		//pagination: { pageIndex: page, pageSize: tableConfig.rowLimit },
	// 	},
	// 	//manualPagination: true,
	// 	//pageCount: totalPages
	// });

	// const handleAddNewEntry = (entry) => {
	// 	let obj = {};
	// 	obj.id = Date.now().toString();
	// 	cols.forEach((col) => {
	// 		obj[col.name] = entry[col.name];
	// 	});
	// 	console.log({ ...obj });
	// 	setData((prevData) => [obj, ...prevData]);
	// };
	// const handleDeleteEntry = () => {
	// 	const newData = data.filter((row, index) => {
	// 		if (!(rowSelection[index] == true)) {
	// 			return row;
	// 		}
	// 	});
	// 	setData(newData);
	// 	setRowSelection({});
	// };
	// const updateEntry = (entry) => {
	// 	//console.log({...entry})
	// 	setData((prevData) =>
	// 		prevData.map((item) => (item.id === entry.id ? { ...entry } : item))
	// 	);
	// };
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
			//const {group_id, group_code, group_description, group_type, account_code, account_description, subledger_flag} = entry;
			return {
				id: group_id,
				groupCode: group_code,
				group: group_description,
				Type: group_type ? group_type : "null",
				accountCode: account_code,
				accountDescription: account_description,
				subledgerFlag: subledger_flag === "L",
			};
		});
		return tabledata;
	};
	const fetchData = async (page) => {
		try {
			setIsLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 2000));
			const config = {
				page: page,
				size: 10,
				companyId: localStorage.getItem("companyId"),
			};
			const response = await axios.get(url, {
				params: config,
			});
			//console.log(response.data.responseData.content);
			setIsLoading(false);
			console.log(prepareData(response.data.responseData.content));
			setData((prev) => [
				...prev,
				...prepareData(response.data.responseData.content),
			]);
			setTotalPages(response.data.responseData.totalPages);
		} catch (error) {
			console.error("Error fetching data: ", error);
			toast({
				variant: "destructive",
				title: "Error fetching data",
				description:
					"An error occurred while fetching data from the server.",
			});
			setIsLoading(false);
		}
	};
*/
