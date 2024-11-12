import React from "react";
import DataTableFacetedFilter from "./DataTableFacetedFilter";
import {
	ChevronDown,
	CrossIcon,
	Eye,
	Search,
	User,
	UserPlus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { statuses } from "./statuses";
//import { useNavigate } from "react-router-dom";
const DataTableToolbar = ({ table, filtering, setFiltering, name }) => {
	//const navigate = useNavigate();
	const isFiltered =
		table.getState().columnFilters.length > 0 || filtering !== "";
	const customerFormNavHandler=()=>{
		//navigate('/receivables/customerForm')
	}
	return (
		<>
			<div className="flex items-center max-md:flex-col max-md:items-start w-fit max-lg:w-full max-lg:justify-between gap-2">
				<div className="relative">
					<Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground dark:text-white" />
					<Input
						type="search"
						placeholder="Search"
						//value={table.getColumn("email")?.getFilterValue() ?? ""}
						value={filtering}
						// onChange={(event) =>
						// 	table
						// 		.getColumn("email")
						// 		?.setFilterValue(event.target.value)
						// }
						onChange={(event) => setFiltering(event.target.value)}
						//className="max-w-[200px] dark:bg-[#5D7285] dark:text-white"
						className="w-full appearance-none bg-background pl-8 shadow-none dark:placeholder-white dark:bg-[#5D7285] dark:text-white"
					/>
				</div>
				<div className="flex lg:gap-2 max-lg:w-full items-center max-lg:justify-between">
					{table.getColumn("status") && (
						<DataTableFacetedFilter
							column={table.getColumn("status")}
							title="Status"
							options={statuses}
						/>
					)}

					{isFiltered && (
						<Button
							variant="ghost"
							onClick={() => {
								table.resetColumnFilters();
								setFiltering("");
							}}
							className="flex items-center gap-2 bg-[#F9FBFF] text-black border border-black border-dashed dark:bg-[#5D7285] dark:text-white"
						>
							Reset
							<CrossIcon className="ml-2 h-4 w-4" />
						</Button>
					)}
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
							<DropdownMenuContent align="end">
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
												{column.id}
											</DropdownMenuCheckboxItem>
										);
									})}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				<Button
					variant="outline"
					//onClick={customerFormNavHandler}
					className="flex items-center gap-2 bg-[#F9FBFF] text-black border border-black dark:border-white border-dashed dark:bg-[#5D7285] dark:text-white"
				>
					Add {name} <UserPlus className="w-4 h-4" />
				</Button>
			</div>
		</>
	);
};

export default DataTableToolbar;
