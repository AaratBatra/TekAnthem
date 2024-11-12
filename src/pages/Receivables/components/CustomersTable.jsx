// data, columns, cells, rows, actions, filter, sort, columns visiblitly, pagination etc.
// passing the data as prop case- filtering and sorting are constant, pagination is api based, actions like 3 dot menu- edit and delete are buttons with change status also a button that will edit the current row and change its status, search is done by api,

import * as React from "react";
import {
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getExpandedRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import DataTableToolbar from "./DataTableToolbar";
import DataTablePagination from "./DataTablePagination";
import { ColumnResizer } from "./ColumnResizer";
// needed for table body level scope DnD setup
import {
	DndContext,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
	arrayMove,
	SortableContext,
	horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

// needed for row & cell level scope DnD setup
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomFilter from "./CustomFilter";

function useSkipper() {
	const shouldSkipRef = React.useRef(true);
	const shouldSkip = shouldSkipRef.current;

	// Wrap a function with this to skip a pagination reset temporarily
	const skip = React.useCallback(() => {
		shouldSkipRef.current = false;
	}, []);

	React.useEffect(() => {
		shouldSkipRef.current = true;
	});

	return [shouldSkip, skip];
}

const getCommonPinningStyles = (column, isDragging, transform) => {
	const isPinned = column.getIsPinned();
	const isLastLeftPinnedColumn =
		isPinned === "left" && column.getIsLastColumn("left");
	const isFirstRightPinnedColumn =
		isPinned === "right" && column.getIsFirstColumn("right");

	return {
		boxShadow: isLastLeftPinnedColumn
			? "-4px 0 4px -4px gray inset"
			: isFirstRightPinnedColumn
			? "4px 0 4px -4px gray inset"
			: undefined,
		left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
		right:
			isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
		opacity: isDragging ? 0.95 : 1,
		position: isPinned || isDragging ? "sticky" : "relative",
		transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
		transition: "width transform 2s ease-in-out",
		whiteSpace: "nowrap",
		width: `${column.getSize()}px`, //header.column.getSize(),
		minWidth: "10px",
		zIndex: isPinned || isDragging ? 10 : 0,
		//width: column.getSize(),
		//zIndex: isPinned ? 1 : 0,
	};
};
function DraggableTableHeader({ header, isLast }) {
	const { attributes, isDragging, listeners, setNodeRef, transform } =
		useSortable({
			id: header.column.id,
		});
	const isPinned = header.column.getIsPinned();
	const style = getCommonPinningStyles(header.column, isDragging, transform);
	//opacity: isDragging ? 0.8 : 1,
	//position: "relative",

	//cursor: isDragging ? "grabbing" : "grab",
	return (
		<TableHead
			key={header.id}
			className={cn(
				"ps-6 border border-r lg:text-left max-lg:w-fit max-lg:pr-0 relative dark:border-white truncate",
				isPinned || isDragging ? "bg-white dark:bg-slate-900" : ""
			)}
			ref={setNodeRef}
			style={style}
		>
			<div
				style={{ width: `${header.column.getSize() - 20}px` }}
				className="overflow-hidden block"
			>
				{header.column.id !== "actions" && !isPinned && (
					<Button
						className={cn(
							"inline-block absolute left-1 top-1/2 translate-y-[-50%]",
							isDragging ? "cursor-grabbing" : "cursor-grab"
						)}
						variant="ghost"
						size="icon"
						asChild
						{...attributes}
						{...listeners}
					>
						<GripVertical className="w-4 h-4" />
					</Button>
				)}
				{header.isPlaceholder
					? null
					: flexRender(
							header.column.columnDef.header,
							header.getContext()
					  )}

				{header.column.id !== "actions" && !isPinned && (
					<ColumnResizer header={header} />
				)}
			</div>
		</TableHead>
	);
}
const DragAlongCell = ({ cell }) => {
	const { isDragging, setNodeRef, transform } = useSortable({
		id: cell.column.id,
	});

	const isPinned = cell.column.getIsPinned();
	const style = getCommonPinningStyles(cell.column, isDragging, transform);
	return (
		<TableCell
			key={cell.id}
			className={cn(
				"text-left max-lg:ps-6", //border py-2
				isPinned || isDragging ? "bg-white dark:bg-slate-900" : ""
			)}
			style={style}
			ref={setNodeRef}
		>
			{flexRender(cell.column.columnDef.cell, cell.getContext())}
		</TableCell>
	);
};
export function CustomersTable({
	initialData,
	columns,
	title,
	name,
	renderSubComponent,
}) {
	console.log(initialData)
	const [data, setData] = React.useState(initialData);
	const [sorting, setSorting] = React.useState([]);
	const [columnFilters, setColumnFilters] = React.useState([]);
	const [columnVisibility, setColumnVisibility] = React.useState({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [filtering, setFiltering] = React.useState("");
	const [customFiltering, setCustomFiltering] = React.useState({
		column: "",
		operator: "",
		value: "",
	});
	const [toggleFilter, setToggleFilter] = React.useState(false);
	const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
	const [columnOrder, setColumnOrder] = React.useState(() =>
		columns.map((c) => c.id)
	);
	const [expanded, setExpanded] = React.useState({});
	const table = useReactTable({
		data,
		columns,
		enableRowSelection: false,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getExpandedRowModel: getExpandedRowModel(),
		filterFromLeafRows: true,
		getRowCanExpand: (row) => {
			return row.subRows.length > 0 || row.original.canExpand == true;
		},
		enableColumnResizing: true,
		columnResizeMode: "onChange",
		enableColumnPinning: true,
		autoResetPageIndex,
		meta: {
			updateData: (rowId, columnId, value) => {
				skipAutoResetPageIndex();
				const updateRowData = (rows, rowId) => {
					// Split the rowId into an array of indices, e.g., "1.2.3" -> [1, 2, 3]
					const rs = rowId.split(".").map(Number);
			
					// Base case: if we're at the last index in the hierarchy, update the row
					if (rs.length === 1) {
						// Return a new array with the updated row
						return rows.map((row, index) => {
							if (index === rs[0]) {
								// Return a new copy of the row with the updated value
								return {
									...row,
									[columnId]: value, // Update the specific column value
								};
							}
							return row;
						});
					}
			
					// Recursive case: go deeper into the subRows
					return rows.map((row, index) => {
						if (index === rs[0]) {
							return {
								...row,
								subRows: updateRowData(row.subRows, rs.slice(1).join(".")),
							};
						}
						return row;
					});
				};
				setData((prev) => updateRowData(prev, rowId));
			},
			toggleFilter: () => setToggleFilter(!toggleFilter),
		},
		filterFns: {
			custom: (row, columnId, filterValue) => {
				// Early return if no filter is applied
				if (!filterValue || !filterValue.operator || !filterValue.value) {
					return true;
				}
		
				const { operator, value } = filterValue;
				const filterLowerValue = value.toLowerCase();
		
				// Function to check the filter against the cell value
				const checkFilter = (cellValue) => {
					cellValue = String(cellValue).toLowerCase();
					switch (operator) {
						case "contains":
							return cellValue.includes(filterLowerValue);
						case "doesNotContain":
							return !cellValue.includes(filterLowerValue);
						case "equals":
							return cellValue === filterLowerValue;
						case "doesNotEqual":
							return cellValue !== filterLowerValue;
						case "startsWith":
							return cellValue.startsWith(filterLowerValue);
						case "endsWith":
							return cellValue.endsWith(filterLowerValue);
						case "isEmpty":
							return cellValue === "";
						case "isNotEmpty":
							return cellValue !== "";
						default:
							return true;
					}
				};
		
				// Recursive function to check subRows
				const checkRowAndSubRows = (currentRow) => {
					// Check the current row's value
					let cellValue = currentRow.getValue(columnId);
					if (checkFilter(cellValue)) {
						return true;
					}
		
					// If the row has subRows, recursively check each subrow
					if (currentRow.subRows.length > 0) {
						for (let subRow of currentRow.subRows) {
							if (checkRowAndSubRows(subRow)) {
								return true; // Return true if any subrow matches
							}
						}
					}
		
					// If no match is found in this row or its subRows
					return false;
				};
		
				// Start checking from the current row
				return checkRowAndSubRows(row);
			},
		},
		state: {
			expanded,
			globalFilter: filtering,
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			columnOrder,
		},
		onExpandedChange: setExpanded,
		getSubRows: (row) => row.subRows,
		onGlobalFilterChange: setFiltering,
	});
	React.useEffect(() => {
		if (
			customFiltering.column &&
			customFiltering.operator &&
			customFiltering.value
		) {
			table.getColumn(customFiltering.column)?.setFilterValue({
				operator: customFiltering.operator,
				value: customFiltering.value,
			});
		}
	}, [customFiltering]);
	// reorder columns after drag & drop
	function handleDragEnd(event) {
		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			setColumnOrder((columnOrder) => {
				const oldIndex = columnOrder.indexOf(active.id);
				const newIndex = columnOrder.indexOf(over.id);
				return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
			});
		}
	}

	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {})
	);
	return (
		<DndContext
			collisionDetection={closestCenter}
			modifiers={[restrictToHorizontalAxis]}
			onDragEnd={handleDragEnd}
			sensors={sensors}
		>
			<div className="w-full px-3 max-md:px-1">
				<div className="w-full flex items-center max-lg:flex-col max-lg:items-center justify-between py-4">
					<div className="text-pretty max-lg:text-center">
						<h1 className="text-2xl font-semibold tracking-tight transition-colors mb-2">
							{title}
						</h1>
						<p className="text-green-500 font-semibold text-base">
							All Members
						</p>
					</div>
					<DataTableToolbar
						table={table}
						filtering={filtering}
						name={name}
						setFiltering={setFiltering}
					/>
				</div>
				<CustomFilter
					toggleFilter={toggleFilter}
					columns={columns}
					table={table}
					setCustomFiltering={setCustomFiltering}
				/>
				<div className="rounded-md overflow-x-scroll border">
					<Table
						style={{ width: table.getCenterTotalSize() }}
						className={`dark:border-white lg:w-full table-auto border-none`}
					>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow
									key={headerGroup.id}
									className="first:px-0 dark:border-white w-full"
								>
									<SortableContext
										items={columnOrder}
										strategy={horizontalListSortingStrategy}
									>
										{headerGroup.headers.map(
											(header, index, arr) => {
												return (
													<DraggableTableHeader
														key={index}
														header={header}
														isLast={
															arr.length - 1 ===
															index
														}
													/>
												);
											}
										)}
									</SortableContext>
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row, idx) => {
									return (
										<React.Fragment key={row.id}>
											<TableRow
												key={row.id}
												data-state={
													row.getIsSelected() &&
													"selected"
												}
												className="dark:border-white"
											>
												{row
													.getVisibleCells()
													.map((cell, idx) => (
														<SortableContext
															key={cell.id}
															items={columnOrder}
															strategy={
																horizontalListSortingStrategy
															}
														>
															<DragAlongCell
																key={cell.id}
																cell={cell}
															/>
														</SortableContext>
													))}
											</TableRow>
											{row.original.canExpand &&
												row.getIsExpanded() && (
													<TableRow>
														<TableCell
															colSpan={
																row.getVisibleCells()
																	.length
															}
														>
															{renderSubComponent(
																{
																	row,
																}
															)}
														</TableCell>
													</TableRow>
												)}
										</React.Fragment>
									);
								})
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
				<DataTablePagination table={table} />
			</div>
		</DndContext>
	);
}
