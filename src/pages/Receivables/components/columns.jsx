import { Checkbox } from "@/components/ui/checkbox";
import DataTableRowActions from "./DataTableRowActions";
import { statuses } from "./statuses";
import { Button } from "@/components/ui/button";
import {
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ArrowUp,
	ArrowUpDown,
	ChevronRight,
	EyeOff,
	FlaskConical,
	FlaskConicalOff,
	MoreVertical,
	PinOff,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const customerColumns = [
	{
		accessorKey: "company",
		id: "company",
		header: ({ column, table }) => (
			<HeaderColDisplay
				column={column}
				table={table}
				title={"Company Name"}
			/>
		),
		cell: EditableCell,
		minSize: "40",
		size: "170",
		filterFn: "custom",
		enableResizing: true,
	},
	{
		accessorKey: "customerName",
		id: "customerName",
		header: ({ column, table }) => (
			<HeaderColDisplay
				column={column}
				table={table}
				title={"Customer Name"}
			/>
		),
		cell: EditableCell,
		minSize: "40",
		size: "170",
		filterFn: "custom",
		enableResizing: true,
	},
	{
		accessorKey: "phoneNumber",
		id: "phoneNumber",
		header: ({ column, table }) => (
			<HeaderColDisplay
				column={column}
				table={table}
				title={"Phone Number"}
			/>
		),
		cell: EditableCell,
		filterFn: "custom",
		enableResizing: true,
		minSize: "40",
		size: "210",
	},
	{
		accessorKey: "email",
		id: "email",
		header: ({ column, table }) => (
			<HeaderColDisplay column={column} table={table} title={"Email"} />
		),
		cell: EditableCell,
		minSize: "40",
		size: "170",
		filterFn: "custom",
		enableResizing: true,
	},
	{
		accessorKey: "country",
		id: "country",
		header: ({ column, table }) => (
			<HeaderColDisplay column={column} table={table} title={"Country"} />
		),
		minSize: "40",
		size: "168",
		cell: EditableCell,
		filterFn: "custom",
		enableResizing: true,
	},
	{
		accessorKey: "q1",
		id: "q1",
		header: "Q1",
		minSize: "40",
		size: "40",
		cell: EditableCell,
		filterFn: "custom",
		enableResizing: true,
	},
	{
		accessorKey: "q2",
		id: "q2",
		header: "Q2",
		minSize: "40",
		size: "40",
		cell: EditableCell,
		filterFn: "custom",
		enableResizing: true,
	},
	{
		accessorKey: "q3",
		id: "q3",
		header: "Q3",
		minSize: "40",
		size: "40",
		cell: EditableCell,
		filterFn: "custom",
		enableResizing: true,
	},
	{
		accessorKey: "q4",
		id: "q4",
		header: "Q4",
		minSize: "40",
		size: "40",
		cell: EditableCell,
		filterFn: "custom",
		enableResizing: true,
	},
	{
		accessorKey: "status",
		id: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = statuses.find(
				(status) => status.value === row.getValue("status")
			);

			if (!status) {
				return null;
			}

			return <div className="block w-fit ms-0">{status.render()}</div>;
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
		enableResizing: false,
	},
	{
		id: "actions",
		cell: ({ row, table }) => (
			<DataTableRowActions row={row} table={table} />
		),
		enableResizing: false,
		maxSize: "32",
	},
];

// {
// 	id: "select",
// 	header: ({ table }) => (
// 		<Checkbox
// 			checked={
// 				table.getIsAllPageRowsSelected() ||
// 				(table.getIsSomePageRowsSelected() && "indeterminate")
// 			}
// 			onCheckedChange={(value) =>
// 				table.toggleAllPageRowsSelected(!!value)
// 			}
// 			aria-label="Select all"
// 			className="translate-y-[2px]"
// 		/>
// 	),
// 	cell: ({ row }) => (
// 		<Checkbox
// 			checked={row.getIsSelected()}
// 			onCheckedChange={(value) => row.toggleSelected(!!value)}
// 			aria-label="Select row"
// 			className="translate-y-[2px]"
// 		/>
// 	),
// 	enableSorting: false,
// 	enableHiding: false,
// },
export const vendorColumns = [
	{
		accessorKey: "company",
		id: "company",
		header: ({ column, table }) => (
			<HeaderColDisplay
				column={column}
				table={table}
				title={"Company Name"}
			/>
		),
		cell: EditableCell,
		minSize: "40",
		size: "200",
		filterFn: "custom",
		enableResizing: true,
	},
	{
		accessorKey: "vendorName",
		id: "vendorName",
		header: ({ column, table }) => (
			<HeaderColDisplay
				column={column}
				table={table}
				title={"Vendor Name"}
			/>
		),
		// </div>
		// <Button
		// 	variant="ghost"
		// 	className="max-lg:w-full max-lg:text-center ps-0"
		// 	onClick={() =>
		// 		column.toggleSorting(column.getIsSorted() === "asc")
		// 	}
		// >
		// 	Customer Name
		// 	<ArrowUpDown className="ml-2 h-4 w-4" />
		// </Button>
		cell: EditableCell,
		minSize: "40",
		size: "200",
		filterFn: "custom",
		enableResizing: true,
	},
	{
		accessorKey: "phoneNumber",
		id: "phoneNumber",
		header: ({ column, table }) => (
			<HeaderColDisplay
				column={column}
				table={table}
				title={"Phone Number"}
			/>
		),
		cell: EditableCell,
		filterFn: "custom",
		enableResizing: true,
		minSize: "40",
		size: "210",
	},
	{
		accessorKey: "email",
		id: "email",
		header: ({ column, table }) => (
			<HeaderColDisplay column={column} table={table} title={"Email"} />
		),
		cell: EditableCell,
		minSize: "40",
		size: "220",
		maxSize: "450",
		filterFn: "custom",
		enableResizing: true,
	},
	{
		accessorKey: "country",
		id: "country",
		header: ({ column, table }) => (
			<HeaderColDisplay column={column} table={table} title={"Country"} />
		),
		minSize: "40",
		size: "218",
		cell: EditableCell,
		filterFn: "custom",
		enableResizing: true,
	},
	{
		accessorKey: "status",
		id: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = statuses.find(
				(status) => status.value === row.getValue("status")
			);

			if (!status) {
				return null;
			}

			return <div className="block w-fit ms-0">{status.render()}</div>;
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
		enableResizing: false,
	},
	{
		id: "actions",
		//{ table, row, setState } row={row} table={table} setState={setState}
		cell: ({ row, table }) => (
			<DataTableRowActions row={row} table={table} />
		),
		enableResizing: false,
		maxSize: "32",
	},
];

function EditableCell({ getValue, row, column, table }) {
	const initialValue = getValue();

	const [value, setValue] = useState(initialValue);
	const [isEditing, setIsEditing] = useState(false);

	// When the input is blurred, we'll call our table meta's updateData function
	const onBlur = () => {
		table.options.meta?.updateData(row.id, column.id, value);
		setIsEditing(false);
	};

	// If the initialValue is changed external, sync it up with our state
	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);
	const handleDoubleClick = () => {
		setIsEditing(true);
	};

	//if (!isEditing) {
	return (
		<div
			style={{
				width: column.getSize(),
				paddingLeft:
					column.id == "company" ? `${row.depth * 2}rem` : "0px",
			}}
			className="flex gap-1 items-center h-full truncate"
		>
			{column.id == "company" ? (
				<>
					{row.getCanExpand() && (
						<Button
							variant="ghost"
							size="icon"
							className={cn(
								"pointer hover:bg-gray-300 rounded-full w-6 h-6 transition-all",
								{ "rotate-90": row.getIsExpanded() }
							)}
							onClick={row.getToggleExpandedHandler()}
						>
							<ChevronRight className="w-4 h-4" />
						</Button>
					)}
				</>
			) : (
				""
			)}
			{isEditing ? (
				<Textarea
					value={value}
					//style={{ width: column.getSize() }}
					onChange={(e) => setValue(e.target.value)}
					onBlur={onBlur}
					autoFocus
					//rows={"1"}
					className="block max-md:w-[180px] border border-sky-600 text-wrap text-ellipsis whitespace-nowrap bg-transparent shadow-none dark:text-white lg:p-0 h-fit focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-background focus-visible:outline-none"
				/>
			) : (
				<span onClick={handleDoubleClick}>{value}</span>
			)}
		</div>
	);
	//}
	// return (
	// 	<>
	// 		{column.id == "company" ? (
	// 			<>
	// 				{row.getCanExpand() && (
	// 					<Button
	// 						variant="ghost"
	// 						size="icon"
	// 						className={cn(
	// 							"pointer hover:bg-gray-300 rounded-full w-6 h-6 transition-all",
	// 							{ "rotate-90": row.getIsExpanded() }
	// 						)}
	// 						onClick={() => row.getToggleExpandedHandler()}
	// 					>
	// 						<ChevronRight className="w-4 h-4" />
	// 					</Button>
	// 				)}
	// 			</>
	// 		) : (
	// 			""
	// 		)}
	// 		<Textarea
	// 			value={value}
	// 			style={{ width: column.getSize() }}
	// 			onChange={(e) => setValue(e.target.value)}
	// 			onBlur={onBlur}
	// 			autoFocus
	// 			//rows={"1"}
	// 			className="block w-full max-h-full max-md:w-[180px] ps-0 pl-0 ml-0 ms-0 text-wrap text-ellipsis whitespace-nowrap bg-transparent border-none shadow-none dark:text-white"
	// 		/>
	// 	</>
	// );
}
function HeaderMenu({ column, table }) {
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					className="ms-1 size-6 cursor-pointer rounded-full hover:bg-gray-400 ring-0 active:ring-transparent"
					//asChild
				>
					<MoreVertical className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuGroup>
					{column.getIsSorted() && (
						<DropdownMenuItem onClick={() => column.clearSorting()}>
							<X className="mr-2 h-4 w-4" />
							<span>Clear sorting</span>
						</DropdownMenuItem>
					)}
					<DropdownMenuItem
						onClick={() => column.toggleSorting(false)}
					>
						<ArrowUp className="mr-2 h-4 w-4" />
						<span>Sort by ascending</span>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => column.toggleSorting(true)}
					>
						<ArrowDown className="mr-2 h-4 w-4" />
						<span>Sort by descending</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => {
						table.options.meta.toggleFilter();
						setIsFilterOpen(!isFilterOpen);
					}}
				>
					{isFilterOpen ? (
						<FlaskConicalOff className="mr-2 h-4 w-4" />
					) : (
						<FlaskConical className="mr-2 h-4 w-4" />
					)}
					<span>Filter</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{column.getIsPinned() && (
						<DropdownMenuItem onClick={() => column.pin(false)}>
							<PinOff className="mr-2 h-4 w-4" />
							<span>Unpin</span>
						</DropdownMenuItem>
					)}
					<DropdownMenuItem onClick={() => column.pin("left")}>
						<ArrowLeft className="mr-2 h-4 w-4" />
						<span>Pin left</span>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.pin("right")}>
						<ArrowRight className="mr-2 h-4 w-4" />
						<span>Pin right</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => column.toggleVisibility()}>
					<EyeOff className="mr-2 h-4 w-4" />
					<span>Hide</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
function HeaderColDisplay({ column, table, title }) {
	return (
		<>
			{column.getSize() < 80 ? (
				<div
					className="flex items-center w-full truncate"
					aria-label={title}
					title={title}
				>
					<HeaderMenu column={column} table={table} />
				</div>
			) : (
				<div className="flex items-center w-full truncate">
					<span className="max-lg:text-center">{title}</span>
					<HeaderMenu column={column} table={table} />
				</div>
			)}
		</>
	);
}
